<template>
  <div class="container">
    <el-table
      ref="multipleTable"
      :data="newUserData"
      style="width: 100%"
      height="718"
      :header-cell-style="headerStyle"
      @selection-change="handleSelectionChange"
    >
      >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="name" label="姓名"> </el-table-column>
      <el-table-column prop="username" label="账号"> </el-table-column>
      <el-table-column prop="phone" label="手机号"> </el-table-column>
      <el-table-column prop="email" label="邮箱"> </el-table-column>
      <el-table-column prop="site" label="所属站点"> </el-table-column>
      <el-table-column prop="role" label="角色"> </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-switch
            :value="scope.row.status"
            :active-text="scope.row.status ? '启用' : '停用'"
            @change="isActive(scope.row)"
          >
          </el-switch>
        </template>
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
    <div class="table-bottom">
      <div>
        <el-button
          @click="
            isBatchAcitvate({ type: 'activate', data: multipleSelection })
          "
          >批量启用</el-button
        >
        <el-button
          @click="
            isBatchAcitvate({ type: 'deactivate', data: multipleSelection })
          "
          >批量停用</el-button
        >
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
    <add-user :dialog.sync="isShow" :row="row" />
  </div>
</template>

<script>
import AddUser from "@/views/settings/users/AddUser.vue";
import { mapState, mapMutations, mapActions } from "vuex";
import * as api from "@/api/users.js";
export default {
  name: "UserList",
  components: { AddUser },
  data() {
    return { multipleSelection: [], chooseUsers: [], isShow: false, row: {} };
  },
  props: [],
  computed: {
    ...mapState("users", ["userData", "total", "params"]),
    ...mapState("global", ["siteData", "roleData"]),
    newUserData() {
      return this.convertSite(this.siteData, this.userData);
    },
  },
  watch: {},
  created() {
    this.getUserData();
  },
  methods: {
    ...mapMutations("users", ["setParams"]),
    ...mapActions("users", [
      "getUserData",
      "changeStatus",
      "BatchChangeStatus",
    ]),
    headerStyle() {
      return "background-color:#F5F7FA";
    },
    convertSite(siteData, userData) {
      const map = new Map(
        siteData.children && siteData.children.length
          ? siteData.children.map((item) => [item.id, item.name])
          : []
      );
      return userData.map((item) => ({
        ...item,
        site: item.siteVal
          .map((item) => (map.has(item) ? map.get(item) : ""))
          .join("、"),
      }));
    },
    handleSizeChange(val) {
      this.setParams({ pageSize: val });
      this.getUserData();
    },
    handleCurrentChange(val) {
      this.setParams({ currentPage: val });
      this.getUserData();
    },

    isActive(row) {
      if (!row.name) {
        this.$message.error("姓名为空，不可操作！");
        console.log("if");
        return;
      }
      this.handleChangeStatus(row);
    },
    handleChangeStatus(row) {
      this.$confirm(`确认${row.status ? "停用" : "启用"}该用户？`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          const params = {
            id: row.id,
            type: row.status ? "deactivate" : "activate",
          };
          this.changeStatus(params);
        })
        .catch(() => {});
    },
    handleSelectionChange(val) {
      this.chooseUsers = val.map((item) => item.name);
      console.log(this.chooseUsers);
      this.multipleSelection = { id: val.map((item) => item.id) };
    },
    isBatchAcitvate(params) {
      if (this.chooseUsers.includes("")) {
        this.$message.error("含有姓名为空的数据，不可操作！");
        return;
      }
      this.handleBatchChangeStatus(params);
    },
    handleBatchChangeStatus(params) {
      const { type, data } = params;
      this.$confirm(
        `确认批量${type === "activate" ? "启用" : "停用"}选中的用户？`,
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          this.BatchChangeStatus(params);
        })
        .catch(() => {});
    },

    handleEdit(row) {
      this.isShow = true;
      this.row = { ...row };
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
            this.getUserData();
            this.$message({
              type: "success",
              message: "删除成功!",
            });
          } catch (err) {
            this.$message.error(err.message);
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
  .table-bottom {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }
}
</style>
