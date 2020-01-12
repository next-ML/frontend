<template>
<div class="fillcontain">
  <chart class="chart-place" 
        ref="importanceChart" 
        autoresize
        :options="importanceBarOption">
  </chart>
</div>
</template>

<script>
export default {
    name: "WeightChart",
    computed: {
      importanceBarOption() {
        return {
          color: ['#4682B4'],
          title: {
            text: '特征重要程度排序'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'value'
            }
          ],
          yAxis: [
            {
              type: 'category',
              data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'aaa', 'bbb', 'ccc'],
              axisTick: {
                  alignWithLabel: true
              },
              inverse: true,
            }
          ],
          series: [
            {
              name: '直接访问',
              type: 'bar',
              barWidth: '60%',
              data: [420, 390, 334, 330, 220, 200, 52, 10, 8, 5]
          }
          ]
        };
      }
    }
}
</script>

<style scoped>
.chart-place {
  width: 100%;
  height:calc(100vh - 150px);
}

</style>