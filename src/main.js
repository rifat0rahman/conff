import Vue from 'vue'
import App from './App.vue'
import router from './router'
import firebase from 'firebase/app'


var firebaseConfig = {
    apiKey: "AIzaSyBhitqmR8NxH3aQQRqdzfcTxyYJ7noQ9rs",
    authDomain: "my-ecommerce-1f046.firebaseapp.com",
    databaseURL: "https://my-ecommerce-1f046.firebaseio.com",
    projectId: "my-ecommerce-1f046",
    storageBucket: "my-ecommerce-1f046.appspot.com",
    messagingSenderId: "192502499137",
    appId: "1:192502499137:web:c53b9f51e0afbea6e483c0",
    measurementId: "G-1B20RTRPN3"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
