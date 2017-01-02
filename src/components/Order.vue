<template>
  <el-table
    :data="resultData"
    stripe
    v-loading="loading"
    style="width: 100%">
    <el-table-column prop="name" label="姓名" width="100"></el-table-column>
    <el-table-column prop="mobile" label="电话" width="150"></el-table-column>
    <el-table-column prop="price" label="价格" width="80"></el-table-column>
    <el-table-column prop="start" label="开始时间" width="180" :formatter="formatTime"></el-table-column>
    <el-table-column prop="end" label="结束时间" width="180" :formatter="formatTime"></el-table-column>
    <el-table-column prop="type" label="类型" width="100" :formatter="formatType"></el-table-column>
    <el-table-column prop="location" label="地点" :formatter="formatLoacation"></el-table-column>
  </el-table>
</template>

<script>
  export default {
    props: ['resultData', 'loading'],
    methods: {
      formatTime(row, column) {
        const date = new Date(row.start);
        let y = date.getFullYear();
        if (y === 1970) {
          return '-';
        }
        let m = date.getMonth();
        if (!m) {
          --y;
          m = 12;
        }
        const d = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
        const h = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
        const ms = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
        const fomateTime = `${y}-${m}-${d} ${h}:${ms}`;
        return fomateTime;
      },
      formatType(row, column) {
        let locationType = '';
        switch(parseInt(row.type, 10)) {
          case 1: locationType = '小会议室'; break;
          case 2: locationType = '大会议室'; break;
          case 3: locationType = '咖啡位'; break;
          default: locationType = '请确认类型'; break;
        }
        return locationType;
      },
      formatLoacation(row, column) {
        let location = '';
        switch(parseInt(row.location, 10)) {
          case 1: location = '虹桥天地中心'; break;
          case 2: location = '虹桥万科中心'; break;
          case 3: location = '徐家汇嘉汇中心'; break;
          case 4: location = '徐家汇中金中心'; break;
          case 5: location = '漕河泾越虹中心'; break;
          case 6: location = '普陀区环球港中心'; break;
          default: location = '请确认地点'; break;
        }
        return location;
      }
    },
  }
</script>