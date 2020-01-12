<template>
<div class="fillcontain">
  <!-- <loading :active.sync="isDrawing" 
        :can-cancel="false" 
        :is-full-page="true"></loading> -->
  <el-card shadow="never">
    <el-row>
      <el-col :span="21">
        <div v-if="chartType === 'distribution'">
          <distribution-chart class="fillcontain"></distribution-chart>
        </div>
        <div v-else-if="chartType === 'connection'">
          <connection-chart  class="fillcontain"></connection-chart>
        </div>
        <div v-else-if="chartType === 'boxing'">
          <boxing-chart  class="fillcontain"></boxing-chart>
        </div>
        <div v-else-if="chartType === 'covariance'">
          <coviriance-chart  class="fillcontain"></coviriance-chart>
        </div>
        <div v-else-if="chartType === 'importance'">
          <weight-chart  class="fillcontain"></weight-chart>
        </div>
        <div v-else>
          图表加载有误！
        </div>
      </el-col>
      <el-col :span="3">
        <vis-type-bar
          @choseVisType="choseVisType"
        >
        </vis-type-bar>
      </el-col>
    </el-row>
  </el-card>
</div>
</template>

<script>
import axios from "axios";
import Loading from 'vue-loading-overlay';

import DistributionChart from "~/components/dataAnalysis/distributionChart"
import ConnectionChart from "~/components/dataAnalysis/connectionChart"
import BoxingChart from "~/components/dataAnalysis/boxingChart"
import CovarianceChart from "~/components/dataAnalysis/covarianceChart"
import WeightChart from "~/components/dataAnalysis/weightChart"
import VisTypeBar from "~/components/visTypeBar"

export default {
  components: {
    Loading, 
    "vis-type-bar": VisTypeBar,
    "distribution-chart": DistributionChart,
    "connection-chart": ConnectionChart,
    "boxing-chart": BoxingChart,
    "coviriance-chart": CovarianceChart,
    "weight-chart": WeightChart,
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
    choseVisType(type) {
      this.chartType = type;
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
    },
  }
}
</script>

<style scoped>

</style>