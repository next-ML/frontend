<template>
<div class="fillcontain">
  <chart class="chart-place" 
        ref="dispChart" 
        autoresize
        :options="options">
  </chart>
  <div v-if="firstDraw" class="pointer">
    <el-tooltip class="item" effect="dark" value="true" manual="true" content="点击左侧属性" placement="top-start">
      <i class="el-icon-thumb rotate pointer-icon"></i>
    </el-tooltip>
  </div>
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
  data() {
    return {
      chosedAttr: '',
      firstDraw: true,
    }
  },
  methods: {
    drawDispChart(attr) {
      this.firstDraw = false;
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
          dispChartOption["title"] = [
            {
              text: "分布图",
              subtext: '直观展示属性的分布情况'
            },
            {
              text: '已选中属性：' + attr,
              bottom: '0%'
            }
          ];
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
            xAxis.push(left.toFixed(1) + ' ~ ' + width.toFixed(1));
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
        title : [
          {
            text: "分布图",
            subtext: '直观展示属性的分布情况'
          },
          {
            text: '已选中属性：' + this.chosedAttr,
            bottom: '0%'
          }
        ],
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
.rotate{
  filter: progid: DXImageTransform.Microsoft.BasicImage(rotation=0.5);
  -webkit-transform: rotate(-90deg);
  -moz-transform: rotate(-90deg);
  -ms-transform: rotate(-90deg);
  -o-transform: rotate(-90deg);
  transform: rotate(-90deg);
}
.pointer-icon{
  font-size: 32px;
}
.pointer{
  position: absolute;
  top: 70%;
  left: -10px;
  z-index: 1000;
  font-size: 30px;
  -webkit-animation: pointer-move 2s infinite; /* Chrome, Safari, Opera */
  animation: pointer-move 2s infinite;
}
/* Chrome, Safari, Opera */
@-webkit-keyframes pointer-move {
    50% {left: 10px;}
}

/* Standard syntax */
@keyframes pointer-move {
    50% {left: 10px;}
}
</style>