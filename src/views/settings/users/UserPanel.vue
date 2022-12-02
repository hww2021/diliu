<template>
  <div class="container">
    <el-row :gutter="20">
      <el-col :span="4">
        <el-autocomplete
          v-model="name"
          :fetch-suggestions="querySearchAsync"
          placeholder="请输入姓名或账号"
          @select="handleSelect"
          :trigger-on-focus="false"
          clearable
          @clear="handleClear('id')"
        ></el-autocomplete>
      </el-col>
      <el-col :span="3">
        <el-select v-model="site" filterable placeholder="请选择所属机构">
          <el-option
            v-for="item in siteOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            clearable
            @clear="handleClear('site')"
          >
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="3">
        <el-select v-model="role" filterable placeholder="请选择角色">
          <el-option
            v-for="item in roleOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            clearable
            @clear="handleClear('site')"
          >
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="3">
        <el-select v-model="status" filterable placeholder="请选择状态">
          <el-option
            v-for="item in statusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            clearable
            @clear="handleClear('site')"
          >
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="1">
        <el-button>新增</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  name: "UserPanel",
  components: {},
  data() {
    return {
      name: "",
      site: "",
      role: "",
      status: "",
      statusOptions: [
        {
          label: "角色：全部",
          value: "",
        },
        { label: "启用", value: 1 },
        { label: "停用", value: 0 },
      ],
    };
  },
  props: [],
  computed: {
    siteOptions() {},
    roleOptions() {},
  },
  watch: {},
  created() {},
  methods: {
    querySearchAsync(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createStateFilter(queryString))
        : restaurants;

      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(results);
      }, 3000 * Math.random());
    },
    handleSelect(item) {
      console.log(item);
    },
    handleClear(item) {},
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.container {
  .el-autocomplete {
    width: 100% !important;
  }
}
</style>
