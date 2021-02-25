<template>
  <div style="height: 100%; flex: 1; display: flex; flex-flow: row">
    <l-display-data-list-indices
      @change_table="on_change_table"></l-display-data-list-indices>
    <div style="height: 100%; flex: 1; padding: 20px; overflow: auto">
      <div>
        <el-autocomplete id="search_input" ref="search_input" :autofocus="is_focus" :trigger-on-focus="false"
                         :suffix-icon="search_input_icon" @focus="on_focus" :fetch-suggestions="history_filter"
                         select-when-unmatched @keyup.enter.native="on_search()"
                         placeholder="示例：(hostname:huawei* AND price:[20000 TO 40000]) 更多请参阅Lucene语法" v-model="query"
                         style="width: 100%">
          <el-button id="submit" @click="on_search()" slot="append" icon="el-icon-search"
                     :loading="loading"></el-button>
        </el-autocomplete>
      </div>
      <!--      <div style="border: 1px #DCDFE6 solid; margin: 10px 0px; width: 100%; overflow-x: auto" v-loading="loading">-->
      <!--        <data-item v-for="item in data" :data="item" :key="item._id" v-on:delete_data="delete_data"></data-item>-->
      <!--      </div>-->
      <el-table
        :data="data"
        v-loading="loading"
        size="small"
        border
        stripe
        :show-overflow-tooltip="true"
        style="width: 100%; margin: 20px 0px">
        <el-table-column v-for="field in table.fields"
                         show-overflow-tooltip
                         :key="field.name"
                         :prop="field.name"
                         :label="field.name"
                         :min-width="field.width">
          <template slot-scope="scope">
            <span>{{scope.row._source[field.name]}}</span>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="Operations"
          width="200">
          <template slot-scope="scope">
            <el-button @click="$df_add_dialog('LDisplayDataDataDetail', {data: scope.row, source: scope.row._source})"
                       type="text" size="small">Detail
            </el-button>
            <el-button @click="on_change_item(scope.row)" type="text" size="small">
              Edit
            </el-button>
            <el-button
              @click="$df_add_dialog('LDisplayDataHistoricalRecord', {data_index: scope.row._index, data_id: scope.row._id })"
              type="text" size="small">History
            </el-button>
            <el-button @click="on_delete(scope.row)" type="text" size="small">
              Delete
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination style="float: right; margin-right: 100px;" background layout="total, prev, pager, next"
                     :page-size="page_size" :total="total_num" :current-page.sync="current_page"
                     @current-change="on_page_change">
      </el-pagination>
    </div>
    <div
      id="dg"
      style="z-index: 9999; position: fixed"
      v-bind:style="{right: add_location.right+'px', top: add_location.top+'px'}"
    >
      <div>
        <el-button
          @click="on_add_data(table)"
          icon="el-icon-plus"
          circle
          type="primary"
        >
        </el-button>
      </div>
      <div style="margin-top: 10px">
        <el-button
          @click="$df_add_dialog('LDisplayDataImport', {item: table})"
          icon="el-icon-upload2"
          circle
          type="success"
        >
        </el-button>
      </div>
      <div style="margin-top: 10px">
        <el-button
          @click="$df_add_dialog('LDisplayDataExport', {query: query, table_name: table.name})"
          icon="el-icon-download"
          circle
          type="info"
        >
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from "vue";
  import DataItem from "./components/DataItem.vue";
  import master from "@/api";
  import axios from "axios";


  export default {
    name: "DisplayData",
    components: {
      DataItem
    },
    data: () => {
      return {
        data: [],
        query: "",
        loading: false,
        current_query: "*",
        indices: [],
        active_name: "",
        current_indices: [],
        page: 1,
        page_size: 0,
        last_source: null,
        search_input_icon: "el-icon-edit",
        page_num: 0,
        current_page: 1,
        total_num: 0,
        all_history: {},
        username: "",
        history: [],
        is_focus: true,
        table_dict: {},
        table: {
          fields: []
        },
        add_location: {
          right: 60,
          top: window.innerHeight - 200
        },
      };
    },
    mounted() {
      var self = this;
      document.onkeydown = function (e) {
        var keyNum = window.event ? e.keyCode : e.which;
        if (73 == e.keyCode && e.ctrlKey) {
          self.$refs.search_input.focus();
        } else if (78 == e.keyCode && e.ctrlKey) {
          if (self.current_page * self.page_size >= self.total_num) {
            self.$message.warning("已在末页");
            return;
          }
          self.current_page += 1;
          self.on_page_change(self.current_page);
        } else if (80 == e.keyCode && e.ctrlKey) {
          if (self.current_page == 1) {
            self.$message.warning("已在首页");
            return;
          }
          self.current_page -= 1;
          self.on_page_change(self.current_page);
        }
      };
      var page_size = Math.floor((window.innerHeight - 260) / 48);
      this.page_size = page_size > 8 ? page_size : 8;
      this.get_history();
      // master
      //   .get("mgmt/table", {params: {page_size: 100, has_read_perms: true}})
      //   .then(response => {
      //     this.tables = response.data.results;
      //   })
      //   .catch(error => {
      //   });
      this.search_data([], "*", 1, this.page_size);
    },
    destroyed() {
      this.save_history();
    },
    methods: {
      on_change_item(item) {
        debugger
        var vm = this.$df_add_dialog('LDisplayDataChangeData', {data: item, table_name: this.table.name})
        // vm.$on("update_item", new_item => {
        //   this.data.splice(this.data.indexOf(item), 1, new_item)
        // })

        vm.$on("update_item", id => {
          this.$c_master
            .get(`data/${this.table.name}/${item._id}`)
            .then(response => {
              this.data.splice(this.data.indexOf(item), 1, response.data)
            })
            .catch(error => {
            });
        });

        vm.$on("add_item", id => {
          this.$c_master
            .get(`data/${this.table.name}/${id}`)
            .then(response => {
              this.data.unshift(response.data);
            })
            .catch(error => {
            });
        });
      },
      on_change_table(table_name) {
        this.indices = [table_name];
        this.get_table();
        this.on_search()
      },
      get_table() {
        var url = `mgmt/tables/${this.indices[0]}`
        this.$c_master.get(url).then(response => {
          this.table = response.data
        })
      },
      on_focus(event) {
        console.log("on_focus");
        event.currentTarget.select();
      },
      history_filter(query_string, cb) {
        console.log("query_string:", query_string);
        var values = query_string
          ? this.history.filter(this.filter_function(query_string))
          : this.history;
        var results = [];
        values.map(value => {
          results.push({value});
        });
        console.log("results:", results);
        cb(results);
      },
      filter_function(query_string) {
        return value => {
          return value.toLowerCase().indexOf(query_string.toLowerCase()) != -1;
        };
      },
      get_history() {
        var all_history = JSON.parse(localStorage.getItem("history"));
        if (all_history) {
          var username = this.$store.state.username;
          if (!username) {
            return;
          }
          this.username = username;
          this.all_history = all_history;
          this.history = all_history[username] ? all_history[username] : [];
        }
      },
      save_history() {
        this.all_history[this.username] = this.history.splice(0, 100);
        localStorage.setItem("history", JSON.stringify(this.all_history));
      },
      add_data(table) {
        console.log("table:", table);
      },
      search_data(
        indices,
        query,
        page,
        page_size,
        reset_page = false,
        succeeded_callback = null
      ) {
        if (this.last_source) {
          // this.last_source.cancel()
        }
        var source = axios.CancelToken.source();
        this.last_source = source;
        var self = this;
        this.search_input_icon = "el-icon-loading";
        this.loading = true;
        master
          .post("search/data-lucene", {indices, query, page, page_size, width: true})
          .then(response => {
            this.loading = false;
            self.data = response.data["hits"];
            this.total_num = response.data["total"];
            this.search_input_icon = "el-icon-edit";
            this.page_num = Math.ceil(response.data.total / this.page_size);
            if (reset_page) {
              this.current_page = 1;
            }
            if (succeeded_callback) {
              succeeded_callback();
            }
          })
          .catch(error => {
            this.loading = false;
            this.search_input_icon = "el-icon-edit";
          });
      },
      on_search() {
        const succeeded_callback = () => {
          this.current_query = this.query;
          this.current_indices = this.indices;
        };
        if (
          this.current_query == this.query &&
          this.current_indices == this.indices
        ) {
          this.$message.warning("重复搜索");
          return;
        }
        if (this.query == "") {
          this.query = "*";
        }
        this.is_focus = false;
        if (!this.history.includes(this.query)) {
          this.history.unshift(this.query);
        }
        this.page = 1;
        this.search_data(
          this.indices,
          this.query,
          1,
          this.page_size,
          true,
          succeeded_callback
        );
        document.getElementById("submit").focus();
      },
      on_page_change(val) {
        console.log("val:", val);
        this.current_page = val;
        this.search_data(
          this.current_indices,
          this.current_query,
          val,
          this.page_size
        );
      },
      delete_data(data) {
        this.data.splice(this.data.indexOf(data), 1);
        this.total_num -= 1;
      },
      on_delete(item) {
        this.$confirm("确认删除?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.$c_master
            .delete(`data/${item._index}/${item._id}`)
            .then(data => {
              console.log("then");
              console.log("response data:", data);
              this.$message.success("删除成功");
              // this.$emit("delete_data", this.data);
              this.data.splice(this.data.indexOf(item), 1)
            })
            .catch(error => {
            });
        });
      },
      on_add_data(table) {
        // var AddData = Vue.component("AddData");
        // var vm = new AddData({ propsData: { table_name: table.name } });
        // vm.$mount();
        // this.$el.appendChild(vm.$el);
        var vm = this.$c_add_dialog(this, "AddData", {table_name: table.name});
        vm.$on("add_item", id => {
          this.$c_master
            .get(`data/${table.name}/${id}`)
            .then(response => {
              this.data.unshift(response.data);
            })
            .catch(error => {
            });
        });
      },
      on_show_info(table) {
        var ShowTable = Vue.component("ShowTable");
        var vm = new ShowTable({propsData: {table}});
        vm.$mount();
        this.$el.appendChild(vm.$el);
      }
    }
  };
</script>
