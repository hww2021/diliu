<template>
  <div class="container">
    <el-row :gutter="20">
      <el-col :span="5">
        <el-autocomplete
          v-model="name"
          :fetch-suggestions="querySearchAsync"
          placeholder="请输入姓名或账号"
          @select="handleSelect"
          :trigger-on-focus="false"
          clearable
          @clear="handleClear('id')"
        >
          <template slot-scope="{ item }">
            <div class="user-info">
              <div class="name">
                <el-image :src="logo"> </el-image>
                <span class="text">{{ item.value }}</span>
              </div>
              <div class="username">{{ item.username }}</div>
            </div>
          </template>
        </el-autocomplete>
      </el-col>
      <el-col :span="4">
        <el-select
          v-model="params.site"
          filterable
          placeholder="请选择所属站点"
          clearable
          @clear="handleClear('site')"
        >
          <el-option
            v-for="item in siteOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select
          v-model="params.role"
          filterable
          placeholder="请选择角色"
          clearable
          @clear="handleClear('role')"
        >
          <el-option
            v-for="item in roleOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select
          v-model="params.status"
          filterable
          placeholder="请选择状态"
          clearable
          @clear="handleClear('status')"
        >
          <el-option
            v-for="item in statusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="1">
        <el-button @click="handleAdd">新增</el-button>
      </el-col>
    </el-row>
    <add-user :dialog.sync="isShow" />
  </div>
</template>

<script>
import AddUser from "@/views/settings/users/AddUser.vue";
import { mapState, mapMutations, mapActions } from "vuex";
import * as api from "@/api/users.js";
export default {
  name: "UserPanel",
  components: { AddUser },
  data() {
    return {
      name: "",
      statusOptions: [
        {
          label: "状态：全部",
          value: "",
        },
        { label: "启用", value: 1 },
        { label: "停用", value: 0 },
      ],
      logo: require("@/assets/name.png"),
      isShow: false,
    };
  },
  props: [],
  computed: {
    ...mapState("global", ["siteData", "roleData"]),
    ...mapState("users", ["params"]),
    siteOptions() {
      const newSiteData =
        this.siteData.children && this.siteData.children.length
          ? this.siteData.children.map((item) => ({
              label: item.name,
              value: item.id,
            }))
          : [];
      newSiteData.unshift({ value: "", label: "所属站点：全部" });
      return newSiteData;
    },
    roleOptions() {
      const newRoleData = this.roleData.map((item) => ({
        label: item.name,
        value: item.id,
      }));
      newRoleData.unshift({ value: "", label: "角色：全部" });
      return newRoleData;
    },
    site() {
      return this.params.site;
    },
    role() {
      return this.params.role;
    },
    status() {
      return this.params.status;
    },
  },
  watch: {
    site(v) {
      this.setParams({ site: v, currentPage: 1 });
      this.getUserData();
    },
    role(v) {
      this.setParams({ role: v, currentPage: 1 });
      this.getUserData();
    },
    status(v) {
      this.setParams({ status: v, currentPage: 1 });
      this.getUserData();
    },
  },
  created() {},
  methods: {
    ...mapMutations("users", ["setParams"]),
    ...mapActions("users", ["getUserData"]),
    querySearchAsync(queryString, cb) {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(async () => {
        const { userData } = await api.getData({ q: queryString });
        const newUserData = userData.length
          ? userData.map((item) => ({
              id: item.id,
              value: item.name,
              username: item.username,
            }))
          : [{ id: -1, value: "无此选项", username: "" }];
        cb(newUserData);
      }, 1000);
    },
    handleSelect(item) {
      this.setParams({ id: item.id, currentPage: 1 });
      this.getUserData();
    },
    handleClear(item) {
      this.setParams({ [item]: "", currentPage: 1 });
      this.getUserData();
    },
    handleAdd() {
      this.isShow = true;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.container {
  .el-autocomplete,
  .el-select {
    width: 100% !important;
  }
}
.name {
  display: flex;
  align-items: center;
  ::v-deep .el-image {
    .el-image__inner {
      vertical-align: middle !important;
    }
  }
  .text {
    margin-left: 8px;
  }
}

.username {
  margin-left: 26px;
}
</style>
