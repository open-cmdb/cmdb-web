<template>
  <el-pagination
    v-loading="loading"
    @current-change="parent.on_change_page"
    :current-page.sync="parent.params.page"
    :page-size="parent.params.page_size"
    background
    layout="total, prev, pager, next"
    :total="count">
  </el-pagination>
</template>

<script>
  export default {
    props: {
      parent: {
        required: true
      },
    },
    data(){
      return {
        loading: false,
        count: 0,
      }
    },
    mounted(){
      this.$on("change_page", ()=>{
        this.loading = true
        this.$c_master.get(`${this.parent}/count`, {params: this.parent.params}).then((response)=>{
          this.loading = false
          this.count = response.data.count
        }).catch((error)=>{
          this.loading = false
        })
      })
    },
    methods: {
      on_change(){
        this.loading = true
        this.$c_master.get(`${this.parent}/count`, {params: this.parent.params}).then((response)=>{
          this.loading = false
          this.count = response.data.count
        }).catch((error)=>{
          this.loading = false
        })
      }
    }
  }
</script>

<style scoped>

</style>
