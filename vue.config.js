module.exports = {
  runtimeCompiler: true,
  publicPath: process.env.NODE_ENV === "production" ? "/movie-g/" : "/",
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "Movie G";
      return args;
    });
  },
  configureWebpack: {
    devtool: "source-map",
  },
  transpileDependencies: ["vuetify"],
};
