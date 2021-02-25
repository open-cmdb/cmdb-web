import Vue from "vue"

export default {
    data() {
        return {
            loading: false,
            data: {
                rows: []
            },
            params: {

            }
        }
    },
    methods: {
        get_data() {
            this.loading = true
            this.g_master_api.get(this.url, { params: this.params }).then(response => {
                this.loading = false
                this.data.rows = response.data.results
                this.after_get_data(response)
            }).catch(error => {
                this.loading = false
                this.after_get_data_error(error)
            })
        },
        after_get_data(response) {

        },
        after_get_data_error(error) {
            console.error(error)
        },
        add_dialog(comp_name, props = {}) {
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
            this.$el.appendChild(vm.$el)
            return vm
        }
    },
    computed: {
        is_data_empty() {
            if (this.loading) {
                return false;
            }
            if (this.data.rows.length == 0) {
                return true;
            }
            return false;
        }
    }
}