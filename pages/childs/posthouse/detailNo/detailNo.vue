<template>
	<view>
		<view class="toppic" @click="gochat">
			<image src="../../../../static/chat.png" style="width: 100rpx;height: 90rpx;margin-top: 20rpx;margin-left: 50rpx;"></image>
			<view style="margin-left: 55rpx;color: #595959;">
				交流区
			</view>
		</view>
		<view class="pic">
			<image src="../../../../static/baby5.jpg" style="width: 550rpx;height: 500rpx;margin-top: -80rpx;"></image>
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
	</view>
</template>

<script>
	import aes from "../../../../util/aes.js"
	export default {
		data() {
			return {
				id:0,
				data:{},
				chatRoomId:0,
				groupLiveChatRoomName:'群聊'
			}
		},
		onLoad(e){
			this.id = JSON.parse(e.id)
			this.gedetail()
		},
		methods: {
			// 获取问题详情
			gedetail(){
				
				uni.request({
					url: 'https://api.yuleng.top:38088/api/privacy/disabuse', 
					data:{
						disabuseId:this.id,
					},
					header: {
						'token': uni.getStorageSync('token'), //自定义请求头信息
					},
					success: (res) => {
						res=JSON.parse(aes.decrypt(res.data.data.result,"zzr@backEnd!@#$%"))
						this.data=res
						// console.log(this.data,"问题详情")
						this.chatRoomId=res.groupLiveChatRoomId
						this.groupLiveChatRoomName=res.groupLiveChatRoomName
						if(this.data.isNowSolve==1){
							this.data.isNowSolve="是"
						}else{
							this.data.isNowSolve="否"
						}
					}
				});
				
				// uni.request({
				// 	url: 'https://api.yuleng.top:38088/api/disabuse', 
				// 	data:{
				// 		disabuseId:this.id,
				// 	},
				// 	header: {
				// 		'token': uni.getStorageSync('token'), //自定义请求头信息
				// 	},
				// 	success: (res) => {
				// 		this.data=res.data.data
				// 		// console.log(this.data,"问题详情")
				// 		this.chatRoomId=res.data.data.groupLiveChatRoomId
				// 		this.groupLiveChatRoomName=res.data.data.groupLiveChatRoomName
				// 		if(this.data.isNowSolve==1){
				// 			this.data.isNowSolve="是"
				// 		}else{
				// 			this.data.isNowSolve="否"
				// 		}
				// 	}
				// });
			},
			// 去往交流区
			gochat(){
				let tit=this.groupLiveChatRoomName
				uni.navigateTo({
					url:"/pages/chat/chatgroup?roomId="+JSON.stringify(this.chatRoomId)+"&name="+JSON.stringify(tit)
				})
			}
		}
	}
</script>

<style scoped lang="scss">
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
		margin-top: 15rpx;
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
