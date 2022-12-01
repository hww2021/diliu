const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 443,
    host: "local.turingvideo.cn",
    https: true,
    open: true,
    proxy: {
      services: {
        target: "https://dev-ka.turingvideo.cn",
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          "^/services": "/services",
        },
      },
    },
  },
});
