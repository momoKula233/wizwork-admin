import Vue from 'vue';
import VueRouter from 'vue-router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import App from './App.vue';
import Login from './pages/Login.vue';
import Manage from './pages/Manage.vue';

Vue.use(VueRouter);
Vue.use(ElementUI);

const routes = [
  { path: '/', component: Login, name: 'login' },
  { path: '/manage', component: Manage, name: 'manage' },
];

const router = new VueRouter({ mode: 'history', routes });

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})