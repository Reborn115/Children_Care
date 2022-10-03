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
						<text class="answer">{{child.userName}}</text>
					</view>
					<view class="item">
						<text class="text">性别: </text>
						<text class="answer">{{child.gender}}</text>
					</view>
					<view class="item">
						<text class="text">籍贯: </text>
						<text class="answer">{{child.nativePlace}}</text>
					</view>
					<view class="item">
						<text class="text">年龄: </text>
						<text class="answer">{{child.age}}</text>
					</view>
					<view class="item">
						<text class="text">年级: </text>
						<text class="answer">{{child.grade}}</text>
					</view>
					<view class="item">
						<text class="text">个性签名: </text>
						<text class="answer">{{child.sign}}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="pic">
			<image :src="child.headPicUrl" style="width: 260rpx;height: 260rpx;"></image>
		</view>
		<view class="child2">
			<view class="tit">
					父母基本信息
			</view>
			<view class="detail">
				<view class="inside">
					<view class="item">
						<text class="text">姓名: </text>
						<text class="answer">{{parents.userName}}</text>
					</view>
					<view class="item">
						<text class="text">性别: </text>
						<text class="answer">{{parents.gender}}</text>
					</view>
					<view class="item">
						<text class="text">年龄: </text>
						<text class="answer">{{parents.age}}</text>
					</view>
					<view class="item">
						<text class="text">与孩子关系: </text>
						<text class="answer">{{parents.relation}}</text>
					</view>
					<view class="item">
						<text class="text">家长联系方式: </text>
						<text class="answer">{{parents.phone}}</text>
					</view>
					<view class="item">
						<text class="text">家庭地址: </text>
						<text class="answer">{{parents.nativePlace}}</text>
					</view>
					<view class="item">
						<text class="text">工作地址: </text>
						<text class="answer">{{parents.workAddress}}</text>
					</view>
					<view class="item">
						<text class="text">家长回家情况: </text>
						<text class="answer">{{parents.homeSituation}}</text>
					</view>
					<view class="item">
						<text class="text">关注软件情况: </text>
						<text class="answer">{{parents.softwareSituation}}</text>
					</view>
					<view class="item">
						<text class="text">寄语儿童: </text>
						<text class="answer">{{parents.remarkChild}}</text>
					</view>
					<view class="item">
						<text class="text">寄语志愿者: </text>
						<text class="answer">{{parents.remarkVolunteer}}</text>
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
				id:0,
				child:{
					"userName":"无数据",
					"gender":'无',
					"nativePlace":"无数据",
					"age":'无数据',
					"grade":"无数据",
					"sign":"无数据",
					"headPicUrl":""
				},
				parents:{
					"userName":"无数据",
					"gender":'无',
					"relation":"无数据",
					"nativePlace":"无数据",
					"age":'无数据',
					"phone":"无数据",
					"workAddress":"无数据",
					"homeSituation":'无数据',
					"softwareSituation":'无数据',
					"remarkChild":"无数据",
					"remarkVolunteer":"无数据",
					"headPicUrl":""
				}
			}
		},
		onLoad(e){
			this.id = JSON.parse(e.id)
			this.getdata()
		},
		methods: {
			getdata(){
				uni.request({
					url: 'https://api.yuleng.top:38088/api/disabuse/personal-information', 
					data:{
						disabuseId:this.id,
					},
					header: {
						'token': uni.getStorageSync('token'), //自定义请求头信息
					},
					success: (res) => {
						console.log(res);
						this.child=res.data.data.childProfileResult
						this.child.gender=this.child.gender==0?'男':'女'
						this.parents=res.data.data.parentProfileResult
						this.parents.gender=this.parents.gender==0?'男':'女'
						switch(this.parents.homeSituation){
							case 0:
								this.parents.homeSituation='一月一次';
								break;
							case 1:
								this.parents.homeSituation='三月一次';
								break;
							case 2:
								this.parents.homeSituation='半年一次';
								break;
							case 3:
								this.parents.homeSituation='一年一次';
								break;
							case 4:
								this.parents.homeSituation='超过一年';
								break;
							default:
								this.parents.homeSituation='无数据';
						}
						switch(this.parents.softwareSituation){
							case 0:
								this.parents.softwareSituation='偶尔';
								break;
							case 1:
								this.parents.softwareSituation='时常';
								break;
							case 2:
								this.parents.softwareSituation='经常';
								break;
							default:
								this.parents.softwareSituation='无数据';
						}
					}
				});
			}
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
