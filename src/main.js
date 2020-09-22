import Vue from 'vue'
import App from './App.vue'
import router from './router'
import * as firebase from 'firebase'
import vuetify from './plugins/vuetify'
import { store } from './store/index'
import DateFilter from './filters/date'
import AlertCmp from './components/alert.vue'
import EditMeetup from './components/EditMeetup.vue'


Vue.config.productionTip = false

Vue.filter('date', DateFilter)
Vue.component('app-alert', AlertCmp)
Vue.component('app-edit-meetup', EditMeetup)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  created(){
    firebase.initializeApp({
      apiKey: 'AIzaSyALpfmRXPcYo9Ht8TXT4bBCgDzmZj9Rn2E',
      authDomain: 'meetupapp-55880.firebaseapp.com',
      databaseURL: 'https://meetupapp-55880.firebaseio.com',
      projectId: 'meetupapp-55880',
      storageBucket: 'gs://meetupapp-55880.appspot.com',
      messagingSenderId: '1010630917958',
      appId: '1:1010630917958:web:2bb9950ea3598ff155ef47',
      measurementId: 'G-2WKHGDCJDB'
    })
    firebase.auth().onAuthStateChanged((user)=>{
      if (user){
        this.$store.dispatch('autoSignIn', user)
      }
    })
    this.$store.dispatch('loadMeetups')
  }
}).$mount('#app')
