<template>
  <div>
    <el-button>Default</el-button>

    <div>名字：{{username}}</div>
    <div class="header">


      <div class="header-t" v-for="item in appList" :key="item.stuId">
        <div class="header-r">{{ item.stuName }}</div>
        <div>{{ item.stuSex }}</div>
        <div>{{ item.stuAge }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { onMounted } from "vue";
import { list } from "../axios/api";
import { ref,reactive } from "vue";
export default {
  
  setup(props) { 
    let appList = ref(null);
    let username = ref(null)
    onMounted(async () => {
      let data = await axios
        .get("src/data/dataceshi.json", {})
        .then(function (response) {
          console.log(response);
          appList.value = response.data;
          console.log(appList);
        });
    });
    username = props.username
    console.log(username)
    return {
      appList,
    };
  },
  props:['username'],
};
</script>

<style lang="less" scoped>
.header {
  width: 450px;
  // height: 60px;
  display: flex;
  margin: 0 auto;
  border: 1px solid #efefef;
  justify-items: center;
  // justify-content: space-between;
  .header-t {
    // width: 100%;
    border-right: 1px solid #ccc;

    div {
      border-bottom: 1px solid #ccc;
    }
    :last-child{
      border-bottom:none;
    }
    

  }
  .header-t:last-child {
    border-right: none;
  }
}
</style>

