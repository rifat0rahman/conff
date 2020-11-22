<template>
<div>
  <div style="text-align:center;margin:30px">
      <ul class="list-group">
          <li class="list-group-item">
              Login to Confianza and have a great user experience
          </li>
      </ul>
  </div>
  <form @submit.prevent="login" class="mx-auto" style="width:300px">
      <div class="form-group">
          <label for="exampleInputEmail1">Email</label>
          <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" placeholder="confianza@gmail.com"
          v-model="email">
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input type="password" class="form-control" id="exampleInputPassword1" name="password" placeholder="*******"
          v-model="password">
      </div>
      <div style="text-align:center;">
          <button type="submit" class="btn btn-primary">Submit</button>
      </div>
  </form>
   <div style="text-align:center;">
    <p class="badge badge-danger">{{errors}}</p> 
  </div>
</div>
</template>

<script>
import { firebase } from '@firebase/app'
import '@firebase/auth'
export default {
    data(){
    return{
      errors:"",
      email:"",
      password:"",
    }
  },
  methods:{
    login(){
      firebase.auth().signInWithEmailAndPassword(this.email,this.password).then(data=>{
          console.log(data)
          this.$router.push('/')
        }).catch(err=>{
          this.errors = err.message
          console.log(err.message)
        })
    }
  }
}
</script>