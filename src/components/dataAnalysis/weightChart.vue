<template>
<div class="fillcontain">
  <chart class="chart-place" 
        ref="importanceChart" 
        autoresize
        :options="importanceBarOption">
  </chart>
</div>
</template>

<script>
import axios from "axios";
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/markLine'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/title'
import 'echarts/lib/component/markPoint'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/toolbox'

export default {
    name: "WeightChart",
    data() {
      return {
        barData: {
          features: [],
          weights: [],
          topk: 10
        },
        loaded: false
      }
    },
    computed: {
      importanceBarOption() {
        if (!this.loaded) {
          let features = [];
          let config = {};
          config['dataset_name'] = this.$store.state.currentDataset.metadata.name;
          config['chart_type'] = "weight";

          let that = this;
          axios
            .post(["api", this.$store.state.userId, "drawer"].join("/"),
                  config,
                  {
                    "content-type":"application/json"
                  })
            .then(function(response) {
              let data = response.data;
              that.barData.features = data.features.slice(0, that.barData.topk);
              that.barData.weights = data.weights.slice(0, that.barData.topk);
              that.loaded = true;
            })
            .catch(function(error) {
              alert("error: " + error);
            })
        }
        
        return {
          color: ['#4682B4'],
          title: {
            text: '特征重要程度排序',
            subtext: '利用线形回归的权重，分析各个特征的重要程度'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'value'
            }
          ],
          yAxis: [
            {
              type: 'category',
              data: this.barData.features,
              axisTick: {
                  alignWithLabel: true
              },
              inverse: true,
            }
          ],
          series: [
            {
              name: '权重',
              type: 'bar',
              barWidth: '50%',
              data: this.barData.weights
          }
          ]
        };
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