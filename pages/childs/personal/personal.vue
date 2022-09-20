<template>
	<view>
		<view class="pic">
			<image src="https://s2.loli.net/2022/09/11/3oxwWE6GIiMfFbA.png" style="width: 200rpx;height: 200rpx;border-radius: 100rpx;"></image>
		</view>
		<view class="name">
			<text class="nametext">堂堂</text>
		</view>
		<view class="one">
			<view class="item1">
				<text>我的消息</text>
				<uni-badge class="uni-badge-left-margin" text="20" />
				<image src="https://s2.loli.net/2022/09/11/8TcwdmNuDxKW1aO.png" style="width: 50rpx;height: 50rpx;"></image>
			</view>
			<view class="item2">
				<text>儿童模式</text>
				<image src="https://s2.loli.net/2022/09/11/Hmr2g85unltcToP.png" style="width: 50rpx;height: 50rpx;"></image>
			</view>
		</view>
		<view class="two">
			<image src="https://s2.loli.net/2022/09/11/NEpQiRIDKlOCWUs.png" style="width: 50rpx;height: 40rpx;" class="icon"></image>
			<text class="content">孩子账号</text>
			<image src="https://s2.loli.net/2022/09/11/nIwfsF7rDemSMER.png" style="width: 50rpx;height: 50rpx;" class="inter"></image>
		</view>
		<view class="two">
			<image src="https://s2.loli.net/2022/09/11/cvsUMmNJOGHjB4r.png" style="width: 40rpx;height: 40rpx;" class="icon"></image>
			<text class="content">我的资料</text>
			<image src="https://s2.loli.net/2022/09/11/w9XmrnbvWBaUckI.png" style="width: 50rpx;height: 50rpx;" class="inter"></image>
		</view>
		<view class="two">
			<image src="https://s2.loli.net/2022/09/11/BmYTZ2HqIFLkCpy.png" style="width: 40rpx;height: 40rpx;" class="icon"></image>
			<text class="content">关于我们</text>
			<image src="https://s2.loli.net/2022/09/11/KSUzeq2DCvaO1Qd.png" style="width: 50rpx;height: 50rpx;" class="inter"></image>
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

<style lang="scss" scoped>
	.pic{
		height:270rpx;
		display: flex;
		justify-content: center;
		align-items: flex-end;
		// background-color: #55ffff;
	}
	.name{
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100rpx;
		// background-color: #ffaa00;
		.nametext{
			font-size: 46rpx;
		}
	}
	.one{
		height: 93rpx;
		margin-top: 20rpx;
		// background-color: #55ff7f;
		.item1,.item2{
			// background-color: #00aaff;
			box-shadow: 2px 2px 4px #88888873;
			border-radius: 20rpx;
			width: 315rpx;
			height: 88rpx;
			font-size: 32rpx;
		}
		.item1{
			position: relative;
			float: left;
			margin-left: 46rpx;
			display: flex;
			justify-content: space-around;
			align-items: center;
			.uni-badge-left-margin{
				position: absolute;
				right: 8rpx;
				top: 3rpx;
			}
		}
		.item2{
			float: right;
			margin-right: 46rpx;
			display: flex;
			justify-content: space-around;
			align-items: center;
		}
	}
	.two{
		position: relative;
		margin-top: 30rpx;
		margin-left: 46rpx;
		box-shadow: 2px 2px 4px #88888873;
		border-radius: 20rpx;
		width: 662rpx;
		height: 88rpx;
		font-size: 32rpx;
		display: flex;
		align-items: center;
		.icon{
			float: left;
			margin-left: 47rpx;
		}
		.content{
			float: left;
			margin-left: 33rpx;
		}
		.inter{
			position: absolute;
			right: 50rpx;
		}
	}
</style>
