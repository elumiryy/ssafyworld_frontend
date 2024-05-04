const { defineConfig } = require('@vue/cli-service')
module.exports = {
  transpileDependencies: [
    
  ],
  devServer : {
    proxy : process.env.VUE_APP_BASE_API
  }
}
