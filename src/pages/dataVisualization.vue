<template>
<div class="fillcontain">
  <!-- <loading :active.sync="isDrawing" 
        :can-cancel="false" 
        :is-full-page="true"></loading> -->
  <el-card shadow="never">
    <el-row>
      <el-col :span="21">
        <chart style="width: 100%; height:calc(100vh - 150px);" 
              ref="dataChart" 
              autoresize
              :options="chartOptions">
        </chart>
      </el-col>
      <el-col :span="3">
      </el-col>
    </el-row>
  </el-card>
</div>
</template>

<script>
import axios from "axios";
import Loading from 'vue-loading-overlay';
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/markLine'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/title'
import 'echarts/lib/component/markPoint'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/toolbox'


export default {
  components: {
    Loading
  },
  created() {
    this.$store.commit('setDrawAttrRow', []);
    this.$store.commit('setDrawAttrCol', []);
  },
  watch: {
    redrawMsg: function(newMsg, oldMsg) {
      this.drawDispChart(newMsg.attrName);
    }
  },
  data() {
    return {
      chartType: "distribution",
      chartOptions: {
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
      },
      isDrawing: false,
    }
  },
  methods: {
    onAttrDrop(attr, attrList) {
      let duplicate = false;
      for (const a of attrList) {
        if (a.name === attr) {
          duplicate = true;
          break;
        }
      }
      if (!duplicate) {
        attrList.push({name: attr});
      }
      console.log(attrList)
    },
    drawDispChart(attr) {
      this.isDrawing = true;
      let config = {}
      config['dataset_name'] = this.$store.state.currentDataset.metadata.name;
      config['chart_type'] = this.chartType;
      let rowAttributes = []
      rowAttributes.push({name: attr});
      config['row_attrs'] = rowAttributes;
      config['columns_attrs'] = [];
      config['color_attr'] = [];
      config['size_attr'] = [];
      config['style_attr'] = [];
      let that = this;
      axios
        .post(["api", this.$store.state.userId, "drawer"].join("/"),
                 config,
                 {
                   "content-type":"application/json"
                 })
        .then(function(response) {
          let chartOptions = {};
          chartOptions["title"] = {
            text: "分布图",
            subtext: '直观地展示属性间关系'
          };
          chartOptions["tooltip"] = {trigger: 'axis'}
          chartOptions["toolbox"] =  {
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
          chartOptions["xAxis"] = [];
          chartOptions["xAxis"].push({type : 'category', data: xAxis});
          chartOptions["yAxis"] = []
          chartOptions["yAxis"].push({type : 'value'});
          let seris = {};
          seris['name']
          seris['type'] = 'bar';
          seris['data'] = data.heights;
          chartOptions["series"] = [];
          chartOptions["series"].push(seris);
          that.$refs.dataChart.mergeOptions(chartOptions, true); // Not merge, but set.
          that.isDrawing = false;
        })
    }
  },
  computed: {
    colDroppable() {
      return false;
    },
    rowDroppable() {
      return true;
    },
    colorDroppable() {
      return false;
    },
    sizeDroppable() {
      return false;
    },
    styleDroppable() {
      return false;
    },
    redrawMsg() {
      return this.$store.state.redrawMsg;
    }
  }
}
</script>

<style scoped>
.attribute-select-box {
  border-style: solid;
  border-width: 1px;
  border-color: rgb(185, 184, 184);
  margin: 6px 10px;
  padding: 7px 10px;
  border-radius:5px;
  -moz-border-radius:5px;
  height: 40px;
  box-sizing: border-box;
}

.row-and-col-mark {
  font-size: 18px;
  margin-left: 5px;
  margin-right: 5px;
  padding-right: 15px;
  border-style: solid;
  border-width: 0 1px 0 0;
  border-color: rgb(185, 184, 184);
}

.style-option {
  height: 80px;
  width: 80%;
}

.vis-type-box {
  padding-right: 10px;
  border-width: 0 1px 0 0;
  border-color: rgba(204, 203, 203, 0.9);
  border-style: solid;
}

.attribute-drop-area {
  display: inline;
}

.attr-tag {
  margin: 0 3px;
}

.undroppable {
  background-color: rgba(180, 179, 179, 0.5);
}
.undroppable:hover {
  cursor:no-drop;
  color: rgb(99, 97, 97);
}

</style>