import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const frame = r => require.ensure([], () => r(require('~/pages/frame')), 'frame');
const uploadData = r => require.ensure([], () => r(require('~/pages/uploadData.vue')))
const dataOverview = r => require.ensure([], () => r(require('~/pages/dataOverview')), 'dataOverview');
const dataVisualization = r => require.ensure([], () => r(require('~/pages/dataVisualization')), 'dataVisualization');
const dataPreprocessing = r => require.ensure([], () => r(require('~/pages/dataPreprocessing')), 'dataPreprocessing');
const modelTraining = r => require.ensure([], () => r(require('~/pages/modelTraining')), 'modelTraining');
const modelEvaluation = r => require.ensure([], () => r(require('~/pages/modelEvaluation')), 'modelEvaluation');
const materialExplore = r => require.ensure([], () => r(require('~/pages/materialExplore')), 'materialExplore');

const routes = [
	{
		path: '/',
		component: frame,
		name: '',
		children: [{
			path: 'dataOverview',
			component: dataOverview,
		},{
			path: 'dataVisualization',
			component: dataVisualization,
		},{
			path: 'dataPreprocessing',
			component: dataPreprocessing,
		},{
			path: 'modelTraining',
			component: modelTraining,
		},{
			path: 'modelEvaluation',
			component: modelEvaluation,
		},{
			path: 'uploadData',
			component: uploadData
		},{
			path: 'materialExplore',
			component: materialExplore
		}]
	},
	{
		path: '/dataOverview',
		component: dataOverview
	}
]

export default new Router({
	routes,
	strict: process.env.NODE_ENV !== 'production',
})
