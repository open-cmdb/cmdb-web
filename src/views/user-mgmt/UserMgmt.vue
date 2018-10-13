<template>
  <div>
    <c-option-bar>
      <el-button size="medium" type="primary" @click="add_dialog('AppUserMgmtCreateUpdate', {p_type: 'create'})" icon="el-icon-plus">添加</el-button>
      <c-search placeholder="ID/用户名/姓名" :parent="this"></c-search>
    </c-option-bar>
    <el-table :data="data" border stripe size="medium" @filter-change="on_change_filter" @sort-change="on_change_sort" v-loading="loading" style="width: 100%">
      <el-table-column label="ID" prop="id" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="用户名" prop="username" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="姓名" prop="name" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="管理员" prop="is_staff" :formatter="(row)=>String(row.is_staff)" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="激活" prop="is_active" :formatter="(row)=>String(row.is_active)" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="邮箱" prop="email" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="添加时间" prop="date_joined_format" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="最后登录时间" prop="last_login_format" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="操作" width="230">
        <template slot-scope="scope">
          <el-button size="mini" type="warning" @click="add_dialog('AppUserMgmtCreateUpdate', {p_type: 'update', p_item: scope.row})">修改</el-button>
          <el-button size="mini" type="primary" :loading="scope.row.__loading" @click="add_dialog('AppUserMgmtResetPassword', {p_type: 'action', p_item: scope.row})" style="margin-left: 2px">重置密码</el-button>
          <el-button size="mini" type="danger" :loading="scope.row.__loading_delete" @click="on_delete(scope.row)" style="margin-left: 2px">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="height: 80px">
      <el-pagination @current-change="get_data" :current-page.sync="params.page" :page-size="params.page_size" style="float: right; margin-right: 100px; margin-top: 20px" background layout="total, prev, pager, next" :total="count">
      </el-pagination>
    </div>

  </div>

</template>

<script>
import Vue from "vue";
import master from "@/api";
import { master_s } from "@/api";
import { list_mixin } from "@/utils/mixins";

export default {
  mixins: [list_mixin],
  data() {
    return {
      url: "mgmt/user",
      datetime_fields: ["date_joined", "last_login"]
    };
  },
  mounted() {
    this.get_data();
  },
  methods: {
    // on_change(item) {
    //   var Comp = Vue.component("ChangeUser");
    //   var vm = new Comp({ propsData: { is_create: false, data: item } });
    //   vm.$mount();
    //   this.$el.appendChild(vm.$el);
    // },
    // on_delete(item) {
    //   this.$confirm("确认删除用户?", "提示", {
    //     confirmButtonText: "确定",
    //     cancelButtonText: "取消",
    //     type: "warning"
    //   }).then(() => {
    //     master_s
    //       .delete(`mgmt/user/${item.id}`)
    //       .then(response => {
    //         this.$message.success("删除成功");
    //         this.users.splice(this.users.indexOf(item), 1);
    //       })
    //       .catch(error => {});
    //   });
    // },
    // on_add_user() {
    //   var Comp = Vue.component("ChangeUser");
    //   var vm = new Comp({ propsData: { is_create: true, data: null } });
    //   vm.$mount();
    //   this.$el.appendChild(vm.$el);
    // },
    // get_data(search = null) {
    //   var params = { page_size: this.page_size, page: this.current_page };
    //   if (search != null) {
    //     params["search"] = search;
    //   }
    //   console.log("params:", params);
    //   master_s
    //     .get("mgmt/user", { params })
    //     .then(response => {
    //       this.users = response.data.results;
    //       this.total = response.data.count;
    //       if (search) {
    //         this.current_page = 1;
    //       }
    //     })
    //     .catch(error => {});
    // },
    // on_search() {
    //   this.get_data(this.search);
    // }
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
