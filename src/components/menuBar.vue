<template>
<div style="padding: 0 0px;">
  <el-menu :default-active="defaultActive" class="task-bar" 
          mode="horizontal" router>
    <el-row>
      <el-col :span="3">
        <el-menu-item class="task-item" index="uploadData">
          <span class="task-text">
            上传数据集
          </span>
        </el-menu-item>
      </el-col>
      <el-col :span="3">
        <el-menu-item class="task-item" index="dataOverview">
          <span class="task-text">
            数据总览
          </span>
        </el-menu-item>
      </el-col>
      <el-col :span="3">
        <el-menu-item 
          class="task-item" 
          index="dataVisualization">
          <span class="task-text">
            可视化分析
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
        <el-menu-item class="task-item" index="materialExplore">
          <span class="task-text">
            材料发现
          </span>
        </el-menu-item>
      </el-col>
    </el-row>
  </el-menu>
  <div style="height: calc(100vh - 92px); padding: 5px 15px; box-sizing: border-box;">
    <router-view></router-view>
  </div>
</div>
</template>

<script>
export default {
  name: "MenuBar",
  data() {
    return {
      
    }
  },
  computed: {
    defaultActive: function() {
      return this.$route.path.replace('/', '');
    }
  }
}
</script>

<style scoped>
.task-bar {
  height: 40px;
}

.task-text {
  position: relative; 
  top: -10px;
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

.load-dataset-button {
  position: relative;
  font-size: 15px;
  right: 0px;
  padding-top: 12px;
}
</style>