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
        <el-button>新增</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
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
<style scoped lang="less"></style>
