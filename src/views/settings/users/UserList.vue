<template>
  <div class="container">
    <el-table :data="userData" style="width: 100%">
      <el-table-column prop="name" label="姓名"> </el-table-column>
      <el-table-column prop="username" label="账号"> </el-table-column>
      <el-table-column prop="phone" label="手机号"> </el-table-column>
      <el-table-column prop="email" label="邮箱"> </el-table-column>
      <el-table-column prop="site" label="所属站点"> </el-table-column>
      <el-table-column prop="role" label="角色"> </el-table-column>
      <el-table-column prop="status" label="状态"> </el-table-column>
      <el-table-column prop="action" label="操作项"> </el-table-column>
    </el-table>
    <div class="table-bottom">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  name: "UserList",
  components: {},
  data() {
    return {
      userData: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
    };
  },
  props: [],
  computed: {},
  watch: {},
  created() {},
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.container {
  padding-top: 20px;
}
</style>
