<script>
import { list } from "../axios/api";
import axios from "axios";
import { useRouter } from "vue-router";
import User from './home.vue';
import Login from './login.vue'
import { ref,reactive } from "vue";


export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  components:{
    User,
    Login
  },
  setup() {
    const router = useRouter()
    const username = ref('aaaa')

    //子传父

    const addNum = (value) =>{
      //接收子传的值
      console.log(value)
    }

    const show = (index) => {
      if (index == "home") {
        router.push("/home");
      }
      if (index == "login") {
        router.push("/login");
      }
    };
    let message = ref('徐凤年')
    
    return {
      show,username,message,addNum
    };
  },
  

};
</script>

<template>
  <div class="hello">
    <!-- <h1>{{ msg }}</h1> -->
    <div>
      <button @click="show('home')">A页面</button>
      <button @click="show('login')">B页面</button>
    </div>
    <div>{{message}}</div>
   <User :username="username" v-model="message" />
   <Login v-model="message" @add="addNum" />

  </div>
 
</template>

<style lang='less' scoped>

</style>
