<template>
	<view>
		<view class="toppic">
			<view class="area1">
				<image src="https://s2.loli.net/2022/09/12/KnGWJv98kQ1ycRA.png" style="width: 110rpx;height: 100rpx;margin-top: 20rpx;margin-left: 50rpx;"></image>
				<view style="margin-left: 58rpx;color: #595959;">
					交流区
				</view>
			</view>
			
			<view class="area2" @click="goEdit">
				<image src="https://s2.loli.net/2022/09/12/zDbapIBwWO2guSd.png" style="width: 110rpx;height: 100rpx;margin-top: 20rpx;margin-left: 50rpx;"></image>
				<view style="margin-left: 58rpx;color: #595959;">
					建议区
				</view>
			</view>
		</view>
		<view class="pic">
			<image src="https://s2.loli.net/2022/09/12/ChR4B1uXUI86sTv.jpg" style="width: 550rpx;height: 500rpx;margin-top: -80rpx;"></image>
		</view>
		<view class="body">
			<view class="content">
				<view class="item">
					<view class="text">
						遇到问题的类型：
					</view>
					<view class="text1">
						<text class="answer">心理</text>
					</view>
				</view>
				<view class="item">
					<view class="text">
						解决问题的方式:
					</view>
					<view class="text1">
						线下
					</view>
				</view>
				<view class="item">
					<view class="text">
						是否要立即解决：
					</view>
					<view class="text1">
						是
					</view>
				</view>
				<view class="item">
					<view class="text">
						具体问题描述:
					</view>
					<view class="text1">
						我好困困困困啊我好饿饿饿啊我好困困困困啊
					</view>
				</view>
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
			goEdit(){
				uni.navigateTo({
					url:"/pages/parents/parentSolveProblem/noresolve/edit/edit"
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.toppic{
		position: relative;
		z-index: 10;
		.area1{
			display: inline-block;
			width: 211rpx;
			height: 180rpx;
			// background-color: #fff187;
		}
		.area2{
			display: inline-block;
			float: right;
			width: 211rpx;
			height: 180rpx;
			// background-color: #cdffab;
		}
	}
	.pic{
		display: flex;
		justify-content: center;
	}
	.body{
		// background-color: #ffaa00;
		display: flex;
		justify-content: center;
		.content{
				width: 653rpx;
				background-color: #fee3c8;
				border-radius: 25rpx;
				box-shadow: 0px 0px 5px #efd6b2;
				padding-bottom: 30rpx;
				.item{
					.text{
						// background-color: #fff;
						padding-left: 40rpx;
						color: #6f6f6f;
						font-size: 34rpx;
						margin-top: 20rpx;
						font-weight: 700;
						width: 280rpx;
					}
					.text1{
						background-color: #fedcba;
						width: 550rpx;
						margin-left: 40rpx;
						border-radius: 10rpx;
						padding-left: 20rpx;
						color: #343434;
						font-size: 34rpx;
						margin-top: 20rpx;
						font-weight: 500;
						padding-top: 10rpx;
						padding-bottom: 10rpx;
					}
					// .text2{
					// 	display: inline-block;
					// 	padding-left: 40rpx;
					// 	color: #6f6f6f;
					// 	font-size: 34rpx;
					// 	margin-top: 20rpx;
					// 	font-weight: 700;
					// 	width: 270rpx;
					// }
					// .text22{
					// 	display: inline-block;
					// 	font-size: 34rpx;
					// 	// color: #6f6f6f;
					// }
				}
			}
		}
</style>
