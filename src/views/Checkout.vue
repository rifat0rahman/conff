<template>
<section class="container mx-auto" style="margin:10px;width:500px;">
  <div style="text-align:center;margin:10px">
        <ul class="list-group">
            <li class="list-group-item">
                Please give us your details for ordering.We will meet to soon.
            </li>
            <p class="badge badge-danger">{{message}}</p>
        </ul>
    </div>
  <div class="modal-body">
       <form @submit.prevent="checkout">
        <label >Address</label>
        <input type="text" class="form-control" placeholder="ex:Dhaka,Mirpur10" v-model="Address.address" required>
        <label >Phone</label>
        <input type="text" class="form-control" v-model="Address.phone" placeholder="088+" required>
        <div style="text-align:center;margin:10px">
          <button class="btn btn-success">Check Out</button>
        </div>
      </form>
  </div>
</section>
</template>

<script>
import { firebase } from '@firebase/app'
import '@firebase/auth'
import '@firebase/firestore';
export default {
  data(){
    return{
      cart:null,
      totalprice:null,
      Address:{
        phone:'',
        address:'',
        email:'',
      },
      message:''
    }
  },
  //created for clean code,I could use mounted though
  created(){
    if(localStorage.getItem('prepared_cart')){
      var get= JSON.parse(localStorage.getItem('prepared_cart'))
      this.cart = get[0]
      this.totalprice = get[1].totalprice;
      console.log(this.cart)
    }
  },
  mounted(){
    this.$root.$on('checking',data=>{
      this.cart = data
    })
    firebase.auth().onAuthStateChanged(user=>{
      if(user){
        this.Address.email =user.email
      }
    })
  },
  methods:{
    checkout(){
      //taking infos
      if(this.Address.phone.length == 11){
        if(this.cart != null){
      firebase.firestore().collection('Orders').add({
                      items:this.cart,
                      Address:this.Address,
                      totalprice:this.totalprice
                  }).then(()=>{
                    localStorage.removeItem("prepared_cart")
                    localStorage.removeItem("cart")
                    this.$root.$emit('cart_length')
                    this.$router.replace({name:'Orders'})
                  })
       }
        else{
          this.message = 'We have to register first'
        }
      }
      else{
        this.message = 'invalid phone number.11 digits required'
      }
      
      
    }
  }
}
</script>