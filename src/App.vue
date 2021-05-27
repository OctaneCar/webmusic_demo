<template>
    <div>
    <top></top>
    <container></container>
    <bottom></bottom>
    </div>
</template>

<script>
import top from "@/components/top";
import container from "@/components/container";
import bottom from "@/components/bottom";
export default {
  components:{
      top,
      container,
      bottom
}
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
</style>
