<template>
  <section style="display: flex; flex-flow: column; height: 100%; min-width: 1300px; overflow: auto">
    <header style="height: 80px">
      <c-header></c-header>
    </header>
    <section style="flex: 1; display: flex; flex-flow: row">
      <c-aside style="height: 100%"></c-aside>
      <main style="height: 100%; flex: 1; overflow: auto">
        <div style="margin: 20px">
          <router-view></router-view>
        </div>
      </main>
    </section>
  </section>
</template>

<script>
import CHeader from "./comps/Header";
import CAside from "./comps/Aside";

export default {
  name: "Index",
  components: {
    CHeader,
    CAside
  },
  mounted() {
    // this.process_team();
  },
  methods: {
    process_team() {
      if (!localStorage.getItem("current_user_has_team")) {
        this.$c_master.get("user/user/team-name").then(response => {
          if (response.data.team_name) {
            localStorage.setItem("current_user_has_team", "1");
            return;
          }
          this.$notify({
            title: "警告",
            message:
              "您还不属于任何团队 请前往 工单申请->其它->加入团队 申请加入团队 否者将导致部分工单审批无法正常流转",
            type: "warning",
            duration: 0
          });
        });
      }
    }
  }
};
</script>

<style scoped>
</style>
