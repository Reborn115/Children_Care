<template>
	<view>
		<view class="img">
			<image
			  src="../../../../static/20221009-200656.jpg"
			  style="width: 720rpx; height: 560rpx"
			></image>
		</view>
		<view class="code">
			<view class="input">
				你已绑定好父母端，无需再次绑定
			</view>
			<view class="tip" @click="gobind">
				原绑定有误？重新绑定
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			gobind(){
				uni.navigateTo({
				  url: "/pages/childs/personal/bind/bind",
				});
			}
		}
	}
</script>

<style scoped lang="scss">
.img{
	display: flex;
	justify-content: center;
	margin-top: 100rpx;
}
.code{
		margin-top: 80rpx !important;
		width: 620rpx;
		height: 150rpx;
		margin: 0 auto;
		.tip{
			color: #4d90cc;
			font-size: 29rpx;
			float: right;
			margin-top: 25rpx;
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
</style>
