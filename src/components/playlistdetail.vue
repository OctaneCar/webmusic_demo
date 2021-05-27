<template>
<div id="Container">
  <div id="topbox">
    <div>
      <img :src="list.coverImgUrl" alt="" class="img">
    </div>
    <div id="title">
    <div>
      <h3>{{ list.name }}</h3>
    </div>
    <div id="imgbox">
      <img :src="this.creator.avatarUrl" alt="" class="img1">
      <span style="margin-left: 10px;font-size: 17px" >{{ this.creator.nickname }}</span>
      <span style="margin-left: 15px">2021-05-24 创建</span>
    </div>
    <div id="tagbox">
      <span>标签：</span>
      <ul>
        <li v-for="(item,index) of list.tags" :key="index">{{item}}</li>
      </ul>
    </div>
    <div style="margin-top: 10px">
      <span>简介：</span>
      <span>{{this.creator.signature}}</span>
    </div>
    </div>
  </div>
  <el-tabs v-model="activeName">
  <el-tab-pane label="歌曲列表" name="list">
    <table  class="el-table">
    <thead>
    <th></th>
    <th></th>
    <th>歌名</th>
    <th>歌手</th>
    <th>专辑</th>
    <th>时长</th>
    </thead>
    <tbody>
    <tr class="el-table__row" v-for="(data, index) in list.tracks" :key="index" @dblclick="toPlay(data.id)">
      <td>{{index+1}}</td>
      <td><img :src="data.al.picUrl" alt="" class="img2"></td>
      <td><span>{{data.name}}</span></td>
      <td>{{data.ar[0].name}}</td>
      <td>{{data.al.name}}</td>
      <td>{{data.dt | time}}</td>
    </tr>
    </tbody>
    </table>
  </el-tab-pane>
<!--  <el-tab-pane label="评论" name="comment">-->
<!--    <table class="el-table">-->
<!--      <tbody>-->
<!--      <tr>-->
<!--        <td>1</td>-->
<!--      </tr>-->
<!--      </tbody>-->
<!--    </table>-->
<!--  </el-tab-pane>-->
  </el-tabs>
</div>
</template>

<script>
import axios from "axios";
import eventbus from "@/eventbus";

export default {
  name: "playlistdetail",
  data(){
    return{
      activeName: 'list',
      list: [],
      creator: []
    }
  },
  created() {
    axios({
      url: 'https://autumnfish.cn/playlist/detail',
      methods: 'get',
      params: {
        id: this.$route.query.value
      }
    }).then(res=>{
      this.list = res.data.playlist
      this.creator = res.data.playlist.creator
    })
    // axios({
    //   url: 'https://autumnfish.cn/comment/hot',
    //   methods: 'get',
    //   params: {
    //     id: this.$route.query.value,
    //     type: 2
    //   }
    // }).then(res=>{
    //   console.log(res)
    // })
  },
  methods:{
    toPlay(id){
      axios({
        url: 'https://autumnfish.cn/song/url',
        methods: 'get',
        params: {
          id
        }
      }).then(res => {
        let myurl = res.data.data[0].url
        eventbus.$emit('myurl3', myurl)
      })
    }
  },
  filters: {
    time: function (value) {
      let sec = parseInt(value / 1000 % 60)
      if (sec < 10) {
        sec = '0' + sec
      }
      return `${parseInt(value / 1000 / 60)}:${sec}`
    }
  }
}
</script>

<style scoped>
#Container{
  margin: 100px 150px 100px 150px;
}
#topbox{
  display: flex;
}
#title{
  display: flex;
  flex-direction: column;
  margin-left: 20px;
}
.img{
  width: 230px;
  height: 230px;
  border-radius: 5px;
}
.img1{
  width: 35px;
  height: 35px;
  border-radius: 50%;
}
#imgbox{
  display: flex;
  align-items: center;
  margin: 20px 0;
}
#tagbox{
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}
ul{
  display: flex;
  align-items: center;
  list-style: none;
}
ul li{
  margin: 0 3px;
}
.img2{
  width: 70px;
  height: 70px;
  border-radius: 5px;
}
.el-table__row{
  cursor: pointer;
}
</style>