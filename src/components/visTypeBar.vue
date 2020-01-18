<template>
<div>
  <el-menu
    default-active="distribution"
    class="el-menu-vertical-demo"
    @select="selectType">
    <el-menu-item index="distribution">
      <i class="el-icon-s-data"></i>
      <span slot="title">分布分析</span>
    </el-menu-item>
    <el-menu-item index="connection">
      <i class="el-icon-set-up"></i>
      <span slot="title">散点图分析</span>
    </el-menu-item>
    <el-menu-item index="boxing">
      <i class="el-icon-data-analysis"></i>
      <span slot="title">盒图分析</span>
    </el-menu-item>
    <el-menu-item index="covariance">
      <i class="el-icon-share"></i>
      <span slot="title">协方差矩阵</span>
    </el-menu-item>
    <el-menu-item index="importance">
      <i class="el-icon-star-off"></i>
      <span slot="title">权重分析</span>
    </el-menu-item>
  </el-menu>
</div>
</template>

<script>
export default {
  name: "VisTypeBar",
  methods: {
    selectType(type) {
      this.$emit("choseVisType", type);
    }
  }
}
</script>

<style scoped>

</style>