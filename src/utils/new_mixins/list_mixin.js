import { g_calc_page_size } from "../plugins";

export default {
    data() {
        return {
            url: "",
            data: [],
            loading: false,
            count: 0,
            base_params: {
                page_size: g_calc_page_size(),
                page: 1,
                search: "",
            },
            params: {},
            extend_params: {},
        }
    },
    mounted() {
        if (!this.url) {
            throw Error("使用list_mixin必须在data中提供url参数")
        }
        this.params = Object.assign({}, this.base_params, this.params, (this.$route && Object.keys(this.$route.params).length) ? this.$route.params : this.extend_params);
    },
    methods: {
        get_data(reset_page = false) {
            if (reset_page) {
                this.params.page = 1
            }
            this.before_get_data()
            this.loading = true
            this.g_master_api.get(this.url, { params: this.params }).then(response => {
                this.loading = false
                this.count = response.data.count
                this.data = response.data.results
                try {
                    this.after_get_data(response.data)
                }
                catch (error) {
                    console.error(error)
                    this.$message.error("执行 after_get_data 发生异常")
                }
            }).catch(error => {
                this.loading = false
                this.after_get_data_error(error)
            })
        },
        before_get_data() {

        },
        after_get_data(res_data) {
            return res_data
        },
        after_get_data_error(error) {
            console.error("error: ", error)
        },
        on_action(item, action_url, action_name, optional_params = {}) {
            optional_params = Object.assign({
                confirm: true,                          // 是否二次确认
                update_item: true,                     // 操作成功后是否更新这条数据
                delete_item: false,                     // 操作成功后是否删除这条数据
                form: null,                              // 操作是否需要填写参数 仅支持一个字段   参数： field: 字段名  label: 表单label  placeholder: 占位字符
                success_callback: response => { },               //成功回掉
                error_callback: error => { },             //失败回掉
            }, optional_params)
            if (!optional_params.confirm) {
                this._action(item, action_url, action_name, optional_params)
                return
            }
            if (!optional_params.form) {
                this.$confirm(`${action_name}?`, "警告", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning",
                    beforeClose: (action, instance, done) => {
                        if (action === 'confirm') {
                            instance.confirmButtonLoading = true;
                            this._action(item, action_url, action_name, optional_params, {}, instance, done)
                        } else {
                            done()
                        }
                    }
                })
                // .then(() => {
                //     this._action(item, action_url, action_name, optional_params.delete_item)
                // }).catch(error => {
                // });
                return
            }
            this.$prompt(optional_params.form ? optional_params.form.label : "", action_name, {
                inputPlaceholder: optional_params.form.placeholder ? optional_params.form.placeholder : "",
                inputValue: optional_params.form.default ? optional_params.form.default : "",
                beforeClose: (action, instance, done) => {
                    if (action === 'confirm') {
                        instance.confirmButtonLoading = true;
                        var form_data = {}
                        form_data[optional_params.form.field] = instance.inputValue
                        this._action(item, action_url, action_name, optional_params, form_data, instance, done)
                    } else {
                        done();
                    }
                }
            })
        },
        _action(item, action_url, action_name, optional_params, form_data = {}, instance, done) {
            const url = `${this.url}/${item.id}/${action_url}`
            this.$c_master.post(url, form_data).then(response => {
                this.$message.success(`${action_name}成功`)
                if (instance) {
                    instance.confirmButtonLoading = false;
                }
                if (done) {
                    done()
                }
                if (optional_params.update_item) {
                    this.data.splice(this.data.indexOf(item), 1, response.data)
                }
                if (optional_params.delete_item) {
                    this.data.splice(this.data.indexOf(item), 1)
                }
                try {
                    optional_params.success_callback(response, this)
                } catch (error) {
                    console.warn(`success_callback执行失败 error: ${error}`)
                }
            }).catch(error => {
                if (instance) {
                    instance.confirmButtonLoading = false;
                }
                try {
                    optional_params.error_callback(error, this);
                } catch (error) {
                    console.warn(`error_callback error: ${error}`)
                }
            })
        },
        on_delete(item, display_field = "id") {
            const self = this
            this.$confirm(`确认删除 ${item[display_field]} ?`, "警告", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
                beforeClose(action, instance, done) {
                    if (action === 'confirm') {
                        instance.confirmButtonLoading = true;
                        self._delete(item, instance, done)
                    } else {
                        done()
                    }
                }
            })
        },
        _delete(item, instance, done) {
            const url = `${this.url}/${item.id}`
            this.$c_master.delete(url).then(response => {
                instance.confirmButtonLoading = false
                this.$message.success("已删除")
                this.data.splice(this.data.indexOf(item), 1)
                done()
            }).catch(error => {
                instance.confirmButtonLoading = false
            })
        },
        on_change_sort(args) {
            console.log(args);
            if (args.order == null) {
                this.params.ordering = "";
            } else if (args.order == "descending") {
                this.params.ordering = "-" + args.prop;
            } else {
                this.params.ordering = args.prop;
            }
            this.get_data(true);
        },
        on_change_filter(filters) {
            for (let i in filters) {
                this.params[i] = filters[i];
            }
            this.params.page = 1;
            this.get_data(true);
        },
        add_dialog(comp_name, props = {}, is_nesting = false) {
            props["parent"] = this
            var Comp = Vue.component(comp_name)
            var vm = new Comp({ propsData: props })
            vm.$parent = this
            // vm.$route = this.$route
            vm.$store = this.$store
            vm.$mount()
            vm.$on("add_item", (item) => {
                this.data.unshift(item)
            })
            vm.$on("update_item", (old_item, new_item) => {
                this.data.splice(this.data.indexOf(old_item), 1, new_item)
            })
            vm.$on("delete_item", (item) => {
                this.data.splice(this.data.indexOf(item), 1)
            })
            if (is_nesting) {
                document.body.appendChild(vm.$el)
            } else {
                this.$el.appendChild(vm.$el)
            }
            return vm
        }
    }
}