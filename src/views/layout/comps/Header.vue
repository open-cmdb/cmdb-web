<template>
  <el-menu background-color="#409EFF"
           text-color="#fff"
           active-text-color="#ffd04b" mode="horizontal" :default-active="$route.name"
           @select="(key, path)=>this.$router.push({ name: key })">
        <span
          style="float: left; margin-right: 60px; line-height: 60px; margin-left: 50px; font-family: Montserrat-Regular; letter-spacing:2px; font-weight: 800; color: #FFFFFF; font-size: 36px; height: 100%; display: inline-block; box-sizing: border-box; vertical-align: middle;">ForceCMDB
        </span>
    <c-menu-item v-for="(item, index) in $store.state.filtered_menu" :key="index" :item="item">
    </c-menu-item>
    <div style="display: flex; height: 60px; align-items: center; justify-content: flex-end">
      <ul class="c_ul">
        <li class="c_li" @click="on_open_api_docs">
          <i class="fa fa-file-text" aria-hidden="true" style="margin-right: 5px"></i>API文档
        </li>
        <li class="c_li" @click="open_url('https://zhuanlan.zhihu.com/p/34191320')">
          <i class="fa fa-question-circle" aria-hidden="true" style="margin-right: 5px"></i>帮助
        </li>
        <li class="c_li" @click="open_url('https://github.com/open-cmdb/cmdb')">
          <i class="fa fa-code" aria-hidden="true" style="margin-right: 5px"></i>源代码
        </li>
        <li class="c_li" @click="open_url('https://github.com/open-cmdb/cmdb/issues')">
          <i class="fa fa-comment" aria-hidden="true" style="margin-right: 5px"></i>我要吐槽
        </li>
        <li class="c_li">
          <el-dropdown style="">
            <span class="el-dropdown-link" style="font-size: 16px; color: #FFF">
              <i class="fa fa-user-circle-o" style="margin-right: 5px"></i>{{ user_info.name ? user_info.name: "未登录" }}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <!-- <el-dropdown-item :disabled="user_info.username==undefined?true:false">
                <span @click="is_dialog_token=true">
                  <i class="fa fa-key" aria-hidden="true"></i>Token</span>
              </el-dropdown-item> -->
              <el-dropdown-item>
                <span style="width: 100%" @click="$df_add_dialog('LLayoutResetPwd')">
                  <i class="fa fa-key" aria-hidden="true"></i>修改密码</span>
              </el-dropdown-item>
              <el-dropdown-item v-if="user_info.username">
                <span style="width: 100%" @click="on_logout">
                  <i class="fa fa-sign-out" aria-hidden="true"></i>退 出</span>
              </el-dropdown-item>
              <el-dropdown-item v-else>
                <span style="width: 100%" @click="on_login">
                  <i class="fa fa-sign-in" aria-hidden="true"></i>登 录</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </li>
      </ul>
    </div>
  </el-menu>
</template>

<script>
  import sso from "@/utils/sso";
  import app from "@/main";
  import CMenuItem from "../../display-data/components/MenuItem";

  export default {
    components: {
      CMenuItem
    },
    data() {
      return {
        user_info: this.$store.state.user_info
      }
    },
    methods: {
      on_open_api_docs() {
        const api_url =
          window.location.protocol + "//" + window.location.host + "/api-docs";
        window.open(api_url);
      },
      on_logout() {
        app
          .$confirm("确认退出", "退出", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "info",
            center: true
          })
          .then(() => {
            this.$store.commit("logout");
            this.$router.push("login");
            // this.$c_master.post("user/user/logout").then(response => {
            //   this.user_info = {};
            //   this.$store.state.user_info = {};
            //   sso.login();
            // });
          });
      }
    }
  }
</script>


<style scoped>
  .c_ul {
    white-space: nowrap;
    color: #ffffff;
    font-size: 14px;
  }

  .c_li {
    display: inline-block;
    padding: 0px 14px;
    cursor: pointer;
  }
</style>
