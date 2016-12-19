<template>
  <div v-if="!loading" class="layout">
    <nav-menu @selectMenu="onChangeMenu"></nav-menu>
    <order :resultData="results" v-show="selected == 1"></order>
    <div class="pagination">
      <el-pagination layout="prev, pager, next" :total="orderCount" @current-change="handleChange"></el-pagination>
    </div>
  </div>
  <div v-else>
    <el-alert
    title="正在读取，请稍后...."
    type="info"
    close-text="知道了">
  </el-alert>
  </div>
</template>

<script>
import { results } from '../data/mock';
import { NavMenu, Order } from '../components';
import axios from 'axios';
export default {
  data () {
    return {
      results,
      selected: 1,
      orderCount: 0,
      loadng: true,
    }
  },
  components: {
    NavMenu,
    Order,
  },
  mounted() {
    this.load();
  },
  methods: {
    onChangeMenu (index) {
      this.selected = index;
    },
    handleChange (val) {
      this.load(val);
    },
    load(offset) {
      this.loading = true;
      return axios.get('/api/order_list', {
        params: {
          offset,
        }
      }).then(resp => {
        this.loading = false;
        this.results = resp.data.orders;
        this.orderCount = Match.floor(resp.data.total / 15);
      })
    }
  },
}
</script>

<style>
  .pagination {
    margin: 10px auto;
    text-align: center;
  }
</style>
