<template>
<div>
   <section style="margin: 30px 30px;text-align: center;">
    <ul class="list-group">
        <li class="list-group-item">Check your items here</li>
        <p class="badge badge-danger">{{message}}</p>
    </ul>
  </section>
    <!-- items view -->
    <section class="container">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">No.</th>
              <th scope="col">Items</th>
              <th scope="col">Name</th>
              <th scope="col">price</th>
              <th scope="col">Quantity</th>
            </tr>
          </thead>
          <tbody v-for="(item,index) in cart" :key="index">
            <tr>
              <th scope="row">{{index + 1}}</th>
              <td><img :src="item.image1" alt="image" style="width:50px;"></td>
              <td>{{item.name}}</td>
              <td>{{item.price}}৳</td>
              <td><input type="number" placeholder="1" class="quan" v-model="quantity[index]" min="1" max="20"><input class="btn btn-sm btn-danger" type="submit" @click="remove(index)" value="remove"></td>
            </tr>
          </tbody>
          <tr>
             <th scope="row">#</th>
              <td><b>Total-price</b></td>
              <td></td>
              <td>{{totalPrice}}৳</td>
              <td></td>
            </tr>
        </table>
    </section>
    <div style="text-align:center">
        <button class="btn btn-success" @click="checking()">Checking</button>
    </div>

</div>
</template>
<style scoped>
  .quan{
    width: 40px;
    height: 20px;
    font-size: 15px;
  }
  .btn-sm{
    margin-left: 10px;
    width: 50px;
    font-size: 10px;
    text-align: center;
  }
</style>
<script>
import { firebase } from '@firebase/app'
import '@firebase/auth'
export default {
  data(){
    return{
      cart:[],
      totalprice:0,
      message:'',
      quantity:[],
    }
  },
  mounted(){
    //get the cart from localstorage
    if(localStorage.getItem('cart')){
      this.cart = JSON.parse(localStorage.getItem('cart'))
    }

  },
  computed:{
    //sum total
    totalPrice(){
     this.cart.forEach(data=>{
      var price = parseFloat(data.price)
      this.totalprice = this.totalprice + price
    })
     return this.totalprice;
    }
  },
  methods:{
    checking(){
      //if !authenticated return to the login page for login or register
    if(this.cart.length > 0){
      firebase.auth().onAuthStateChanged(user=>{
        if(user){
          this.savecart();
          this.$router.replace({name:'Checkout'})
        }
        else{
          this.$router.replace({name:'Register'})
        }
      })
    }
    else{
      this.message ='Your cart is empty!! you should order something form our awesome products'
    }

    },
    //save the cart mainly here this is called from the checking method
    savecart(){
      //create a quantity property on the cart as there was nothing
        for(let key in this.cart){
        this.cart[key].quantity = this.quantity[key]
        }
        var TotalPrice ={'totalprice':this.totalprice}
        var check =[this.cart,TotalPrice];
        var cart_parsed = JSON.stringify(check)
        localStorage.setItem('prepared_cart',cart_parsed)
    },
    //simply remove the product from the cart and update it
    remove(index){
      this.cart.splice(index,1)
      var cart_parsed = JSON.stringify(this.cart)
      localStorage.setItem('cart',cart_parsed)
      this.$root.$emit('repid')
    }
}
}
</script>