<template>
	<view class="all">
		<image src="../../../static/file (14).jpeg" style="width: 100%; height: 440rpx;"></image>
		<view class="top">
			驿站
		</view>
		<view class="body">
			<view class="one">
				<view class="left" @click="goproblem">
					<view class="text">解惑列表</view>
					<view class="num">
						{{num}}
					</view>
					<view class="tip">
						未解决
					</view>
				</view>
				<view class="right">
					<view class="lookAll" @click="lookAll">
						<image src="../../../static/file2 (1).png" style="width: 60rpx;height: 60rpx;margin-left: 37rpx;" mode=""></image>
						<view class="text">成长档案</view>
					</view>
					<view class="addquestion" @click="addQuestion">
						<image src="../../../static/question.png" style="width: 60rpx;height: 60rpx;margin-left: 37rpx;" mode=""></image>
						<view class="text">提出问题</view>
					</view>
				</view>
			</view>
			<view class="two">
				<view class="phone" @click="phone">
					<view class="text">紧急求助</view>
					<image src="../../../static/file2 (2).png" style="width: 200rpx;height: 168rpx;position: absolute;right: 110rpx;bottom: 40rpx;" mode=""></image>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				num:0
			}
		},
		onShow() {
			this.getdata()
		},
		methods: {
			// 获取未解决个数
			getdata(){
				uni.request({
					url: 'https://api.yuleng.top:38088/api/disabuse/not-solve/num', 
					header: {
						'token': uni.getStorageSync('token'), 
					},
					success: (res) => {
						this.num=res.data.message
					}
				});
			},
			//进入增加问题界面
			addQuestion(){
				uni.navigateTo({
					url:'/pages/childs/posthouse/addQuestion/addQuestion'
				})
			},
			//进入成长档案界面
			lookAll(){
				uni.navigateTo({
					url:'/pages/childs/posthouse/lookAll/lookAll?where=1'
				})
			},
			//去解惑儿童端页面
			goproblem(){
				uni.navigateTo({
					url:'/pages/parents/parentSolveProblem/parentSolveProblem?where=1'
				})
			},
			// 紧急联系人界面
			phone(){
				uni.navigateTo({
					url:'/pages/childs/posthouse/phone/sendall'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.all{
	padding-bottom: 20rpx;
}
.top{
	background-color: #fff;
	width: 280rpx;
	height: 140rpx;
	border-top-left-radius:140rpx;
	border-top-right-radius:140rpx;
	margin-top:-210rpx;
	position:absolute;
	font-size: 50rpx;
	line-height: 140rpx;
	text-align: center;
	font-weight: 700;
	color: #a3becf;
}
.body{
	background-color: #fff;
	// padding-top: 100rpx;
	margin-top: -80rpx;
	position: absolute;
	width: 100%;
	border-top-right-radius:91rpx;
	.goproblem,.lookAll,.addQuestion,.phone{
		height: 200rpx;
		// margin-top: 50rpx;
		background-color: #fff;
	}
	.one{
		display: flex;
		justify-content: space-around;
		align-items: center;
		margin-top: 70rpx;
		height: 270rpx;
		.left{
			display: inline-block;
			// background-color: #fed333;
			width: 310rpx;
			height: 250rpx;
			border-radius: 36rpx;
			vertical-align: middle;
			background: linear-gradient(#66f08b, #81d677);
			.text{
				font-size: 42rpx;
				color: white;
				display: inline-block;
				font-weight: 700;
				margin-left: 45rpx;
				margin-top: 20rpx;
			}
			.num{
				margin-top: 20rpx;
				text-align: center;
				font-size: 73rpx;
				font-weight: 700;
				color: white;
			}
			.tip{
				font-size: 30rpx;
				text-align: right;
				margin-right: 20rpx;
				margin-top: -10rpx;
				color: #fff;
			}
		}
		.right{
			display: inline-block;
			width: 337rpx;
			height: 250rpx;
			vertical-align: middle;
			margin-left: -50rpx;
			.lookAll{
				display: flex;
				align-items: center;
				// background-color: #f6d8dc;
				width: 337rpx;
				height: 115rpx;
				border-radius: 23rpx;
				vertical-align: middle;
				background: linear-gradient(#ecc9ce, #e19797);
				.text{
					font-size: 40rpx;
					color: white;
					display: inline-block;
					margin-left: 10rpx;
					font-weight: 700;
				}
			}
			.addquestion{
				display: flex;
				align-items: center;
				width: 337rpx;
				height: 115rpx;
				border-radius: 23rpx;
				margin-top: 23rpx;
				vertical-align: middle;
				background: linear-gradient(#ffda57, #f3d5a8);
				.text{
					font-size: 40rpx;
					color: white;
					display: inline-block;
					margin-left: 10rpx;
					font-weight: 700;
				}
			}
		}
	}
	.two{
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 20rpx;
		height: 270rpx;
		.phone{
			background-color: #cdebc9;
			width: 682rpx;
			height: 250rpx;
			border-radius: 36rpx;
			background: linear-gradient(#9be0f3, #82bfe9);
			// display: flex;
			// align-items: center;
			.text{
				font-size: 52rpx;
				color: white;
				display: inline-block;
				font-weight: 700;
				margin-left: 45rpx;
				margin-top: 20rpx;
			}
		}
	}
}


</style>
