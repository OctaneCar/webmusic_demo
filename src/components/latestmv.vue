<template>
 <div id="container">
   <div class="zone">
     <ul>
       <span>地区:</span>
       <li :class="{active:area==='全部'}"  @click="area='全部'">全部</li>
       <li :class="{active:area==='内地'}"  @click="area='内地'">内地</li>
       <li :class="{active:area==='港台'}"  @click="area='港台'">港台</li>
       <li :class="{active:area==='欧美'}"  @click="area='欧美'">欧美</li>
       <li :class="{active:area==='日韩'}"  @click="area='韩国'">日韩</li>
     </ul>
   </div>
   <div class="type">
     <ul>
       <span>类型:</span>
       <li :class="{active:type==='全部'}"  @click="type='全部'">全部</li>
       <li :class="{active:type==='官方版'}"  @click="type='官方版'">官方版</li>
       <li :class="{active:type==='原声'}"  @click="type='原声'">原声</li>
       <li :class="{active:type==='现场版'}"  @click="type='现场版'">现场版</li>
       <li :class="{active:type==='网易出品'}"  @click="type='网易出品'">网易出品</li>
     </ul>
   </div>
   <div class="sort">
   <ul>
     <span>排序:</span>
     <li :class="{active:order==='上升最快'}"  @click="order='上升最快'">上升最快</li>
     <li :class="{active:order==='最热'}"  @click="order='最热'">最热</li>
     <li :class="{active:order==='最新'}"  @click="order='最新'">最新</li>
   </ul>
 </div>
   <div id="mvs">
     <div class="item">
      <div class="items" v-for="(data,index) in dataarry" :key="index" @click="toPlay(data.id)">
        <div class="img">
          <img :src="data.cover" alt="">
          <div class="num-warp">
            <div class="el-icon-video-play"></div>
            <div class="num">{{ data.playCount }}</div>
          </div>
        </div>
        <div class="info-warp">
          <div class="name">{{ data.name }}</div>
        </div>
      </div>
     </div>
   </div>
   <div id="pagination">
       <el-pagination
           @current-change="pagechange"
           background
           layout="prev, pager, next"
           :total="total" :current-page="page" :page-size="12">
       </el-pagination>
   </div>
 </div>
</template>

<script>
import axios from "axios";

export default {
  name: "latestmv",
  data() {
    return {
      area: '全部',
      type: '全部',
      order: '上升最快',
      dataarry: [],
      total:0,
      page:1
    }
  },
  methods:{
    getload(){
      axios({
        url: 'https://autumnfish.cn/mv/all',
        methods: 'get',
        params: {
          area: this.area,
          type: this.type,
          order: this.order,
          limit: 12,
          //
          offset: (this.page - 1) * 12
        }
      }).then(res => {
        this.dataarry = res.data.data
        if(res.data.count){
          this.total = res.data.count
        }
        for (let i = 0; i < this.dataarry.length; i++) {
          if (this.dataarry[i].playCount > 100000) {
            this.dataarry[i].playCount = parseInt(this.dataarry[i].playCount / 10000) + '万'
          }
        }
      })
    },
    pagechange(val) {
      this.page = val
      this.getload()
    },
    toPlay(id){
      this.$router.push(`/mvdetail?value=${id}`)
    }
  },
  created() {
    this.getload()
  },
  watch:{

    area(){this.getload(), this.page =1},
    type(){this.getload(), this.page =1},
    order(){this.getload(), this.page =1},
  }
}
</script>

<style scoped>
#container{
  margin: 80px 200px 0 340px;
}
ul{
  list-style: none;
}
ul li{
  display: inline;
  margin: 0 40px;
  cursor: pointer;
  font-size: 14px;
}
.zone{
  margin-bottom: 40px;
}
.type{
  margin-bottom: 40px;
}
.active{
  color: #dd6d60;
  background-color: #fcf6f5;
  border-radius: 20px;
}
.item{
  display: flex;
  flex-wrap: wrap;
}
.items{
  width: 250px;
  cursor: pointer;
  margin-right: 25px;
  margin-bottom: 30px;
}
img{
  width: 100%;
  border-radius: 5px;
}
#mvs{
  margin-top: 20px;
}
.img{
  position: relative;
}
.num-warp{
  position: absolute;
  top: 0;
  right: 0;
  color: #fff;
  font-size: 15px;
  display: flex;
  align-content: center;
  margin-right: 5px;
}
.el-icon-video-play{
  font-size: 18px;
  display: flex;
  align-items: center;
  margin-right: 5px;
}
.el-pagination{
  text-align: center;
}
</style>