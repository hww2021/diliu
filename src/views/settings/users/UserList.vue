<template>
  <div class="container">
    <el-table :data="userData" style="width: 100%" height="718">
      <el-table-column prop="name" label="姓名"> </el-table-column>
      <el-table-column prop="username" label="账号"> </el-table-column>
      <el-table-column prop="phone" label="手机号"> </el-table-column>
      <el-table-column prop="email" label="邮箱"> </el-table-column>
      <el-table-column prop="site" label="所属站点"> </el-table-column>
      <el-table-column prop="role" label="角色"> </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            :active-text="scope.row.status ? '启用' : '停用'"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="action" label="操作项">
        <template slot-scope="scope">
          <el-button
            @click="handleClick(scope.row)"
            icon="el-icon-edit"
            circle
          ></el-button>
          <el-button icon="el-icon-delete" circle></el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="table-bottom">
      <div>
        <el-button>批量启用</el-button>
        <el-button>批量停用</el-button>
      </div>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="params.currentPage"
        :page-sizes="[10, 30, 50, 100]"
        :page-size="params.pageSize"
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
    return {};
  },
  props: [],
  computed: {
    ...mapState("users", ["userData", "total", "params"]),
  },
  watch: {},
  created() {
    this.getUserData();
  },
  methods: {
    ...mapActions("users", ["getUserData"]),
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
  .el-table {
    tr:hover {
      .el-button {
        color: #606266;
        background-color: #f5f7fa;
      }
      .el-button:focus,
      .el-button:hover {
        color: #606266;
        background-color: rgba(0, 0, 0, 0.08);
      }
    }
    .el-button {
      border: 0;
    }
  }
  .table-bottom {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }
}
</style>
