
export default {
    props: {
    },
    data() {
        return {
            is_visible: true
        };
    },
    mounted() {
    },
    methods: {
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
