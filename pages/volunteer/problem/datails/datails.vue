<template>
	<view class="all">
		<view class="toppic">
			<view class="area" v-if="show" @click="gochat">
				<image src="../../../../static/chat.png" style="width: 110rpx;height: 100rpx;margin-top: 20rpx;margin-left: 50rpx;"></image>
				<view style="margin-left: 52rpx;color: #595959;">
					交流讨论
				</view>
			</view>
			
			<view class="area" @click="goinformation" v-if="showdetail">
				<image src="../../../../static/message.png" style="width: 110rpx;height: 100rpx;margin-top: 20rpx;margin-left: 50rpx;"></image>
				<view style="margin-left: 47rpx;color: #595959;">
					儿童详情
				</view>
			</view>
			
			<view class="area" @click="goEdit" v-if="show">
				<image src="../../../../static/write.png" style="width: 110rpx;height: 100rpx;margin-top: 20rpx;margin-left: 50rpx;"></image>
				<view style="margin-left: 52rpx;color: #595959;">
					情况记录
				</view>
			</view>
			
		</view>
		<view class="pic">
			<image src="../../../../static/baby5.jpg" style="width: 550rpx;height: 500rpx;margin-top: -40rpx;"></image>
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
		<button class="button" @click="dialogToggle" :disabled="buttonDisusable"><text
				class="button-text warn-text">{{problemSolved}}</text></button>
		<view>
			<!-- 提示窗 -->
			<uni-popup ref="alertDialog" type="dialog">
				<uni-popup-dialog type="info" cancelText="关闭" confirmText="确定"  content="是否确定问题已解决？" @confirm="dialogConfirm"
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
				problemSolved:'问题未解决',
				isAnonymous:1,
				// 是否显示儿童详细信息
				showdetail:false,
				//控制交流区与建议区的显示与隐藏
				show:true,
				//点击按钮的是否禁用
				buttonDisusable:false,
				chatRoomId:0,
				groupLiveChatRoomName:'群聊'
			}
		},
		onLoad(e){
			this.id = JSON.parse(e.id)
			this.isAnonymous=JSON.parse(e.isAnonymous)
			if(this.isAnonymous==0){
				this.showdetail=true
			}
			this.gedetail()
		},
		methods: {
			
			//进入编辑页面
			goEdit(){
				uni.navigateTo({
					url:"/pages/volunteer/problem/vedit/vedit?id="+JSON.stringify(this.id)
				})
			},
			//进入消息详情
			goinformation(){
				uni.navigateTo({
					url:"/pages/volunteer/problem/information/information?id="+JSON.stringify(this.id)
				})
			},
			// 进入交流讨论界面
			gochat(){
				let tit=this.groupLiveChatRoomName
				uni.navigateTo({
					url:"/pages/chat/chatgroup?roomId="+JSON.stringify(this.chatRoomId)+"&name="+JSON.stringify(tit)
				})
			},
			//打开修改问题状态弹窗
			dialogToggle() {
				this.$refs.alertDialog.open()
			},
			//点击修改问题状态的确认按钮
			dialogConfirm() {
				uni.request({
					url: 'https://api.yuleng.top:38088/api/disabuse/solve?disabuseId='+JSON.stringify(this.id), 
					method:'POST',
					header: {
						'token': uni.getStorageSync('token'), //自定义请求头信息
					},
					success: () => {
						uni.showToast({
							title: '修改成功',
							icon:'success',
							duration: 2000
						});
						this.show=false
						this.showdetail=false
						this.problemSolved="问题已解决"
						this.buttonDisusable=true
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
						this.groupLiveChatRoomName=res.data.data.groupLiveChatRoomName
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
			// border: 1px solid #fff5d0;
		}
</style>
