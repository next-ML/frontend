<template>
<div class="fillcontain">
  <!-- <loading :active.sync="isDrawing" 
        :can-cancel="false" 
        :is-full-page="true"></loading> -->
  <el-card shadow="never">
    <chart style="width: 100%; height:calc(100vh - 250px);" 
           ref="dataChart" 
           autoresize
           :options="chartOptions">
    </chart>
  </el-card>
  <el-card shadow="never" :body-style="{ padding: '5px 10px' }">
    <el-row type="flex" align="middle">
      <el-col :span="3" class="vis-type-box">
        <div style="margin: 12px 0; text-align: center;">图表类型</div>
        <el-select v-model="chartType" placeholder="请选择">
          <el-option label="分布图" value="distribution">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="15">
        <div class="tag-group attribute-select-box"
             :class="{ undroppable: !colDroppable }">
          <div v-if="colDroppable">
            <drop @drop="onColAttrDrop">
              <span class="tag-group__title">
                <i class="el-icon-s-data"></i>
                <span class="row-and-col-mark">列</span>
              </span>
              <el-tag type="info" 
                      class="attr-tag"
                      size="small"
                      v-for="attr in colAttributes" 
                      closable
                      @close="removeCol(attr.name)"
                      :key="attr.name">
                {{ attr.name }}
              </el-tag>
            </drop>
          </div>
          <div v-else>
            <span class="tag-group__title">
              <i class="el-icon-s-data"></i>
              <span class="row-and-col-mark">列</span>
            </span>
            <el-tag type="info" 
                    class="attr-tag"
                    size="small"
                    v-for="attr in colAttributes" 
                    closable
                    @close="removeCol(attr.name)"
                    :key="attr.name">
              {{ attr.name }}
            </el-tag>
          </div>
        </div>
        <div class="tag-group attribute-select-box"
             :class="{ undroppable: !rowDroppable }">
          <div v-if="rowDroppable">
            <drop @drop="onRowAttrDrop">
              <span class="tag-group__title">
                <i class="el-icon-s-unfold"></i>
                <span class="row-and-col-mark">行</span>
              </span>
              <el-tag type="info" 
                      class="attr-tag"
                      size="small"
                      v-for="attr in rowAttributes" 
                      closable
                      @close="removeRow(attr.name)"
                      :key="attr.name">
                {{ attr.name }}
              </el-tag>
            </drop>
          </div>
          <div v-else>
            <span class="tag-group__title">
              <i class="el-icon-s-unfold"></i>
              <span class="row-and-col-mark">行</span>
            </span>
            <el-tag type="info" 
                    class="attr-tag"
                    size="small"
                    v-for="attr in rowAttributes" 
                    closable
                    @close="removeRow(attr.name)"
                    :key="attr.name">
              {{ attr.name }}
            </el-tag>
          </div>
        </div>
      </el-col>
      <el-col :span="2">
        <el-button class="style-option" :class="{ undroppable: !colorDroppable }">颜色</el-button>
      </el-col>
      <el-col :span="2">
        <el-button class="style-option" :class="{ undroppable: !styleDroppable }">样式</el-button>
      </el-col>
      <el-col :span="2">
        <el-button class="style-option" :class="{ undroppable: !sizeDroppable }">大小</el-button>
      </el-col>
    </el-row>
  </el-card>
</div>
</template>

<script>
import axios from "axios";
import draggable from "vuedraggable";
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
    draggable, Loading
  },
  created() {
    this.$store.commit('setDrawAttrRow', []);
    this.$store.commit('setDrawAttrCol', []);
  },
  data() {
    return {
      chartType: "distribution",
      chartOptions: {
        title : {
          text: "分布图",
          subtext: '直观地展示属性间关系'
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
    onRowAttrDrop(attr) {
      if (this.rowDroppable) {
        this.onAttrDrop(attr, this.rowAttributes);
        this.drawChart();
      }
    },
    onColAttrDrop(attr) {
      if (this.colDroppable) {
        this.onAttrDrop(attr, this.colAttributes);
      }
    },
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
    drawChart() {
      this.isDrawing = true;
      let config = {}
      config['dataset_name'] = this.$store.state.currentDataset.metadata.name;
      config['chart_type'] = this.chartType;
      config['row_attrs'] = this.rowAttributes;
      config['columns_attrs'] = this.colAttributes;
      config['color_attr'] = this.$store.state.drawConfig.colorAttrs;
      config['size_attr'] = this.$store.state.drawConfig.sizeAttrs;
      config['style_attr'] = this.$store.state.drawConfig.styleAttrs;
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
    },
    removeRow(tag) {
      this.rowAttributes.splice(this.rowAttributes.indexOf(tag), 1);
      this.drawChart();
    },
    removeCol(tag) {
      this.colAttributes.splice(this.colAttributes.indexOf(tag), 1);
    }
  },
  computed: {
    rowAttributes: {
      get() {
        return this.$store.state.drawConfig.rowAttrs;
      },
      set(value) {
        this.$store.commit('setDrawAttrRow', value);
      }
    },
    colAttributes: {
      get() {
        return this.$store.state.drawConfig.colAttrs;
      },
      set(value) {
        this.$store.commit('setDrawAttrCol', value);
      }
    },
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