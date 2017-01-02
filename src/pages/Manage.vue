<template>
  <div class="layout">
    <nav-menu @selectMenu="onChangeMenu"></nav-menu>
    <order :resultData="results" v-show="selected == 1"></order>
    <company :loading="loading" :companies="companies" v-show="selected == 2"></company>
    <div class="pagination">
      <el-pagination
        layout="prev, pager, next"
        :total="paginationCount"
        :page-size="pageSize"
        @current-change="handleChange"></el-pagination>
    </div>
  </div>
</template>

<script>
import { NavMenu, Order, Company } from '../components';
import { EventBus } from '../utils/user';
import axios from 'axios';
export default {
  data () {
    return {
      results: null,
      companies: null,
      selected: 1,
      paginationCount: 15,
      loadng: true,
      pageSize: 15,
      offset: 0,
    }
  },
  components: {
    NavMenu,
    Order,
    Company,
  },
  mounted() {
    this.load();
    EventBus.$on('UPDATE', () => {
      this.load(this.offset);
    })
  },
  methods: {
    onChangeMenu (index) {
      this.selected = parseInt(index, 10);
      this.load();
    },
    handleChange (val) {
      this.offset = val - 1;
      this.load(this.offset);
    },
    load(offset) {
      if (this.selected === 1) {
        // order
        axios.get('/api/order_list', {
          params: {
            offset,
          }
        }).then(resp => {
          this.loading = false;
          this.results = resp.data.orders;
          this.paginationCount = Math.floor(resp.data.total);
        })
      } else {
        axios.get('/api/account_list', {
          params: {
            offset
          }
        }).then(resp => {
          this.loading = false;
          this.companies = resp.data.company;
          this.paginationCount = Math.floor(resp.data.total);
        })
      }
    },
  },
}
</script>

<style>
  .pagination {
    margin: 10px auto;
    text-align: center;
  }
</style>
