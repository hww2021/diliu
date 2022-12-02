<template>
  <div class="container">
    <user-panel />
    <user-list />
  </div>
</template>

<script>
import UserPanel from "@/views/settings/users/UserPanel.vue";
import UserList from "@/views/settings/users/UserList.vue";
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  name: "",
  components: { UserPanel, UserList },
  data() {
    return {};
  },
  props: [],
  watch: {},
  created() {},
  methods: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less"></style>
