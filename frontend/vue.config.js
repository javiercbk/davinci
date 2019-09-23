const TARGET = process.env.FE_TARGET || 'http://localhost:3443';

module.exports = {
  pluginOptions: {
    i18n: {
      enableInSFC: false
    }
  },
  devServer: {
    proxy: TARGET
  }
};
