<template>
  <div style="height: 100%;">
    <el-row :gutter="10" style="height: 100%;">
      <el-col :span="19" style="height: 100%;">
        <el-card class="box-card" shadow="hover" style="height: 100%;">
          <el-tabs v-model="pageName" @tab-click="changeTrainingPage" style="height: 100%;">

            <el-tab-pane label="训练图表" name="trainingChart" style="height: 100%;">
              <chart style="width: 100%; height:calc(100vh - 260px);" 
                    :options="chartOptionsHistoryLine"></chart>
              <el-row class="process-bar">
                <el-col :span="2">
                  <span>当前进度</span>
                </el-col>
                <el-col :span="22">
                  <el-progress :text-inside="true" :stroke-width="20" :percentage="50" status="exception" class="process-bar"></el-progress>
                </el-col>
              </el-row>
              <el-row class="process-bar">
                <el-col :span="2">
                  <span>总进度</span>
                </el-col>
                <el-col :span="22">
                  <el-progress :text-inside="true" :stroke-width="20" :percentage="50" status="exception" class="process-bar"></el-progress>
                </el-col>
              </el-row>
            </el-tab-pane>

            <el-tab-pane label="历史结果" name="historyModel">
              <model-list></model-list>
            </el-tab-pane>

          </el-tabs>
        </el-card>
      </el-col>
      <el-col :span="5"  style="height: 100%;">
        <el-card class="box-card" shadow="never"  style="height: calc(100% - 2px);">
          <div slot="header" class="clearfix">
            <h3>训练配置</h3>
          </div>
          <el-form ref="configForm" :model="configForm" label-width="80px">
            <el-form-item label="任务类型">
              <el-select v-model="configForm.taskType" placeholder="请选择任务类型">
                <el-option label="分类任务" value="classification"></el-option>
                <el-option label="回归任务" value="regression"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="预测目标">
              <el-select v-model="configForm.target" placeholder="请选择预测目标">
                <el-option label="jinpu_ug_ml" value="jinpu_ug_ml"></el-option>
              </el-select>
            </el-form-item>
            <el-divider></el-divider>
            <el-form-item label="训练时长">
              <el-select v-model="configForm.maxTrainingTime" placeholder="请选择最长训练时间">
                <el-option label="不限" value="unlimited"></el-option>
                <el-option label="10分钟" value="0:10"></el-option>
                <el-option label="30分钟" value="0:30"></el-option>
                <el-option label="1小时" value="1:00"></el-option>
                <el-option label="2小时" value="2:00"></el-option>
                <el-option label="4小时" value="4:00"></el-option>
                <el-option label="8小时" value="8:00"></el-option>
                <el-option label="12小时" value="12:00"></el-option>
                <el-option label="16小时" value="16:00"></el-option>
                <el-option label="1天" value="24:00"></el-option>
                <el-option label="2天" value="48:00"></el-option>
                <el-option label="3天" value="72:00"></el-option>
                <el-option label="4天" value="96:00"></el-option>
                <el-option label="5天" value="120:00"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="尝试次数">
              <el-select v-model="configForm.maxTrial" placeholder="请选择最多尝试次数">
                <el-option label="不限" value="unlimited"></el-option>
                <el-option label="5" value="5"></el-option>
                <el-option label="10" value="10"></el-option>
                <el-option label="20" value="20"></el-option>
                <el-option label="40" value="40"></el-option>
                <el-option label="60" value="60"></el-option>
                <el-option label="80" value="80"></el-option>
                <el-option label="100" value="100"></el-option>
                <el-option label="120" value="120"></el-option>
                <el-option label="150" value="150"></el-option>
                <el-option label="200" value="200"></el-option>
                <el-option label="300" value="300"></el-option>
                <el-option label="500" value="500"></el-option>
                <el-option label="1000" value="1000"></el-option>
              </el-select>
            </el-form-item>
            <el-divider></el-divider>
            <el-form-item label="推荐配置">
              <el-switch v-model="configForm.recommend"></el-switch>
              <el-button type="primary" style="float:right;" round>开始训练</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/markLine'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/title'
import 'echarts/lib/component/markPoint'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/toolbox'

import TrainingConfig from "~/components/trainingConfig"
import ModelList from "~/components/modelList"

export default {
  name: "TrainingResult", 
  components: {
    "training-config": TrainingConfig,
    "model-list": ModelList
  },
  data() {
    return {
      pageName: "trainingChart",
      configForm: {
        taskType: "",
        target: "",
        maxTrainingTime: "",
        maxTrial: "",
        recommend: true,
      },
      chartOptionsHistoryLine: {
        title: {
          text: '训练历史',
          subtext: '记录了每一次的训练结果'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data:['均方误差']
        },
        toolbox: {
          show: true,
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            dataView: {readOnly: false},
            magicType: {type: ['line', 'bar']},
            restore: {},
            saveAsImage: {}
          }
        },
        xAxis:  {
          type: 'category',
          boundaryGap: false,
          data: ['1','2','3','4','5','6','7']
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: '{value}'
          }
        },
        series: [
          {
            name:'均方误差',
            type:'line',
            data:[0.1, 0.21, 0.65, 0.43, 0.72, 0.93, 0.89],
            markPoint: {
              data: [
                {type: 'max', name: '最小大'}
              ]
            },
            markLine: {
              data: [
                {
                  type: 'average', 
                  name: '平均值',
                },
              ]
            }
          },
        ]
      },
      // 进度条
      percentage: 50,
      customColor: '#409eff',
      customColors: [
        {color: '#f56c6c', percentage: 20},
        {color: '#e6a23c', percentage: 40},
        {color: '#5cb87a', percentage: 60},
        {color: '#1989fa', percentage: 80},
        {color: '#6f7ad3', percentage: 100}
      ]
    }
  },
  methods: {
    changeTrainingPage(tab, event) {
      console.log(tab, event);
    },
    format(percentage) {
      return percentage === 100 ? '完成' : `${percentage}%`;
    }
  }
}
</script>

<style scoped>
.process-bar {
  margin-top: 3px;
}

</style>