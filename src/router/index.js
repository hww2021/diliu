import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/login/index"),
    meta: { title: "登录", noLayout: true },
  },
  {
    path: "/home",
    name: "Home",
    component: () => import("@/views/Home/index"),
    meta: { title: "首页", icon: "el-icon-s-home" },
    children: [
      {
        path: "/home/hq",
        name: "Hq",
        component: () => import("@/views/Home/Hq/index"),
        meta: { title: "报表管理" },
      },
    ],
  },
  {
    path: "/settings",
    name: "Settings",
    component: () => import("@/views/settings/index"),
    meta: { title: "系统设置", icon: "el-icon-s-tools" },
    children: [
      {
        path: "/settings/roles",
        name: "Roles",
        component: () => import("@/views/settings/roles/index"),
        meta: { title: "角色管理" },
        children: [
          {
            path: "/settings/roles",
            name: "RoleHome",
            component: () => import("@/views/settings/roles/RoleHome.vue"),
            meta: { title: "角色管理" },
          },
          {
            path: "/settings/roles/add",
            name: "Add",
            component: () => import("@/views/settings/roles/AddRole.vue"),
            meta: { title: "添加角色", showHeader: true },
          },
          {
            path: "/settings/roles/edit/:id",
            name: "Edit",
            component: () => import("@/views/settings/roles/AddRole.vue"),
            meta: { title: "编辑角色", showHeader: true },
          },
        ],
      },
      {
        path: "/settings/users",
        name: "Users",
        component: () => import("@/views/settings/users/index"),
        meta: { title: "用户管理" },
      },
    ],
  },
  {
    path: "",
    redirect: { name: "Hq" },
    meta: { noLayout: true },
  },
  {
    path: "*",
    name: "notFound",
    component: () => import("@/views/notFound/index"),
    meta: { title: "404", noLayout: true },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
