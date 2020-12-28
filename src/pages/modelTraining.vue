<template>
  <div style="height: 100%;">
    <el-row :gutter="10" style="height: 100%;">
      <el-col :span="19" style="height: 100%;">
        <el-card class="box-card" shadow="hover" style="height: 100%;">
          <el-tabs v-model="pageName" @tab-click="changeTrainingPage" style="height: 100%;">

            <el-tab-pane label="训练图表" name="trainingChart" style="height: 110%;">
              <chart style="width: 100%; height:calc(100vh - 240px);" 
                    :options="chartOptionsHistoryLine"></chart>
              <el-row class="process-bar">
                <el-col :span="2" :offset="1">
                  <span>训练进度</span>
                </el-col>
                <el-col :span="19">
                  <el-progress :text-inside="true" :stroke-width="20" :percentage="totalPercentage" :color="chartOptionsHistoryLine.customColors" class="process-bar"></el-progress>
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
              <el-button type="primary" style="float:right;" round @click="beginTraining()">开始训练</el-button>
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

import axios from 'axios'

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
        taskType: "regression",
        target: "jinpu_ug_ml",
        maxTrainingTime: "1:00",
        maxTrial: "20",
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
          // data: ['1','2','3','4','5','6','7']
          data: [],
          axisLine: {
            symbol: ["none", "arrow"],
            symbolOffset:[0, 10],//箭头段移动8个像素
            symbolSize: [7, 12]//箭头的长宽
          }
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: '{value}'
          },
          minInterval: 1,
          max: function(value) {
            let upperBound = value.max / 0.98;
            if (upperBound - value.max < 1) {
              upperBound = value.max + 1;
            }
            upperBound = Math.round(upperBound);
            return upperBound;
          },
          min: function (value) {
            let lowerBound = value.min * 0.97;
            if (lowerBound - value.min > -1) {
              lowerBound = value.min - 1;
            }
            if (lowerBound < 0) {
              lowerBound = 0;
            }
            lowerBound = Math.floor(lowerBound);
            return lowerBound;
          },
          axisLine: {
            symbol: ["none", "arrow"],
            symbolOffset:[0, 10],//箭头段移动8个像素
            symbolSize: [7, 12]//箭头的长宽
          }
        },
        series: [
          {
            name:'均方误差',
            type:'line',
            // data:[0.1, 0.21, 0.65, 0.43, 0.72, 0.93, 0.89],
            data:[],
            markPoint: {
              data: [
                {type: 'min', name: '最小值'},
              ]
            },
            markLine: {
              data: [
                {
                  type: 'average', 
                  name: '平均值',
                },
              ],
            }
          },
        ],
        customColors: [
          {color: '#f56c6c', percentage: 20},
          {color: '#e6a23c', percentage: 40},
          {color: '#5cb87a', percentage: 60},
          {color: '#1989fa', percentage: 80},
          {color: '#6f7ad3', percentage: 100}
        ],
        currentPercentage: 60,
        totalEpoch: 100000000,
        currentEpoch: 0,
        timer: null
      },
    }
  },
  computed: {
    totalPercentage() {
      return Math.round(this.chartOptionsHistoryLine.currentEpoch * 100 / this.chartOptionsHistoryLine.totalEpoch);
    }
  },
  methods: {
    changeTrainingPage(tab, event) {
      console.log(tab, event);
    },
    format(percentage) {
      return percentage === 100 ? '完成' : `${percentage}%`;
    },
    beginTraining() {
      let data = {
        userId: this.$store.state.userId, 
        datasetName: this.$store.state.currentDataset.metadata.name,
        taskType: this.configForm.taskType,
        targetCol: this.configForm.target,
        timeLimit: this.configForm.maxTrainingTime,
        trialTimesLimit: this.configForm.maxTrial,
        command: "start_training"
      };
      console.log(data);

      this.chartOptionsHistoryLine.xAxis.data = new Array();
      this.chartOptionsHistoryLine.series[0].data = new Array();
      this.chartOptionsHistoryLine.currentEpoch = 0;
      // 30为population size
      this.chartOptionsHistoryLine.totalEpoch = (parseInt(data.trialTimesLimit)+1) * 30;
      this.chartOptionsHistoryLine.isFinished = false;

      this.uploadConfigAndStartTraining(data);
    },
    beginTrainingInterface({taskName, userId, command}) {
      let data = {
        "user_id": userId,
        "command": command
      };
      axios
        .post(["api", "task", taskName].join("/"), data)
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        })
    },
    uploadConfigAndStartTraining({userId, datasetName, taskType, targetCol, timeLimit, trialTimesLimit, command}) {
      var data = {
        "user_id": userId,
        "dataset_name": datasetName,
        "task_type": taskType,
        "target_col": targetCol,
        "time_limit": timeLimit,
        "trial_times_limit": trialTimesLimit
      };
      let that = this;
      axios
        .put(["api", "task"].join("/"), data)
        .then(response => {
          let taskId = response.data.task_id;
          console.log(taskId);
          // 启动训练
          that.beginTrainingInterface({
            taskName: taskId, 
            userId: userId, 
            command: command});

          // 实时监控训练信息
          this.chartOptionsHistoryLine.timer = setInterval(()=>{
            that.getTrainingProcessInformation({taskId: taskId});
          }, 500);
        })
        .catch(error => {
          console.log(error);
        })
    },
    getTrainingProcessInformation({taskId}) {
      let that = this;
      axios
        .get(["api", "task", taskId].join("/"))
        .then(response => {
          // 解析返回信息
          let info = response.data.message;
          for (let item of info) {

            // 迭代轮数更新信号
            let iterationUpdateRe = RegExp('pbar:(\\d+)');
            let matchArry = item.match(iterationUpdateRe);
            if (matchArry !== null && matchArry.length == 2) {
              let updateValue = parseInt(matchArry[1]);
              that.chartOptionsHistoryLine.currentEpoch += updateValue;
              continue;
            }

            // 结束信号
            if (item === 'finish') {
              console.log("Training finished!");
              clearInterval(this.chartOptionsHistoryLine.timer);
              continue;
            }

            // 得到交叉验证分数信号
            let cvScoreRe = new RegExp('Generation (\\d+) - Current best internal CV score: ([\\-\\d\\.]+)');
            matchArry = item.match(cvScoreRe);
            if (matchArry !== null && matchArry.length == 3) {
              let epoch = parseInt(matchArry[1]);
              let cvScore = parseFloat(matchArry[2]).toFixed(2);
              if (cvScore < 0) {
                cvScore = -cvScore;
              }
              that.chartOptionsHistoryLine.xAxis.data.push(epoch);
              that.chartOptionsHistoryLine.series[0].data.push(cvScore);
              continue;
            }

          }
        })
        .catch(error => {
          console.log(error);
        })
    }
  }
}
</script>

<style scoped>
.process-bar {
  margin-top: 3px;
}

</style>