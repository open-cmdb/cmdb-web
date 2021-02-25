<template>
  <el-tooltip class="item" effect="dark" :content="content" :placement="placement" :disabled="!content">
    <el-button @click="handleClick" style="margin-left: 2px" :loading="loading" :disabled="disabled" :type="type" :size="size">
      <i v-if="!loading" class="fa" :class="[icon]" aria-hidden="true"></i>
    </el-button>
  </el-tooltip>
</template>

<script>
export default {
  props: {
    content: String,
    placement: {
      type: String,
      default: "top"
    },
    loading: Boolean,
    disabled: Boolean,
    type: {
      type: String,
      default: "default"
    },
    size: {
      type: String,
      default: "mini"
    },
    icon: {
      type: String,
      default: ""
    }
  },
  methods: {
    handleClick(evt) {
      this.$emit("click", evt);
    }
  }
};
</script>

<style scoped>
</style>
