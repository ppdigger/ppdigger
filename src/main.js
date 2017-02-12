import Vue from 'vue'
import store from './store'
import VueResource from 'vue-resource'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import Goods from './views/Goods'
import Photos from './views/Photos'
import Login from './views/Login'
import Logon from './views/Logon'
import Navigate from './views/Navigate'
import People from './views/People'
Vue.use(VueResource)
// Vue.use(ElementUI)
//vue-resource的post的data默认不是以form data的形式，而是request payload。
Vue.http.options.emulateJSON = true;
//发送请求、接收时
Vue.http.interceptors.push(function(request, next){
    const token = window.localStorage.getItem('ppdiggertoken')
    if(token){
      Vue.http.headers.common.Authorization = token
    } else{
      delete Vue.http.headers.common.Authorization
    };
  next()
})

new Vue({
  el: '#app',
  components: {
    Goods,
    Navigate
   },
  store,
  router
})
