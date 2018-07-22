<template>
  <el-dialog :title="`${iccid} 流量情况`" width="900px" :visible.sync="is_visible" @close="on_close" style="padding: 0px">
    <el-radio-group v-model="flow_type" size="medium">
      <el-radio-button label="simmonthflow">月流量</el-radio-button>
      <el-radio-button label="simdayflow">日流量</el-radio-button>
    </el-radio-group>
    <c-month-flow v-if="flow_type=='simmonthflow'" :iccid="iccid"></c-month-flow>
    <c-day-flow v-else :iccid="iccid"></c-day-flow>
  </el-dialog>
</template>

<script>
  import CDayFlow from "@/components/flow/DayFlow"
  import CMonthFlow from "@/components/flow/MonthFlow"
  export default {
    props: ["iccid"],
    data(){
      return {
        is_visible: true,
        activeName: "month-flow",
        flow_type: "simmonthflow"
      }
    },
    components: {
      CDayFlow,
      CMonthFlow
    },
    methods:{
      on_close(){
        this.$el.parentNode.removeChild(this.$el)
        this.$destroy()
      }
    }
  }
</script>
