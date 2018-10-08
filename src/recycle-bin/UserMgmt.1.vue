<template>
  <div style="width: 1200px; margin: 0px auto;">
    <div id="dg" style="z-index: 9999; position: fixed;" v-bind:style="{right: add_location.right+'px', top: add_location.top+'px'}">
      <el-button round @click="on_add_user">
        <span style="font-size:50px">+</span>
      </el-button>
    </div>
    <div>
      <el-input style="width: 240px" v-model="search"></el-input>
      <el-button type="primary" @click="on_search">搜索</el-button>
    </div>
    <el-table :data="users" style="width: 100%">
      <el-table-column type="index" width="50">
      </el-table-column>
      <el-table-column label="用户名" prop="username">
      </el-table-column>
      <el-table-column label="管理员">
        <template slot-scope="scope">
          <span>{{ scope.row.is_staff?'是':'否' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="邮箱" prop="email">
      </el-table-column>
      <el-table-column label="添加时间" prop="date_joined">
      </el-table-column>
      <el-table-column label="最后登录时间" prop="last_login">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="warning" style="padding: 4px" @click="on_change(scope.row)">修改</el-button>
          <el-button size="mini" type="danger" style="padding: 4px" @click="on_delete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination style="float: right" background @current-change="on_current_change" :current-page.sync="current_page" :page-size="page_size" layout="total, prev, pager, next" :total="total">
    </el-pagination>
  </div>
</template>

<script>
import Vue from "vue";
import master from "@/api";
import { master_s } from "@/api";

export default {
  name: "user-mgmt",
  data() {
    return {
      users: [],
      add_location: {
        right:
          (window.innerWidth - 1200) / 2 > 20
            ? Math.round((window.innerWidth - 1200) / 2)
            : 20,
        top: window.innerHeight - 140
      },
      page_size: 10,
      total: 0,
      current_page: 1,
      search: null
    };
  },
  mounted() {
    // master.get("mgmt/user").then((response) => {
    //   this.users = response.data.results
    // }).catch((error)=>{
    // })
    this.get_data();
  },
  methods: {
    on_change(item) {
      var Comp = Vue.component("ChangeUser");
      var vm = new Comp({ propsData: { is_create: false, data: item } });
      vm.$mount();
      this.$el.appendChild(vm.$el);
    },
    on_delete(item) {
      this.$confirm("确认删除用户?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        master_s
          .delete(`mgmt/user/${item.id}`)
          .then(response => {
            this.$message.success("删除成功");
            this.users.splice(this.users.indexOf(item), 1);
          })
          .catch(error => {});
      });
    },
    on_add_user() {
      var Comp = Vue.component("ChangeUser");
      var vm = new Comp({ propsData: { is_create: true, data: null } });
      vm.$mount();
      this.$el.appendChild(vm.$el);
    },
    get_data(search = null) {
      var params = { page_size: this.page_size, page: this.current_page };
      if (search != null) {
        params["search"] = search;
      }
      console.log("params:", params);
      master_s
        .get("mgmt/user", { params })
        .then(response => {
          this.users = response.data.results;
          this.total = response.data.count;
          if (search) {
            this.current_page = 1;
          }
        })
        .catch(error => {});
    },
    on_current_change(current_page) {
      this.current_page = current_page;
      this.get_data();
    },
    on_search() {
      this.get_data(this.search);
    }
  }
};
</script>

<style scoped>
</style>
