<template>
	<view>
		<uni-section class="mb-10" title="请选择聊天对象(以下为家长和帮助过你的志愿者)" type="line" style="font-size: 40rpx;"></uni-section>
		<view class="one">
			<view class="people" v-for="(item,index) in data" :key="index" @click="addchat(item.id)">
				<image :src="item.picUrl" style="width: 130rpx;height: 130rpx;border-radius: 65rpx;"></image>
				<view class="name">
					{{item.name}}
				</view>
			</view>
		</view>
		<view>
			<!-- 提示窗 -->
			<uni-popup ref="alertDialog" type="dialog">
				<uni-popup-dialog type="info" cancelText="关闭" confirmText="确定"  content="是否确定发起对话？" @confirm="dialogConfirm"
				></uni-popup-dialog>
			</uni-popup>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				data:[],
				toUserId:0,
			}
		},
		onLoad(e) {
		  this.getdata()
		},
		methods: {
			getdata(){
				uni.request({
					url: 'https://api.yuleng.top:38088/api/message/single-list', 
					header: {
						'token': uni.getStorageSync('token'), 
					},
					success: (res) => {
						console.log(res)
						this.data=res.data.data.singleList					}
				});
			},
			addchat(toUserId){
				this.toUserId=toUserId
				this.$refs.alertDialog.open()
			},
			dialogConfirm(){
				uni.request({
					url: 'https://api.yuleng.top:38088/api/message/single-chat?toUserId='+JSON.stringify(this.toUserId), 
					header: {
						'token': uni.getStorageSync('token'), 
					},
					method:"POST",
					success: (res) => {
						console.log(res)
						let roomId=res.data.data.roomId
						let name=res.data.data.roomName
						uni.redirectTo({
							url:"/pages/chat/chat?roomId="+JSON.stringify(roomId)+"&name="+JSON.stringify(name)
						})
					}
				});
			}
		}
	}
</script>

<style scoped lang="scss">
/deep/.uni-section__content-title{
	font-size: 17px !important;
	// color: #6d5f5f !important;
}
.one{
	display: flex;
	justify-content: start;
	flex-wrap: wrap;
	margin-bottom: 20rpx;
	margin-top: 10rpx;
	.people{
		margin-left: 50rpx;
		.name{
			width: 130rpx;
			text-align: center;
		}
	}
}
</style>
