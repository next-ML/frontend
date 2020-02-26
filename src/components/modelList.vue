<template>
<div class="fillcontain">
  <el-row :gutter="20">
    <el-col :span="18">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span class="card-title">数据集prtides.csv的历史训练结果</span>
          <span class="info-hint">共{{historyInfo.iterations}}轮尝试，最佳结果为:R2={{historyInfo.bestR2}}</span>
        </div>
        <ul>
          <li v-for="model in historyModelList">
            预测目标：{{model.target}}，
            开始时间：{{model.startTime}}，
            用时：{{model.useTime}}，
            评价指标：<span v-for="(value, name) in model.metric">{{name}}</span>，
            <span v-for="(value, name) in model.metric">{{name}}：{{value}}</span>
          </li>
        </ul>
        <el-pagination
          background
          layout="prev, pager, next"
          :total="1000">
        </el-pagination>
      </el-card>
    </el-col>
    <el-col :span="6">
      <el-card class="box-card">
      </el-card>
    </el-col>
  </el-row>
</div>
</template>

<script>

export default {
  name: "ModelList",
  data() {
    return {
      historyInfo: {
        iterations: 10,
        bestR2: 0.92,
      },
      historyModelList: [
        {
          id: "dskjfla321398shnlka",
          target: "jinpu_ug_ml",
          startTime: "921078490421",
          useTime: "13",
          metric: { "R2": "0.74"},
        }
      ]
    }
  },
  computed: {
     
  }
}
</script>

<style scoped>
.card-title {
  font-family:"Microsoft YaHei","微软雅黑","Microsoft JhengHei","华文细黑","STHeiti","MingLiu";
  font-weight: 500;
}
.info-hint {
  font-size: 14px;
  float: right;
}
</style>