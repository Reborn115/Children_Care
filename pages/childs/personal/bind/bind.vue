<template>
	<view>
		<view class="body">
			<view class="title">
				绑定父母端账号
			</view>
			<view class="text">
				请输入父母端生成的绑定验证码<br/>完成和父母端的绑定吧~
			</view>
			<view class="code">
				<view class="tip">
					验证码
				</view>
				<view class="input">
					<u--input
						border="surround"
					    clearable
					    v-model="value"
					  ></u--input>
				</view>
			</view>
			<view class="btn" @click="bind">
				绑定
			</view>
			
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value:'',
			}
		},
		methods: {
			bind(){
				uni.request({
					url: 'https://api.yuleng.top:38088/api/attend/invitation-code/', 
					method:'POST',
					data:{
						code:this.value
					},
					header: {
						'token': uni.getStorageSync('token'), 
					},
					success: (res) => {
						if(res.data.code=='A0400'){
							uni.showToast({
								title: res.data.message,
								icon:'error',
								duration: 2000
							});
						}else{
							uni.showToast({
								title: '绑定成功',
								icon:'success',
								duration: 2000
							});
						}
						
					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
.body{
	.title{
		font-size: 55rpx;
		color: #f9dba8;
		font-weight: 700;
		text-align: center;
		margin-top: 80rpx;
		
	}
	.text{
		color: #b4b4b4;
		margin-top: 50rpx;
		text-align: center;
	}
	.code{
		margin-top: 80rpx !important;
		width: 620rpx;
		height: 150rpx;
		margin: 0 auto;
		.tip{
			color: #6a6a6a;
			font-size: 31rpx;
			padding-left: 10rpx;
		}
		.input{
			margin-top: 10rpx;
			display: flex;
			width: 620rpx;
			height: 70rpx;
			background-color: #f5e5c4;
			border-radius: 25rpx;
			/deep/.u-input--radius.data-v-fdbb9fe6, .u-input--square{
				border-radius: 25rpx;
			}
			/deep/.u-border{
				border: 1rpx solid #f5e5c4 !important;
			}
		}
	}
	.btn{
		width: 620rpx;
		height: 70rpx;
		background-color: #f9dba8;
		border-radius: 25rpx;
		margin: 0 auto;
		margin-top: 80rpx;
		text-align: center;
		color: #6a6a6a;
		line-height: 70rpx;
		font-size: 32rpx;
	}
	
}


</style>
