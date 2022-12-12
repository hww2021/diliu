<template>
  <div class="container">
    <el-table
      :data="roleData"
      style="width: 100%"
      height="718"
      :header-cell-style="headerStyle"
    >
      <el-table-column prop="name" label="角色名称">
        <template slot-scope="scope">
          <div>{{ scope.row.name }}</div>
          <div class="note">{{ scope.row.note }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="userCount" label="分配用户数"> </el-table-column>
      <el-table-column prop="modifier" label="修改人"> </el-table-column>
      <el-table-column prop="lastUpdatedTime" label="更新时间">
      </el-table-column>
      <el-table-column prop="action" label="操作项">
        <template slot-scope="scope">
          <el-button
            @click="handleEdit(scope.row)"
            icon="el-icon-edit"
            circle
          ></el-button>
          <el-button
            icon="el-icon-delete"
            circle
            @click="handleDel(scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="params.currentPage"
      :page-sizes="[10, 30, 50, 100]"
      :page-size="params.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      style="text-align: right; padding-top: 20px"
    >
    </el-pagination>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import * as api from "@/api/roles.js";
export default {
  name: "",
  components: {},
  data() {
    return {};
  },
  props: [],
  computed: {
    ...mapState("roles", ["roleData", "params", "total"]),
  },
  watch: {},
  created() {
    this.getRoleData();
  },
  methods: {
    ...mapMutations("roles", ["setParams"]),
    ...mapActions("roles", ["getRoleData"]),
    headerStyle() {
      return "background-color:#F5F7FA";
    },
    handleSizeChange(val) {
      this.setParams({ pageSize: val });
      this.getRoleData();
    },
    handleCurrentChange(val) {
      this.setParams({ currentPage: val });
      this.getRoleData();
    },
    handleEdit(row) {
      this.$router.push({ name: "Edit", params: { id: row.id } });
    },
    handleDel(row) {
      this.$confirm("确认删除该用户?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          try {
            await api.del(row.id);
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.getRoleData();
          } catch (err) {
            console.log(err.message);
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
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
  .note {
    font-size: 12px;
    color: rgba(0, 0, 0, 0.54);
  }
}
</style>
