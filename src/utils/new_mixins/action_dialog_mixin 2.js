

export default {
    props: {
        item: {
            type: Object,
        },
        update_item: {
            type: Boolean
        },
        delete_item: {
            type: Boolean
        }
    },
    data() {
        return {
            is_visible: true,
            loading: false,
            data: {},
            form_data: {},
            form_errors: {},
            submit_loading: false,
            success_msg: "操作成功"
        };
    },
    mounted() {
    },
    methods: {
        on_submit() {
            var form_data = this.before_submit()
            if (form_data == null) {
                return
            }
            this.submit_loading = true
            this.g_master_api.post(this.url, this.form_data).then(response => {
                this.submit_loading = false
                this.$message.success(this.success_msg)
                if (this.item && this.update_item) {
                    this.$emit("update_item", this.item, response.data)
                }
                if (this.item && this.delete_item) {
                    this.$emit("delete_item", this.item)
                }
                this.after_submit(response)
                this.on_close()
            }).catch(error => {
                this.submit_loading = false
                console.error("error:", error)
                if (error.response && error.response.data) {
                    this.form_errors = error.response.data
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
        get_data() {
            this.loading = true
            this.$c_master.get(this.url).then(response => {
                this.loading = false
                this.data = response.data
            }).catch(error => {
                this.loading = false
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
                        this._remote_child();
                        this.$destroy();
                    })
                    .catch(() => { });
            } else {
                this._remote_child();
                this.$destroy();
            }
        },
        _remote_child() {
            if (this.$el.parentNode) {
                this.$el.parentNode.removeChild(this.$el);
            }
        }
    }
}
