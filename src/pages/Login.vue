<template>
  <div class="inputContainer">
    <h3 class="loginTitle">请登录</h3>
    <el-input
      class="inline-input"
      size="large"
      placeholder="请输入用户名"
      v-model="name">
    </el-input>
    <div class="middle"></div>
    <el-input
      class="inline-input"
      size="large"
      type='password'
      placeholder="请输入密码"
      v-model="password">
    </el-input>
    <div class="loginButton">
      <el-button type="primary" :disabled="!name || !password" @click="login">立即登陆</el-button>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import { Current } from '../utils/user';
  export default {
    data() {
      return {
        name: '',
        password: '',
      }
    },
    mounted() {
      let user = localStorage.getItem('CURRENT_USER');
      user = JSON.parse(user);
      if(user) this.$router.push('manage');
    },
    methods: {
      login () {
        axios.post('/api/login', {
          password: this.password,
          name: this.name,
        }).then(({ data }) => {
          if (data.success) {
            Current.init(data.user);
            localStorage.setItem('CURRENT_USER', JSON.stringify(data.user))
            this.$router.push('manage');
            return;
          }
          alert('账号或者密码错误');
        })
      },
    },
  }
</script>

<style>
  .loginTitle {
    margin: 0 auto 20px auto;
    color: #999;
    font-size: 20px;
  }
  .inputContainer {
    width: 50%;
    margin: 200px auto;
  }
  .middle {
    height: 20px;
  }
  .loginButton {
    margin-top: 20px;
  }
</style>