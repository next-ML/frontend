<template>
<el-row type="flex" align="middle" class="header-bar">
  <el-col :span="4" class="title" :offset="0">
    智 易
  </el-col>
  <el-col :span="1" :offset="17">
    <div class="block"><el-avatar :size="32" :src="profileUrl"></el-avatar></div>
  </el-col>
  <el-col :span="2" style="position: relative; top: -3px;">
    guest
  </el-col>
</el-row>
</template>

<script>
export default {
   name: "headTop",
   data() {
     return {
       "profileUrl": require("~/assets/profile.png")
     }
   }
}
</script>

<style>
.header-bar {
  color: aliceblue;
  height: 50px;
  background-color: #324057;
}
.title {
  font-size: 26px;
  margin-left: 20px;
}
</style>