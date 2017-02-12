import Vue from 'vue'
import store from '../store'
import VueRouter from 'vue-router'
import Goods from '../views/Goods'
import GoodsShow from '../views/GoodsShow'
import Photos from '../views/Photos'
import Blogs from '../views/Blogs'
import BlogsShow from '../views/BlogsShow'
import Login from '../views/Login'
import Logon from '../views/Logon'
import Editor from '../views/Editor'
import People from '../views/People'
import PeopleIndex from '../components/people/Index'


Vue.use(VueRouter)

const routes = [
  { path: '/', component: Goods },
  { path: '/goods', component: Goods },
  { path: '/goods/:id', component: GoodsShow },
  { path: '/photos', component: Photos },
  { path: '/blogs', component: Blogs },
  { path: '/blogs/:id', component: BlogsShow },
  { path: '/login', component: Login },
  { path: '/logon', component: Logon },
  { path: '/editor', component: Editor },
  { path: '/people/:id', component: People,
    children: [
      {
        path: '/',
        component: PeopleIndex
      }
    ]
  }
]


const router = new VueRouter({
  mode: 'history',
  routes: routes
})

router.beforeEach((to, from, next) => {
  let toPath = to.path
  let token = store.getters.token
  if(toPath == '/editor'){
    if(token){
      next()
    } else{
      next('/login')
    }
  }
  next()
})

export default router
