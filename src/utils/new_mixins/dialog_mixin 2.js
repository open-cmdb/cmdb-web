
export default {
    props: {
    },
    data() {
        return {
            is_visible: true,
            close_confirm: true
        };
    },
    mounted() {
    },
    methods: {
        on_before_close(done){
            if(this.close_confirm){
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                        this._remote_child()
                    })
                    .catch(_ => {});
            }else{
                done();
                this._remote_child()
            }
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
                this.is_visible = true;
                setTimeout(()=>{
                    this._remote_child();
                    this.$destroy();
                }, 2000)
            }
        },
        _remote_child() {
            if (this.$el.parentNode) {
                this.$el.parentNode.removeChild(this.$el);
            }
        }
    }
}
