<template>
  <el-dialog
    title="提示"
    :visible.sync="dialogVisible"
    width="30%"
    :before-close="handleClose">
    <span>这是一段信息</span>
    <span slot="footer" class="dialog-footer">
    <el-button @click="do_destory()">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
  </el-dialog>
</template>

<script>
  export default {
    data() {
      return {
        dialogVisible: true
      };
    },
    methods: {
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      do_destory(){
        console.log("do_destory")
        // console.log(this.$el.parentNode)
        // this.$el.parentElement.removeChild(this.$el)
        this.$el.parentNode.removeChild(this.$el)
        this.$destroy()
      }
    },
    destroyed(){
      console.log("destroyed()")
    }
  };
</script>
