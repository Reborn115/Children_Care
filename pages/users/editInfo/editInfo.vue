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
											<uni-data-select
											        v-model="baseFormData.age"
											        :localdata="age"
											        @change="change"
											      ></uni-data-select>
											<!-- <uni-easyinput type="number" v-model.number="baseFormData.age" placeholder="请输入年龄" /> -->
											<!-- <u-cell-group>
														<u-cell
															@click="showPicker(1)"
															:title="baseFormData.age"
															
														>
															
														</u-cell>
													</u-cell-group>
													<u-picker
														v-model="baseFormData.age"
														
														:show="showForm.show1"
														:columns="Columns1"
														@change="change(1)"
														@cancel="cancel(1)"
														@confirm="confirm1()"
													></u-picker> -->
										</uni-forms-item>
										<uni-forms-item label="性别" required name="sex">
											<!-- <uni-data-checkbox v-model="baseFormData.sex" :localdata="sexs" /> -->
											<uni-data-checkbox v-model="baseFormData.sex" :localdata="sex"></uni-data-checkbox>
										</uni-forms-item>
										
										<uni-forms-item label="与儿童关系" name="relationship">
											<uni-data-select
											        v-model="baseFormData.relationship"
											        :localdata="relationship"
											        @change="change"
											      ></uni-data-select>
										</uni-forms-item>
										<!-- <uni-forms-item label="与儿童关系" required name="relationship"> -->
											<!-- <uni-data-select
											        v-model="baseFormData.relationship"
											        :localdata="relationship"
											        @change="change"
											      ></uni-data-select> -->
											<!-- <uni-easyinput v-model="baseFormData.relationship" placeholder="请输入与儿童关系" /> -->
											<!-- <u-cell-group>
														<u-cell
															@click="showPicker(2)"
															:title="baseFormData.relationship"
															
														>
															
														</u-cell>
													</u-cell-group>
													<u-picker
														v-model="baseFormData.relationship"
														
														:show="showForm.show2"
														:columns="Columns2"
														@change="change(2)"
														@cancel="cancel(2)"
														@confirm="confirm2()"
													></u-picker> -->
										<!-- </uni-forms-item> -->
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
												  <!-- <u-cell-group>
												  			<u-cell
												  				@click="showPicker(3)"
												  				:title="frequence"
												  				
																
												  			>
												  				
												  			</u-cell>
												  		</u-cell-group>
												  		<u-picker
												  			v-model="baseFormData.frequence"
												  			
												  			:show="showForm.show3"
												  			:columns="Columns3"
												  			@change="change(3)"
												  			@cancel="cancel(3)"
												  			@confirm="confirm3()"
												  		></u-picker> -->
										</uni-forms-item>
										<uni-forms-item label="关注软件情况" name="care">
											<uni-data-select
											        v-model="baseFormData.care"
											        :localdata="care"
											        @change="change"
											      ></uni-data-select>
												  <!-- <u-cell-group>
												  			<u-cell
												  				@click="showPicker(4)"
												  				:title="care"
												  				
												  			>
												  				
												  			</u-cell>
												  		</u-cell-group>
												  		<u-picker
												  			v-model="baseFormData.care"
												  			
												  			:show="showForm.show4"
												  			:columns="Columns4"
												  			@change="change(4)"
												  			@cancel="cancel(4)"
												  			@confirm="confirm4()"
												  		></u-picker> -->
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
				/* frequence:'点击选择',
				care:'点击选择', */
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
				/* showForm:{
					show1:false,
					show2:false,
					show3:false,
					show4:false
				},
				Columns1:[
					
					[21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100]
				],
				Columns2:[
					["父亲","母亲","其他"]
				],
				Columns3:[
					["一月一次","三月一次","半年一次","一年一次","超过一年才回一次"]
				],
				Columns4:[
					["偶尔","时常","经常"]
				], */
				age:[
					
					{ value: 20, text: "20" },
					{ value: 21, text: "21" },
					{ value: 22, text: "22" },
					{ value: 23, text: "23" },
					{ value: 24, text: "24" },
					{ value: 25, text: "25" },
					{ value: 26, text: "26" },
					{ value: 27, text: "27" },
					{ value: 28, text: "28" },
					{ value: 29, text: "29" },
					{ value: 30, text: "30" },
					{ value: 31, text: "31" },
					{ value: 32, text: "32" },
					{ value: 33, text: "33" },
					{ value: 34, text: "34" },
					{ value: 35, text: "35" },
					{ value: 36, text: "36" },
					{ value: 37, text: "37" },
					{ value: 38, text: "38" },
					{ value: 39, text: "39" },
					{ value: 40, text: "40" },
					{ value: 41, text: "41" },
					{ value: 42, text: "42" },
					{ value: 43, text: "43" },
					{ value: 44, text: "44" },
					{ value: 45, text: "45" },
					{ value: 46, text: "46" },
					{ value: 47, text: "47" },
					{ value: 48, text: "48" },
					{ value: 49, text: "49" },
					{ value: 50, text: "50" },
				
					],
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
								errorMessage:'请选择年龄'
							},
							/* {
								minLength:1,
								maxLength:2,
								errorMessage:'{label}长度在{minLength}到{maxLength}个字符'
							} */
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
			change(e) {
				console.log('change', e);
			},
			/* close(order) {
				// console.log('close');
				this.showForm[`show${order}`] = false
			},
			confirm1(order) {
				console.log('confirm', order);
				this.showForm.show1 = false
				this.baseFormData.age=order.value[0]
			},
			confirm2(order) {
				console.log('confirm', order);
				this.showForm.show2 = false
				this.baseFormData.relationship=order.value[0]
			},
			confirm3(order) {
				console.log('confirm', order);
				this.showForm.show3 = false
				this.baseFormData.frequence=order.indexs[0]
				switch (this.baseFormData.frequence){
					case 0:
						this.frequence="一月一次"
						break;
					case 1:
						this.frequence="三月一次"
						break;
					case 2:
						this.frequence="半年一次"
						break;
					case 3:
						this.frequence="一年一次"
						break;
					case 4:
						this.frequence="超过一年才回一次"
						break;
					default:
						break;
				}
			},
			confirm4(order) {
				console.log('confirm', order);
				this.showForm.show4 = false
				this.baseFormData.care=order.indexs[0]
				switch (this.baseFormData.care){
					case 0:
						this.care="偶尔"
						break;
					case 1:
						this.care="时常"
						break;
					case 2:
						this.care="经常"
						break;
					default:
						break;
				}
			},
			cancel(order) {
				// console.log('cancel');
				this.showForm[`show${order}`] = false
			},
			showPicker(order){
				switch (order){
					case 1:
						this.showForm.show1=true;
						break;
					case 2:
						this.showForm.show2=true;
						break;
					case 3:
						this.showForm.show3=true;
						break;
					case 4:
						this.showForm.show4=true;
						break;
					default:
						break;
				}
			}, */
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
										  url: "/pages/users/upload/upload?show=true",
										});
								} else {
									uni.navigateTo({
									  url: "/pages/parents/homepage/homepage",
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
							title: `请上传头像`,
							icon:'error'
						})
					}
					
					/* uni.showToast({
						title: `校验通过`
					}) */
				}).catch(err => {
					console.log('err', err);
				})
			},
			/* change(e) {
			        console.log("e:", e);
			      }, */
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
::v-deep .u-cell__title-text{
	font-size: 12px !important;
	color: #ACACAC !important;
}
::v-deep .uni-forms-item__label{
	width: 200rpx !important;
}
.example{
	margin-top: 30rpx;
}
::v-deep .uni-card{
	height: 110vh;
	padding-bottom: 20rpx;
}
.content{
	height: 110vh;
	padding-bottom: 80rpx;
}
</style>
