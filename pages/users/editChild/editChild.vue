<template>
	<view class="container">
		<view class="content">
			<uni-card :is-shadow="true">
				
					<uni-section title="编辑资料" type="line" titleFontSize="22px">
								<view class="example">
									<!-- 基础用法，不包含校验规则 -->
									<uni-forms ref="baseFormData" :modelValue="baseFormData" :rules="rules">
										<uni-forms-item label="头像" name="headPic">
											<!-- <u--image
												shape="circle"
												:src="src"
												width="80px"
												height="80px"
											></u--image> -->
											<u-upload
													
													:fileList="fileList1"
													@afterRead="afterRead"
													@delete="deletePic"
													name="1"
													multiple
													:maxCount="1"
												></u-upload>
										</uni-forms-item>
										<uni-forms-item label="年龄" required name="age">
											<uni-easyinput v-model="baseFormData.age" placeholder="请输入年龄" />
										</uni-forms-item>
										<uni-forms-item label="性别" required name="sex">
											<!-- <uni-data-checkbox v-model="baseFormData.sex" :localdata="sexs" /> -->
											<uni-data-checkbox v-model="baseFormData.sex" :localdata="sex"></uni-data-checkbox>
										</uni-forms-item>
										
										
										<uni-forms-item label="籍贯" required name="hometown">
											<uni-easyinput v-model="baseFormData.hometown" placeholder="请输入省市区" />
										</uni-forms-item>
																				
										<uni-forms-item label="年级" required name="level">
											<uni-easyinput v-model="baseFormData.level" placeholder="请输入年级" />
										</uni-forms-item>
										<uni-forms-item label="个性签名" required name="sign">
											<uni-easyinput v-model="baseFormData.sign" placeholder="请输入个性签名" />
										</uni-forms-item>
										<button type="primary" @click="submit('baseFormData')">提交</button>
									</uni-forms>
								</view>
							</uni-section>
				
			</uni-card>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
		return {
				headPicUrl:"",
				baseFormData:{
					age:'',
					sex:'',
					hometown:'',
					level:'',
					sign:'',
				},
				src:'https://s2.loli.net/2022/09/15/cZS6YUJlA2HqvbN.jpg',
				fileList1: [],
				sex: [{
					text: '男',
					value: 0
				}, {
					text: '女',
					value: 1
				}],
				rules:{
					sign:{
						//账号检验
						rules:[
							{
								required:true,
								errorMessage:'请填写年级'
							},
							{
								minLength:1,
								maxLength:20,
								errorMessage:'{label}长度在{minLength}到{maxLength}个字符'
							}
						],
						label:'年级',
						validateTrigger:'submit'
					},
					level:{
						//账号检验
						rules:[
							{
								required:true,
								errorMessage:'请填写年级'
							},
							{
								minLength:1,
								maxLength:10,
								errorMessage:'{label}长度在{minLength}到{maxLength}个字符'
							}
						],
						label:'年级',
						validateTrigger:'submit'
					},
					age:{
						//账号检验
						rules:[
							{
								required:true,
								errorMessage:'请填写年龄'
							},
							{
								minLength:1,
								maxLength:2,
								errorMessage:'{label}长度在{minLength}到{maxLength}个字符'
							}
						],
						label:'年龄',
						validateTrigger:'submit'
					},
					hometown:{
						//密码检验
						rules:[
							{
								required:true,
								errorMessage:'请填写籍贯'
							},
							{
								minLength:2,
								maxLength:12,
								errorMessage:'{label}长度在{minLength}到{maxLength}个字符'
							}
						],
						label:'籍贯',
						validateTrigger:'submit'
					},
					
					sex:{
						//账号检验
						rules:[
							{
								required:true,
								errorMessage:'请选择性别'
							},
							
						],
						label:'性别',
						validateTrigger:'submit'
					},
				}
			};
		},
		
		methods:{
			submit(ref){
				this.$refs[ref].validate().then(res => {
					this.age=this.age-0
					this.baseFormData.age= parseInt(this.baseFormData.age);
					if(this.headPicUrl){
						uni.request({
						url: 'https://api.yuleng.top:38088/api/set-child-information/', //仅为示例，并非真实接口地址。
						method:"POST",
						data: {
						    gender:this.baseFormData.sex,
							
							nativePlace:this.baseFormData.hometown,
							age:this.baseFormData.age,
							grade:this.baseFormData.level,
							sign:this.baseFormData.sign,
							headPicUrl:this.headPicUrl,
							
						},
						header: {
						    "content-type":"application/json",
							"token":uni.getStorageSync('token')
						},
						success: (res) => {
							console.log(res.data);
							
							uni.switchTab({
								  url: "/pages/childs/home/home",
								});
							
						}
					});
						console.log('success', res);
					} else {
						uni.showToast({
							title: `请上传头像`
						})
					}
					
					/* uni.showToast({
						title: `校验通过`
					}) */
				}).catch(err => {
					console.log('err', err);
				})
			},
			
			change(e) {
			        console.log("e:", e);
			      },
			// 删除图片
			deletePic(event) {
				this[`fileList${event.name}`].splice(event.index, 1)
			},
			// 新增图片
			async afterRead(event) {
				// 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
				let lists = [].concat(event.file)
				let fileListLen = this[`fileList${event.name}`].length
				lists.map((item) => {
					this[`fileList${event.name}`].push({
						...item,
						status: 'uploading',
						message: '上传中'
					})
				})
				for (let i = 0; i < lists.length; i++) {
					const result = await this.uploadFilePromise(lists[i].url)
					let item = this[`fileList${event.name}`][fileListLen]
					this[`fileList${event.name}`].splice(fileListLen, 1, Object.assign(item, {
						status: 'success',
						message: '',
						url: result
					}))
					fileListLen++
				}
			},
			uploadFilePromise(url) {
				return new Promise((resolve, reject) => {
					let a = uni.uploadFile({
						url: 'https://api.yuleng.top:38088/api/upload',// 仅为示例，非真实的接口地址
						/* url: 'http://192.168.115.133:38088/api/upload', */
						filePath: url,
						name: 'file',
						formData: {
							fileType:1
						},
						header: {
						    "content-type":"application/json",
							"token":uni.getStorageSync('token')
						},
						success: (res) => {
						
							res=JSON.parse(res.data)
							console.log(res);
							
							console.log(res.data.files[0].fileUrl)
							this.headPicUrl=res.data.files[0].fileUrl
							setTimeout(() => {
								resolve(res.data.data)
							}, 1000)
						}
					});
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
.example{
	margin-top: 30rpx;
}
::v-deep .uni-card{
	height: 100vh;
	padding-bottom: 20rpx;
}
.content{
	height: 100vh;
	padding-bottom: 80rpx;
}
</style>
