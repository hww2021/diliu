<template>
  <div class="container">
    <el-table :data="roleData" style="width: 100%">
      <el-table-column prop="name" label="角色名称"> </el-table-column>
      <el-table-column prop="userCount" label="分配用户数"> </el-table-column>
      <el-table-column prop="modifier" label="修改人"> </el-table-column>
      <el-table-column prop="lastUpdatedTime" label="更新时间">
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
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  name: "",
  components: {},
  data() {
    return {};
  },
  props: [],
  computed: {
    ...mapState("roles", ["roleData"]),
  },
  watch: {},
  created() {
    this.getRoleData();
  },
  methods: {
    ...mapActions("roles", ["getRoleData"]),
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
}
</style>
