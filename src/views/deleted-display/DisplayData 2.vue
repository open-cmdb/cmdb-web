<template>
  <div>
    <div>
      <el-autocomplete id="search_input" ref="search_input" :autofocus="is_focus" :trigger-on-focus="false" :suffix-icon="search_input_icon" @focus="on_focus" :fetch-suggestions="history_filter" select-when-unmatched @keyup.enter.native="on_search()" placeholder="示例：(hostname:huawei* AND price:[20000 TO 40000]) 更多请参阅Lucene语法" v-model="query" style="width: 100%" class="demo-autocomplete">
        <el-select v-model="indices" style="width: 250px" slot="prepend" multiple filterable default-first-option placeholder="选择表 默认：all">
          <el-option style="padding: 10px; display: flex; align-items: center; justify-content: space-between" v-for="item in tables" :key="item.id" :label="item.name" :value="item.name">
            <span>{{ item.name }}</span>
            <div>
              <el-button style="padding: 0px" icon="el-icon-circle-plus" @click.stop="on_add_data(item)"></el-button>
              <el-button style="padding: 0px" icon="el-icon-info" @click.stop="on_show_info(item)"></el-button>
            </div>
          </el-option>
        </el-select>
        <el-button id="submit" @click="on_search()" slot="append" :loading="loading" icon="el-icon-search"></el-button>
      </el-autocomplete>
    </div>
    <!-- <div style="border: 1px #DCDFE6 solid; margin: 10px 0px" v-loading="loading"> -->
    <div style="border: 1px #DCDFE6 solid; margin: 10px 0px; width: 100%; overflow-x: auto" v-loading="loading">
      <data-item v-for="item in data" :data="item" :key="item._id" v-on:delete_data="delete_data"></data-item>
    </div>
    <el-pagination style="float: right; margin-right: 100px;" background layout="total, prev, pager, next" :page-size="page_size" :total="total_num" :current-page.sync="current_page" @current-change="on_page_change">
    </el-pagination>
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
      tables: [],
      loading: false,
      current_query: "*",
      indices: [],
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
      is_focus: true
    };
  },
  mounted() {
    var self = this;
    document.onkeydown = function(e) {
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

    var page_size = Math.floor((window.innerHeight - 170) / 44);
    this.page_size = page_size > 8 ? page_size : 8;
    this.get_history();
    master
      .get("mgmt/table", { params: { page_size: 100, has_read_perms: true } })
      .then(response => {
        this.tables = response.data.results;
      })
      .catch(error => {});
    this.search_data([], "*", 1, this.page_size);
  },
  destroyed() {
    this.save_history();
  },
  methods: {
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
        results.push({ value });
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
      var all_history = JSON.parse(localStorage.getItem("deleted-history"));
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
      localStorage.setItem("deleted-history", JSON.stringify(this.all_history));
    },
    add_data(table) {
      console.log("table:", table);
    },
    search_data(indices, query, page, page_size, reset_page = false) {
      if (this.last_source) {
        // this.last_source.cancel()
      }
      var source = axios.CancelToken.source();
      this.last_source = source;
      var self = this;
      this.search_input_icon = "el-icon-loading";
      this.loading = true;
      master
        .post(
          "search/deleted-data-lucene",
          { indices, query, page, page_size },
          { cancelToken: source.token }
        )
        .then(response => {
          this.loading = false;
          self.data = response.data["hits"];
          this.total_num = response.data["total"];
          this.search_input_icon = "el-icon-edit";
          this.page_num = Math.ceil(response.data.total / this.page_size);
          if (reset_page) {
            this.current_page = 1;
          }
        })
        .catch(error => {
          this.loading = false;
          console.log("error:", error);
          this.search_input_icon = "el-icon-edit";
        });
    },
    on_search() {
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
      this.current_query = this.query;
      this.current_indices = this.indices;
      this.page = 1;
      this.search_data(
        this.current_indices,
        this.current_query,
        1,
        this.page_size,
        true
      );
      document.getElementById("submit").focus();
    },
    on_page_change(val) {
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
    on_add_data(table) {
      var AddData = Vue.component("AddData");
      var vm = new AddData({ propsData: { table_name: table.name } });
      vm.$mount();
      this.$el.appendChild(vm.$el);
    },
    on_show_info(table) {
      var ShowTable = Vue.component("ShowTable");
      var vm = new ShowTable({ propsData: { table } });
      vm.$mount();
      this.$el.appendChild(vm.$el);
    }
  }
};
</script>
