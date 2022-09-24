<template>
	<view class="all">
		<view class="child">
			<view class="tit">
					儿童基本信息
			</view>
			<view class="detail">
				<view class="inside">
					<view class="item">
						<text class="text">姓名: </text>
						<text class="answer">李哈哈</text>
					</view>
					<view class="item">
						<text class="text">性别: </text>
						<text class="answer">女</text>
					</view>
					<view class="item">
						<text class="text">籍贯: </text>
						<text class="answer">河北省保定市</text>
					</view>
					<view class="item">
						<text class="text">年龄: </text>
						<text class="answer">11岁</text>
					</view>
					<view class="item">
						<text class="text">年级: </text>
						<text class="answer">小学六年级</text>
					</view>
					<view class="item">
						<text class="text">个性签名: </text>
						<text class="answer">哈哈哈哈哈哈哈哈哈</text>
					</view>
				</view>
			</view>
		</view>
		<view class="pic">
			<image src="../../../../static/02郁金香团子.png" style="width: 260rpx;height: 260rpx;"></image>
		</view>
		<view class="child2">
			<view class="tit">
					父母基本信息
			</view>
			<view class="detail">
				<view class="inside">
					<view class="item">
						<text class="text">父亲姓名: </text>
						<text class="answer">李二</text>
					</view>
					<view class="item">
						<text class="text">父亲联系方式: </text>
						<text class="answer">11111111111</text>
					</view>
					<view class="item">
						<text class="text">父亲工作地址: </text>
						<text class="answer">天津市西青区天津理工大学</text>
					</view>
					<view class="item">
						<text class="text">母亲姓名: </text>
						<text class="answer">张二</text>
					</view>
					<view class="item">
						<text class="text">母亲联系方式: </text>
						<text class="answer">22222222222</text>
					</view>
					<view class="item">
						<text class="text">母亲工作地址: </text>
						<text class="answer">天津市西青区天津理工大学</text>
					</view>
					<view class="item">
						<text class="text">父母回家情况: </text>
						<text class="answer">一年两次</text>
					</view>
					<view class="item">
						<text class="text">关注软件情况: </text>
						<text class="answer">每周两次</text>
					</view>
					<view class="item">
						<text class="text">寄语儿童: </text>
						<text class="answer">好好长大</text>
					</view>
					<view class="item">
						<text class="text">寄语志愿者: </text>
						<text class="answer">感谢你的付出</text>
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
			
		}
	}
</script>

<style scoped lang="scss">
	.all{
		padding-bottom: 100rpx;
	}
.child{
	height: 500rpx;
	// background-color: #d1ffc2;
	margin-top: 20rpx;
	.tit{
		// margin-top: 20rpx;
		margin-left: 50rpx;
		display: inline-block;
		vertical-align: top;
		padding-top: 40rpx;
		width: 62rpx;
		height: 450rpx;
		color: #6f6f6f;
		font-weight:700;
		font-size: 46rpx;
		// background-color: #ecffb7;
	}
	.detail{
		float: right;
		height: 490rpx;
		width: 580rpx;
		margin-top: 20rpx;
		margin-right: 30rpx;
		border-radius: 15rpx;
		display: inline-block;
		vertical-align: top;
		background-color: #fee3c8;
		.inside{
			height: 400rpx;
			margin-top: 30rpx;
			margin-left: 30rpx;
			width: 520rpx;
			// background-color: #c2f9ff;
			.item{
				// background-color: #95baff;
				margin-bottom: 20rpx;
				.text{
					color: #6f6f6f;
					font-size: 34rpx;
					font-weight: 700;
				}
				.answer{
					margin-left: 10rpx;
					font-size:34rpx;
					color: #4f4f4f;
				}
			}
		}
	}
}
.child2{
	height: 940rpx;
	margin-top: 160rpx;
	.tit{
		// margin-top: 20rpx;
		margin-left: 50rpx;
		display: inline-block;
		vertical-align: top;
		padding-top: 130rpx;
		width: 62rpx;
		height: 390rpx;
		color: #6f6f6f;
		font-weight:700;
		font-size: 46rpx;
		// background-color: #ecffb7;
	}
	.detail{
		float: right;
		height: 940rpx;
		width: 580rpx;
		margin-top: 20rpx;
		margin-right: 30rpx;
		border-radius: 15rpx;
		display: inline-block;
		vertical-align: top;
		background-color: #fee3c8;
		.inside{
			height: 400rpx;
			margin-top: 82rpx;
			margin-left: 30rpx;
			width: 520rpx;
			// background-color: #c2f9ff;
			.item{
				// background-color: #95baff;
				margin-bottom: 33rpx;
				.text{
					color: #6f6f6f;
					font-size: 34rpx;
					font-weight: 700;
				}
				.answer{
					margin-left: 10rpx;
					font-size:34rpx;
					color: #4f4f4f;
				}
			}
		}
	}
}
.pic{
	position: absolute;
	top:33vh;
	left: 5vw;
	width: 290rpx;
	height: 290rpx;
	display:flex;
	justify-content: center;
	align-items: center;
	background-color: #fee3c8;
	border-radius:15rpx;
	box-shadow: 0px 0px 5px #a9aba3;
}
</style>
