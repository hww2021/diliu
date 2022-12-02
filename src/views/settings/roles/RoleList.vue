<template>
  <div class="container">
    <el-table :data="roleData" style="width: 100%">
      <el-table-column prop="" label=""> </el-table-column>
      <el-table-column prop="" label=""> </el-table-column>
      <el-table-column prop="" label=""> </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  name: "",
  components: {},
  data() {
    return { roleData: [] };
  },
  props: [],
  computed: {},
  watch: {},
  created() {},
  methods: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less"></style>
