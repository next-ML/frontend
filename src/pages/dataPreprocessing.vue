<template>
<div>
  <el-image
      style="width: 80%; height: 80%"
      :src="underConstructionImg"
      :fit="fit"></el-image>
</div>
</template>

<script>
	import headTop from '../components/headTop'
    export default {
    	components: {
    		headTop,
      },
      data() {
        return {
          underConstructionImg: require("~/assets/underConstruction.jpg")
        }
      }
    }
</script>

<style lang="less">
	.explain_text{
		margin-top: 20px;
		text-align: center;
		font-size: 20px;
		color: #333;
	}
</style>