<template>
	<view>
		<view class="pic">
			<image src="../../../static/about.png"></image>
		</view>
		<view class="text">
			<!-- <img src="../../../static/icon.jpg" style="width: 60rpx;height: 60rpx;" alt=""> -->
			<view class="from">
				来自丢失的大熊猫团队
			</view>
			<view class="num">
				版本号:1.1.0
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
			
		}
	}
</script>

<style scoped lang="scss">
.pic{
	height: 500rpx;
	width: 100%;
	display: flex;
	justify-content: center;
	margin-top: 20vh;
}
.text{
	height: 150rpx;
	margin-top: 350rpx;
}
	
.from,.num{
	font-size: 35rpx;
	text-align: center;
	color: #707070;
}
</style>
