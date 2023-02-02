

<template>
  
<!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
<!-- <Index /> -->
<LoginIndex />



</template>
<script>

import HelloWorld from './components/HelloWorld.vue'
import Index from './components/index.vue'
import LoginIndex from './components/LoginIndex.vue'
export default {
  name:'App',
  components:{
    HelloWorld,
    Index,
    LoginIndex,
  }
}

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  /* color: #2c3e50; */
  /* margin-top: 60px; */

}
</style>
