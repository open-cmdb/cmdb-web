import {list_to_string} from "../data_process"

export default {
    props: {
        parent: {
            type: Object,
            required: false
        },
        item: {
            type: Object,
            required: false
        },
        item_id: {
            required: false
        },
        //操作类型 
        type: {
            type: String,
            default: "create",
            validator: (value) => {
                return ["create", "update"].indexOf(value) !== -1
            }
        }
    },
    data() {
        return {
            is_visible: true,
            url: this.parent ? (this.type === 'create' ? this.parent.url : `${this.parent.url}/${this.item ? this.item.id : this.item_id}`) : "",
            loading: false,
            data: this.item ? this.item : {},
            form_data: this.type === "update" ? Object.assign({}, this.item) : {},
            form_errors: {},
            submit_loading: false,
            success_msg: this.type === "create" ? "创建成功" : "更新成功",
            close_confirm: true
        };
    },
    mounted() {
        if (this.type === "update" && !this.item) {
            if (!this.item_id) {
                throw Error("当type为update时 prop属性item和item_id不能同时为空")
            }
            this.get_data()
        }
    },
    methods: {
        on_submit() {
            var form_data = this.before_submit()
            if (form_data == null) {
                return
            }
            this.submit_loading = true
            this.g_master_api.request({
                url: this.url,
                method: this.type === 'create' ? "post" : "put",
                data: form_data
            }).then(response => {
                this.submit_loading = false
                if (this.success_msg) {
                    this.$message.success(this.success_msg)
                }
                if (this.type === "create") {
                    this.$emit("add_item", response.data)
                } else {
                    this.$emit("update_item", this.item, response.data);
                }
                this.after_submit(response)
                this.on_close()
            }).catch(error => {
                this.submit_loading = false
                if (error.response && error.response.data) {
                    this.form_errors = list_to_string(error.response.data)
                }
                this.after_submit_error(error)
            })
        },
        before_submit() {
            return this.form_data
        },
        after_submit(response) {

        },
        after_submit_error(error) {

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
                        if (this.$el.parentNode) {
                            this.$el.parentNode.removeChild(this.$el);
                        }
                        this.$destroy();
                    })
                    .catch(() => {
                    });
            } else {
                if (this.$el.parentNode) {
                    this.$el.parentNode.removeChild(this.$el);
                }
                this.$destroy();
            }
        },
        get_data() {
            this.loading = true;
            this.$c_master.get(this.url).then(response => {
                this.loading = false
                this.form_data = response.data
            }).catch(error => {
                this.loading = false
            })
        },
        on_before_close(done) {
            if (this.close_confirm) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                        this._remote_child()
                    })
                    .catch(_ => {
                    });
            } else {
                done();
                this._remote_child()
            }
        },
    }
}