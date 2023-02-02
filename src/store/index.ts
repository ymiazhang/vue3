import Vue from 'vue'
import Vuex from 'vuex'
import { createStore } from 'vuex'

const module = {
  //贮存值
  state: {
    name: '徐凤年' //取值方式为$store.state.a.name
  },
  //异步方法
  actions: {
    aUpdateName(context) {
      setTimeout(() => {
        context.commit('updateName')
      }, 1000)
    }
  },
  mutations: {
    updateName() {//提交方式还是$store.commit('updateName')，不能与其他地方的方法同名。
    }
  },
  getters: {
    fullName(state: any) {//使用方式还是this.$store.getters.fullName
      console.log(state);
    },
    fullName2(state: any, getters: any, rootState: any) {//state是当前模块的状态，getters是当前模块的getters方法，rootState是根模块的状态
      console.log((state + getters + rootState));
    }
  },



}
export default createStore({
  state: {
    counter: 1000,
    info: {
      name: '李纯罡',
      age: 40,
      height: 1.5
    },
    
  },
  actions: {//用于处理异步方法，调用mutations的方法
    aupdateInfo(context, payload) {
      console.log(payload);
      setTimeout(() => {
        context.commit('updateInfo',payload)
      }, 2000)
    }
  },
  mutations: {//mutations中的方法必须是一个同步方法
    increment(state) {//state即是store.state对象
      state.counter++
    },
    decrement(state) {
      state.counter--;
    },
    incrementCount(state, num) {//这里的第二个参数就是用户传过来的参数，称为载荷(Payload)。可以是一个变量，也可以是一个对象，用于传递多个参数。
      state.counter += num;
    },
    updateInfo(state,string) {
      state.info.name = string ;
      // Vue.set(state.info,'address','洛杉矶')
      // this.set(state.info,'address','洛杉矶')
      // state.info.set()
    }
  },
  getters: {//作用与计算属性相同，用于返回经过某种处理后的数据
    powerCounter(state) {
      return state.counter * state.counter;
    },
    powerCounter2(state, getters) {//注意第二个参数值指的就是getters，与命名无关。
      return getters.powerCounter + 1;
    },
    customCounterNum(state) {
      return (num: number) => state.counter = num;//返回一个函数
      // return function (num) {
      //     return state.counter = num;
      // }
    }
  },
  modules: {//用于模块化的管理state数据，这个模型中的数据最终还是会加入到上面的根的state中。
    a: module
  }


})