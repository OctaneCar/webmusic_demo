<template>
<div id="main-box">
  <div id="left-box">
    <div id="video">
      <video :src="url" controls></video>
    </div>
    <div id="avatar-box">
      <div id="avatar-box1">
        <img :src="artists.picUrl" alt="" style="width: 100% ;border-radius: 50%">
      </div>
      <span>{{mvinfo.artistName}}</span>
    </div>
    <div id="title-box">
      <h3>{{mvinfo.name}}</h3>
    </div>
    <div id="footerInfo-box">
      <span>发布：{{mvinfo.publishTime}}</span>
      <span style="padding-left: 25px">播放量:{{mvinfo.playCount}}</span>
    </div>
  </div>
  <div id="right-box">
    <div v-for="(data,index) in mvList" :key="index" id="right-box1" @click="toPlay(data.id)">
      <div id="img-box">
        <img :src="data.cover" alt="" style="width: 100%;border-radius: 5px">
      </div>
      <div id="title-box1">
        <h4>{{data.name}}</h4>
        <span style="color: #c5c5c5">{{data.artistName}}</span>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from "axios";

export default {

  name: "mvdetail",
  data(){
    return{
      url:'',
      mvList: [],
      mvinfo: [],
      artists: [],
      singerId:''
    }
  },
  methods:{
    toPlay(id){
      axios({
        url: 'https://autumnfish.cn/mv/url',
        methods: 'get',
        params: {
          id
        }
      }).then(res=>{
        this.url = res.data.data.url
      })
    }
  },
  created() {
    let id = this.$route.query.value
    axios({
      url: 'https://autumnfish.cn/mv/url',
      methods: 'get',
      params: {
        id
      }
    }).then(res=>{
      this.url = res.data.data.url
    })

    axios({
      url: 'https://autumnfish.cn/simi/mv',
      methods: 'get',
      params: {
        mvid: id
      }
    }).then(res=>{
      this.mvList = res.data.mvs
    })

    axios({
      url: 'https://autumnfish.cn/mv/detail',
      methods: 'get',
      params: {
        mvid: id
      }
    }).then(res=>{
      this.mvinfo = res.data.data
      this.singerId = res.data.data.artistId
      axios({
        url: 'https://autumnfish.cn/artists',
        methods: 'get',
        params: {
          id: this.singerId
        }
      }).then(res=>{
        console.log(res)
        this.artists = res.data.artist
      })
    })


  }
}
</script>

<style scoped>
#main-box {
  margin: 100px 250px;
  display: flex;
}
#video{
  height: 390px;
  width: 700px;
  margin-right: 150px;
}
video{
  border-radius: 5px;
  height: 100%;
  width: 100%;
  outline: none;
}
#right-box{
  display: flex;
  flex-wrap: wrap;
}
#right-box1{
  display: flex;
  align-items: center;
  width: 100%;
  cursor: pointer;
  padding-top: 10px;
}
#img-box{
  width: 180px;
}
#title-box1{
  flex: 1;
  padding-left: 10px;
}
#avatar-box{
  display: flex;
  align-items: center;
  margin: 10px 0;
}
#avatar-box1{
  width: 80px;
  height: 80px;
  margin-right: 10px;
}
#footerInfo-box{
  margin-top: 10px;
  font-size: 14px;
  color: #bebebe;
}
</style>