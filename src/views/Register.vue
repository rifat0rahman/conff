<template>
<div class="about">
  <div style="text-align:center;margin:30px">
      <ul class="list-group">
          <li class="list-group-item">
              Register to Confianza and have a great user experience
          </li>
      </ul>
  </div>
   <div style="text-align:center;">
    <p class="badge badge-danger">{{errors}}</p> 
  </div>
  <form @submit.prevent="register" class="mx-auto" style="width: 300px;">
        <div class="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" placeholder="Confianza@gmail.com" v-model="email" required>
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input type="password" class="form-control" id="exampleInputPassword1" name="pass1" placeholder="*******" v-model="password" required>
        </div>
        <div class="form-group form-check" style="text-align:center">
        <button type="submit" class="btn btn-primary">Submit</button>
    </div>
    <div style="text-align:center;">
      <ul class="list-group">
          <p>Have an account already?? <router-link to="/Login">login</router-link>
          </p>
      </ul>
  </div>
  </form>
</div>
</template>
<script>
import { firebase } from '@firebase/app'
import '@firebase/auth'
export default{
  data(){
    return{
      errors:"",
      email:"",
      password:"",
    }
  },
  methods:{
    register(){
      firebase.auth().createUserWithEmailAndPassword(this.email,this.password).then(data=>{
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
