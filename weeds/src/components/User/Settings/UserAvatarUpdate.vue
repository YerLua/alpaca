<template>
<div>
    <my-upload field="img"
        @crop-success="cropSuccess"
        @crop-upload-success="cropUploadSuccess"
        @crop-upload-fail="cropUploadFail"
        v-model="show"
		:width="300"
		:height="300"
		url="/upload"
		img-format="png"></my-upload>
	<img :src="imgDataUrl">
</div>
</template>
<script>
import myUpload from 'vue-image-crop-upload';
export default {
    name: 'UserAvatarUpdate',
    data:{
        show: true,
        imgDataUrl: 'https://www.gravatar.com/avatar/default?s=200&r=pg&d=mm'
    },
    components: {
			'my-upload': myUpload
    },
    methods: {
            /**
			 * crop success
			 *
			 * [param] imgDataUrl
			 * [param] field
			 */
			cropSuccess(imgDataUrl, field){
				console.log('-------- crop success --------');
				this.imgDataUrl = imgDataUrl;
			},
			/**
			 * upload success
			 *
			 * [param] jsonData  server api return data, already json encode
			 * [param] field
			 */
			cropUploadSuccess(jsonData, field){
				console.log('-------- upload success --------');
				console.log(jsonData);
				console.log('field: ' + field);
			},
			/**
			 * upload fail
			 *
			 * [param] status    server api return error status, like 500
			 * [param] field
			 */
			cropUploadFail(status, field){
				console.log('-------- upload fail --------');
				console.log(status);
				console.log('field: ' + field);
			}
		}
}
</script>
