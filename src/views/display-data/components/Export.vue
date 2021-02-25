<template>
  <el-dialog
    title="导出数据"
    width="900px"
    :visible.sync="is_visible"
    @close="on_close"
  >
    <div v-loading="loading">
      <el-form
        label-width="120px"
        style="margin-right: 50px"
      >
<!--        <el-form-item label="导出字段:">-->
        <!--          <el-select-->
        <!--            v-model="l_params._field"-->
        <!--            multiple-->
        <!--            placeholder="不指定则导出所有字段"-->
        <!--            style="width: 100%"-->
        <!--          >-->
        <!--            <el-option-->
        <!--              v-for="(value, key, index) in fields"-->
        <!--              :key="index"-->
        <!--              :label="value.label"-->
        <!--              :value="key"-->
        <!--            >-->
        <!--            </el-option>-->
        <!--          </el-select>-->
        <!--        </el-form-item>-->
        <!--        <el-form-item-->
        <!--          label="导出格式:"-->
        <!--          style="width: 100%"-->
        <!--        >-->
        <!--          <el-select-->
        <!--            v-model="l_params._format"-->
        <!--            placeholder="选择导出格式"-->
        <!--            style="width: 100%"-->
        <!--          >-->
        <!--            <el-option-->
        <!--              label="Excel"-->
        <!--              value="xls"-->
        <!--            ></el-option>-->
        <!--            <el-option-->
        <!--              label="CSV"-->
        <!--              value="csv"-->
        <!--            ></el-option>-->
        <!--            <el-option-->
        <!--              label="JSON"-->
        <!--              value="json"-->
        <!--            ></el-option>-->
        <!--            <el-option-->
        <!--              label="HTML"-->
        <!--              value="html"-->
        <!--            ></el-option>-->
        <!--          </el-select>-->
        <!--        </el-form-item>-->
        <el-form-item label="导出数量:">
          <el-input
            v-model="l_params.page_size"
            type="number"
            :placeholder="`单次最多${page_size_max}条`"
            style="width: 100%"
          ></el-input>
        </el-form-item>
        <el-form-item label="导出页码:">
          <el-input
            v-model="l_params.page"
            type="number"
            style="width: 100%"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            v-loading="loading"
            type="primary"
            @click="on_submit"
            style="width: 100%"
          >提&nbsp;&nbsp;交
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-dialog>
</template>

<script>
  import config from "@/config"
  import df_admin from "df-admin"

  export default {
    mixins: [df_admin.mixins.dialog_mixin],
    props: {
      // params: {
      //   type: Object,
      //   default: () => {
      //     return {}
      //   }
      // },
      page_size_max: {
        type: Number,
        default: 10000
      },
      query: {
        type: String,
        required: true
      },
      table_name: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        loading: false,
        l_params: {
          _format: "xlsx",
          page: 1,
          page_size: 100,
          _field: [],
          query: this.query,
          table_name: this.table_name
        },
        metedata: null,
        fields: {},
        url: "search/export-by-lucene"
      };
    },
    mounted() {
      console.log("parent:", this.parent);
    },
    methods: {
      on_submit() {
        if (this.l_params.page_size > this.page_size_max) {
          this.$message.warning(`单次最大支持${this.page_size_max}条`);
          return;
        }
        var params = Object.assign({}, this.params, this.l_params);
        var params_str = this.params_serializer(params);
        window.open(`${config.base_url}${this.url}?${params_str}`, (name = "_blank"));
        this.is_visible = false;
      },
      get_metedata() {
        if (this.metedata) {
          return;
        }
        this.loading = true;
        this.$c_master
          .options(`${this.$c_master.defaults.baseURL}${this.url}`)
          .then(response => {
            this.loading = false;
            this.metedata = response.data;
            this.fields = response.data.actions.GET;
          })
          .catch(error => {
            this.loading = false;
            this.$message.error("获取元数据失败 请稍后再试");
          });
      },
      params_serializer(params) {
        var param_list = []
        for (let k in params) {
          if (params[k] === "" || params[k] === null || params[k] == undefined) {
            continue
          }
          if (params[k] instanceof Array) {
            for (let v of params[k]) {
              param_list.push(`${k}=${v}`)
            }
            continue
          }
          if (params[k] instanceof Date) {
            var date = params[k]
            param_list.push(`${k}=${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}T${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`)
            continue
          }
          param_list.push(`${k}=${params[k]}`)
        }
        return param_list.join("&")
      }
    }
  };
</script>
