<template>
  <div v-if="!loading" class="layout">
    <nav-menu @selectMenu="onChangeMenu"></nav-menu>
    <order :resultData="results" v-show="selected == 1"></order>
    <company :companies="companies" v-show="selected == 2"></company>
    <div class="pagination">
      <el-pagination
        layout="prev, pager, next"
        :total="paginationCount"
        :page-size="pageSize"
        @current-change="handleChange"></el-pagination>
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
import { results, customers } from '../data/mock';
import { NavMenu, Order, Company } from '../components';
import axios from 'axios';
export default {
  data () {
    return {
      results,
      companies: null,
      selected: 1,
      orderCount: 0,
      companyCount: customers.total,
      paginationCount: 15,
      loadng: true,
      pageSize: 15,
    }
  },
  components: {
    NavMenu,
    Order,
    Company,
  },
  mounted() {
    this.load();
  },
  methods: {
    onChangeMenu (index) {
      this.selected = parseInt(index, 10);
      switch (parseInt(index, 10)) {
        case 1: this.paginationCount = this.orderCount || 15; break;
        case 2: this.loadCompany (); this.paginationCount = this.companyCount || 15; break;
        default: this.paginationCount = 15; break;
      }
    },
    handleChange (val) {
      this.load(val);
    },
    load(offset) {
      this.loading = true;
      if (this.selected === 1) {
        // order
        return axios.get('/api/order_list', {
          params: {
            offset,
          }
        }).then(resp => {
          this.loading = false;
          this.results = resp.data.orders;
          this.orderCount = Math.floor(resp.data.total);
        })
      } else {
        // company
        console.log(offset);
        this.loading = false;
      }
    },
    loadCompany() {
      this.companies = customers.company;
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
