<template>
	<view>
		<u-navbar
				  title="我的消息"
				  :autoBack="true"
		>
				  <view
					  class="u-nav-slot"
					  slot="right"
					  @click="addchat"
				  >
					  <u-icon
						  name="plus"
						  size="30"
					  ></u-icon>
				  </view>
		</u-navbar>
		<view class="all">
			<uni-list>
				<uni-list-chat  v-for="(item,index) in list" 
				:key="index" 
				@click="gochat(item.roomId,item.type,item.name)" 
				:clickable="true" 
				:avatar-circle="true" 
				:title="item.name" 
				:avatar="item.headPicUrl" 
				:note="item.latestMessage" 
				:time="item.time" 
				:badge-text="item.num"></uni-list-chat>
			</uni-list>
		</view>
	</view>
</template>

<script>
	
	import dateTime from '../dateTime.js';
	export default {
		data() {
			return {
				list:[],
				timer:'',
			}
		},
		onShow() {
			this.getMessageList()
			this.timer=setInterval(()=>{
				this.getMessageList()
			},2000)
		},
		onUnload() {
			clearInterval(this.timer)
		},
		onHide() {
			clearInterval(this.timer)
		},
		methods: {
			gochat(roomId,type,name){
				if(type==1){
					clearInterval(this.timer)
					uni.navigateTo({
						url:"/pages/chat/chat?roomId="+JSON.stringify(roomId)+"&name="+JSON.stringify(name)
					})
				}else{
					clearInterval(this.timer)
					uni.navigateTo({
						url:"/pages/chat/chatgroup?roomId="+JSON.stringify(roomId)+"&name="+JSON.stringify(name)
					})
				}
			},
			getMessageList(){
				
				uni.request({
					url: 'https://api.yuleng.top:38088/api/message-num-list', 
					header: {
						'token': uni.getStorageSync('token'), //自定义请求头信息
					},
					success: (res) => {
						console.log(res)
						res.data.data.messageNumList.forEach((item,index)=>{
							let time=item.time*1000
							item.time=dateTime.dateTime(time)
						})
						this.list=res.data.data.messageNumList
						console.log(this.list)
					}
				});
			},
			addchat(){
				uni.navigateTo({
					url:'/pages/chat/addchat/addchat'
				})
			}
		}
	}
</script>

<style scoped lang="scss">
.all{
	padding-top: 170rpx;
}
</style>
