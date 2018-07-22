<template>
  <div style="background-color: #62A5F3; padding: 0px 20px; display: flex; align-items: center; justify-content: space-between; height: 80px">
    <div>
      <img src="@/assets/logo.png" style="height: 100%; display: inline-block; box-sizing: border-box; vertical-align: middle;" />
      <span style="margin-left: 6px; font-family: Montserrat-Regular; letter-spacing:2px; font-weight: 500; color: #FFFFFF; font-size: 26px; height: 100%; display: inline-block; box-sizing: border-box; vertical-align: middle;">CMDB</span>
    </div>
    <div>
      <ul class="c_ul">
        <li class="c_li" @click="on_open_api_docs">
          <i class="fa fa-file-text" aria-hidden="true" style="margin-right: 5px"></i>API文档</li>
        <li class="c_li" @click="on_help">
          <i class="fa fa-question-circle" aria-hidden="true" style="margin-right: 5px"></i>帮助</li>
        <li class="c_li" @click="is_dialog_spit_slot = true">
          <i class="fa fa-comment" aria-hidden="true" style="margin-right: 5px"></i>我要吐槽</li>
        <li class="c_li" @click="is_dialog_about = true">
          <i class="fa fa-info-circle" aria-hidden="true" style="margin-right: 5px"></i>关于</li>
        <li class="c_li">
          <el-dropdown style="">
            <span class="el-dropdown-link" style="font-size: 16px; color: #FFF">
              <i class="fa fa-user-circle-o" style="margin-right: 5px"></i>{{ user_info.name ? user_info.name: "未登录" }}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item :disabled="user_info.username==undefined?true:false">
                <span @click="is_dialog_token=true">
                  <i class="fa fa-key" aria-hidden="true"></i>Token</span>
              </el-dropdown-item>
              <el-dropdown-item v-if="user_info.username">
                <span style="width: 100%" @click="on_logout">
                  <i class="fa fa-sign-out" aria-hidden="true"></i>退出</span>
              </el-dropdown-item>
              <el-dropdown-item v-else>
                <span style="width: 100%" @click="on_login">
                  <i class="fa fa-sign-in" aria-hidden="true"></i>登录</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </li>
      </ul>
    </div>
    <el-dialog title="查看API Token" :visible.sync="is_dialog_token" width="600px">
      <el-alert title="请妥善保存您的API Token" :closable="false" type="warning">
      </el-alert>
      <div style="padding: 0px 20px; padding-top: 20px">
        <span>{{ token }}</span>
        <i style="float: right; line-height: 24px" class="fa fa-eye fa-lg" aria-hidden="true" @click="get_token"></i>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="is_dialog_token = false">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="我要吐槽" :visible.sync="is_dialog_spit_slot" width="30%">
      <span>钉钉搜索 tangmingming 对 就是最帅的那个 😝😝</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="is_dialog_spit_slot = false">知道了</el-button>
      </span>
    </el-dialog>

    <el-dialog title="关于" :visible.sync="is_dialog_about" width="30%">
      <span>哈罗单车 | Defensor</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="is_dialog_about = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import sso from "@/utils/sso";
import app from "@/main";
export default {
  name: "Header",
  data() {
    return {
      user_info: {},
      is_dialog_token: false,
      is_dialog_spit_slot: false,
      is_dialog_about: false,
      token: "***********************************************************"
    };
  },
  mounted() {
    // this.get_data()
    this.user_info = this.$store.state.user_info;
  },
  methods: {
    get_data() {
      this.$c_master
        .get("user/user/info")
        .then(response => {
          this.user_info = response.data;
          this.$store.state.user_info = response.data;
        })
        .catch(error => {});
    },
    get_token() {
      this.$c_master
        .get("user/user/token")
        .then(response => {
          this.token = response.data.token;
        })
        .catch(error => {});
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
          this.$c_master.post("user/user/logout").then(response => {
            this.user_info = {};
            this.$store.state.user_info = {};
            sso.login();
          });
        });
    },
    on_login() {
      sso.login();
    },
    on_open_api_docs() {
      const api_url =
        window.location.protocol + "//" + window.location.host + "/api-docs";
      window.open(api_url);
    },
    on_help() {
      const api_url =
        "http://wiki.cheyaoshicorp.com/pages/viewpage.action?pageId=33959573";
      window.open(api_url);
    }
  }
};
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
