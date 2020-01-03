<template>
<div class="fillcontain">
  <div style="height: 30%;" class="dataset-container">
    <div class="sider-bar-head">
      数据集
    </div>
    <div style="overflow:auto; height: calc(100% - 30px);" 
        class="infinite-list-wrapper">
      <ul class="dataset-list list">
        <li class="dataset-item" 
            v-for="info in datasetInfo" 
            :key="info.id"
            @click="loadDataset(info.name)">
          <i class="el-icon-document"></i>
          <span class="file-name">{{ info.name }}</span>
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
        <draggable
          class="dragArea list-group"
          :list="categoryAttributes"
          :group="{ name: 'attributes', pull: 'clone', put: false }"
          :clone="cloneAttribute"
        >
          <li class="attribute-item" 
              v-for="column in categoryAttributes" 
              :key="column.name">
            <i class="el-icon-rank"></i>
            <span class="file-name">{{ column.name }}</span>
          </li>
        </draggable>
      </ul>
    </div>
    <div class="sider-bar-head">
      数值属性
    </div>
    <div style="overflow:auto; height: calc(50% - 31px);" 
        class="infinite-list-wrapper">
      <ul class="dataset-list list">
        <draggable
          class="dragArea list-group"
          :list="numericAttributes"
          :group="{ name: 'attributes', pull: 'clone', put: false }"
          :clone="cloneAttribute"
        >
          <li class="attribute-item"
            v-for="column in numericAttributes" 
            :key="column.name">
            <i class="el-icon-rank"></i>
            <span class="file-name">{{ column.name }}</span>
          </li>
        </draggable>
      </ul>
    </div>
  </div>
</div>
</template>

<script>
import draggable from "vuedraggable";
import axios from 'axios';

export default {
  name: "DatasetBar",
  components: {
    draggable
  },
  data() {
    return {
    }
  },
  computed: {
    datasetInfo() {
      return this.$store.state.allDataset;
    },
    categoryAttributes() {
      return this.$store.state.currentDataset.categoryAttributes;
    },
    numericAttributes() {
      return this.$store.state.currentDataset.numericAttributes;
    }
  },
  methods: {
    cloneAttribute({ name }) {
      return {
        name: `${name}`
      };
    },
    loadDataset(datasetName) {
      let store = this.$store;
      // Get dataset metadata.
      axios
        .get(["api", store.state.userId, "dataset", datasetName, "meta"].join("/"))
        .then(response => {
          let data = response.data;
          store.commit("setDatasetName", data.name);
          store.commit("setColumns", data.columns);
          let categoryAttributes = [];
          let numericAttributes = [];
          let columns = []
          for (let col of data.columns) {
            if (col.type == "category") {
              categoryAttributes.push(col.name);
            }
            else {
              numericAttributes.push(col.name);
            }
            columns.push(col.name);
          }
          store.commit("setCategoryAttributes", categoryAttributes);
          store.commit("setNumericAttributes", numericAttributes);
          this.loadRawData(datasetName, columns);
        })
        .catch(error => {
          console.log(error);
        });
    },
    loadRawData(datasetName, columns) {
      let store = this.$store;
      // Get dataset raw data.
      axios
        .get(["api", store.state.userId, "dataset", datasetName].join("/"))
        .then(response => {
          let data = response.data;
          let rawData = data.data;
          let rawDataWithKey = [];
          for (const row of rawData) {
            let rowOjb = {};
            for (const i in columns) {
              rowOjb[columns[i]] = row[i];
            }
            rawDataWithKey.push(rowOjb);
          }
          console.log(rawDataWithKey)
          store.commit("setRawData", rawDataWithKey);
        })
    }
  }
}
</script>

<style scoped>
.dataset-container {
  border: solid rgb(219, 218, 218);
  border-width: 0 1px 1px 0;
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

.file-name {
  position: relative;
  left: 5px;
}

.attributes-container {
  border: solid rgb(219, 218, 218);
  border-width: 0px 1px;
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
</style>