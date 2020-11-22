<template>
<section class="container">
<div class="row" v-for="product in search" :key="product.id" v-show="loader">
    <div class="col">
        <div class="card">
          <img :src="product.image1" class="card-img-top">
          <div class="card-body">
            <h5 class="card-title">{{product.name}}</h5>
            <p class="card-text">Price-<b>{{product.price}}৳</b></p>
            <routerLink :to="'/' + product.id" class="btn btn-success">Buy</routerLink>
          </div>
        </div>
    </div>
</div>
<div class="preload" v-show="!loader">
  <img src="../images/preloader2.gif">
</div>
<div style="margin: 30px 30px;text-align: center;">
  <ul class="list-group">
      <p class="badge badge-danger">{{err}}</p>
  </ul>
</div>
</section>
</template>

<style scoped>
 @media only screen and (max-width:400px) {
  h5{
    font-size: 12px;
  }
  .col{
    margin: 3px;
    margin-top: 3px;
    font-size: 10px;
    position: relative;
  }
  .col .card{
    width: 7rem;
    height:24rem;
  }
  .col .card img{
    width:100%;
  }
  .col .card .btn{
    position: absolute;
    bottom:15px;
    left:2rem;
    text-align: center;
  }
  .container{
    text-align: center;
    position: relative;
  }
};
  @media only screen and (max-width:500px) and (min-width: 400px) {
  .col{
    margin: 3px;
  }
  .col .card{
    width:10rem;
    height:25rem;
  }
  .container{
    text-align: center;
  }
};
  .card{
    width:13rem;
  }
  .preload{
    text-align: center;
    background: white;
  }
  .preload img{
    margin-top: 60px;
  }
  .row{
    text-align: center;
    display: inline-block;
  }
  .col{
    margin-bottom: 15px;
    margin: 10px
  }
  .col img{
    height: 224px;
  }

</style>

<script>
import axios from 'axios'
export default {
  data(){
    return {
      products:[],
      loader:false,
      key:'',
      err:''
    }
  },
  created(){
    //grab the search keyword from app.vue
    this.$root.$on('search',keyword=>{
      this.key = keyword
      this.search;
      //what if nothing to the products
      if(this.search.length < 1){
        this.err="Nothing more here for you my friend :(,"
      }
    })
  },
  mounted(){
    axios.get('https://my-ecommerce-1f046.firebaseio.com/products.json').then(data=>{
      return data.data
    }).then(data=>{
      //add an id to the products,whisch is the key of firebase database
      var items = []
      for(let key in data){
        data[key].id = key
        items.push(data[key])
        this.products = items
      }
      //visibility of preloader
      if(this.products){
        this.loader = true
      }
    })
  },
  computed:{
    //my filtered products is on the search comtuped property,I can use it as a main product list.
    search(){
      return  this.products.filter(item=>{
      return item.name.toLowerCase().match(this.key)
    })
  },
}
}
</script>
