<template>
<div class="top">
  <el-row>
    <el-button type="success" icon="el-icon-arrow-left" circle @click="push"></el-button>
    <el-button type="success" icon="el-icon-arrow-right" circle></el-button>
  </el-row>
  <el-input v-model="input" placeholder="今天您想听什么" prefix-icon="el-icon-search" @keyup.enter.native="tosearch()"></el-input>
</div>
</template>

<script>
export default {
  name: "top.vue",
  data() {
    return {
      input: ''
    }
  },
  methods: {
    tosearch() {
      if (this.input === '') {
        this.$notify({
          title: '提示',
          message: '请您输入内容',
          type: 'warning'
        })
      }else {
        //携带搜索框数据传送到result
        this.$router.push(`/result?value=${this.input}`)
      }
    },
    push(){
      this.$router.go(-1)
    }
    }
}
</script>

<style scoped>
.top{
  width: 100%;
  height: 60px;
  background-color: #f9f9f9f9;
  display: flex;
  align-items: center;
  position: fixed;
}
.el-input{
  width: 180px;
  position: absolute;
  right: 20px;

}
.el-row{
  position: absolute;
  left: 80px;
}
</style>