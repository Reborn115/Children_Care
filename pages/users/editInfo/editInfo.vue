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
											<uni-easyinput type="number" v-model.number="baseFormData.age" placeholder="请输入年龄" />
										</uni-forms-item>
										<uni-forms-item label="性别" required name="sex">
											<!-- <uni-data-checkbox v-model="baseFormData.sex" :localdata="sexs" /> -->
											<uni-data-checkbox v-model="baseFormData.sex" :localdata="sex"></uni-data-checkbox>
										</uni-forms-item>
										
										<!-- <uni-forms-item label="与儿童关系" name="relationship">
											<uni-data-select
											        v-model="baseFormData.relationship"
											        :localdata="relationship"
											        @change="change"
											      ></uni-data-select>
										</uni-forms-item> -->
										<uni-forms-item label="与儿童关系" required name="relationship">
											<uni-easyinput v-model="baseFormData.relationship" placeholder="请输入与儿童关系" />
										</uni-forms-item>
										<uni-forms-item label="籍贯" required name="hometown">
											<uni-easyinput v-model="baseFormData.hometown" placeholder="请输入省市区" />
										</uni-forms-item>
										<uni-forms-item label="工作地址" required name="work">
											<uni-easyinput v-model="baseFormData.work" placeholder="请输入工作地址" />
										</uni-forms-item>
										<uni-forms-item label="回家情况" name="frequence">
											<uni-data-select
											        v-model="baseFormData.frequence"
											        :localdata="frequence"
											        @change="change"
											      ></uni-data-select>
										</uni-forms-item>
										<uni-forms-item label="关注软件情况" name="care">
											<uni-data-select
											        v-model="baseFormData.care"
											        :localdata="care"
											        @change="change"
											      ></uni-data-select>
										</uni-forms-item>
										<uni-forms-item label="寄语儿童" required name="sayChild">
											<uni-easyinput v-model="baseFormData.sayChild" placeholder="请输入对儿童的寄语" />
										</uni-forms-item>
										<uni-forms-item label="寄语志愿者" required name="sayVolunteer">
											<uni-easyinput v-model="baseFormData.sayVolunteer" placeholder="请输入对志愿者的寄语" />
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
				isCertification:'',
				headPicUrl:"",
				baseFormData:{
					age:'',
					sex:'',
					relationship:'',
					hometown:'',
					frequence:'',
					care:'',
					sayChild:'',
					sayVolunteer:'',
					work:''
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
				
				relationship:[
				          { value: 0, text: "父亲" },
				          { value: 1, text: "母亲" },
				          { value: 2, text: "其他" },
						  
				        ],
				frequence: [
				          { value: 0, text: "一月一次" },
				          { value: 1, text: "三月一次" },
				          { value: 2, text: "半年一次" },
						  { value: 3, text: "一年一次" },
						  { value: 4, text: "超过一年才回一次" },
						 
				        ],
				care:[
				          { value: 0, text: "偶尔" },
				          { value: 1, text: "时常" },
				          { value: 2, text: "经常" },
						  
				        ],
				rules:{
					/* headPic:{
						//账号检验
						rules:[
							{
								required:true,
								errorMessage:'请上传头像'
							},
							
						],
						label:'头像',
						validateTrigger:'submit'
					}, */
					care:{
						//账号检验
						rules:[
							{
								required:true,
								errorMessage:'请选择对软件关注程度'
							},
							
						],
						label:'关注程度',
						validateTrigger:'submit'
					},
					frequence:{
						//账号检验
						rules:[
							{
								required:true,
								errorMessage:'请选择回家频率'
							},
							
						],
						label:'回家频率',
						validateTrigger:'submit'
					},
					relationship:{
						//账号检验
						rules:[
							{
								required:true,
								errorMessage:'请选择与孩子的关系'
							},
							
						],
						label:'关系',
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
					work:{
						//密码检验
						rules:[
							{
								required:true,
								errorMessage:'请填写工作地址'
							},
							{
								minLength:2,
								maxLength:12,
								errorMessage:'{label}长度在{minLength}到{maxLength}个字符'
							}
						],
						label:'工作地址',
						validateTrigger:'submit'
					},
					sayChild:{
						//账号检验
						rules:[
							{
								required:true,
								errorMessage:'请填写对孩子的寄语'
							},
							{
								minLength:1,
								maxLength:30,
								errorMessage:'{label}长度在{minLength}到{maxLength}个字符'
							}
						],
						label:'寄语儿童',
						validateTrigger:'submit'
					},
					sayVolunteer:{
						//账号检验
						rules:[
							{
								required:true,
								errorMessage:'请填写对志愿者的寄语'
							},
							{
								minLength:1,
								maxLength:30,
								errorMessage:'{label}长度在{minLength}到{maxLength}个字符'
							}
						],
						label:'寄语儿童',
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
		onLoad(e) {
			/* console.log(e.isCertification);
			this.isCertification=JSON.parse(e.positionResult) */
			this.isCertification=uni.getStorageSync('isCertification')
		},
		methods:{
			submit(ref){
				this.$refs[ref].validate().then(res => {
					this.age=this.age-0
					this.baseFormData.age= parseInt(this.baseFormData.age);
					if(this.headPicUrl){
						uni.request({
							url: 'https://api.yuleng.top:38088/api/set-parent-information/', //仅为示例，并非真实接口地址。
							method:"POST",
							data: {
							    gender:this.baseFormData.sex,
								relation:this.baseFormData.relationship,
								nativePlace:this.baseFormData.hometown,
								age:this.baseFormData.age,
								homeSituation:this.baseFormData.frequence,
								softwareSituation:this.baseFormData.care,
								remarkChild:this.baseFormData.sayChild,
								remarkVolunteer:this.baseFormData.sayVolunteer,
								headPicUrl:this.headPicUrl,
								workAddress:this.baseFormData.work
							},
							header: {
							    "content-type":"application/json",
								"token":uni.getStorageSync('token')
							},
							success: (res) => {
								console.log(res.data);
								if(this.isCertification==0){
									uni.navigateTo({
										  url: "/pages/users/upload/upload",
										});
								} else {
									uni.switchTab({
										  url: "pages/parents/parentsme/parentsme",
										});
								}
								
								/* uni.switchTab({
									  url: "/pages/childs/home/home",
									}); */
								
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
