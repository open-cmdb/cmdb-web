<template>
  <el-dialog :title="`表 ${table.name} 详细信息`" :visible.sync="is_visible" @close="on_close">
    <table style="width: 100%; padding: 15px">
      <tr>
        <td style="color: #909399; width: 13%">表名:</td>
        <td style="color: #606266; width: 37%">{{ table.name }}</td>
        <td style="color: #909399; width: 13%">创建者</td>
        <td style="color: #606266; width: 37%">{{ table.creator_username }}</td>
      </tr>
      <tr>
        <td style="color: #909399">别名:</td>
        <td style="color: #606266">{{ table.alias }}</td>
        <td style="color: #909399">创建时间:</td>
        <td style="color: #606266">{{ table.creation_time }}</td>
      </tr>
      <tr>
        <td style="color: #909399">自述:</td>
        <td style="color: #606266" colspan="3">{{ table.readme }}</td>
      </tr>
    </table>
    <el-table :data="table.fields" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="自述:">
              <span>{{ props.row.readme }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="字段名">
      </el-table-column>
      <el-table-column
        prop="alias"
        label="别名">
      </el-table-column>
      <el-table-column
        label="必须">
        <template slot-scope="scope">
          <span>{{ String(scope.row.required) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="多值">
        <template slot-scope="scope">
          <span>{{ String(scope.row.is_multi) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="类型">
        <template slot-scope="scope">
          <span>{{ TYPE_MAP[scope.row.type] }}</span>
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>
</template>

<script>
  import master from "@/api"
  import master_2 from "@/api"
  import {TYPE_MAP} from "@/utils"
  export default {
    data(){
      return {
        is_visible: true,
        form_data: {},
        fields: [],
        errors: {},
        TYPE_MAP,
      }
    },
    props: ["table"],
    mounted(){
      console.log("table.fields:", this.table.fields)
      master_2.options(`data/${this.table.name}`).then((data)=>{
        this.fields = data.actions.POST
      }).catch((error)=>{
      })
    },
    methods:{
      on_close(){
        this.$el.parentNode.removeChild(this.$el)
        this.$destroy()
      },
      submit(){
        master.put(`data/${this.table_name}/${this.data._id}`, this.form_data).then((response)=>{
          this.$message.success("添加成功")
        }).catch((exc)=>{
          console.log("exc.reponse:", exc.response)
          if(exc.response && exc.response.data){
            if(exc.response.data.detail){
              this.$message.error(exc.response.data.detail)
              return
            }
            this.errors = exc.response.data
            return
          }
          console.log(exc.message)
        })
      }
    }
  }
</script>
