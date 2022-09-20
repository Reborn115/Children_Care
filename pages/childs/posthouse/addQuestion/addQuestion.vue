<template>
	<view>
		<view class="pic">
			<image src="https://s2.loli.net/2022/09/11/tIPSMb9pc4o2Qlr.jpg" style="width: 700rpx;height: 350rpx;margin-top: 20rpx;"></image>
		</view>
		<view class="body">
			<view class="content">
				<view class="type">
					<view class="text">
						遇到问题的类型：
					</view>
					<view class="btn">
						<view class="every">
							心理
						</view>
						<view class="every">
							学习
						</view>
						<view class="every">
							安全
						</view>
						<view class="every">
							生活
						</view>
						<view class="every">
							兴趣
						</view>
						<view class="every">
							感情
						</view>
						<view class="every">
							健康
						</view>
					</view>
				</view>
				<view class="question">
					<view class="text">
						具体问题描述:
					</view>
					<view class="input1">
						<view class="input2">
							<uni-easyinput type="textarea" v-model="question" placeholder="请输入问题"></uni-easyinput>
						</view>
						
					</view>
				</view>
				<view class="communicate">
					<view class="text">
						选择解决问题的方式
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
				question:'',
			}
		},
		methods: {
			
		}
	}
</script>

<style scoped lang="scss">
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
			//第一块：遇到问题类型
			.type{
				.btn{
					display: flex;
					justify-content: flex-start;
					flex-wrap: wrap;
					.every{
						width: 160rpx;
						height: 58rpx;
						background-color: #f9c2a6;
						margin-top: 20rpx;
						margin-left: 46rpx;
						border-radius: 29rpx;
						display: flex;
						justify-content: center;
						align-items: center;
						font-size: 28rpx;
					}
				}
			}
			.question{
				.input1{
					display: flex;
					justify-content: center;
					margin-top: 20rpx;
					.input2{
						width: 88%;
					}
				}
			}
		}
		.text{
			// background-color: #fff;
			padding-left: 40rpx;
			color: #6f6f6f;
			font-size: 34rpx;
			margin-top: 20rpx;
			font-weight: 700;
		}
	}
</style>
