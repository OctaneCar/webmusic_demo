<template>
  <div>
  <div class="playlist">
    <div class="topbc">
      <img :src="toparry.coverImgUrl" alt="" style="width: 160px;height: 160px;margin: 20px 0 0 10px; ">
      <div id="bg"><img :src="toparry.coverImgUrl" alt="" ></div>
      <span id="gedan">精品歌单</span>
      <h4 id="title">{{ toparry.name }}</h4>
      <p id="detail">{{ toparry.description }}</p>
    </div>
 </div>
    <div class="tag">
      <span  class="tag1" :class="{active:tag==='全部'}" @click="tag='全部'">全部</span>
      <span  class="tag1" :class="{active:tag==='欧美'}" @click="tag='欧美'">欧美</span>
      <span  class="tag1" :class="{active:tag==='华语'}" @click="tag='华语'">华语</span>
      <span  class="tag1" :class="{active:tag==='流行'}" @click="tag='流行'">流行</span>
      <span  class="tag1" :class="{active:tag==='说唱'}" @click="tag='说唱'">说唱</span>
      <span  class="tag1" :class="{active:tag==='民谣'}" @click="tag='民谣'">民谣</span>
      <span  class="tag1" :class="{active:tag==='电子'}" @click="tag='电子'">电子</span>
    </div>
  <div class="container">
    <div v-for="(list,idnex) in playlist" :key="idnex"  class="box1" @click="toPlay(list.id)">
      <img :src="list.coverImgUrl" alt="" class="img1">
      <p>{{ list.name }}</p>
    </div>
  </div>
    <div class="page">
      <el-pagination
          @current-change="pagechange"
          background
          layout="prev, pager, next"
          :page-size="10"
          :current-page="page"
          :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "playlist",
  data() {
    return {
      toparry: [],
      playlist: [],
      tag: "全部",
      page: 1,
      total: 0
    }
  },
  //监听器：监听函数的改变
  watch: {
    tag() {
      this.page = 1

      axios({
        url: 'https://autumnfish.cn/top/playlist/highquality',
        methods: 'get',
        params: {
          limit: 1,
          cat: this.tag
        }
      }).then(res => {
        this.toparry = res.data.playlists[0]
      })

      axios({
        url: 'https://autumnfish.cn/top/playlist',
        methods: 'get',
        params: {
          limit: 10,
          offset: (this.page - 1) * 10,
          cat: this.tag
        }
      }).then(res => {
        this.playlist = res.data.playlists
        this.total = res.data.total
      })
    }
  },
  methods: {
    pagechange(val) {
      console.log(val)
      this.page = val
      axios({
        url: 'https://autumnfish.cn/top/playlist',
        methods: 'get',
        params: {
          limit: 10,
          offset: (this.page - 1) * 10,
          cat: this.tag
        }
      }).then(res => {
        this.playlist = res.data.playlists
        this.total = res.data.total
      })
    },
    toPlay(id){
      this.$router.push(`/playlistdetail?value=${id}`)
    }
  },
  created() {
    axios({
      url: 'https://autumnfish.cn/top/playlist/highquality',
      methods: 'get',
      params: {
        limit: 1,
        cat: '全部'
      }
    }).then(res => {
      this.toparry = res.data.playlists[0]
    })

    axios({
      url: 'https://autumnfish.cn/top/playlist',
      methods: 'get',
      params: {
        limit: 10,
        offset: (this.page - 1) * 10,
        cat: '全部'
      }
    }).then(res => {
      this.playlist = res.data.playlists
      this.total = res.data.total
    })

  }
}

</script>

<style scoped>
.playlist{
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 70px;
}
.topbc {
  width: 1100px;
  height: 200px;
  position: relative;
  border-radius: 5px;
  word-break: break-all;
  white-space: normal;
  overflow: hidden;
  text-overflow: ellipsis;
}
#gedan{
  padding: 5px 10px;
  border: 2px orange solid;
  color: orange;
  border-radius: 5px;
  position: absolute;
  left: 190px;
  top: 25px;
}
#title{
  position: absolute;
  left: 179px;
  top: 70px;
  color: white;

}
#detail{
  position: absolute;
  left: 185px;
  top: 95px;
  color: white;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 5;

}
#bg{
  position: absolute;
  top: 0;
  width: 100%;
  right: 0px;
  left: 0;
  bottom: 0;
  filter: blur(80px);
}
.container{
  display: grid;
  grid-template-columns: repeat(5,13%);
  justify-content: center;
  align-content: center;
  margin-top: 30px;
  margin-left: 12px;
}
.img1{
  width: 200px;
  height: 200px;
  border-radius: 5px;
  cursor: pointer;
}
.box1{
  width: 200px;
  height: 250px;
}
.tag{
  display: flex;
  justify-content: flex-end;
  padding-top: 30px;
  padding-right: 310px;
}
.tag1{
  margin: 0 15px;
  color: gray;
  cursor: pointer;
}
.active{
  color:#fd7522;
}
.page{
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
}
</style>