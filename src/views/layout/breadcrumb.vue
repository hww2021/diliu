<template>
  <div class="container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="item in titles" :to="{ path: item.path }">{{
        item.meta.title
      }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  name: "Breadcrumb",
  components: {},
  data() {
    return {};
  },
  props: [],
  computed: {
    titles() {
      return this.$route.matched.filter((item) => !item.meta.hide);
    },
  },
  watch: {},
  created() {},
  methods: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.el-breadcrumb {
  line-height: 60px !important;
}
</style>
