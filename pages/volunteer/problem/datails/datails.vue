<template>
	<view class="all">
		<view class="toppic">
			<view class="area">
				<image src="https://s2.loli.net/2022/09/12/KnGWJv98kQ1ycRA.png" style="width: 110rpx;height: 100rpx;margin-top: 20rpx;margin-left: 50rpx;"></image>
				<view style="margin-left: 52rpx;color: #595959;">
					交流讨论
				</view>
			</view>
			
			<view class="area" @click="goinformation">
				<image src="https://s2.loli.net/2022/09/12/9gwRV6tlsqXfLY3.png" style="width: 110rpx;height: 100rpx;margin-top: 20rpx;margin-left: 50rpx;"></image>
				<view style="margin-left: 47rpx;color: #595959;">
					儿童详情
				</view>
			</view>
			
			<view class="area" @click="goEdit">
				<image src="https://s2.loli.net/2022/09/12/zDbapIBwWO2guSd.png" style="width: 110rpx;height: 100rpx;margin-top: 20rpx;margin-left: 50rpx;"></image>
				<view style="margin-left: 52rpx;color: #595959;">
					情况记录
				</view>
			</view>
			
		</view>
		<view class="pic">
			<image src="https://s2.loli.net/2022/09/12/ChR4B1uXUI86sTv.jpg" style="width: 550rpx;height: 500rpx;margin-top: -40rpx;"></image>
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
		<button class="button" @click="dialogToggle"><text
				class="button-text warn-text">问题未解决</text></button>
		<view>
			<!-- 提示窗示例 -->
			<uni-popup ref="alertDialog" type="dialog">
				<uni-popup-dialog type="info" cancelText="关闭" confirmText="确定"  content="是否确定问题已解决？" @confirm="dialogConfirm"
					@close="dialogClose"></uni-popup-dialog>
			</uni-popup>
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
			//进入编辑页面
			goEdit(){
				uni.navigateTo({
					url:"/pages/volunteer/problem/vedit/vedit"
				})
			},
			//进入消息详情
			goinformation(){
				uni.navigateTo({
					url:"/pages/volunteer/problem/information/information"
				})
			},
			//打开修改问题状态弹窗
			dialogToggle() {
				this.$refs.alertDialog.open()
			},
			dialogConfirm() {
				console.log('点击确认')
			},
			dialogClose() {
				console.log('点击关闭')
			},
		}
	}
</script>

<style scoped lang="scss">
	.all{
		padding-bottom: 80rpx;
	}
	.toppic{
		position: relative;
		z-index: 10;
		display: flex;
		justify-content: space-around;
		.area{
			display: inline-block;
			width: 211rpx;
			height: 180rpx;
			// background-color: #fff187;
		}
		// .area2{
		// 	display: inline-block;
		// 	float: right;
		// 	width: 211rpx;
		// 	height: 180rpx;
		// 	// background-color: #cdffab;
		// }
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
		.button{
			width: 485rpx;
			height: 80rpx;
			line-height: 80rpx;
			margin-top: 55rpx;
			background-color: #ffedbc;
			border: 1px solid #fff5d0;
		}
</style>
