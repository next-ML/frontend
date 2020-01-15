<template>
<div class="fillcontain">
  <chart class="chart-place" 
        ref="connChart" 
        autoresize
        :options="options">
  </chart>
</div>
</template>

<script>
import axios from "axios";
import 'echarts/lib/chart/scatter';
import 'echarts/lib/component/title'
import 'echarts/lib/component/tooltip'

export default {
  name: "ConnectionChart",
  data() {
    return {
      loaded: false,
      dataAll: [
        [
            [10.0, 8.04],
            [8.0, 6.95],
            [13.0, 7.58],
            [9.0, 8.81],
            [11.0, 8.33],
            [14.0, 9.96],
            [6.0, 7.24],
            [4.0, 4.26],
            [12.0, 10.84],
            [7.0, 4.82],
            [5.0, 5.68]
        ],
        [
            [10.0, 9.14],
            [8.0, 8.14],
            [13.0, 8.74],
            [9.0, 8.77],
            [11.0, 9.26],
            [14.0, 8.10],
            [6.0, 6.13],
            [4.0, 3.10],
            [12.0, 9.13],
            [7.0, 7.26],
            [5.0, 4.74]
        ],
        [
            [10.0, 7.46],
            [8.0, 6.77],
            [13.0, 12.74],
            [9.0, 7.11],
            [11.0, 7.81],
            [14.0, 8.84],
            [6.0, 6.08],
            [4.0, 5.39],
            [12.0, 8.15],
            [7.0, 6.42],
            [5.0, 5.73]
        ],
        [
          [8.0, 6.58],
          [8.0, 5.76],
          [8.0, 7.71],
          [8.0, 8.84],
          [8.0, 8.47],
          [8.0, 7.04],
          [8.0, 5.25],
          [19.0, 12.50],
          [8.0, 5.56],
          [8.0, 7.91],
          [8.0, 6.89]
        ]
      ],
      topFeatures: [
        "aaa",
        "bbb",
        "ccc",
        "ddd"
      ],
      targetCol: "jinpu_ug_ml",
      markLineOpt: {
        animation: false,
        label: {
          formatter: 'y = 0.5 * x + 3',
          align: 'right'
        },
        lineStyle: {
          type: 'solid'
        },
        tooltip: {
          formatter: 'y = 0.5 * x + 3'
        },
        data: [[{
          coord: [0, 3],
          symbol: 'none'
        }, {
          coord: [20, 13],
          symbol: 'none'
        }]]
      }
    }
  },
  computed: {
    options() {
      if (!this.loaded) {
        let config = {};
        let that = this;
        config['dataset_name'] = this.$store.state.currentDataset.metadata.name;
        config['chart_type'] = "scatter";
        let topFeatures = [];
        axios
          .post(["api", this.$store.state.userId, "drawer"].join("/"),
                config,
                 {
                   "content-type":"application/json"
                 })
          .then(function(response) {
            let data = response.data;
            let dataAll = [];
            for (const subPlot of data) {
              dataAll.push(subPlot["points"]);
              topFeatures.push(subPlot["name"]);
            }
            that.topFeatures = topFeatures;
            that.dataAll = dataAll;
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
            text: '散点图',
            subtext: '描绘连续属性与目标属性之间的关联关系'
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
        grid: [
          {x: '7%', y: '16%', width: '38%', height: '32%'},
          {x2: '7%', y: '16%', width: '38%', height: '32%'},
          {x: '7%', y2: '7%', width: '38%', height: '32%'},
          {x2: '7%', y2: '7%', width: '38%', height: '32%'}
        ],
        tooltip: {
          formatter: '{a}: ({c})'
        },
        xAxis: [
          {
            gridIndex: 0, 
            name: this.topFeatures[0],
            nameGap: 30,
            nameLocation: "center"
          },
          {
            gridIndex: 1, 
            name: this.topFeatures[1],
            nameGap: 30,
            nameLocation: "center"
          },
          {
            gridIndex: 2, 
            name: this.topFeatures[2],
            nameGap: 30,
            nameLocation: "center"
          },
          {
            gridIndex: 3, 
            name: this.topFeatures[3],
            nameGap: 30,
            nameLocation: "center"
          }
        ],
        yAxis: [
          { gridIndex: 0, 
            axisLine: {
              onZero: false
            }, 
            name: this.targetCol
          },
          {
            gridIndex: 1,
            axisLine: {
              onZero: false
            },
            name: this.targetCol
          },
          {
            gridIndex: 2, 
            axisLine: {
              onZero: false
            }, 
            name: this.targetCol
          },
          {
            gridIndex: 3, 
            axisLine: {
              onZero: false
            }, 
            name: this.targetCol
          }
        ],
        series: [
          {
            name: 'I',
            type: 'scatter',
            xAxisIndex: 0,
            yAxisIndex: 0,
            data: this.dataAll[0],
            //markLine: this.markLineOpt
          },
          {
            name: 'II',
            type: 'scatter',
            xAxisIndex: 1,
            yAxisIndex: 1,
            data: this.dataAll[1],
            //markLine: this.markLineOpt
          },
          {
            name: 'III',
            type: 'scatter',
            xAxisIndex: 2,
            yAxisIndex: 2,
            data: this.dataAll[2],
            //markLine: this.markLineOpt
          },
          {
            name: 'IV',
            type: 'scatter',
            xAxisIndex: 3,
            yAxisIndex: 3,
            data: this.dataAll[3],
            //markLine: this.markLineOpt
          }
        ]
      }
    },
  }
}
</script>

<style scoped>
.chart-place {
  width: 100%;
  height:calc(100vh - 150px);
}

</style>