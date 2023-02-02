<template>
  <div>
    <h2>{{ store.state.info.name }}</h2>
    <el-button @click="handeClick" type="primary" plain>Primary</el-button>
    <el-button @click="decrement" type="danger" plain>Danger</el-button>
    <el-button @click="incrementCount(10)" type="success">Success</el-button>
    <el-button @click="updateInfo('徐凤年')" type="warning">Warning</el-button>
    <el-button @click="aupdateInfo('邓太阿')" type="Info">info</el-button>
    <el-button @click="changeCounter" type="Info">Counter</el-button>
    <div>{{ store.state.counter }}</div>
    <div>{{ store.getters.powerCounter}}</div>
    <el-input v-model="input" placeholder="Please input" />
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { useStore } from "vuex";
let store = useStore();
let input = ref("");
// console.log(input)
// console.log(store);
const changeCounter = () =>{
  //  store.getters.powerCounter
}

const aupdateInfo = (value: any) => {
  store.dispatch("aupdateInfo", value);
};
const handeClick = () => {
  store.commit("increment");
};
const decrement = () => {
  store.commit("decrement");
};
const incrementCount = (value: any) => {
  store.commit("incrementCount", value);
};
const updateInfo = (value: any) => {
  store.commit("updateInfo", value);
};
</script>