<template>
	<view>
		<uni-list v-for="(item,index) in phonelist" :key="index">
			<uni-list-item :title="item.name" :note="item.phone" link  rightText="点击修改" @click="openedit(item.id,item.childId,item.phone,item.name)"
				thumb="../../../../static/phone.png"
				thumb-size="sm" />
		</uni-list>
		<button class="btn" @click="openadd">添加联系人</button>
		<!-- 修改弹窗 -->
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
					<uni-forms-item label="电话号" required name="phone">
						<uni-easyinput v-model="valiFormData.phone" placeholder="请输入电话号" />
					</uni-forms-item>
				</uni-forms>
				<view class="button">
					<button class="mini-btn1" type="default" size="mini" @click="delete1">删除</button>
					<button class="mini-btn2" type="default" size="mini" @click="submit">提交</button>
				</view>
			</view>
		  </view>
		</uni-popup>
		<!-- 增加弹窗 -->
		<uni-popup
		  ref="popup2"
		  background-color="#fff"
		  style="border-radius: 30rpx"
		>
		  <view class="edit">
		    <view class="name">
		    	<uni-forms ref="valiForm2" :rules="rules" :modelValue="valiFormData">
					<uni-forms-item label="姓名" required name="name">
						<uni-easyinput v-model="valiFormData.name" placeholder="请输入姓名" />
					</uni-forms-item>
					<uni-forms-item label="电话号" required name="phone">
						<uni-easyinput v-model="valiFormData.phone" placeholder="请输入电话号" />
					</uni-forms-item>
				</uni-forms>
				<view class="button">
					<button class="mini-btn1" type="default" size="mini" @click="close">取消</button>
					<button class="mini-btn2" type="default" size="mini" @click="add">添加</button>
				</view>
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
				name:'',
				valiFormData: {
					name: '',
					phone: '',
				},
				rules: {
					name: {
						rules: [{
							required: true,
							errorMessage: '姓名不能为空'
						}]
					},
					phone: {
						rules: [{
							required: true,
							errorMessage: '电话不能为空'
						}, {
							format: 'number',
							errorMessage: '只能输入数字'
						}]
					}
				},
				id:0,
				childId:0,
			}
		},
		onLoad() {
			this.valiFormData.name=''
			this.valiFormData.phone=''
			this.id=0
			this.childId=0
			this.getdata()
		},
		methods: {
			// 获取数据
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
			// 打开编辑页面
			openedit(id,childId,phone,name){
				this.id=id
				this.childId=childId
				this.valiFormData.phone=phone
				this.valiFormData.name=name
				this.name=name
				this.$refs.popup.open();
			},
			// 打开添加页面
			openadd(){
				this.valiFormData.name=''
				this.valiFormData.phone=''
				this.id=0
				this.childId=0
				this.$refs.popup2.open();
			},
			// 关闭添加弹窗
			close(){
				this.valiFormData.name=''
				this.valiFormData.phone=''
				this.$refs.popup2.close();
			},
			// 增加联系人
			add(){
				this.$refs['valiForm2'].validate().then(res => {
					uni.request({
						url: 'https://api.yuleng.top:38088/api/set/emerge-person', 
						header: {
							'token': uni.getStorageSync('token'), 
						},
						data:{
							name:this.valiFormData.name,
							phone:this.valiFormData.phone
						},
						method: "POST",
						success: () => {
							uni.showToast({
								title: '添加成功',
								duration: 2000
							});
							this.getdata()
							this.$refs.popup2.close();
						}
					});
				}).catch(err => {
					console.log('err', err);
				})
			},
			// 提交修改
			submit(ref) {
				this.$refs['valiForm'].validate().then(res => {
					uni.request({
						url: 'https://api.yuleng.top:38088/api/revise/emerge-person', 
						header: {
							'token': uni.getStorageSync('token'), 
						},
						data:{
							id:this.id,
							childId:this.childId,
							name:this.valiFormData.name,
							phone:this.valiFormData.phone
						},
						method: "POST",
						success: () => {
							uni.showToast({
								title: '修改成功',
								duration: 2000
							});
							this.getdata()
							this.$refs.popup.close();
						}
					});
				}).catch(err => {
					console.log('err', err);
				})
			},
			delete1(){
				uni.request({
					url: 'https://api.yuleng.top:38088/api/delete/emerge-person', 
					header: {
						'token': uni.getStorageSync('token'), 
					},
					data:{
						name:this.name
					},
					method: "POST",
					success: () => {
						uni.showToast({
							title: '删除成功',
							duration: 2000
						});
						this.getdata()
						this.$refs.popup.close();
					}
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
.edit{
	width: 510rpx;
	height: 400rpx;
	display: flex;
	justify-content: center;
	align-items: center;
}
.name{
	width: 400rpx;
	// margin-top: 50rpx;
}
.button{
		
		height: 75rpx;
		.mini-btn1{
			font-size: 29rpx;
			color: #424242;
			// margin-left: 55rpx;
			background-color: #fff;
			border: 1px solid #1296db;
			height: 63rpx;
			width: 180rpx;
			line-height: 63rpx;
		}
		.mini-btn2{
			float: right;
			font-size: 29rpx;
			color: #424242;
			// margin-right: 55rpx;
			background-color: #1296db;
			height: 63rpx;
			width: 180rpx;
			line-height: 63rpx;
		}
	}
</style>
