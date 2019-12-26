import Vue from "vue"
import Vuex from "vuex"
import axios from 'axios'

Vue.use(Vuex);

let state = {
  // 用户id
  userId: "guest",
  // 用户所有的数据集的信息
  allDataset: [
    {
      name:"label.csv"
    }, 
    {
      name:"titanic.csv"
    }, 
    {
      name:"iris.csv"
    }, 
  ],
  currentDataset: {
    // 当前数据集“种类”类别
    categoryAttributes: [
      {
        name: "Survived", 
      },
      {
        name: "Pclass",
      },
    ],
    // 当前数据集“数值”类别
    numericAttributes: [
      {
        name: "PassengerId",
      }, 
      {
        name: "Age", 
      }
    ],
    // 当前的已加载的数据
    metadata: {
      name: "example.csv",
      columns: [
        {
          name: "日期",
          dtype: "datetime",
          type: "category"
        },
        {
          name: "姓名",
          dtype: "string",
          type: "category"
        },
        {
          name: "省份",
          dtype: "string",
          type: "category"
        },
        {
          name: "市区",
          dtype: "string",
          type: "category"
        },
        {
          name: "地址",
          dtype: "string",
          type: "category"
        },
        {
          name: "邮编",
          dtype: "int",
          type: "numetic"
        }
      ],
    },
    rawData: [
      {
        "日期": "2016-05-03",
        "姓名": "王小虎",
        "省份": "上海",
        "市区": "普陀区",
        "地址": "上海市普陀区金沙江路 1518 弄",
        "邮编": 200333
      },
      {
        "日期": "2016-05-03",
        "姓名": "王小虎",
        "省份": "上海",
        "市区": "普陀区",
        "地址": "上海市普陀区金沙江路 1518 弄",
        "邮编": 200333
      }
    ]
  }
}

function initDatasetInfo(state) {
  axios
    .get(["api", state.userId, "dataset", "meta"].join("/"))
    .then(response => {
      let allDataset = response.data;
      state.allDataset = allDataset;
    })
    .catch(error => {
      console.log(error);
    })
}

function transferAttributesNameFormat(attributes) {
  let attr_list = []
  for (const attr of attributes) {
    attr_list.push({name: attr});
  }
  return attr_list
}

const mutations = {
  setCategoryAttributes(state, attributes) {
    let attr_list = transferAttributesNameFormat(attributes);
    state.currentDataset.categoryAttributes = attr_list;
  },
  setNumericAttributes(state, attributes) {
    let attr_list = transferAttributesNameFormat(attributes);
    state.currentDataset.numericAttributes = attr_list;
  },
  setColumns(state, columns) {
    state.currentDataset.metadata.columns = columns;
  },
  setRawData(state, rawData) {
    state.currentDataset.rawData = rawData;
  },
  setDatasetName(state, name) {
    state.currentDataset.metadata.name = name;
  },
  setAllDatasetInfo(state, allDataset) {
    state.allDataset = allDataset;
  }
}

const actions = {

}


// Initialize
initDatasetInfo(state);

export default new Vuex.Store({
  state,
  actions,
  mutations
})