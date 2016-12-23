<template>
  <div class="manageLayout">
    <el-table
      :data="companies"
      stripe
      @row-click="rowEdit"
      style="width: 100%">
      <el-table-column prop="id" label="id" width="100"></el-table-column>
      <el-table-column prop="rest_time" label="剩余时间(小时)" width="150" align="center"></el-table-column>
      <el-table-column prop="mobile" label="联系方式" width="150"></el-table-column>
      <el-table-column prop="password" label="密码" width="150"></el-table-column>
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column
        width="80"
        :context="_self"
        inline-template
        label="操作">
        <div>
          <el-button
            size="small"
            @click="handleEdit($index, row)">
            编辑
          </el-button>
          <!--<el-button
            size="small"
            type="danger"
            @click="handleDelete($index, row)">
            删除
          </el-button>-->
        </div>
      </el-table-column>
    </el-table>
    <el-dialog title="编辑" v-model="dialogFormVisible">
      <el-form :model="form" label-position="left">
        <el-form-item label="id" :label-width="formLabelWidth">
          <el-input v-model="form.id" auto-complete="off"></el-input>
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
  </div>
</template>

<script>
  export default {
    props: ['companies'],
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
        formLabelWidth: '80px',
      };
    },
    methods: {
      handleEdit(index, row) {
        console.log(index, row);
        this.generateForm(row);
        this.dialogFormVisible = true
      },
      rowEdit(row, event, colum) {
        this.generateForm(row);
        this.dialogFormVisible = true
      },
      submitEdit() {
        //this.upload(this.form);
        this.dialogFormVisible = false
      },
      generateForm(row) {
        this.form.name = row.name;
        this.form.id = row.id;
        this.form.rest_time = row.rest_time;
        this.form.mobile = row.mobile;
        this.form.password = row.password;
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
    },
  }
</script>

<style>
  .manageLayout {
    width: 100%;
    height: auto;
  }
</style>