<template>
<div class="fillcontain">
  <el-card class="box-card" :body-style="{ padding: '0px'}">
    <div slot="header" class="clearfix">
      <span> {{ datasetName }} </span>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%;"
      height="calc(100vh - 190px)">
      <el-table-column
        v-for="col in columns"
        :key="col.id"
        :label="col.name"
        :prop="col.name"
        width="150">
      </el-table-column>
    </el-table>
  </el-card>
</div>
</template>

<script>
export default {
  name: "dataOverview",
  data() {
    return {
      
    }
  },
  computed: {
    tableData() {
      return this.$store.state.currentDataset.rawData;
    },
    datasetName() {
      return this.$store.state.currentDataset.metadata.name;
    },
    columns() {
      return this.$store.state.currentDataset.metadata.columns;
    }
  }
}
</script>

<style scoped>
  
</style>