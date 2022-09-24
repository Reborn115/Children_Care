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
						<uni-data-checkbox mode="tag"  multiple v-model="type" :localdata="typelist" selectedColor="#e5a280 !important" style="margin-left: 40rpx;margin-top: 10rpx;"></uni-data-checkbox>
					</view>
				</view>
				<view class="question">
					<view class="text">
						具体问题描述:
					</view>
					<view class="input1">
						<view class="input2">
							<uni-easyinput type="textarea" v-model="question" placeholder="具体描述遇到的问题"></uni-easyinput>
						</view>
						
					</view>
				</view>
				<view class="communicate">
					<view class="text">
						选择解决问题的方式:
					</view>
					<view class="method">
						<uni-forms-item>
							<uni-data-checkbox v-model="method" :localdata="sexs" selectedColor="#cb897b"/>
						</uni-forms-item>
					</view>
				</view>
				<view class="communicate">
					<view class="text1">
						是否匿名提交：
					</view>
					<view class="method">
						<uni-forms-item>
							<uni-data-checkbox v-model="realname" :localdata="namelist" selectedColor="#cb897b" />
						</uni-forms-item>
					</view>
				</view>
				<view class="communicate">
					<view class="text1">
						是否立即解决：
					</view>
					<view class="method">
						<uni-forms-item>
							<uni-data-checkbox v-model="now" :localdata="nowlist" selectedColor="#cb897b"/>
						</uni-forms-item>
					</view>
				</view>
				<view class="button">
					<button class="mini-btn1" type="default" size="mini">提交</button>
					<button class="mini-btn2" type="default" size="mini">取消</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//按钮背景色
				active1:false,
				active2:false,
				active3:false,
				active4:false,
				active5:false,
				active6:false,
				active7:false,
				typelist:[{
					text: '心理',
					value: 0
				}, {
					text: '学习',
					value: 1
				}, {
					text: '安全',
					value: 2
				},{
					text: '生活',
					value: 3
				},{
					text: '兴趣',
					value: 4
				},{
					text: '感情',
					value: 5
				},{
					text: '健康',
					value: 6
				}],
				//方式的展示内容
				sexs: [{
					text: '线下',
					value: 0
				}, {
					text: '视频',
					value: 1
				}, {
					text: '语言',
					value: 2
				},{
					text: '文字',
					value: 3
				}],
				//是否匿名
				namelist:[{
					text: '是',
					value: 0
				}, {
					text: '否',
					value: 1
				}],
				//是否现在解决
				nowlist:[{
					text: '是',
					value: 0
				}, {
					text: '否',
					value: 1
				}],
				//问题类型
				type:[],
				//问题描述
				question:'',
				//方式
				method:0,
				//是否匿名
				realname:0,
				//是否立即解决
				now:0
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
					// .bgc1{
					// 	width: 160rpx;
					// 	height: 58rpx;
					// 	margin-top: 20rpx;
					// 	margin-left: 46rpx;
					// 	border-radius: 29rpx;
					// 	display: flex;
					// 	justify-content: center;
					// 	align-items: center;
					// 	font-size: 28rpx;
					// 	background-color: #f9c2a6;
					// }
					// .bgc2{
					// 	width: 160rpx;
					// 	height: 58rpx;
					// 	margin-top: 20rpx;
					// 	margin-left: 46rpx;
					// 	border-radius: 29rpx;
					// 	display: flex;
					// 	justify-content: center;
					// 	align-items: center;
					// 	font-size: 28rpx;
					// 	background-color: #e5a280;
					// }
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
			.communicate{
				.method{
					// background-color: #8bffac;
					/deep/.uni-data-checklist .checklist-group{
						margin-top: 15rpx;
						margin-left: 46rpx;
					}
				}
			}
			.button{
				margin-top:-10rpx;
				height: 100rpx;
				.mini-btn1{
					font-size: 29rpx;
					color: #424242;
					margin-left: 55rpx;
					background-color: #fac1a8;
					height: 63rpx;
					width: 226rpx;
					line-height: 63rpx;
				}
				.mini-btn2{
					font-size: 29rpx;
					color: #424242;
					margin-left: 55rpx;
					background-color: #999a9a;
					height: 63rpx;
					width: 226rpx;
					line-height: 63rpx;
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
		.text1{
			// background-color: #fff;
			padding-left: 40rpx;
			color: #6f6f6f;
			font-size: 34rpx;
			margin-top: -20rpx;
			font-weight: 700;
		}
	}
/deep/.uni-data-checklist .checklist-group .checklist-box.is--tag{
	background-color: #f9c2a6 !important;
	width: 80rpx;
	height: 40rpx;
	border-radius: 30rpx;
}
/deep/.uni-data-checklist .checklist-group .checklist-box.is--tag .checklist-text{
	margin-left: 17rpx;
}
</style>
