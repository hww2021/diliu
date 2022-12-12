<template>
  <div class="container">
    <el-row :gutter="20">
      <el-col :span="4">
        <el-autocomplete
          v-model="name"
          :fetch-suggestions="querySearchAsync"
          placeholder="输入角色名称进行搜索"
          @select="handleSelect"
          :trigger-on-focus="false"
          clearable
          @clear="handleClear('id')"
        ></el-autocomplete>
      </el-col>
      <el-col :span="1">
        <el-button @click="handleAdd">新增</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import * as api from "@/api/roles.js";
export default {
  name: "",
  components: {},
  data() {
    return {
      name: "",
    };
  },
  props: [],
  computed: {},
  watch: {},
  created() {},
  methods: {
    ...mapMutations("roles", ["setParams"]),
    ...mapActions("roles", ["getRoleData"]),
    querySearchAsync(queryString, cb) {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(async () => {
        try {
          const { roleData } = await api.getData({ q: queryString });
          const newRoleData = roleData.length
            ? roleData.map((item) => ({
                id: item.id,
                value: item.name,
              }))
            : [{ id: -1, value: "无此数据" }];
          cb(newRoleData);
        } catch (err) {
          console.log(err.message);
        }
      }, 1000);
    },
    handleSelect(item) {
      if (item.id === -1) {
        this.name = "";
      } else {
        this.setParams({ id: item.id, currentPage: 1 });
        this.getRoleData();
      }
    },
    handleClear(item) {
      this.setParams({ [item]: "" });
      this.getRoleData();
    },
    handleAdd() {
      this.$router.push({ name: "Add" });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.el-autocomplete {
  width: 100%;
}
</style>
