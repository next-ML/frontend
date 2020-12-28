<template>
<div>
  <el-image
      style="width: 80%; height: 80%"
      :src="underConstructionImg"
      :fit="fit"></el-image>
</div>
</template>

<script>
export default {
  data() {
    return {
      underConstructionImg: require("~/assets/underConstruction.jpg")
    }
  }
}
</script>

<style scoped>
  
</style>