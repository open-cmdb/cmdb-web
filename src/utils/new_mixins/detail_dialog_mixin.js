

export default {
    props: {
        parent: {
            type: Object,
            required: true
        },
        item: {
            type: Object,
            required: false
        },
        item_id: {
            required: false
        },
        append_to_body: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            is_visible: true,
            url: `${this.parent.url}/${this.item ? this.item.id : this.item_id}`,
            loading: false,
            data: this.item ? this.item : {
                id: this.item_id
            },
        };
    },
    mounted() {
        if (!this.item && !this.item_id) {
            throw Error("prop属性item和item_id不能同时为空")
        }
        this.get_data()
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
                        if (this.$el.parentNode) {
                            this.$el.parentNode.removeChild(this.$el);
                        }
                        this.$destroy();
                    })
                    .catch(() => { });
            } else {
                if (this.$el.parentNode) {
                    this.$el.parentNode.removeChild(this.$el);
                }
                this.$destroy();
            }
        },
        get_data() {
            this.loading = true;
            this.g_master.get(this.url).then(response => {
                this.loading = false
                this.data = response.data
            }).catch(error => {
                this.loading = false
            })
        }
    }
}