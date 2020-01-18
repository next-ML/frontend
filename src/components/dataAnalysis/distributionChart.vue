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
  name: "DistributionChart",
  watch: {
    redrawMsg: function(newMsg, oldMsg) {
      this.drawDispChart(newMsg.attrName);
    }
  },
  methods: {
    drawDispChart(attr) {
      this.isDrawing = true;
      let config = {}
      config['dataset_name'] = this.$store.state.currentDataset.metadata.name;
      config['chart_type'] = "distribution";
      let rowAttributes = []
      rowAttributes.push({name: attr});
      config['row_attrs'] = rowAttributes;
      let that = this;
      axios
        .post(["api", this.$store.state.userId, "drawer"].join("/"),
                 config,
                 {
                   "content-type":"application/json"
                 })
        .then(function(response) {
          let dispChartOption = {};
          dispChartOption["title"] = {
            text: "分布图",
            subtext: '直观展示属性的分布情况'
          };
          dispChartOption["tooltip"] = {trigger: 'axis'}
          dispChartOption["toolbox"] =  {
            show : true,
            feature : {
              dataView : {show: true, readOnly: false},
              magicType : {show: true, type: ['line', 'bar']},
              restore : {show: true},
              saveAsImage : {show: true}
            }
          };

          let data = response.data.data;
          let xAxis = [];
          for (let [left, width] of data.x_axis) {
            xAxis.push(left.toFixed(1) + '~' + width.toFixed(1));
          }
          dispChartOption["xAxis"] = [];
          dispChartOption["xAxis"].push({type : 'category', data: xAxis});
          dispChartOption["yAxis"] = []
          dispChartOption["yAxis"].push({type : 'value'});
          let seris = {};
          seris['name']
          seris['type'] = 'bar';
          seris['data'] = data.heights;
          dispChartOption["series"] = [];
          dispChartOption["series"].push(seris);
          that.$refs.dispChart.mergeOptions(dispChartOption, true); // Not merge, but set.
          that.isDrawing = false;
        })
    },
  },
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
            data : []
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
            data:[0],
            markPoint : {
            },
            markLine : {
            }
          },
        ]
      }
    },
    redrawMsg() {
      return this.$store.state.redrawMsg;
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