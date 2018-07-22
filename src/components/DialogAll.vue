<template>
  <el-dialog :title="`${iccid} 详细信息`" :visible.sync="is_visible" @close="on_close">
    <table border="0" style="width: 100%;">
      <tr>
        <td style="color: #99a9bf; text-align: right">iccid:</td>
        <td>{{ data.sim.iccid }}</td>
        <td style="color: #99a9bf; text-align: right">sim卡号:</td>
        <td>{{ data.sim.id }}</td>
      </tr>
      <tr>
        <td style="color: #99a9bf; text-align: right">IMSI:</td>
        <td>{{ data.sim.imsi }}</td>
        <td style="color: #99a9bf; text-align: right">企业ID:</td>
        <td>{{ data.sim.companyid }}</td>
      </tr>
      <tr>
        <td style="color: #99a9bf; text-align: right">物联卡状态:</td>
        <td>{{ STATUS_MAP[data.sim.user_status] }}</td>
        <td style="color: #99a9bf; text-align: right">工作状态:</td>
        <td>{{ STATUS_MAP[data.sim.work_status] }}</td>
      </tr>
      <tr>
        <td style="color: #99a9bf; text-align: right">开户日期:</td>
        <td>{{ data.sim.account_date | c_datetime }}</td>
        <td style="color: #99a9bf; text-align: right">激活日期:</td>
        <td>{{ data.sim.activate_date | c_datetime }}</td>
      </tr>
      <tr>
        <td style="color: #99a9bf; text-align: right">所属机构:</td>
        <td>{{ OPERATOR_MAP[data.sim.operator] }}</td>
        <td style="color: #99a9bf; text-align: right">ec账号:</td>
        <td>{{ data.sim.ec_account }}</td>
      </tr>
      <tr>
        <td style="color: #99a9bf; text-align: right">是否签约短信服务:</td>
        <td>{{ data.sim.sms_status }}</td>
        <td style="color: #99a9bf; text-align: right">是否签约GPRS服务:</td>
        <td>{{ data.sim.gprs_status }}</td>
      </tr>
      <tr>
        <td style="color: #99a9bf; text-align: right">创建时间:</td>
        <td>{{ data.sim.create_date | c_datetime }}</td>
        <td style="color: #99a9bf; text-align: right">更新时间:</td>
        <td>{{ data.sim.update_date | c_datetime }}</td>
      </tr>
      <!--<tr>-->
        <!--<td style="color: #99a9bf; text-align: right">前天流量:</td>-->
        <!--<td>{{ data.flow.gprs }} KB</td>-->
        <!--<td style="color: #99a9bf; text-align: right">前天短信:</td>-->
        <!--<td>{{ data.flow.sms }}</td>-->
      <!--</tr>-->
      <!--<tr>-->
        <!--<td style="color: #99a9bf; text-align: right">关联单车数:</td>-->
        <!--<td>{{ this.data.bike.length }}</td>-->
        <!--<td style="color: #99a9bf; text-align: right"></td>-->
        <!--<td></td>-->
      <!--</tr>-->
    </table>
  </el-dialog>
</template>

<script>
  import master from "@/api"
  import maps from "@/public/maps"
  import axios from "axios"
  import date from "@/utils/date"
  export default {
    data(){
      return {
        loading: false,
        is_visible: true,
        table_data: [],
        STATUS_MAP: maps.STATUS_MAP,
        OPERATOR_MAP: maps.OPERATOR_MAP,
        data: {
          sim: {},
          flow: {},
          bike: []
        }
      }
    },
    props: ["iccid"],
    mounted(){
      this.get_data()
    },
    methods:{
      on_close(){
        this.$el.parentNode.removeChild(this.$el)
        this.$destroy()
      },
      get_data(){
        this.get_sim_data()
        // this.get_flow_data()
        // this.get_bike_data()
        // master.all([this.get_sim_data(), this.get_flow_data(), this.get_bike_data()]).then(master.spread((sim, flow, bike)=>{
        //   this.loading = false
        //   this.data.sim = sim.data
        //   if(flow.data.results.length>=1){
        //     this.data.flow = flow.data.results[0]
        //   }
        //   this.data.bike = bike.data.results
        // })).catch((error)=>{
        //   this.loading = false
        // })
      },
      get_sim_data(){
        return master.get(`sim/${this.iccid}`).then((response)=>{
          this.data.sim = response.data
        }).catch((error)=>{
        })
      },
      get_flow_data(){
        return master(`simdayflow?sim=${this.iccid}&page_size=1&update_date__gt=${date.date_to_string(date.get_day_start(1))}&update_date__lt=${date.date_to_string(date.get_day_end(1))}`).then((response)=>{
          if(response.data.results.length>=1){
            this.data.flow = response.data.results[0]
          }
        }).catch((error)=>{
        })
      },
      get_bike_data(){
        return master.get(`bikeinfo?bike_sim=${this.iccid}`).then((response)=>{
          if(response.data.results.length>=1){
            this.data.bike = response.data.results
          }
        }).catch((error)=>{
        })
      },
      on_show_bike(){
        var Comp = Vue.component("DialogBike")
        var vm = new Comp({propsData: {iccid: this.iccid}})
        vm.$mount()
        this.$el.appendChild(vm.$el)
      },
    }
  }
</script>
