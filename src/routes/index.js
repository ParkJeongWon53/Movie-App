import { createRouter, createWebHashHistory } from 'vue-router'
import Home from './Home.vue'
import Movie from './Movie.vue'
import About from './About.vue'


export default createRouter({ 
  // Hash모드
  // https://google.com/#/search
  history: createWebHashHistory(),
  
  // pages
  // https://google.com/
  routes: [
    {
      path:'/',
      component: Home
    },
    {
      path:'/movie/:id',
      component: Movie
    },
    {
      path:'/about',
      component: About
    }
  ]
})