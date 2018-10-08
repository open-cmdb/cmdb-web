  <template>
  <div>
    <el-input v-model="aaa" type="password" autofocus @keydown.enter.native="on_click">
    </el-input>
  </div>
</template>

  <script>
export default {
  data() {
    return {
      aaa: null
    };
  },
  methods: {
    on_click() {
      console.log("on_click");
    }
  }
};
</script>
