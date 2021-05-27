<template>
  <div class="box">
  <div class="box1">
    <ul>
      <li>
        <router-link to="/findmusic" ><span class="el-icon-headset"></span>发现音乐</router-link>
      </li>
      <li>
        <router-link to="/playlist" ><span class="el-icon-film"></span>推荐歌单</router-link>
      </li>
      <li>
        <router-link to="/latestmusic"><span class="el-icon-sunny"></span>最新音乐</router-link>
      </li>
      <li>
        <router-link to="/latestmv" ><span class="el-icon-caret-right"></span>最新MV</router-link>
      </li>
    </ul>
  </div>
    <div class="box2">
<!--      <findmusic></findmusic>-->
      <router-view></router-view>
    </div>
  </div>
</template>

<script>

export default {
  name: "container"
}
</script>

<style scoped>
.box{
  display: flex;
  height: 830px;
}
.box1 {
  width: 200px;
  background-color: #ededed;
  height: 900px;
  /*position: fixed;*/
}
/*ul li:last-child{*/
/*  margin: 20px 20px 20px 12px!important;*/
/*}*/
.box .box1 li{
  /*margin: 20px;*/
  height: 60px;
  text-align: center;
  list-style: none;
  font-size: 20px;
}
.box2{
  background-color: #ffffff;
  flex: 1;
  overflow-y: scroll
}
a{
  list-style: none;
  text-decoration: none;
  color: black;
  line-height: 60px;
}
.router-link-active{
  color: red;
}
span{
  margin: 10px;
}
.el-icon-caret-right{
  margin-right: 17px
}
.box1 li:hover{
  background-color: #f9f9f9;
}
ul{
  margin-top: 60px;
}
</style>