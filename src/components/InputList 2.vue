<template>
  <div style="font-size: 14px; border: 1px solid #DCDFE6; border-radius: 4px; padding-top: 2px; min-height: 40px">
    <el-tag :key="tag" style="margin-left: 4px" v-for="tag in innerValue" closable type="info" :disable-transitions="false" @close="handleClose(tag)">
      {{tag}}
    </el-tag>
    <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="mini" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
    </el-input>
    <el-button v-else class="button-new-tag" type="primary" size="small" @click="showInput">+ 添加</el-button>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      default: []
    },
    size: {
      default: "large"
    }
  },
  data() {
    return {
      inputVisible: false,
      inputValue: "",
      innerValue: this.value instanceof Array ? this.value : [],
      size_map: {
        large: "40px",
        medium: "36px",
        small: "32px",
        mini: "28px"
      }
    };
  },
  methods: {
    handleClose(tag) {
      this.innerValue.splice(this.value.indexOf(tag), 1);
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.innerValue.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    }
  },
  watch: {
    value(newVal, oldVal) {
      if (newVal === oldVal) {
        return;
      }
      this.innerValue = newVal;
    },
    innerValue(val) {
      this.$emit("input", val);
    }
  }
};
</script>
