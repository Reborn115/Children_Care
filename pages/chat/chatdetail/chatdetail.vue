<template>
	<view>
		<uni-section class="mb-10" title="群聊成员" type="line" style="font-size: 40rpx;"></uni-section>
		<view class="one">
			<view class="people" v-for="(item,index) in data" :key="index">
				<image :src="item.picUrl" style="width: 130rpx;height: 130rpx;border-radius: 65rpx;"></image>
				<view class="name">
					{{item.name}}
				</view>
			</view>
		</view>
		
		<uni-section class="mb-10" title="群名称" type="line" style="font-size: 40rpx;"></uni-section>
		<view class="two">
			<uni-forms ref="valiForm" :rules="rules" :modelValue="valiFormData">
				<uni-forms-item label="群聊名称" required name="name">
					<uni-easyinput v-model="valiFormData.name" placeholder="请输入群聊名称" />
				</uni-forms-item>
			</uni-forms>
			<button type="default" size="mini" class="mini-btn1" @click="submit">确认修改</button>
		</view>
		
		<!-- <button type="default" size="mini" class="mini-btn1" @click="submit">确认修改</button> -->
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				roomId:0,
				tit:'',
				valiFormData: {
					name: '',
				},
				data:[],
				rules: {
					name: {
						rules: [{
							required: true,
							errorMessage: '姓名不能为空'
						}]
					}
				},
			}
		},
		onLoad(e) {
		  this.roomId = JSON.parse(e.roomId);
		  this.getdata()
		},
		methods: {
			getdata(){
				uni.request({
					url: 'https://api.yuleng.top:38088/api/group-message', 
					header: {
						'token': uni.getStorageSync('token'), 
					},
					data:{
						roomId:this.roomId
					},
					success: (res) => {
						console.log(res)
						this.data=res.data.data.groupPersonList
						if(res.data.data.groupName!==null){
							this.valiFormData.name=res.data.data.groupName
						}
						
					}
				});
			},
			submit(ref) {
				this.$refs['valiForm'].validate().then(res => {
					uni.request({
						url: 'https://api.yuleng.top:38088/api/group-message/name', 
						header: {
							'token': uni.getStorageSync('token'), 
						},
						data:{
							groupName:this.valiFormData.name,
							roomId:this.roomId
						},
						method: "POST",
						success: () => {
							uni.showToast({
								title: '修改成功',
								duration: 2000
							});
							this.getdata()
						}
					});
					
				}).catch(err => {
					console.log('err', err);
				})
			},
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
	margin-bottom: 20rpx;
	margin-top: 10rpx;
	.people{
		margin-left: 30rpx;
		.name{
			width: 130rpx;
			text-align: center;
		}
	}
}
.two{
	margin-top: 10rpx;
	margin-left: 20rpx;
	display: flex;
	align-items: start;
}
/deep/.uni-forms-item__label{
	width: 150rpx !important;
}
.mini-btn1{
		font-size: 25rpx;
		color: #424242;
		background-color: #fff;
		border: 1px solid #1296db;
		height: 69rpx;
		width: 180rpx;
		line-height: 69rpx;
	}
</style>
