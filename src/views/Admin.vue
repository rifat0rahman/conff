<template>
<section>
  <div>
    <div style="text-align:center;margin:10px 50px 10px 50px">
        <ul class="list-group">
            <li class="list-group-item">
                Hello Admin! {{errors}} | <span class="badge badge-danger">{{status}}</span>
            </li>
        </ul>
    </div>
    <!-- main body of admin -->
  <form @submit.prevent="products" class="mx-auto" style="width: 300px;">
        <div class="form-group">
            <label for="exampleInputEmail1">Name</label>
            <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="first_name" placeholder="Confianza" v-model="product.name" required>
        </div>
        <div class="form-group">
            <label for="exampleInputEmail1">Image1</label>
            <input type="file" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="first_name" @change="getimg1"
            accept="image/*">
        </div>
        <div class="form-group">
            <label for="exampleInputEmail1">Image2</label>
            <input type="file" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="first_name"
            @change="getimg2"
            accept="image/*">
        </div>
        <div class="form-group">
            <label for="exampleInputEmail1">Price</label>
            <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="first_name" placeholder="10$" v-model="product.price" required>
        </div>
        <div class="form-group">
            <label for="exampleInputEmail1">Description</label>
            <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="first_name" placeholder="Confianza" v-model="product.description">
        </div>
          <div class="form-group form-check" style="text-align:center">
          <button type="submit" class="btn btn-primary">Submit</button>
      </div>
    </form>
</div>
</section>

</template>
<script>
import { firebase } from '@firebase/app'
import '@firebase/storage'
import axios from 'axios'
export default {
  data(){
    return{
      rawimg1:"",
      rawimg2:"",
      product:{
        name:'',
        price:'',
        image1:'',
        image2:'',
        description:'',
      },
      errors:'wish you all the best',
      status:'upload products'
    }
  },
  mounted(){
    var user = firebase.auth().currentUser;
    user.getIdTokenResult().then(admin=>{
          if(!admin.claims.admin){
            this.$router.replace({name:'Home'})
          }
    })
  },
  methods:{
    //get image
    getimg1(event){
      const image1 =event.target.files[0]
      this.rawimg1 = image1
    },
    getimg2(event){
      const image2 =event.target.files[0]
      this.rawimg2 = image2
    },
    // post data here
    products(){
    firebase.auth().onAuthStateChanged(user=>{
      user.getIdTokenResult().then(admin=>{
        if(admin.claims.admin){
          const image1 =Math.random().toString()+this.rawimg1.name;
          const image2 =Math.random().toString()+this.rawimg2.name;
          firebase.storage().ref('pro_imgs/'+image1).put(this.rawimg1).then(()=>{
            firebase.storage().ref('pro_imgs/'+image1).getDownloadURL().then(data=>{
              this.product.image1 = data
              console.log(this.product.image1)
            }).then(()=>{
              firebase.storage().ref('pro_imgs/'+image2).put(this.rawimg2).then(()=>{
                firebase.storage().ref('pro_imgs/'+image2).getDownloadURL().then(data=>{
                  this.product.image2=data
                  console.log(this.product.image2)
                }).then(()=>{
                axios.post('https://my-ecommerce-1f046.firebaseio.com/products.json',this.product).then(data=>{console.log(data)
                  this.product.name = ''
                  this.product.price = ''
                  this.product.description = ''
                  this.status = 'product uploading done'
                })
                })
              })
            })
          }).catch(err=>{
            this.errors = err.message
            console.log(err.message)
          })
        }
      else{
        this.errors = 'Your are not an admin'
      }
      })
    })
      
    },

  }
}
</script>