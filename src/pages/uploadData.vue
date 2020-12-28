<template>
<div class="fillcontain" style="padding-top: 40px; box-sizing: border-box;">
  <uploader class="uploader-example"
            :options="uploaderOptions"
            @complete="onUploadComplete"
            ref="uploader" >
    <uploader-unsupport></uploader-unsupport>
    <uploader-drop>
      <p style="margin: 10px 0 30px 0;">将文件夹拖曳至此，或者</p>
      <uploader-btn style="margin-bottom: 10px;" >选择文件夹</uploader-btn>
    </uploader-drop>
    <uploader-list></uploader-list>
  </uploader>
</div>
</template>

<script>
import axios from 'axios'
export default {
	name: "UploadData",
	data() {
    return {
      uploaderOptions: {
        target: this.apiTarget,
        testChunks: false
      },
      attrs: {
        accept: ".csv"
      }
    }
	},
	computed: {
	},
	methods: {
		onUploadComplete() {
			alert("上传完成");
			this.$store.dispatch('initDatasetInfo')
		},
		apiTarget(file) {
			return ["api", "guest", "dataset", file.name]
						 .join("/");
		}
	}
}
</script>

<style lang="less">
.explain_text{
	margin-top: 20px;
	text-align: center;
	font-size: 20px;
	color: #333;
}
.uploader-example {
	max-width: 880px;
	padding: 15px;
	margin: 0px auto 0;
	font-size: 18px;
	box-shadow: 0 0 10px rgba(0, 0, 0, .4);
	text-align: center;
}
.uploader-example .uploader-btn {
	margin-right: 4px;
}
.uploader-example .uploader-list {
	max-height: 440px;
	overflow: auto;
	overflow-x: hidden;
	overflow-y: auto;
}
</style>