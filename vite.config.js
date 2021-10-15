import vue from '@vitejs/plugin-vue'
import Component from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'

export default {
  plugins: [
    vue(),
    Component({
      resolvers: [
        AntDesignVueResolver(),
      ],
    }),
  ],
  server: {
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8080/',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ''),
      },
    },
  },
}
