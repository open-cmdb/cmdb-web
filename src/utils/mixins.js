
import Vue from "vue"

import maps from "@/utils/maps"
import { add_status_fields, add_format_dt_fields, list_to_string } from "@/utils/data_process"

export default {
    data: {
        loading: false,
        submit_loading: false,
    }
}

export var list_mixin = {
    data() {
        return {
            data: [],
            loading: false,
            maps: maps,
            count: 0,
            params: {
                page_size: Math.floor((window.innerHeight - 340) / 80) < 7 ? 7 : Math.floor((window.innerHeight - 340) / 80),
                page: 1,
                ordering: "",
                search: ""
            },
            datetime_fields: []
        }
    },
    methods: {
        get_data(reset_page = false) {
            if (reset_page) {
                this.params.page = 1
            }
            this.loading = true
            this.$c_master.get(this.url, { params: this.params }).then(response => {
                this.loading = false
                this.count = response.data.count
                response.data.results.forEach((item) => {
                    add_status_fields(item)
                    add_format_dt_fields(item, this.datetime_fields)
                })
                this.data = response.data.results
            }).catch(error => {
                this.loading = false
            })
        },
        on_action(item, action_url, action_name, confirm = true, loading_field = "__loading") {
            if (confirm) {
                this.$confirm(`确认${action_name}?`, "警告", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(() => {
                    this._action(item, action_url, action_name, loading_field)
                });
                return
            }
            this._action(item, action_url, action_name, loading_field)
        },
        _action(item, action_url, action_name, loading_field = "__loading") {
            const url = `${this.url}/${item.id}/${action_url}`
            item[loading_field] = true
            this.$c_master.post(url).then(response => {
                item[loading_field] = false
                this.$message.success(`已${action_name}`)
                add_status_fields(response.data)
                add_format_dt_fields(response.data, this.datetime_fields)
                this.data.splice(this.data.indexOf(item), 1, response.data)
            }).catch(error => {
                item[loading_field] = false
            })
        },
        on_delete(item, confirm = true, loading_field = "__loading_delete") {
            if (confirm) {
                this.$confirm(`确认删除?`, "警告", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(() => {
                    this._delete(item, loading_field)
                });
                return
            }
            this._action(item, loading_field)
        },
        _delete(item, loading_field = "__loading") {
            const url = `${this.url}/${item.id}`
            item[loading_field] = true
            this.$c_master.delete(url).then(response => {
                item[loading_field] = false
                this.$message.success("已删除")
                this.data.splice(this.data.indexOf(item), 1)
            }).catch(error => {
                item[loading_field] = false
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
        on_search() {
            this.get_data(true);
        },
        add_dialog(comp_name, props = {}) {
            props["p_parent"] = this
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
            this.$el.appendChild(vm.$el)
            return vm
        }
    }
}


export const dialog_mixin = {
    props: {
        p_parent: {
            type: Object,
            required: true
        },
        p_item: {
            type: Object,
            required: false
        },
        p_item_id: {
            required: false
        },
        p_is_update: {
            default: false
        },
        //操作类型 
        p_type: {
            type: String,
            required: true,
            validator: () => {
                return ["create", "update", "action"].indexOf !== -1
            }
        }
    },
    data() {
        return {
            is_visible: true,
            url: this.p_type === 'create' ? this.p_parent.url : `${this.p_parent.url}/${this.p_item ? this.p_item.id : this.p_item_id}`,
            loading: false,
            data: this.p_is_update ? this.p_is_update : {},
            form_data: this.p_type === "update" ? Object.assign({}, this.p_item) : {},
            form_errors: {},
            submit_loading: false,
            success_msg: null,
            maps: maps
        };
    },
    mounted() {
        if (!this.success_msg) {
            const MAP = {
                "create": "创建成功",
                "update": "更新成功",
                "action": "操作成功"
            }
            this.success_msg = MAP[this.p_type]
        }
    },
    methods: {
        on_submit(emit_func) {
            if (["add_item", "update_item", "delete_item", null].indexOf(emit_func) === -1) {
                emit_func = this.p_type === "create" ? "add_item" : "update_item"
            }
            this.submit_loading = true
            this.$c_master.request({
                url: this.p_type === 'action' ? `${this.url}/${this.action_url}` : this.url,
                method: this.p_type === 'update' ? "put" : "post",
                data: this.form_data
            }).then(response => {
                this.submit_loading = false
                this.$message.success(this.success_msg)
                add_status_fields(response.data)
                add_format_dt_fields(response.data, this.$parent.datetime_fields)
                if (emit_func === "add_item") {
                    this.$emit("add_item", response.data)
                }
                else if (emit_func == null){
                }
                else {
                    this.$emit(emit_func, this.p_item, response.data);
                }
                this.on_close()
            }).catch(error => {
                this.submit_loading = false
                if (error.response && error.response.data) {
                    this.form_errors = list_to_string(error.response.data)
                }
            })
        },
        on_close(confirm = false) {
            if (confirm) {
                this.is_visible = true;
                this.$confirm("确认关闭", "警告", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                })
                    .then(() => {
                        this.$el.parentNode.removeChild(this.$el);
                        this.$destroy();
                    })
                    .catch(() => { });
            } else {
                this.$el.parentNode.removeChild(this.$el);
                this.$destroy();
            }
        },
    }
}



export const simple_dialog_mixin = {
    data() {
        return {
            is_visible: true,
            loading: false,
            data: {},
            form_data: {},
            form_errors: {},
            submit_loading: false,
            success_msg: null,
            maps: maps
        };
    },
    mounted() {
    },
    methods: {
        on_submit() {
            this.submit_loading = true
            this.$c_master.request({
                url: this.p_type === 'action' ? `${this.url}/${this.action_url}` : this.url,
                method: this.p_type === 'update' ? "put" : "post",
                data: this.form_data
            }).then(response => {
                this.submit_loading = false
                this.$message.success(this.success_msg)
                add_status_fields(response.data)
                add_format_dt_fields(response.data, this.$parent.datetime_fields)
                if (this.p_type === 'update' || this.p_type === 'action') {
                    this.$emit("update_item", this.p_item, response.data)
                } else {
                    this.$emit("add_item", response.data)
                }
                this.on_close()
            }).catch(error => {
                this.submit_loading = false
                console.log("error:", error)
                if (error.response && error.response.data) {
                    this.form_errors = list_to_string(error.response.data)
                }
            })
        },
        get_data() {
            console.log("this.url", this.url)
            console.log("this.submit_loading", this.submit_loading)
            this.loading = true
            this.$c_master.get(this.url).then(response=>{
                this.loading = false
                this.data = response.data
            }).catch(error=>{
                this.loading = false
                this.$message.error("获取数据失败 请稍后再试")
            })
        },
        on_close(confirm = false) {
            if (confirm) {
                this.is_visible = true;
                this.$confirm("确认关闭", "警告", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                })
                    .then(() => {
                        this.$el.parentNode.removeChild(this.$el);
                        this.$destroy();
                    })
                    .catch(() => { });
            } else {
                this.$el.parentNode.removeChild(this.$el);
                this.$destroy();
            }
        }
    }
}



export const dialog_mixin2 = {
    props: {
        p_parent: {
            type: Object,
            required: true
        },
        p_item: {
            type: Object,
            required: false
        },
        p_item_id: {
            required: false
        },
        p_is_update: {
            default: false
        },
        //操作类型 
        p_type: {
            type: String,
            required: true,
            validator: () => {
                return ["create", "update", "action"].indexOf !== -1
            }
        }
    },
    data() {
        return {
            is_visible: true,
            url: this.p_type === 'create' ? this.p_parent.url : `${this.p_parent.url}/${this.p_item ? this.p_item.id : this.p_item_id}`,
            loading: false,
            data: this.p_is_update ? this.p_is_update : {},
            form_data: this.p_type === "update" ? Object.assign({}, this.p_item) : {},
            form_errors: {},
            submit_loading: false,
            success_msg: null,
            maps: maps
        };
    },
    mounted() {
        if (!this.success_msg) {
            const MAP = {
                "create": "创建成功",
                "update": "更新成功",
                "action": "操作成功"
            }
            this.success_msg = MAP[this.p_type]
        }
    },
    methods: {
        on_submit(emit_func) {
            if (["add_item", "update_item", "delete_item", undefined].indexOf(emit_func) === -1) {
                throw "emit_func 必须为 add_item update_item delete_item 和 undefind"
            }
            this.submit_loading = true
            this.$c_master.request({
                url: this.p_type === 'action' ? `${this.url}/${this.action_url}` : this.url,
                method: this.p_type === 'update' ? "put" : "post",
                data: this.form_data
            }).then(response => {
                this.submit_loading = false
                this.$message.success(this.success_msg)
                add_status_fields(response.data)
                add_format_dt_fields(response.data, this.$parent.datetime_fields)
                if (emit_func === "add_item") {
                    this.$emit("add_item", response.data)
                }
                else {
                    this.$emit(emit_func, this.p_item, response.data);
                }
                this.on_close()
            }).catch(error => {
                this.submit_loading = false
                if (error.response && error.response.data) {
                    this.form_errors = list_to_string(error.response.data)
                }
            })
        },
        on_close(confirm = false) {
            if (confirm) {
                this.is_visible = true;
                this.$confirm("确认关闭", "警告", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                })
                    .then(() => {
                        this.$el.parentNode.removeChild(this.$el);
                        this.$destroy();
                    })
                    .catch(() => { });
            } else {
                this.$el.parentNode.removeChild(this.$el);
                this.$destroy();
            }
        },
    }
}