<template>
	<view class="all">
		<view class="toppic">
			<image src="https://s2.loli.net/2022/09/12/KnGWJv98kQ1ycRA.png" style="width: 100rpx;height: 90rpx;margin-top: 20rpx;margin-left: 50rpx;"></image>
			<view style="margin-left: 55rpx;color: #595959;">
				交流区
			</view>
		</view>
		<view class="pic">
			<image src="https://s2.loli.net/2022/09/12/ChR4B1uXUI86sTv.jpg" style="width: 550rpx;height: 500rpx;margin-top: -80rpx;"></image>
		</view>
		<view class="body">
			<view class="content">
				<view class="item">
					<view class="text">
						遇到问题的类型
					</view>
					<view class="text1">
						<text class="answer">心理</text>
					</view>
				</view>
				<view class="item">
					<view class="text">
						解决问题的方式
					</view>
					<view class="text1">
						线下
					</view>
				</view>
				<view class="item">
					<view class="text">
						是否要立即解决
					</view>
					<view class="text1">
						是
					</view>
				</view>
				<view class="item">
					<view class="text">
						具体问题描述
					</view>
					<view class="text1">
						我好困困困困啊我好饿饿饿啊我好困困困困啊
					</view>
				</view>
				<view class="item">
					<view class="text">
						<text>父母的建议</text>
						<uni-data-select
							v-model="parentnum"
							:localdata="range1"
							style="display: inline-block;"
							:clear="false"
						  ></uni-data-select>
						
					</view>
					<view class="text1">
						<view class="parent">
							<!-- <text style="font-weight: 600;color: #6f6f6f;">父母：</text> -->
							<text>加油宝贝，相信你是最棒</text>
						</view>
						<!-- <view class="volunter" style="margin-top: 15rpx;">
							<text style="font-weight: 600;color: #6f6f6f;">志愿者：</text>
							<text>小朋友相信你自己</text>
						</view> -->
					</view>
				</view>
				<view class="item">
					<view class="text">
						<text>志愿者的记录</text>
						<uni-data-select
							v-model="volunternum"
							:localdata="range2"
							style="display: inline-block;"
							:clear="false"
						  ></uni-data-select>
					</view>
					<view class="text1">
						<view class="text4">
							建议:
						</view>
						<view class="text5">
							好好学习天天向上
						</view>
						<view class="text4">
							线下直拍:
						</view>
						<image src="https://s2.loli.net/2022/09/21/WvknDJx4dVqr3cu.png" style="width: 250rpx;height: 250rpx;margin-left: 13rpx;margin-top: 10rpx;"></image>
						<image src="https://s2.loli.net/2022/09/21/IYSvdtKWkX4O7ae.png" style="width: 250rpx;height: 250rpx;margin-left: 13rpx;margin-top: 10rpx;"></image>
						<image src="https://s2.loli.net/2022/09/21/IYSvdtKWkX4O7ae.png" style="width: 250rpx;height: 250rpx;margin-left: 13rpx;margin-top: 10rpx;"></image>
						<image src="https://s2.loli.net/2022/09/21/WvknDJx4dVqr3cu.png" style="width: 250rpx;height: 250rpx;margin-left: 13rpx;margin-top: 10rpx;"></image>
						<view class="text4">
							孩子的情绪状态：
						</view>
						<view class="text5">
							好好好快乐开心哈哈哈好好好快乐开心哈哈哈好好好快乐开心哈哈哈
						</view>
						<view class="text4">
							其他：
						</view>
						<view class="text5">
							好好好快乐开心哈哈哈
						</view>
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
				//父母第几次
				parentnum: 0,
				// 志愿者第几次
				volunternum:0,
				//父母的选择第几次
				range1: [
				  { value: 0, text: "第一次" },
				  { value: 1, text: "第二次" },
				  { value: 2, text: "第三次" },
				],
				// 志愿者选择的第几次
				range2: [
				  { value: 0, text: "第一次" },
				  { value: 1, text: "第二次" },
				],
			}
		},
		methods: {
			
		}
	}
</script>

<style scoped lang="scss">
	.all{
		padding-bottom: 55rpx;
	}
	.toppic{
		position: relative;
		z-index: 10;
	}
	.pic{
		display: flex;
		justify-content: center;
	}
	.body{
		// background-color: #ffaa00;
		display: flex;
		justify-content: center;
		margin-bottom: 30rpx;
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
						width: 450rpx;
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
					.text4{
						// background-color: #fff;
						padding-left: 10rpx;
						color: #7e7e7e;
						font-size: 34rpx;
						margin-top: 10rpx;
						font-weight: 600;
						width: 280rpx;
					}
					.text5{
						// background-color: #fee3c8;
						width: 500rpx;
						margin-left: 5rpx;
						border-radius: 10rpx;
						padding-left: 10rpx;
						padding-right: 10rpx;
						color: #343434;
						font-size: 34rpx;
						margin-top: 8rpx;
						font-weight: 500;
						padding-top: 10rpx;
						padding-bottom: 10rpx;
					}
				}
			}
		}
/deep/.uni-select{
	font-size: 30rpx;
	margin-left: 30rpx;
	// color: #6f6f6f;
	// background-color: #fff;
}
</style>

