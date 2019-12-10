<template>
<div class="fillcontain">
  <headTop></headTop>
  <el-row style="height: calc(100vh - 52px);">
    <el-col style="height: 100%;" :span="4">
      <div style="height: 30%;" class="dataset-container">
        <div class="sider-bar-head">
          数据集
        </div>
        <div style="overflow:auto; height: calc(100% - 30px);" 
            class="infinite-list-wrapper">
          <ul class="dataset-list list">
            <li class="dataset-item">
              <i class="el-icon-document"></i>
              <span class="file-name">label.csv</span>
            </li>
            <li class="dataset-item">
              <i class="el-icon-document"></i>
              <span class="file-name">titanic.csv</span>
            </li>
            <li class="dataset-item">
              <i class="el-icon-document"></i>
              <span class="file-name">iris.csv</span>
            </li>
          </ul>
        </div>
      </div>
      <div style="height: 70%;" class="attributes-container">
        <div class="sider-bar-head">
          类别属性
        </div>
        <div style="overflow:auto; height: calc(50% - 30px);" 
            class="infinite-list-wrapper">
          <ul class="dataset-list list">
            <li class="attribute-item">
              <i class="el-icon-caret-right"></i>
              <span class="file-name">Survived</span>
            </li>
            <li class="attribute-item">
              <i class="el-icon-caret-right"></i>
              <span class="file-name">Pclass</span>
            </li>
            <li class="attribute-item">
              <i class="el-icon-caret-right"></i>
              <span class="file-name">Sex</span>
            </li>
            <li class="attribute-item">
              <i class="el-icon-caret-right"></i>
              <span class="file-name">Parch</span>
            </li>
            <li class="attribute-item">
              <i class="el-icon-caret-right"></i>
              <span class="file-name">Cabin</span>
            </li>
            <li class="attribute-item">
              <i class="el-icon-caret-right"></i>
              <span class="file-name">Embarked</span>
            </li>
          </ul>
        </div>
        <div class="sider-bar-head">
          数值属性
        </div>
        <div style="overflow:auto; height: calc(50% - 31px);" 
            class="infinite-list-wrapper">
          <ul class="dataset-list list">
            <li class="attribute-item">
              <i class="el-icon-caret-right"></i>
              <span class="file-name">PassengerId</span>
            </li>
            <li class="attribute-item">
              <i class="el-icon-caret-right"></i>
              <span class="file-name">Age</span>
            </li>
            <li class="attribute-item">
              <i class="el-icon-caret-right"></i>
              <span class="file-name">Ticket</span>
            </li>
            <li class="attribute-item">
              <i class="el-icon-caret-right"></i>
              <span class="file-name">Fare</span>
            </li>
          </ul>
        </div>
      </div>
    </el-col>
    <el-col :span="20" class="background">
      <div style="padding: 0 0px;">
        <el-menu :default-active="defaultActive" class="task-bar" 
                mode="horizontal" router>
          <el-row>
            <el-col :span="3">
              <el-menu-item class="task-item" index="dataOverview">
                <span class="task-text">
                  数据总览
                </span>
              </el-menu-item>
            </el-col>
            <el-col :span="3">
              <el-menu-item class="task-item" index="dataVisualization">
                <span class="task-text">
                  可视化
                </span>
              </el-menu-item>
            </el-col>
            <el-col :span="3">
              <el-menu-item class="task-item" index="dataPreprocessing">
                <span class="task-text">
                  预处理
                </span>
              </el-menu-item>
            </el-col>
            <el-col :span="3">
              <el-menu-item class="task-item" index="modelTraining">
                <span class="task-text">
                  模型训练
                </span>
              </el-menu-item>
            </el-col>
            <el-col :span="3">
              <el-menu-item class="task-item" index="modelEvaluation">
                <span class="task-text">
                  模型评估
                </span>
              </el-menu-item>
            </el-col>
            <el-col :span="3" :offset="6">
              <el-link class="load-dataset-button" icon="el-icon-plus">
                <router-link to="/uploadData">上传数据集</router-link>
              </el-link>
            </el-col>
          </el-row>
        </el-menu>
        <div style="height: calc(100vh - 92px); padding: 5px 15px; box-sizing: border-box;">
          <router-view></router-view>
        </div>
      </div>
    </el-col>
  </el-row>
</div>
</template>

<script>
import headTop from '~/components/headTop'
export default {
  components: {
    headTop
  },
  data() {
    return {
      count: 0
    };
  },
  methods: {
    
  },
  computed: {
    defaultActive: function() {
      return this.$route.path.replace('/', '');
    }
  }
};
</script>

<style scoped>

.dataset-container {
  border: solid rgb(219, 218, 218);
  border-width: 0 1px 1px 0;
}
.attributes-container {
  border: solid rgb(219, 218, 218);
  border-width: 0px 1px;
}
.task-bar {
  height: 40px;
}
.task-item {
  height: 40px;
  font-size: 17px;
  border-width: 0 0 2px 0;
  border-style: solid;
  border-color: rgb(221, 39, 39);
}
.task-item:hover {
  background-color: rgba(205, 223, 223, 0.6);
}
.task-item.is-active {
  color:rgb(221, 39, 39);
  background-color: white;
}
.task-text {
  position: relative; 
  top: -10px;
}
.sider-bar-head {
  padding: 5px 6px;
  font-weight: bold;
  font-size: 15px;
  background-color:rgba(218, 206, 189, 0.2);
}
.dataset-list {
  font-size: 14px;
}
.dataset-item {
  margin: 2px 12px;
  padding: 3px 8px;
}
.dataset-item:hover {
  border:0px solid;
  border-radius:25px;
  -moz-border-radius:25px;
  background-color: rgba(218, 215, 215, 0.3);
  cursor: pointer;
}
.attribute-item {
  margin: 2px 12px;
  padding: 3px 8px;
}
.attribute-item:hover {
  border:0px solid;
  border-radius:25px;
  -moz-border-radius:25px;
  background-color: rgba(99, 147, 236, 0.3);
  cursor: default;
}
.load-dataset-button {
  position: relative;
  font-size: 15px;
  right: 0px;
  padding-top: 12px;
}

/* width */
::-webkit-scrollbar {
  width: 6px;
}
/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1; 
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: rgb(175, 174, 174, 0.6); 
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: rgb(139, 138, 138); 
}

.background{
  background-color: rgba(218, 228, 236, 0.3);
}

.file-name {
  position: relative;
  left: 5px;
}
</style>