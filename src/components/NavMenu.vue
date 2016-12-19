<template>
  <el-menu default-active="1" class="el-menu-demo" mode="horizontal" @select="handleSelect">
    <h3 class="menu-title">Wizwork</h3>
    <el-menu-item index="1">订单管理</el-menu-item>
    <el-menu-item index="2">客户管理</el-menu-item>
  </el-menu>
</template>

<script>
  export default {
    methods: {
      handleSelect(key, keyPath) {
        this.$emit('selectMenu', key);
      },
    }
  }
</script>

<style>
  .el-menu-demo {
    padding-left: 10px;
  }
  .menu-title {
    display: inline-block;
    margin-right: 20px;
    float: left;
  }
</style>