<template>
  <div>
    <c-option-bar>
      <el-button size="medium" type="primary" @click="on_add" icon="el-icon-plus">添加</el-button>
      <c-search placeholder="表明/别名/创建人" :parent="this"></c-search>
    </c-option-bar>
    <el-table :data="data" border stripe size="medium" @filter-change="on_change_filter" @sort-change="on_change_sort" v-loading="loading" style="width: 100%">
      <el-table-column label="表名" prop="name" :show-overflow-tooltip="true">>
      </el-table-column>
      <el-table-column label="别名" prop="alias" :show-overflow-tooltip="true">>
      </el-table-column>
<!--      <el-table-column label="宽度" prop="width" :show-overflow-tooltip="true">>-->
<!--      </el-table-column>-->
      <el-table-column label="自述" prop="readme" :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column label="创建人" prop="creator_username" :show-overflow-tooltip="true">>
      </el-table-column>
      <el-table-column label="创建时间" prop="creation_time" :show-overflow-tooltip="true">>
      </el-table-column>
      <el-table-column label="操作" width="270">
        <template slot-scope="scope">
          <el-button size="mini" type="info" style="margin: 0px 1px" @click="on_show_detail(scope.row)">详情</el-button>
          <el-button size="mini" type="primary" style="margin: 0px 1px" @click="g_add_dialog('LTableMgmtUpload', {item: scope.row})">导入</el-button>
          <el-button size="mini" type="warning" style="margin: 0px 1px" @click="on_change(scope.row)">修改</el-button>
          <el-button size="mini" type="danger" style="margin: 0px 1px" @click="on_delete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin: 16px; height: 50px">
      <el-pagination style="float: right" v-loading="page_loading" element-loading-spinner="el-icon-loading" @current-change="get_data(false, false)" :current-page.sync="params.page" :page-size="params.page_size" background layout="total, prev, pager, next" :total="count">
      </el-pagination>
    </div>
  </div>

</template>

<script>
import master from "@/api";
import Vue from "vue";
import calc from "@/utils/calc";
import axios from "axios";
import { baseURL } from "@/api";
import maps from "@/utils/maps";
import COptionBar from "@/components/OptionBar";
export default {
  data() {
    return {
      url: "mgmt/table",
      data: [],
      count: 0,
      loading: false,
      page_loading: false,
      maps: maps,
      params: {
        page_size: 10,
        page: 1,
        search: ""
      },
      show_more: false
    };
  },
  mounted() {
    this.params.page_size = this.$c_calc_page_size();
    this.get_data();
  },
  methods: {
    get_data(reset_page = false, get_count = false) {
      if (reset_page) {
        this.params.page = 1;
      }
      this.$c_ajax_get(this, get_count);
    },
    on_change_sort(args) {
      console.log(args);
      if (args.order == null) {
        this.params.ordering = "";
      } else if (args.order == "descending") {
        this.params.ordering = "-" + args.prop;
      } else {
        this.params.ordering = args.prop;
      }
      this.get_data(true);
    },
    on_change_filter(filters) {
      for (let i in filters) {
        this.params[i] = filters[i];
      }
      this.page = 1;
      this.get_data();
    },
    on_show_detail(item) {
      this.$c_add_dialog(this, "ShowTable", { table: item });
    },
    on_add() {
      var vm = this.$c_add_dialog(this, "ChangeTable", {
        is_create: true
      });
      vm.$on("add_table", item => {
        this.data.unshift(item);
      });
    },
    on_change(table) {
      var vm = this.$c_add_dialog(this, "ChangeTable", {
        is_create: false,
        data: table
      });
      // vm.$on("update_item", (item) => {
      //   this.data.slice(this.data.indexOf(table), 1, item);
      // });
    },
    on_delete(item) {
      var vm = this.$c_add_dialog(this, "DeleteTable", { data: item });
      vm.$on("delete_item", item => {
        this.data.splice(this.data.indexOf(item), 1);
      });
    },
    on_reminder(item) {
      this.$c_master
        .post(`${this.url}/${item.id}/reminder`)
        .then(response => {
          this.$message.success("催单成功");
        })
        .catch(error => {});
    },
    on_confirm(item) {
      this.$c_master
        .post(`${this.url}/${item.id}/confirm`)
        .then(response => {
          this.$message.success("确认成功");
          this.data.splice(this.data.indexOf(item), 1, response.data);
        })
        .catch(error => {});
    },
    on_show_more() {
      this.show_more = true;
      setTimeout(() => {
        this.show_more = false;
      }, 5000);
    },
    on_come_again(item) {
      var vm = this.$c_add_dialog(this, "CCreateUpdateWorkOrder", {
        workorder: item
      });
      vm.$on("add_item", item => {
        this.data.unshift(item);
      });
    }
  }
};
</script>


<style scoped>
.c-option-bar >>> .el-input-group__append {
  border-left: 0;
  background-color: #62a5f3 !important;
  color: #ffffff !important;
}
</style>
