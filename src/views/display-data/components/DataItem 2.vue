<template>
  <ul style="white-space:nowrap; margin: 0px; padding: 0px">
    <!--    <li style="display: inline-block; border:1px solid #E4E7ED; padding: 9px; height: 40px;">-->
    <li
      style="display: inline-block;  border:1px solid #E4E7ED; padding: 0 12px; font-size:14px; height: 40px; line-height: 40px; text-overflow:ellipsis; overflow:hidden;
white-space:nowrap;">
      <el-button style="padding: 0px" icon="el-icon-view" @click="on_show_detail(data)"></el-button>
      <el-button style="padding: 0px" icon="el-icon-time"
                 @click="on_show_history(data['_index'], data['_id'])"></el-button>
      <el-button style="padding: 0px" icon="el-icon-edit" @click="on_change_data(data)"></el-button>
      <el-button style="padding: 0px" icon="el-icon-delete" @click="on_delete()"></el-button>
    </li>
    <li v-for="(value, key, index) in data['_source']" v-if="key[0]!='S'" :key="index"
        style="display: inline-block;  border:1px solid #E4E7ED; padding: 0 12px; font-size:14px; height: 40px; line-height: 40px; text-overflow:ellipsis; overflow:hidden;
white-space:nowrap;"
        :style="{color: value==null ? '#C0C4CC':'#606266', width: `${data['width'][key]}px`}">
      {{ value==null?'null':value }}
    </li>
  </ul>
</template>

<script>
  import Vue from "vue";
  import {master_s} from "@/api";

  export default {
    name: "data-item",
    props: ["data"],
    methods: {
      on_show_history(index, id) {
        var HistoricalRecord = Vue.component("HistoricalRecord");
        console.log("id:", id);
        var hist = new HistoricalRecord({
          propsData: {
            data_index: index,
            data_id: id
          }
        });
        hist.$mount();
        this.$el.appendChild(hist.$el);
      },
      on_show_detail(data) {
        console.log("on_show_detail.data:", data);
        var DataDetail = Vue.component("DataDetail");
        var vm = new DataDetail({
          propsData: {
            data: data,
            source: data["_source"]
          }
        });
        vm.$mount();
        this.$el.appendChild(vm.$el);
      },
      on_change_data(data) {
        var vm = this.$c_add_dialog(this, "ChangeData", {data: data});
        vm.$on("update_item", item => {
          this.data._source = item;
        });
      },
      on_delete() {
        this.$confirm("确认删除?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          master_s
            .delete(`data/${this.data._index}/${this.data._id}`)
            .then(data => {
              console.log("then");
              console.log("response data:", data);
              this.$message.success("删除成功");
              this.$emit("delete_data", this.data);
            })
            .catch(error => {
            });
        });
      }
    }
  };
</script>

<style scoped>
</style>
