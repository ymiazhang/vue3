<template>
  <div>
    <el-button @click="handeClick" type="primary" plain>Primary</el-button>
    <el-button @click="increment" type="danger" plain>Danger</el-button>
    <el-button @click="changeName" type="success">Success</el-button>
    <el-button @click="changeL" type="danger">Danger</el-button>
    <el-button @click="changeNum" type="warning">Warning</el-button>
    <el-button @click="changeaa" type="warning">接口</el-button>
    <div>{{ changeNameObj.name }}:{{ changeNameObj.skill }}</div>
    <div>{{changelObj.name}}:{{changelObj.skill}}</div>
    <div>条数{{total}}</div>
  </div>
</template>

<script>
import { ref, reactive, computed } from "vue";
import axios from "axios";

export default {
  props: {
    modelValue: String,
  },
  emits: ["update:modelValue"],
  setup(props, context) {
    let changeNameObj = ref({
      name: "北凉王",
      skill: "一剑仙人跪",
    });
    let changelObj = reactive({
      name: "李纯罡",
      skill: "两袖青蛇",
    });
    let total = ref(0)
    const changeaa = () =>{
       axios.get('/userinfo').then((res)=>{
         console.log(res)
       })
    }
    const changeNum = ()=>{
       total.value++
    };
    const changeL = () => {
      changelObj.skill = "一剑开天门";
    };
    const changeName = () => {
      changeNameObj.value.skill = "一剑开天门";
    };
    function handeClick() {
      context.emit("update:modelValue", "强");
    }
    const increment = () => {
      context.emit("add", 100);
      // context.emit("add", 100, "aaa", "bbb");
    };
    return {
      handeClick,
      increment,
      changeName,
      changeL,
      changeNum,
      changeNameObj,
      changelObj,
      total,
      changeaa
    };
  },
};
</script>

<style>
</style>