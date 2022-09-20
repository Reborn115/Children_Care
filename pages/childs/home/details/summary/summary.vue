<template>
	<view class="container">
		<text>
			{{mainText}}
		</text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				contentId:'1',
				mainText:''
			};
		},
		onLoad(e){
		    uni.request({
		        url: 'https://api.yuleng.top:38088/api/home-interface/story-detail', //仅为示例，并非真实接口地址。
		    	method:"POST",
		        data: {
		            contentId:this.contentId
		        },
		        header: {
		            "content-type":"application/json",
		    		"token":uni.getStorageSync('token')
		        },
		        success: (res) => {
					this.mainText=res.data.data.mainText;
		            console.log(res.data);
		            this.text = 'request success';
		    		
		        }
		    });
		},
	}
</script>

<style lang="scss" scoped>

</style>
