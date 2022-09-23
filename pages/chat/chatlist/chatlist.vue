<template>
	<view>
		<uni-list>
			<uni-list-chat  v-for="(item,index) in 10" :key="index" @click="gochat" clickable="true" :avatar-circle="true" title="uni-app" style="margin-top: 0px;" avatar="https://s2.loli.net/2022/09/21/IYSvdtKWkX4O7ae.png" note="您收到一条新的消息" time="2020-02-02 20:20" badge-text="12"></uni-list-chat>
		</uni-list>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			gochat(){
				uni.navigateTo({
					url:"/pages/chat/chat"
				})
			}
		}
	}
</script>

<style>

</style>
