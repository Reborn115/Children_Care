<template>
	<view>
		<uni-list v-for="(item,index) in phonelist" :key="index">
			<uni-list-item :title="item.name" :note="item.phone" link  rightText="点击修改" @click="openedit"
				thumb="../../../../static/phone.png"
				thumb-size="sm" />
		</uni-list>
		<button class="btn" @click="add">添加联系人</button>
		
		<uni-popup
		  ref="popup"
		  background-color="#fff"
		  style="border-radius: 30rpx"
		>
		  <view class="edit">
		    <view class="name">
		    	<uni-forms ref="valiForm" :rules="rules" :modelValue="valiFormData">
					<uni-forms-item label="姓名" required name="name">
						<uni-easyinput v-model="valiFormData.name" placeholder="请输入姓名" />
					</uni-forms-item>
					<uni-forms-item label="年龄" required name="age">
						<uni-easyinput v-model="valiFormData.age" placeholder="请输入年龄" />
					</uni-forms-item>
				</uni-forms>
				<button  plain @click="submit()" style="width: 200rpx;height: 57rpx;border: 1px solid #1296db;line-height: 57rpx;color: #1296db;">提交</button>
		    </view>
		  </view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phonelist:[],
				valiFormData: {
					name: '',
					age: '',
				},
				rules: {
					name: {
						rules: [{
							required: true,
							errorMessage: '姓名不能为空'
						}]
					},
					age: {
						rules: [{
							required: true,
							errorMessage: '年龄不能为空'
						}, {
							format: 'number',
							errorMessage: '年龄只能输入数字'
						}]
					}
				},
			}
		},
		onLoad() {
			this.getdata()
		},
		methods: {
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
			openedit(){
				this.$refs.popup.open();
			},
			add(){
				
			},
			submit(ref) {
				this.$refs['valiForm'].validate().then(res => {
					console.log('success', res);
					uni.showToast({
						title: `校验通过`
					})
				}).catch(err => {
					console.log('err', err);
				})
			},
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
.edit{
	width: 510rpx;
	height: 422rpx;
	display: flex;
	justify-content: center;
	align-items: center;
}
.name{
	width: 400rpx;
	// margin-top: 50rpx;
}
</style>
