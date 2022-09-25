<template>
	<view>
		<uni-list>
			<uni-list-chat  v-for="(item,index) in list" 
			:key="index" 
			@click="gochat" 
			clickable="true" 
			:avatar-circle="true" 
			:title="item.name" 
			style="margin-top: 0px;" 
			:avatar="item.headPicUrl" 
			:note="item.latestMessage" 
			:time="item.time" 
			:badge-text="item.num"></uni-list-chat>
		</uni-list>
	</view>
</template>

<script>
	import dateTime from '../dateTime.js';
	export default {
		data() {
			return {
				list:[],
			}
		},
		onShow() {
			this.getMessageList()
		},
		methods: {
			gochat(){
				uni.navigateTo({
					url:"/pages/chat/chat"
				})
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
		}
	}
</script>

<style>

</style>
