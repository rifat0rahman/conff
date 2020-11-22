<template>
<div id="nav">
  <!-- navbar -->
<nav class="navbar sticky-top navbar-expand-lg navbar-light bg-light">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <!-- repeating for small sizes view ports -->
    <li class="navbar-brand hidden">
      <router-link to="/" class="nav-link">Home</router-link>
    </li>
    <a class="navbar-brand title" href="/">Confainza</a>
    <li class="navbar-brand hidden">
     <router-link to="/Cart" class="nav-link">Cart<span class="badge badge-danger">{{length}}</span></router-link>
    </li>
    <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
    <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
    <li class="nav-item active">
      <router-link to="/" class="nav-link visible">Home</router-link>
    </li>
    <li class="nav-item active" v-show="!status">
      <router-link to="/Register" class="nav-link">Registation</router-link> 
    </li>
    <li class="nav-item active" v-show="status">
      <a class="nav-link" @click="logout" style="cursor:pointer">Logout</a>
    </li>
    <li class="nav-item active">
     <router-link to="/Cart" class="nav-link visible">Cart<span class="badge badge-danger">{{length}}</span></router-link>
    </li>
  </ul>
    <!-- search button -->
    <form class="form-inline my-2 my-lg-0" @submit.prevent = "search(keyword)">
      <input class="form-control mr-sm-2" type="search" aria-label="Search" name="search" :placeholder="'Hello '+username" v-model="keyword">
      <button class="btn btn-outline-dark my-2 my-sm-0" type="submit">Search</button>
    </form>
  </div>
</nav>
    <!-- end -->
<router-view/>
</div>
</template>
<style scoped>
@media only screen and (max-width:400px){
  .title{
    display:none;
  }
  .visible{
    display: none;
  }
  .hidden{
    display:inline !important;
  }
}
  .hidden{
    display: none;
  }
  #nav a {
    font-family: sans-serif;
    color:gray;
  }
  #nav a.router-link-exact-active {
    color:darkgray;
  }
</style>
<script>

import { firebase } from '@firebase/app'
import '@firebase/auth'

export default{
  data(){
    return{
      status:'',
      length:0,
      admin:'',
      username:'',
      keyword:'',
    }
  },
  created(){
    //take action based user state change
    firebase.auth().onAuthStateChanged(user=>{
      if(user){
        this.status = true
        user.getIdTokenResult().then(data=>{
          console.log(data.claims.admin)
        })
       this.username = user.email.slice(0,user.email.lastIndexOf('@'))
      }
      else{
        this.status =false
      }
    })
    //this is data is coming from details.vue with nothing but call
    this.$root.$on('cart_length',()=>{
      this.get();
    })
    // updating data in the navbar cart from cart.vue
    this.$root.$on('repid',()=>{
      this.get();
    })

  },
  mounted(){
    //get the cart length to show in navbar
     if(localStorage.getItem('cart')){
        var items = JSON.parse(localStorage.getItem('cart'))
    }
     if(items){
      this.length = items.length
     }
     else{
      this.length=0
     }
  },
  methods:{
    //logout funcs
    logout(){
      var logout = confirm('are you sure??')
      if (logout) {
        firebase.auth().signOut().then(console.log('signOut'))
      }
    },
    //call the mounted again technically for the live react,its an overwrite of mounted
    get(){
    if(localStorage.getItem('cart')){
        var items = JSON.parse(localStorage.getItem('cart'))
    }
     if(items){
      this.length = items.length
     }
     else{
      this.length=0
     }
    },
    //get the keyword and push it to home.vue
    search(keyword){
      this.$root.$emit('search',keyword)
      this.keyword = ''
    }
  }
}
</script>
