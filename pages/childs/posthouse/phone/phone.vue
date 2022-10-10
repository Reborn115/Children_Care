<template>
	<view>
		<uni-list v-for="(item,index) in phonelist" :key="index">
			<uni-list-item :title="item.name" :note="item.phone" @click="call(item.phone)" link  rightText="点击拨打"
				thumb="../../../../static/phone.png"
				thumb-size="sm" />
		</uni-list>
		<button class="btn" @click="addphone">编辑联系人</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phonelist:[]
			}
		},
		onShow() {
			this.getdata()
		},
		methods: {
			addphone(){
				uni.navigateTo({
					url:'/pages/childs/posthouse/phone/editphone/editphone'
				})
			},
			getdata(){
				uni.request({
					url: 'https://api.yuleng.top:38088/api/get/emerge-person', 
					header: {
						'token': uni.getStorageSync('token'), 
					},
					method: "POST",
					success: (res) => {
						this.phonelist=res.data.data.emergePersonList
					}
				});
			},
			call(phone){
				uni.makePhoneCall({
					phoneNumber: phone 
				});
			}
		}
	}
</script>

<style scoped lang="scss">
.btn{
	color: #1296db;
	background: #fff;
	border: 1px solid #1296db;
	width: 640rpx;
	height: 70rpx;
	line-height: 70rpx;
	margin-top: 40rpx;
}
</style>
