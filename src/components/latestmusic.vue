<template>
<div id="musiccontainer">
  <div id="mytag">
    <span class="item"   :class="{active:tag===0}" @click="tag=0">全部</span>
    <span class="item"   :class="{active:tag===7}" @click="tag=7">华语</span>
    <span class="item"   :class="{active:tag===96}" @click="tag=96">欧美</span>
    <span class="item"   :class="{active:tag===16}" @click="tag=16">日韩</span>
  </div>
  <table>
    <thead>
    <th></th>
    <th></th>
    <th>歌名</th>
    <th>歌手</th>
    <th>专辑</th>
    <th>时长</th>
    </thead>
    <tbody>
      <tr v-for="(data,index) in playlist" :key="index" @dblclick="playmusic(data.id)">
        <td>{{index+1}}</td>
        <td><div><img :src="data.album.picUrl" alt=""></div></td>
        <td><div style="margin-left: 250px"><span>{{data.name}}</span></div></td>
        <td><div style="margin-left: 180px"><span>{{data.album.artists[0].name}}</span></div></td>
        <td><div style="margin-left: 220px"><span>{{data.album.name}}</span></div></td>
        <td><div><p>{{data.duration | datastring('HH:mm')}}</p></div></td>
      </tr>
    </tbody>
  </table>
</div>
</template>

<script>
import axios from "axios";
import eventbus from "@/eventbus";
export default {
  name: "latestmusic",
  data() {
    return {
      playlist: [],
      tag: 0
    }
  },
  methods:{
    playmusic(id){
      axios({
        url:'https://autumnfish.cn/song/url',
        methods: 'get',
        params:{
          id
        }
      }).then(res=>{
        let myurl = res.data.data[0].url
        eventbus.$emit('myurl1',myurl)
      })
    }
  },
  watch:{
    tag(){
      axios({
        url: 'https://autumnfish.cn/top/song',
        methods: 'get',
        params: {
          type: this.tag
        }

      }).then(res => {
        this.playlist = res.data.data
      })
    }
  },
  created() {
    axios({
      url: 'https://autumnfish.cn/top/song',
      methods: 'get',
      params: {
        type: 0
      }
    }).then(res => {
      this.playlist = res.data.data
    })
  },
  filters: {
    datastring: function (value) {
      let sec = parseInt(value/1000%60)
      if (sec < 10) {
        sec = '0'+sec
      }
      return `${parseInt(value/1000/60)}:${sec}`
      // return moment(value).format(format)
    }
  }
}
</script>

<style scoped>
#musiccontainer{
  margin-top: 70px;
}
#mytag{
  display: flex;
  justify-content: flex-end;
}
.item{
  font-size: 15px;
  color: grey;
  margin-right: 20px;
  cursor: pointer;
}
.active{
 color: red;
}
img{
  width: 70px;
  height: 70px;
  border-radius: 5px;
}
table{
  margin: 20px 30px;
  border-collapse: collapse;
}
tr:hover{
  background-color: #ededed;
}
</style>