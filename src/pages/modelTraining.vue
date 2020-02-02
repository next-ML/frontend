<template>
  <div>
    <el-card class="box-card" shadow="hover">
      <chart style="width: 100%; height:calc(100vh - 260px);" 
            :options="chartOptionsHistoryLine"></chart>
      <el-row>
        <el-progress :percentage="percentage" :color="customColors"></el-progress>
      </el-row>
    </el-card>
    <training-config></training-config>
  </div>
</template>

<script>
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/markLine'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/title'
import 'echarts/lib/component/markPoint'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/toolbox'

import TrainingConfig from "~/components/trainingConfig"

export default {
  name: "TrainingResult", 
  components: {
    "training-config": TrainingConfig
  },
  data() {
    return {
      chartOptionsHistoryLine: {
        title: {
          text: '训练历史',
          subtext: '记录了每一次的训练结果'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data:['均方误差']
        },
        toolbox: {
          show: true,
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            dataView: {readOnly: false},
            magicType: {type: ['line', 'bar']},
            restore: {},
            saveAsImage: {}
          }
        },
        xAxis:  {
          type: 'category',
          boundaryGap: false,
          data: ['1','2','3','4','5','6','7']
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: '{value}'
          }
        },
        series: [
          {
            name:'均方误差',
            type:'line',
            data:[51, 31, 65, 63, 42, 23, 55],
            markPoint: {
              data: [
                {type: 'min', name: '最小值'}
              ]
            },
            markLine: {
              data: [
                {
                  type: 'average', 
                  name: '平均值',
                },
              ]
            }
          },
        ]
      },
      // 进度条
      percentage: 50,
      customColor: '#409eff',
      customColors: [
        {color: '#f56c6c', percentage: 20},
        {color: '#e6a23c', percentage: 40},
        {color: '#5cb87a', percentage: 60},
        {color: '#1989fa', percentage: 80},
        {color: '#6f7ad3', percentage: 100}
      ]
    }
  },
  methods: {
    format(percentage) {
      return percentage === 100 ? '完成' : `${percentage}%`;
    }
  }
}
</script>