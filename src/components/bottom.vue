<template>
  <audio controls="controls" autoplay="autoplay" :src="this.musicurl" loop="loop"></audio>
</template>

<script>
import eventbus from "@/eventbus";
export default {
  name: "bottom",
  data(){
    return{
      musicurl:''
    }
  },
  mounted() {
    eventbus.$on('myurl',data=>{
      this.musicurl = data
    })
    eventbus.$on('myurl1',data=>{
      this.musicurl = data
    })
    eventbus.$on('myurl2',data=>{
      this.musicurl = data
    })
    eventbus.$on('myurl3',data=>{
      this.musicurl = data
    })
  }
}
</script>

<style>
audio{
  position: fixed;
  bottom: 0;
  left:0;
  width: 100%;
  border-radius: 0;
  height: 100px;
  background-color: #ededed;
}
</style>