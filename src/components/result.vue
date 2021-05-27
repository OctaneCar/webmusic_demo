<template>
<div id="container">
  <div class="title-warp">
    <h2>{{$route.query.value}}</h2>
    <span style="color: #bebebe;margin-left: 10px">找到{{ this.songsCount }}结果</span>
  </div>
  <el-tabs v-model="activeName">
    <el-tab-pane label="歌曲" name="first">
      <table  class="el-table">
        <thead>
        <th></th>
        <th>音乐标题</th>
        <th>歌手</th>
        <th>专辑</th>
        <th>时长</th>
        </thead>
        <tbody>
        <tr class="el-table__row" v-for="(data,index) in list" :key="index" @dblclick="playsongs(data.id)">
          <td>{{index+1}}</td>
          <td><span class="mvimg">{{data.name}}<div class="el-icon-video-play" v-if="data.mvid!==0"/></span></td>
          <td>{{data.artists[0].name}}</td>
          <td>{{data.album.name}}</td>
          <td>{{ data.duration | datastring }}</td>
        </tr>
        </tbody>
      </table>
    </el-tab-pane>
    <el-tab-pane label="歌单" name="second" >
      <div>
          <div class="box1">
            <div class="box2" v-for="(data,index) in playlist" :key="index" @click="toDetail(data.id)">
              <img :src="data.coverImgUrl" alt="" class="img1"/>
              <span>{{ data.name }}</span>
            </div>
          </div>
      </div>
    </el-tab-pane>
    <el-tab-pane label="MV" name="third">
        <div>
          <div class="mvbox">
            <div class="mvboxindex" v-for="(data,index) in playmvlist" :key="index" @click="toPlay(data.id)">
              <div id="timebox"><img :src="data.cover" alt="" class="img2"/><span id="time">{{data.duration | datastring}}</span><span id="palycount">播放量:{{data.playCount | datasting1}}</span></div>
              <span>{{data.name}}</span>
            </div>
          </div>
        </div>
    </el-tab-pane>
  </el-tabs>
  <div class="pageel">
  <el-pagination
      @current-change="changepage"
      background
      layout="prev, pager, next"
      :total="songsCount" :current-page="page">
  </el-pagination>
  </div>
</div>
</template>

<script>
import axios from "axios";
import eventbus from "@/eventbus";

export default {
    name: "result",
    data() {
      return {
        activeName: 'first',
        list: [],
        playlist: [],
        playmvlist: [],
        songsCount: null,
        page: 1
      }
    },
    methods:  {
      changepage(val) {
        this.page = val
        axios({
          url: 'https://autumnfish.cn/search',
          methods: 'get',
          params: {
            keywords: this.$route.query.value,
            type: 1,
            limit: 10,
            offset: (this.page - 1) * 10
          }
        }).then(res => {
          this.list = res.data.result.songs
        })
        axios({
          url: 'https://autumnfish.cn/search',
          methods: 'get',
          params: {
            keywords: this.$route.query.value,
            type: 1000,
            limit: 15,
            offset: (this.page - 1) * 15
          }
        }).then(res => {
          this.playlist = res.data.result.playlists
        })
        axios({
          url: 'https://autumnfish.cn/search',
          methods: 'get',
          params: {
            keywords: this.$route.query.value,
            type: 1004,
            limit: 12,
            offset: (this.page - 1) * 12
          }
        }).then(res => {
          this.playmvlist = res.data.result.mvs
        })
      },
      playsongs(id) {
        axios({
          url: 'https://autumnfish.cn/song/url',
          methods: 'get',
          params: {
            id
          }
        }).then(res => {
          let myurl = res.data.data[0].url
          eventbus.$emit('myurl2', myurl)

        })
      },
      toDetail(id){
        this.$router.push(`/playlistdetail?vaule=${id}`)
      },
      toPlay(id){
        this.$router.push(`/mvdetail?value=${id}`)
      }
    },
    created() {
      axios({
        url: 'https://autumnfish.cn/search',
        methods: 'get',
        params: {
          keywords: this.$route.query.value,
          type: 1,
          limit: 10
        }
      }).then(res => {
        this.list = res.data.result.songs
        this.songsCount = res.data.result.songCount
      })
    },
    // updated() {
    //   axios({
    //     url: 'https://autumnfish.cn/search',
    //     methods: 'get',
    //     params: {
    //       keywords: this.$route.query.value,
    //       type: 1,
    //       limit: 10
    //     }
    //   }).then(res => {
    //     this.list = res.data.result.songs
    //     this.songsCount = res.data.result.songCount
    //   })
    //   axios({
    //     url: 'https://autumnfish.cn/search',
    //     methods: 'get',
    //     params: {
    //       keywords: this.$route.query.value,
    //       type: 1000,
    //       limit: 15
    //     }
    //   }).then(res => {
    //     this.playlist = res.data.result.playlists
    //   })
    //   axios({
    //     url: 'https://autumnfish.cn/search',
    //     methods: 'get',
    //     params: {
    //       keywords: this.$route.query.value,
    //       type: 1004,
    //       limit: 12
    //     }
    //   }).then(res => {
    //     this.playmvlist = res.data.result.mvs
    //   })
    // },
    filters: {
      datastring: function (value) {
        let sec = parseInt(value / 1000 % 60)
        if (sec < 10) {
          sec = '0' + sec
        }
        return `${parseInt(value / 1000 / 60)}:${sec}`
        // return moment(value).format(format)
      },
      datasting1:function (value) {
        if(value > 100000)
        {
          return `${parseInt(value / 10000)}  万`
        }
        else {
          return value
        }
      }
    },
    watch:{
      activeName(){
        let type = 1
        let limit = 10
        switch (this.activeName) {
              case 'first':
                type = 1;
                limit = 10
                break;
                case 'second':
                  type = 1000;
                  limit = 15;
                  break;
                  case 'third':
                    type = 1004;
                    limit = 12;
                    break;
                      default:
                        break;
        }
        axios({
          url: 'https://autumnfish.cn/search',
          methods: 'get',
          params: {
            keywords: this.$route.query.value,
            type,
            limit
          }
        }).then(res => {
          this.playlist = res.data.result.playlists
          this.playmvlist = res.data.result.mvs
          if (type === 1000){
            this.songsCount = res.data.result.playlistCount
          }else if(type === 1004){
            this.songsCount =  res.data.result.mvCount
          }
          else {
            this.songsCount = res.data.result.songCount
          }
        })
      }
    }

}
</script>

<style scoped>
#container{
  padding: 0 200px
}
.title-warp{
  margin-top: 80px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
}
.el-table thead th{
  font-weight: 400;
}
.el-table tbody td{
  font-size: 16px;
}
.el-table thead th:nth-child(2){
  width: 400px;
}
.pageel{
  display: flex;
  justify-content: center;
  margin-top: 50px;
}
.box1{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.box2{
  width: 200px;
  margin: 5px 30px;
}
.el-icon-video-play{
  padding-left: 10px;
  font-size: 18px;
  cursor: pointer;
  color: red;
}
.mvimg{
  display: flex;
  align-items: center;
}
.img1{
  width: 100%;
  border-radius: 5px;
  cursor: pointer;
}
.img2{
  width: 100%;
  cursor: pointer;
  border-radius: 5px;
}
.mvbox{
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}
.mvboxindex{
  width: 250px;
  margin: 5px 30px;
}
#timebox{
  position: relative;
}
#time{
  color: white;
  position: absolute;
  bottom: 5px;
  right: 5px;
}
#palycount {
  position: absolute;
  top: 0;
  right: 5px;
  font-size: 14px;
  color: white;
}
</style>