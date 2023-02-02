import { createRouter, createMemoryHistory} from 'vue-router';
import Hello from '../components/HelloWorld.vue'
import Home from '../components/home.vue'
import Login from '../components/login.vue'
import News from '../components/News.vue'
import NotFound from '../components/NotFound.vue'
import NewsDetail from '../components/NewsDetail.vue'
import Index from '../components/index.vue'
import LoginIndex from '../components/LoginIndex.vue'
import aaa from '../components/aaa.vue'
import Banner from '../components/banner/banner.vue'


const routes = [
  {
     path:'/',
     component:aaa
  },
  {
     path:'/loginIndex',
     component:LoginIndex
  },
  {
      path:'/index',
      component:Index
  },
  {
     path:'/helloworld',
     component:Hello
  },
  {
      name: 'a',
      path: '/home',
      component: Home
  },
  {
      name: 'b',
      path: '/login',
      component: Login
  },
  {
    path:'/news',
    component: News,
  },
  {
    path:'/newsdetail',
    component:NewsDetail,
  },
  {
    path:'/:path(.*)',
    component:NotFound
  },
  {
    path:'/banner',
    component:Banner
  }
  
];


export default routes