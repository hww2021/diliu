<template>
  <div class="container">
    <el-page-header @back="goBack" :content="title"></el-page-header>
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
    title() {
      return this.$route.meta.title;
    },
  },
  watch: {},
  created() {},
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
::v-deep .el-page-header__title {
  display: none !important;
}
::v-deep .el-page-header {
  line-height: 60px;
}
::v-deep .el-page-header__content {
  font-size: 14px;
}
</style>
