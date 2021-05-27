import Vue from 'vue'
import VueRouter from 'vue-router'
import findmusic from "@/components/findmusic";
import playlist from "@/components/playlist";
import latestmusic from "@/components/latestmusic";
import latestmv from "@/components/latestmv";
import result from "@/components/result";
import playlistdetail from "@/components/playlistdetail";
import mvdetail from "@/components/mvdetail";

Vue.use(VueRouter)

const routes = [
  {
    path :'/findmusic',
    component :findmusic
  },
  {
    path :'*',
    component :findmusic
  },
  {
    path :'/playlist',
    component :playlist
  },
  {
    path :'/latestmusic',
    component :latestmusic
  },
  {
    path :'/latestmv',
    component :latestmv
  },
  {
    path: '/result',
    component: result
  },
  {
    path: '/playlistdetail',
    component: playlistdetail
  },
  {
    path: '/mvdetail',
    component: mvdetail
  }
]

const router = new VueRouter({
  routes
})
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router
