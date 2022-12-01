<template>
  <div class="container">
    <el-image
      :src="logo"
      fit="contain"
      style="height: 82px; width: auto"
    ></el-image>
    <el-menu
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#4e4c60"
      text-color="#BDBDBD"
      active-text-color="#fff"
      :unique-opened="true"
      router
    >
      <template v-for="item in routes">
        <el-submenu
          v-if="item.children && item.children.length"
          :index="item.path"
          :key="item.path"
        >
          <template slot="title">
            <i :class="item.meta.icon"></i>
            <span>{{ item.meta.title }}</span>
          </template>
          <el-menu-item
            v-for="child in item.children"
            :index="child.path"
            :key="child.path"
            >{{ child.meta.title }}</el-menu-item
          >
        </el-submenu>
        <el-menu-item v-else :index="item.path" :key="item.path">
          <template slot="title">
            <i :class="item.meta.icon"></i>
            <span>{{ item.meta.title }}</span>
          </template>
        </el-menu-item>
      </template>
    </el-menu>
    <div class="dropdown">
      <el-dropdown @command="handleCommand" placement="top" trigger="click">
        <span class="el-dropdown-link">
          下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown" :append-to-body="false" ref="downdiv">
          <el-dropdown-item command="info">个人信息</el-dropdown-item>
          <el-dropdown-item command="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <div ref="newSpace"></div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  name: "Sidebar",
  components: {},
  data() {
    return {
      logo: require("@/assets/logo.png"),
    };
  },
  props: [],
  computed: {
    routes() {
      return this.$router.options.routes.filter((item) => !item.meta.noLayout);
    },
  },
  watch: {},
  created() {},
  mounted() {
    this.$refs.newSpace.appendChild(this.$refs.downdiv.popperElm);
  },
  methods: {
    ...mapMutations("login", ["setIsLogin"]),
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleCommand(command) {
      if (command === "logout") {
        this.$router.replace({ name: "Login" });
        localStorage.removeItem("token");
        this.setIsLogin("false");
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.container {
  position: relative;
  height: 100%;
  ::v-deep .el-submenu.is-opened {
    i,
    span {
      color: #fff;
    }
  }
  ::v-deep .el-submenu__title:hover {
    i,
    span {
      color: #fff;
    }
  }
  .el-menu {
    border: 0;
    .el-menu-item {
      padding-left: 48px !important;
    }
    .el-menu-item:hover {
      color: #fff !important;
    }
  }
  .dropdown {
    position: absolute;
    bottom: 0;
    padding: 20px 50px;
    .el-dropdown-link {
      cursor: pointer;
      color: #e0e0e0;
    }
    .el-icon-arrow-down {
      font-size: 12px;
    }
    .el-dropdown-menu.el-popper {
      min-width: 230px;
      left: 16px !important;
    }
  }
}
</style>
