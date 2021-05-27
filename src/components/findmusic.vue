<template>
  <div>
    <div class="box1">
    <el-carousel :interval="4000" type="card" indicator-position="none" arrow="never" >
      <el-carousel-item v-for="(data,index) in bannerarry" :key="index">
      <img :src="data.imageUrl" alt="" class="img1">
    </el-carousel-item>
    </el-carousel>
    </div>
    <div class="box2"><h3>推荐歌单</h3></div>
    <div class="item">
      <div class="items" v-for="(list,index) in personalizedarry" :key="index" @click="toplaylist(list.id)">
        <img :src="list.picUrl" alt="" class="img2">
        <div class="text"><span>{{list.name}}</span></div>
      </div>
    </div>
    <div class="latest"><h3>推荐音乐</h3></div>
    <div class="box3">
      <div id="item1" v-for="(song,index) in songs" :key="index">
        <img :src="song.picUrl" alt="" class="img3" @click="clickpic(song.id)">
        <h4>{{song.name}}</h4>
        <span>{{song.song.artists[0].name}}</span>
      </div>
    </div>
    <div class="latestmv"><h3>推荐MV</h3></div>
    <div class="box4">
      <div v-for="(mvlist,index) in mv" :key="index" id="item4" @click="toPlay(mvlist.id)">
        <img :src="mvlist.picUrl" alt="" class="img4">
        <h4 style="font-size: 14px">{{mvlist.name}}</h4>
        <span>{{ mvlist.artistName }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import eventbus from "@/eventbus";
export default {
  name: "findmusic",
  data(){
    return{
      bannerarry:[],
      personalizedarry:[],
      songs:[],
      mv:[]
    }
  },
  methods:{
    clickpic(id){
      axios({
        url:'https://autumnfish.cn/song/url',
        methods: 'get',
        params:{
          id
        }
      }).then(res=>{
        let myurl = res.data.data[0].url
        eventbus.$emit('myurl',myurl)
      })
    },
    toplaylist(id){
      this.$router.push(`/playlistdetail?value=${id}`)
    },
    toPlay(id){
      this.$router.push(`/mvdetail?value=${id}`)
    }
  },
    created() {
      axios({
          url:`https://autumnfish.cn/banner`,
          methods:'get'
      }).then(res=>{
        this.bannerarry = res.data.banners
      })

      axios({
        url:'https://autumnfish.cn/personalized',
        methods:'get',
        params:{limit:10}
      }).then(res=>{
        this.personalizedarry = res.data.result
      })

      axios({
        url:'https://autumnfish.cn/personalized/newsong',
        methods:'get'
      }).then(res=>{
        this.songs = res.data.result
      })

      axios({
        url:'https://autumnfish.cn/personalized/mv',
        methods: 'get'
      }).then(res=>{
        this.mv = res.data.result
      })
    }
}
</script>

<style scoped>
.img1{
  width: 533px;
  height: 230px;
  border-radius: 5px;
}
.el-carousel-item{
  width: 500px;
}
.box1{
  margin: 100px 200px 20px 270px
}
.box2{
  margin:10px 0 20px 350px
}
.item{
  display: grid;
  grid-template-columns: repeat(5,200px);
  grid-column-gap: 20px;
  grid-row-gap:20px;
  justify-content: center;
  align-content: center;
}
.img2{
  width: 200px;
  height: 200px;
  border-radius: 5px;
  cursor: pointer;
}
.text{
  width: 200px;
  overflow: hidden;
  white-space: nowrap;
  font-size: 13px;
}
.img3{
  width: 120px;
  height: 120px;
  border-radius: 5px;
}
.img3:before{
  background-image: url('../assets/logo.png');
}
.latest{
  margin:40px 0 20px 350px
}
.box3{
  display: grid;
  grid-template-columns: repeat(2,200px);
  grid-column-gap: 600px;
  grid-row-gap: 30px;
  justify-content: center;
  align-content: center;
}
#item1{
 width: 300px;
}
#item1:hover{
  background-color: #f9f9f9;
}
.latestmv{
  margin:40px 0 20px 350px
}
.img4{
  width: 250px;
  height: 140px;
  border-radius: 5px;
}
.box4{
  display: flex;
  align-items: center;
  justify-content: center;
}
#item4{
  margin: 0 15px;
  cursor: pointer;
}
</style>