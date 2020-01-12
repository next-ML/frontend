<template>
<div class="fillcontain">
  <chart class="chart-place" 
         ref="boxingChart" 
         autoresize
         :options="options">
  </chart>
</div>
</template>

<script>
import 'echarts/lib/chart/boxplot';
import 'echarts/lib/component/markLine'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/title'
import 'echarts/lib/component/markPoint'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/toolbox'

export default {
  name: "BoxingChart",
  data() {
    return {
      boxingData: {
        axisData: ["0", "1", "2", "3", "4"],
        boxData: [
          [655, 850, 940, 980, 1070],
          [760, 800, 845, 885, 960],
          [780, 840, 855, 880, 940],
          [720, 767.5, 815, 865, 920],
          [740, 807.5, 810, 870, 950]
        ],
        outliers: [
          [0, 650],
          [2, 620],
          [2, 720],
          [2, 720],
          [2, 950],
          [2, 970]
        ]
      },
    }
  },
  computed: {
    options() {
      return {
        title: [
          {
            text: 'Michelson-Morley Experiment',
            left: 'center',
          },
          {
            text: 'upper: Q3 + 1.5 * IQR \nlower: Q1 - 1.5 * IQR',
            borderColor: '#999',
            borderWidth: 1,
            textStyle: {
                fontSize: 14
            },
            left: '10%',
            top: '90%'
          }
        ],
        tooltip: {
        trigger: 'item',
        axisPointer: {
            type: 'shadow'
        }
      },
      grid: {
          left: '10%',
          right: '10%',
          bottom: '15%'
      },
      xAxis: {
          type: 'category',
          data: this.boxingData.axisData,
          boundaryGap: true,
          nameGap: 30,
          splitArea: {
              show: false
          },
          axisLabel: {
              formatter: 'expr {value}'
          },
          splitLine: {
              show: false
          }
      },
      yAxis: {
          type: 'value',
          name: 'km/s minus 299,000',
          splitArea: {
              show: true
          }
      },
      series: [
        {
            name: 'boxplot',
            type: 'boxplot',
            data: this.boxingData.boxData,
            tooltip: {
                formatter: function (param) {
                    return [
                        'Experiment ' + param.name + ': ',
                        'upper: ' + param.data[5],
                        'Q3: ' + param.data[4],
                        'median: ' + param.data[3],
                        'Q1: ' + param.data[2],
                        'lower: ' + param.data[1]
                    ].join('<br/>');
                }
            }
          },
          {
            name: 'outlier',
            type: 'scatter',
            data: this.boxingData.outliers
          }
        ]
      }
    },
  }
}
</script>

<style>
.chart-place {
  width: 100%;
  height:calc(100vh - 150px);
}

</style>