import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import firebase from 'firebase'

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import '@/icons' // icon
import '@/permission' // permission control

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

const firebaseConfig = {
  apiKey: 'AIzaSyD7COUe9S5TGG0YnNDW37fGsf26nvVojgY',
  authDomain: 'yalewebdev.firebaseapp.com',
  databaseURL: 'https://yalewebdev.firebaseio.com',
  projectId: 'yalewebdev',
  storageBucket: 'yalewebdev.appspot.com',
  messagingSenderId: '341428011856',
  appId: '1:341428011856:web:f5cf32ee40a73eaad2e255',
  measurementId: 'G-L1KT1037GQ'
}

firebase.initializeApp(firebaseConfig)

new Vue({
  el: '#app',
  router,
  store,
  render: (h) => h(App)
})
