<template>
  <div class="manageLayout">
    <el-table
      :data="companies"
      stripe
      v-loading="loading"
      style="width: 100%">
      <el-table-column prop="id" label="id" width="100"></el-table-column>
      <el-table-column prop="rest_time" label="剩余时间(小时)" width="150" align="center"></el-table-column>
      <el-table-column prop="mobile" label="联系方式" width="150"></el-table-column>
      <el-table-column prop="password" label="密码" width="150"></el-table-column>
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column
        width="180"
        :context="_self"
        inline-template
        label="操作">
        <div>
          <el-button
            size="small"
            @click="handleEdit($index, row)">
            编辑
          </el-button>
          <el-button
            size="small"
            type="danger"
            @click="handleDelete($index, row)">
            删除
          </el-button>
        </div>
      </el-table-column>
    </el-table>
    <!--<el-button type="info" @click="handleInsert">新增</el-button>-->
    <el-dialog title="编辑" v-model="dialogFormVisible">
      <el-form :model="form" label-position="left">
        <el-form-item label="id" :label-width="formLabelWidth">
          <el-input v-model="form.id" :disabled="!isInsert" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="剩余小时" :label-width="formLabelWidth">
          <el-input v-model="form.rest_time" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" :label-width="formLabelWidth">
          <el-input v-model="form.mobile" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.password" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitEdit">确 定</el-button>
      </div>
    </el-dialog>
    <div style='margin-top: 20px; text-align: right; padding-right: 20px'>
        <el-button @click="handleInsert" type="primary" icon="plus">新增客户</el-button>
    </div>
  </div>
</template>

<script>
  import { Current, EventBus } from '../utils/user';
  import axios from 'axios';
  export default {
    props: ['companies', 'loading'],
    data() {
      return {
        dialogFormVisible: false,
        form: {
          name: '',
          id: '',
          rest_time: '',
          mobile: '',
          password: ''
        },
        isInsert: 0,
        formLabelWidth: '80px',
      };
    },
    methods: {
      handleEdit(index, row) {
        this.isInsert = false;
        this.generateForm(row);
        this.dialogFormVisible = true
      },
      handleInsert() {
        this.isInsert = true;
        this.generateForm();
        this.dialogFormVisible = true;
      },
      // submitEdit(data) {
      //   this.upload(this.form);
      //   this.dialogFormVisible = false
      // },
      generateForm(row) {
        if(row) {
          this.form.name = row.name;
          this.form.id = row.id;
          this.form.rest_time = row.rest_time;
          this.form.mobile = row.mobile;
          this.form.password = row.password;
        }else {
          this.form = {};
        }
      },
      handleDelete(index, row) {
        const { id } = row;
        axios.post('/api/delete', {
          id,
        }).then(resp => {
          if(resp.data.success) EventBus.$emit('UPDATE');
        })
      },
      submitEdit() {
        const { name, id, rest_time, mobile, password } = this.form;
        if (!name.length || !id.length || !rest_time.length || !mobile.length || !password.length) return alert('请填写完整信息');
        const url = this.isInsert ? '/api/insert' : '/api/update';
        axios.post(`${url}`, this.form).then(resp => {
          if (resp.data.success) this.dialogFormVisible = false;
          else if (resp.data.err === 'INVALID_ID') alert('该ID已经存在，请重新输入');
          EventBus.$emit('UPDATE');
        });
      }
    },
  }
</script>

<style>
  .manageLayout {
    width: 100%;
    height: auto;
  }
</style>