<template>
<div class="fillcontain">
  <chart class="chart-place" 
        ref="headmapChart" 
        autoresize
        :options="options">
  </chart>
</div>
</template>

<script>
import axios from "axios";
import 'echarts/lib/chart/heatmap';
import 'echarts/lib/component/markLine'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/title'
import 'echarts/lib/component/markPoint'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/toolbox'
import 'echarts/lib/component/visualMap'

export default {
  name: "CovarianceChart",
  data() {
    return {
      loaded: false,
      heatmapData: {
        xAxis: ['12a', '1a', '2a', '3a', '4a', '5a', '6a',
                  '7a', '8a', '9a','10a','11a',
        ],
        yAxis: ['12a', '1a', '2a', '3a', '4a', '5a', '6a',
                  '7a', '8a', '9a','10a','11a',
        ],
        data: [
          [0, 0, 0.2],
          [1, 0, 0.4],
          [2, 0, 0.1],
          [3, 0, 0.32],
          [14, 0, 0.7],
          [0, 1, 0.4]
        ]
      },
    }
  },
  computed: {
    options() {
      if (!this.loaded) {
        let config = {};
        let that = this;
        config['dataset_name'] = this.$store.state.currentDataset.metadata.name;
        config['chart_type'] = "covariance";
        axios
          .post(["api", this.$store.state.userId, "drawer"].join("/"),
                config,
                 {
                   "content-type":"application/json"
                 })
          .then(function(response) {
            let data = response.data;
            that.heatmapData.xAxis = data["columns"];
            that.heatmapData.yAxis = data["columns"];
            let matrix = data["covariance_matrix"];
            let heatmapData = [];
            for (const row in matrix) {
              for (const col in matrix[row]) {
                let value = matrix[row][col];
                value = Number((value).toFixed(2));
                heatmapData.push([parseInt(row), parseInt(col), value]);
              }
            }
            that.heatmapData.data = heatmapData;
            that.loaded = true;
          })
          .catch(function(error) {
            alert("error: " + error);
          })
      }
      return {
        title: {
          text: '属性之间的协方差矩阵'
        },
        tooltip: {
          position: 'top'
        },
        animation: false,
        xAxis: {
          type: 'category',
          data: this.heatmapData.xAxis,
          splitArea: {
            show: true
          },
          axisLabel: {
            rotate: 90
          }
        },
        yAxis: {
          type: 'category',
          data: this.heatmapData.yAxis,
          splitArea: {
            show: true
          },
          inverse: true,
        },
        visualMap: {
          min: 0,
          max: 1,
          calculable: true,
          orient: 'vertical',
          left: 'right',
          bottom: '15%'
        },
        series: [{
          name: '协方差',
          type: 'heatmap',
          data: this.heatmapData.data,
          label: {
            show: true
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }]
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