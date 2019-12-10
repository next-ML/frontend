<template>
<div>
  <el-card shadow="never">
    <chart style="width: 100%; height:360px;" :options="chartOptions"></chart>
  </el-card>
  <el-card shadow="never" :body-style="{ padding: '5px 10px' }">
    <el-row type="flex" align="middle">
      <el-col :span="3" class="vis-type-box">
        <div style="margin: 12px 0; text-align: center;">图表类型</div>
        <el-select v-model="value" placeholder="请选择">
          <el-option label="分布图" value="分布图">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="15">
        <div class="tag-group attribute-select-box">
          <span class="tag-group__title">
            <i class="el-icon-s-data"></i>
            <span class="row-and-col-mark">列</span>
          </span>
          <el-tag type="info">
            Count
          </el-tag>
        </div>
        <div class="tag-group attribute-select-box">
          <span class="tag-group__title">
            <i class="el-icon-s-unfold"></i>
            <span class="row-and-col-mark">行</span>
          </span>
          <el-tag type="info">
            Age
          </el-tag>
        </div>
      </el-col>
      <el-col :span="6">
        <el-button class="style-option">颜色</el-button>
        <el-button class="style-option">样式</el-button>
        <el-button class="style-option">大小</el-button>
      </el-col>
    </el-row>
  </el-card>
</div>
</template>

<script>
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/markLine'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/title'
import 'echarts/lib/component/markPoint'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/toolbox'

export default {
  data() {
    return {
      items: [
        { type: '', label: '标签一' },
        { type: 'success', label: '标签二' },
        { type: 'info', label: '标签三' },
        { type: 'danger', label: '标签四' },
        { type: 'warning', label: '标签五' }
      ],
      chartOptions: {
        title : {
          text: 'Age分布图',
          subtext: '用于测试'
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
        xAxis : [
          {
            type : 'category',
            data : ['0-10','11-20','21-30','31-40','41-50','51-60','61-70','71-80']
          }
        ],
        yAxis : [
          {
            type : 'value'
          }
        ],
        series : [
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
      }
    }
  }
}
</script>

<style scoped>
.attribute-select-box {
  border-style: solid;
  border-width: 1px;
  border-color: rgb(185, 184, 184);
  margin: 3px 10px;
  padding: 4px 10px;
  border-radius:5px;
  -moz-border-radius:5px
}

.row-and-col-mark {
  margin-left: 5px;
  margin-right: 5px;
  padding-right: 15px;
  border-style: solid;
  border-width: 0 1px 0 0;
  border-color: rgb(185, 184, 184);
}

.style-option {
  height: 80px;
  width: 71px;
}

.vis-type-box {
  padding-right: 10px;
  border-width: 0 1px 0 0;
  border-color: rgba(204, 203, 203, 0.9);
  border-style: solid;
}
</style>