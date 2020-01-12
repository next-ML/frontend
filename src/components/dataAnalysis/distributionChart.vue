<template>
<div class="fillcontain">
  <chart class="chart-place" 
        ref="dispChart" 
        autoresize
        :options="options">
  </chart>
</div>
</template>

<script>
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/markLine'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/title'
import 'echarts/lib/component/markPoint'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/toolbox'

export default {
  name: "DistributionChart",
  computed: {
    options() {
      return {
      title : {
          text: "分布图",
          subtext: '直观展示属性的分布情况'
        },
        tooltip : {
          trigger: 'axis'
        },
        legend: {
          data:['male','female']
        },
        toolbox: {
          show : true,
          feature : {
            dataView : {show: true, readOnly: false},
            magicType : {show: true, type: ['line', 'bar']},
            restore : {show: true},
            saveAsImage : {show: true}
          }
        },
        calculable : true,
        xAxis: [
          {
            type : 'category',
            data : ['a','b', 'c', 'd', 'e', 'f', 'g', 'h']
          }
        ],
        yAxis: [
          {
            type : 'value'
          }
        ],
        series: [
          {
            name:'蒸发量',
            type:'bar',
            data:[2, 28, 38, 52, 45, 42, 13, 2],
            markPoint : {
              data : [
                {type : 'max', name: '最大值'},
                {type : 'min', name: '最小值'}
              ]
            },
            markLine : {
              data : [
                {type : 'average', name: '平均值'}
              ]
            }
          },
          {
            name:'降水量',
            type:'bar',
            data:[6, 28, 70, 175, 18, 14, 2, 1],
            markPoint : {
              data : [
                {name : '年最高', value : 182.2, xAxis: 7, yAxis: 183},
                {name : '年最低', value : 2.3, xAxis: 11, yAxis: 3}
              ]
            },
            markLine : {
              data : [
                {type : 'average', name : '平均值'}
              ]
            }
          }
        ]
      }
    }
  }
}
</script>

<style scoped>
.chart-place {
  width: 100%;
  height:calc(100vh - 150px);
}
</style>