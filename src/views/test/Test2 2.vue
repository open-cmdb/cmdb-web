<template>
  <div>
    <el-input v-model="aaa" type="password" autofocus @keydown.enter.native="on_click">
    </el-input>
    <ul>
      <li style="display: inline-block; width: 20px; text-overflow:ellipsis; overflow:hidden;
white-space:nowrap;">sndndnjdndjsn</li>
      <li style="display: inline-block; width: 10px">22222222222222</li>
    </ul>
    <el-upload
      accept="xlsx"
      :auto-upload="false"
      class="upload-demo"
      :headers="{'Authorization': $store.state.token}"
      drag
      action="http://localhost:8000/api/v1/data/test-5/import"
      multiple>
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">只能上传xlsx/csv文件</div>
    </el-upload>
    <el-button @click="on_click">aaa</el-button>
  </div>
</template>

<script>
  import Vue from "vue"
  export default {
    data() {
      return {
        aaa: null
      };
    },
    methods: {
      on_click() {
        var com = Vue.component("LTableMgmtUpload")
        console.log("com: ", com)
      }
    }
  };
</script>
