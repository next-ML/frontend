<template>
<div class="fillcontain">
  <head-top></head-top>
  <el-row style="height: calc(100vh - 52px);">
    <el-col style="height: 100%;" :span="4">
      <dataset-bar></dataset-bar>
    </el-col>
    <el-col :span="20" class="background">
      <menu-bar></menu-bar>
    </el-col>
  </el-row>
</div>
</template>

<script>
import HeadTop from "~/components/headTop"
import MenuBar from "~/components/menuBar"
import DatasetBar from "~/components/datasetBar"

export default {
  components: {
    "head-top": HeadTop,
    "menu-bar": MenuBar,
    "dataset-bar": DatasetBar
  },
  data() {
    return {
      count: 0
    };
  },
  methods: {
    
  },
  
};
</script>

<style scoped>
.background{
  background-color: rgba(218, 228, 236, 0.3);
}

</style>