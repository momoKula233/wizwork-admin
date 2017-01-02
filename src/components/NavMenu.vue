<template>
  <div>
    <el-menu default-active="1" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <h3 class="menu-title">Wizwork： 当前用户 {{ currentUser.name }}</h3>
      <el-menu-item index="1">订单管理</el-menu-item>
      <el-menu-item index="2">客户管理</el-menu-item>
    </el-menu>
    <div style='margin: 10px'>
      <el-button @click="handleSignOut" size="small" type='danger'>退出登陆</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        currentUser: JSON.parse(localStorage.getItem('CURRENT_USER')),
      }
    },
    methods: {
      handleSelect(key, keyPath) {
        if (!this.currentUser.pre) return alert('您没有权限， 请联系管理员');
        this.$emit('selectMenu', key);
      },
      handleSignOut() {
        localStorage.removeItem('CURRENT_USER')
        this.$router.push('/');
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