<template>
	<view>
		<view class="body">
			<view class="title">
				绑定儿童端账号
			</view>
			<view class="text">
				点击生成绑定验证码与二维码<br/>完成和儿童端的绑定吧~
			</view>
			<view class="code">
				<view class="tip">
					验证码
				</view>
				<view class="input">
					{{code}}
				</view>
			</view>
			
			<view class="btn" @click="createCode">
				生成绑定验证码与二维码
			</view>
			<view class="qr-box">
				<canvas canvas-id="qrcode" v-show="qrShow" style="width: 300rpx;margin: 0 auto;"/>
			</view>
		</view>
		
	</view>
</template>

<script>
	import uQRCode from '../../../../util/uqrcode.js' //引入uqrcode.js
	export default {
		data() {
			return {
				code:'',
				qrShow: false,
				
			}
		},
		methods: {
			qrFun(text){
				this.qrShow = true
				uQRCode.make({
					canvasId: 'qrcode',
					componentInstance: this,
					text: text,
					size: 150,
					margin: 0,
					backgroundColor: '#ffffff',
					foregroundColor: '#000000',
					fileType: 'jpg',
					errorCorrectLevel: uQRCode.errorCorrectLevel.H,
					success: res => {}
				})

			},
			createCode(){
				uni.request({
					url: 'https://api.yuleng.top:38088/api/get/invitation-code/', 
					method:'POST',
					header: {
						'token': uni.getStorageSync('token'), 
					},
					success: (res) => {
						this.code=res.data.data.code
						this.qrFun(this.code)
					}
				});
				
			}
		}
	}
</script>

<style lang="scss" scoped>
.qr-box {
		width: 400rpx;
		height: 460rpx;
		margin: 0 auto;
		margin-top: 80rpx;
	}
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
			width: 620rpx;
			height: 70rpx;
			text-align: center;
			line-height: 70rpx;
			color: #6a6a6a;
			background-color: #f5e5c4;
			border-radius: 25rpx;
		}
	}
	.btn{
		width: 620rpx;
		height: 70rpx;
		background-color: #f9dba8;
		border-radius: 25rpx;
		margin: 0 auto;
		margin-top: 60rpx;
		text-align: center;
		color: #6a6a6a;
		line-height: 70rpx;
		font-size: 32rpx;
	}
	
}


</style>
