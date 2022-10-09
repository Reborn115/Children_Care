<template>
	<view class="all">
		<view class="pic">
			<image src="../../../../../static/baby5.jpg" style="width: 550rpx;height: 500rpx;margin-top: -40rpx;"></image>
		</view>
		<view class="body">
			<view class="content">
				<view class="item">
					<view class="text">
						遇到问题的类型：
					</view>
					<view class="text1">
						<text class="answer">{{data.type}}</text>
					</view>
				</view>
				<view class="item">
					<view class="text">
						解决问题的方式:
					</view>
					<view class="text1">
						{{data.solveType}}
					</view>
				</view>
				<view class="item">
					<view class="text">
						是否要立即解决：
					</view>
					<view class="text1">
						{{data.isNowSolve}}
					</view>
				</view>
				<view class="item">
					<view class="text">
						具体问题描述:
					</view>
					<view class="text1">
						{{data.question}}
					</view>
				</view>
			</view>
		</view>
		<button class="button" @click="dialogToggle"><text
				class="button-text warn-text">解决此问题</text></button>
		<view>
			<!-- 提示窗 -->
			<uni-popup ref="alertDialog" type="dialog">
				<uni-popup-dialog type="info" cancelText="关闭" confirmText="确定"  content="是否确定接受此问题？" @confirm="dialogConfirm"
				></uni-popup-dialog>
			</uni-popup>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id:0,
				data:{},
				isAnonymous:1,
				//点击按钮的是否禁用
				buttonDisusable:false,
				chatRoomId:0,
			}
		},
		onLoad(e){
			this.id = JSON.parse(e.id)
			this.isAnonymous=JSON.parse(e.isAnonymous)
			this.gedetail()
		},
		methods: {
			//打开修改问题状态弹窗
			dialogToggle() {
				this.$refs.alertDialog.open()
			},
			dialogConfirm(){
				uni.request({
					url: 'https://api.yuleng.top:38088/api/disabuse/accept?disabuseId='+JSON.stringify(this.id),
					method: "POST",
					header: {
						'token': uni.getStorageSync('token'), //自定义请求头信息
					},
					success: (res) => {
						console.log(res)
						uni.redirectTo({
							url:'/pages/volunteer/problem/datails/datails?id='+JSON.stringify(this.id)+'&isAnonymous='+JSON.stringify(this.isAnonymous)
						})
					}
				});
				
			},
			gedetail(){
				uni.request({
					url: 'https://api.yuleng.top:38088/api/disabuse', 
					data:{
						disabuseId:this.id,
					},
					header: {
						'token': uni.getStorageSync('token'), //自定义请求头信息
					},
					success: (res) => {
						this.data=res.data.data
						this.chatRoomId=res.data.data.groupLiveChatRoomId
						if(this.data.isNowSolve==1){
							this.data.isNowSolve="是"
						}else{
							this.data.isNowSolve="否"
						}
					}
				});
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
				}
			}
		}
		.button{
			width: 485rpx;
			height: 80rpx;
			line-height: 80rpx;
			margin-top: 55rpx;
			background-color: #ffedbc;
		}
</style>
