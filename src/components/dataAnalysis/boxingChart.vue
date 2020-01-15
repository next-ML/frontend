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
import axios from "axios";
import 'echarts/lib/chart/boxplot'
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
      boxingData: [
        {
          axisData: ["0", "1", "2", "3", "4"],
          boxData:
            [
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
        {
          axisData: ["0", "1", "2", "3", "4"],
          boxData:
            [
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
        {
          axisData: ["0", "1", "2", "3", "4"],
          boxData:
            [
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
        {
          axisData: ["a", "b", "c", "d", "e"],
          boxData:
            [
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
        }
      ],
      topFeatures: [
        "aaa",
        "bbb",
        "ccc",
        "ddd"
      ],
      targetCol: "jinpu_ug_ml",
      loaded: false,
    }
  },
  computed: {
    options() {
      if (!this.loaded) {
        let config = {};
        let that = this;
        config['dataset_name'] = this.$store.state.currentDataset.metadata.name;
        config['chart_type'] = "boxing";
        axios
          .post(["api", this.$store.state.userId, "drawer"].join("/"),
                config,
                 {
                   "content-type":"application/json"
                 })
          .then(function(response) {
            let data = response.data;
            let boxingData = [];
            let topFeatures = [];
            for (const subPlot of data) {
              let axisData = [];
              let boxData = [];
              let outliers = [];
              topFeatures.push(subPlot["name"]);
              for (const bar of subPlot["boxes"]) {
                axisData.push(bar["name"]);
                boxData.push(bar["points"]);
                for (const out of bar["outliers"]) {
                  outliers.push([bar["name"], out])
                }
              }
              boxingData.push({
                axisData: axisData,
                boxData: boxData,
                outliers, outliers
              });
            }
            that.topFeatures = topFeatures;
            that.boxingData = boxingData;
            that.loaded = true;
          })
          .catch(function(error) {
            alert("error: " + error);
          })
      }
      return {
        title: [
          {
            left: '0%',
            text: '盒图',
            subtext: '描绘离散属性与目标属性之间的关联关系'
          },
          {
            right: '55%',
            top: '10%',
            text: this.topFeatures[0] + '-' + this.targetCol + '关联图'
          }, 
          {
            right: '7%',
            top: '10%',
            text: this.topFeatures[1] + '-' + this.targetCol + '关联图'
          },
          {
            right: '55%',
            top: '55%',
            text: this.topFeatures[2] + '-' + this.targetCol + '关联图'
          },
          {
            right: '7%',
            top: '55%',
            text: this.topFeatures[3] + '-' + this.targetCol + '关联图'
          }
        ],
        tooltip: {
        trigger: 'item',
        axisPointer: {
            type: 'shadow'
        }
      },
      grid: [
          {x: '7%', y: '16%', width: '38%', height: '32%'},
          {x2: '7%', y: '16%', width: '38%', height: '32%'},
          {x: '7%', y2: '7%', width: '38%', height: '32%'},
          {x2: '7%', y2: '7%', width: '38%', height: '32%'}
      ],
      xAxis: [
        {
          type: 'category',
          gridIndex: 0,
          data: this.boxingData[0].axisData,
          boundaryGap: true,
          nameGap: 30,
          xAxisIndex: 0,
          yAxisIndex: 0,
          splitArea: {
              show: false
          },
          splitLine: {
              show: false
          },
          name: this.topFeatures[0],
          nameLocation: "center"
        },
        {
          type: 'category',
          gridIndex: 1,
          data: this.boxingData[1].axisData,
          boundaryGap: true,
          nameGap: 30,
          xAxisIndex: 1,
          yAxisIndex: 1,
          splitArea: {
              show: false
          },
          splitLine: {
              show: false
          },
          name: this.topFeatures[1],
          nameLocation: "center"
        },
        {
          type: 'category',
          gridIndex: 2,
          data: this.boxingData[2].axisData,
          boundaryGap: true,
          nameGap: 30,
          xAxisIndex: 2,
          yAxisIndex: 2,
          splitArea: {
              show: false
          },
          splitLine: {
              show: false
          },
          name: this.topFeatures[2],
          nameLocation: "center"
        },
        {
          type: 'category',
          gridIndex: 3,
          data: this.boxingData[3].axisData,
          boundaryGap: true,
          nameGap: 30,
          xAxisIndex: 3,
          yAxisIndex: 3,
          splitArea: {
              show: false
          },
          splitLine: {
              show: false
          },
          name: this.topFeatures[3],
          nameLocation: "center"
        },
      ],
      yAxis: [
        {
          type: 'value',
          gridIndex: 0,
          splitArea: {
              show: true
          },
          name: this.targetCol
        },
        {
          type: 'value',
          gridIndex: 1,
          splitArea: {
              show: true
          },
          name: this.targetCol
        },
        {
          type: 'value',
          gridIndex: 2,
          splitArea: {
              show: true
          },
          name: this.targetCol
        },
        {
          type: 'value',
          gridIndex: 3,
          splitArea: {
              show: true
          },
          name: this.targetCol
        },
      ],
      series: [
        {
          name: 'boxplot',
          type: 'boxplot',
          xAxisIndex: 0,
          yAxisIndex: 0,
          data: this.boxingData[0].boxData,
          tooltip: {
            formatter: function (param) {
              return [
                  '取值 ' + param.name + ': ',
                  '上界: ' + param.data[5],
                  '3/4分位数: ' + param.data[4],
                  '中位数: ' + param.data[3],
                  '1/4分位数: ' + param.data[2],
                  '下界: ' + param.data[1]
              ].join('<br/>');
            }
          }
        },
        {
          name: 'boxplot',
          type: 'boxplot',
          xAxisIndex: 1,
          yAxisIndex: 1,
          data: this.boxingData[1].boxData,
          tooltip: {
            formatter: function (param) {
              return [
                  '取值 ' + param.name + ': ',
                  '上界: ' + param.data[5],
                  '3/4分位数: ' + param.data[4],
                  '中位数: ' + param.data[3],
                  '1/4分位数: ' + param.data[2],
                  '下界: ' + param.data[1]
              ].join('<br/>');
            }
          }
        },
        {
          name: 'boxplot',
          type: 'boxplot',
          xAxisIndex: 2,
          yAxisIndex: 2,
          data: this.boxingData[2].boxData,
          tooltip: {
            formatter: function (param) {
              return [
                  '取值 ' + param.name + ': ',
                  '上界: ' + param.data[5],
                  '3/4分位数: ' + param.data[4],
                  '中位数: ' + param.data[3],
                  '1/4分位数: ' + param.data[2],
                  '下界: ' + param.data[1]
              ].join('<br/>');
            }
          }
        },
        {
          name: 'boxplot',
          type: 'boxplot',
          xAxisIndex: 3,
          yAxisIndex: 3,
          data: this.boxingData[3].boxData,
          tooltip: {
            formatter: function (param) {
              return [
                  '取值 ' + param.name + ': ',
                  '上界: ' + param.data[5],
                  '3/4分位数: ' + param.data[4],
                  '中位数: ' + param.data[3],
                  '1/4分位数: ' + param.data[2],
                  '下界: ' + param.data[1]
              ].join('<br/>');
            }
          }
        },
        {
          name: 'outlier',
          type: 'scatter',
          xAxisIndex: 0,
          yAxisIndex: 0,
          data: this.boxingData[0].outliers
        },
        {
          name: 'outlier',
          type: 'scatter',
          xAxisIndex: 1,
          yAxisIndex: 1,
          data: this.boxingData[1].outliers
        },
        {
          name: 'outlier',
          type: 'scatter',
          xAxisIndex: 2,
          yAxisIndex: 2,
          data: this.boxingData[2].outliers
        },
        {
          name: 'outlier',
          type: 'scatter',
          xAxisIndex: 3,
          yAxisIndex: 3,
          data: this.boxingData[3].outliers
        },
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