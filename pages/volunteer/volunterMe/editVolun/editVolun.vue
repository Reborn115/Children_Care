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
											<!-- <uni-easyinput type="number" v-model.number="baseFormData.age" placeholder="请输入年龄" /> -->
											<u-cell-group>
														<u-cell
															@click="showPicker(1)"
															title="点击选择年龄"
															isLink
														>
															
														</u-cell>
													</u-cell-group>
													<u-picker
														v-model="baseFormData.age"
														:value="baseFormData.age"
														:show="showForm.show1"
														:columns="Columns1"
														@change="change(1)"
														@cancel="cancel(1)"
														@confirm="confirm1()"
													></u-picker>
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
										
										<uni-forms-item label="籍贯" required name="hometown">
											<uni-easyinput v-model="baseFormData.hometown" placeholder="请输入省市区" />
										</uni-forms-item>
										
										<uni-forms-item label="长居地址" required name="address">
											<uni-easyinput v-model="baseFormData.address" placeholder="请输入长居地址" />
										</uni-forms-item>
										<uni-forms-item label="擅长解决儿童问题的类型" name="type">
											<!-- <uni-data-select
											        v-model="baseFormData.frequence"
											        :localdata="frequence"
											        @change="change"
											      ></uni-data-select> -->
												  <!-- <view class="text">
												  	{{baseFormData.type}}
												  </view> -->
												  <view class="tagbox">
													  <view
													  				    class="tags"
													  				    v-for="(item, index) in problems"
													  				    :key="index"
													  				>
													  					<u-tag
													  					    :text="item.name"
													  					    :plain="!item.checked"
													  					    type="warning"
													  					    :name="index"
													  					    @click="checkboxClick(index)"
													  					>
													  					</u-tag>
													  				</view>
												  </view>
												  
										</uni-forms-item>
										
										<uni-forms-item label="平均每周登录软件的时长" name="time">
											<!-- <uni-data-select
											        v-model="baseFormData.frequence"
											        :localdata="frequence"
											        @change="change"
											      ></uni-data-select> -->
												  <u-cell-group>
												  			<u-cell
												  				@click="showPicker(2)"
												  				title="点击选择平均每周登录软件的时长"
												  				isLink
												  			>
												  				
												  			</u-cell>
												  		</u-cell-group>
												  		<u-picker
												  			v-model="baseFormData.time"
												  			:value="baseFormData.time"
												  			:show="showForm.show2"
												  			:columns="Columns2"
												  			@change="change(2)"
												  			@cancel="cancel(2)"
												  			@confirm="confirm2()"
												  		></u-picker>
										</uni-forms-item>
										<uni-forms-item label="寄语儿童" required name="sayChild">
											<uni-easyinput v-model="baseFormData.sayChild" placeholder="请输入对儿童的寄语" />
										</uni-forms-item>
										
										<uni-forms-item label="是否可以线下解决儿童问题" required name="isFace">
											<!-- <uni-data-checkbox v-model="baseFormData.sex" :localdata="sexs" /> -->
											<uni-data-checkbox v-model="baseFormData.isFace" :localdata="isFace"></uni-data-checkbox>
										</uni-forms-item>
										<uni-forms-item label="其他" name="others">
											<!-- <uni-easyinput v-model="baseFormData.sayVolunteer" placeholder="请输入对志愿者的寄语" /> -->
											<!-- <view class="text">
												{{baseFormData.others}}
											</view> -->
											<view>
												<u--textarea v-model="baseFormData.others" placeholder="补充能力凭证,案例等相关信息"  autoHeight ></u--textarea>
											</view>
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
				problems:[
					{
						name:"心理",
						checked:false
					},
					{
						name:"学习",
						checked:false
					},
					{
						name:"安全",
						checked:false
					},
					{
						name:"生活",
						checked:false
					},
					{
						name:"兴趣",
						checked:false
					},
					{
						name:"感情",
						checked:false
					},
					{
						name:"健康",
						checked:false
					},
				],
				headPicUrl:"",
				baseFormData:{
					others:'',
					isFace:'',
					time:'',
					type:[],
					age:'',
					sex:'',
					
					hometown:'',
					
					sayChild:'',
					
					address:''
				},
				showForm:{
					show1:false,
					show2:false
				},
				src:'https://s2.loli.net/2022/09/15/cZS6YUJlA2HqvbN.jpg',
				fileList1: [],
				Columns1:[
					
					[21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100]
				],
				Columns2:[
					
					["一小时以下","一小时以上三小时以下",'三小时以上五小时以下',"五小时以上十小时以下",'十小时以上']
				],
				isFace:[
					{
						text:'是',
						value:1,
					},
					{
						text:'否',
						value:0
					}
				],
				sex: [{
					text: '男',
					value: 0
				}, {
					text: '女',
					value: 1
				}],
				
				rules:{
					
					time:{
						//账号检验
						rules:[
							{
								required:true,
								errorMessage:'请选择平均每周登录软件的时长'
							},
							
						],
						label:'平均每周登录软件的时长',
						validateTrigger:'submit'
					},
					address:{
						//账号检验
						rules:[
							{
								required:true,
								errorMessage:'请填写长居地址'
							},
							{
								minLength:2,
								maxLength:12,
								errorMessage:'{label}长度在{minLength}到{maxLength}个字符'
							}
						],
						label:'长居地址',
						validateTrigger:'submit'
					},
					type:{
						//账号检验
						rules:[
							{
								required:true,
								errorMessage:'请选择擅长解决儿童问题的类型'
							},
							
						],
						label:'擅长解决儿童问题的类型',
						validateTrigger:'submit'
					},
					age:{
						//账号检验
						rules:[
							{
								required:true,
								errorMessage:'请选择年龄'
							},
							
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
					isFace:{
						//密码检验
						rules:[
							{
								required:true,
								errorMessage:'请选择是否可以线下解决儿童问题'
							},
							
						],
						label:'是否可以线下解决儿童问题',
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
					others:{
						//账号检验
						rules:[
							{
								required:true,
								errorMessage:'请填写其他'
							},
							{
								minLength:1,
								maxLength:100,
								errorMessage:'{label}长度在{minLength}到{maxLength}个字符'
							}
						],
						label:'其他',
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
		/* onLoad(){
			
			uni.request({
			    url: 'https://api.yuleng.top:38088/api/my-profile/parent', //仅为示例，并非真实接口地址。
				method:"POST",
			    data: {
			        
			    },
			    header: {
			        "content-type":"application/json",
					"token":uni.getStorageSync('token')
			    },
			    success: (res) => {
					this.baseFormData.age=res.data.data.age
					this.swiper=res.data.data.homeInfoPictureParamList
					this.baseFormData.sex=res.data.data.gender
					this.baseFormData.relationship=res.data.data.relation
					this.baseFormData.hometown=res.data.data.nativePlace
					this.baseFormData.frequence=res.data.data.homeSituation
					this.baseFormData.care=res.data.data.softwareSituation
					this.baseFormData.sayChild=res.data.data.remarkChild
					this.baseFormData.sayVolunteer=res.data.data.remarkVolunteer
					this.baseFormData.work=res.data.data.workAddress
					this.headPicUrl=res.data.data.headPicUrl
			        console.log(res.data);
			        this.text = 'request success';
					switch ( this.baseFormData.sex ) {
					    case 0:{
							this.baseFormData.sex='男'
							break;
						}
							
					    case 1:{
							this.baseFormData.sex='女'
							break;
						}
					        
					    
					    default:{
							console.log(this.baseFormData.sex)
							return '未设置';
						}
					        
					}
					switch ( this.baseFormData.care ) {
					    case 0:
							this.baseFormData.care='偶尔'
					        break;
					    case 1:
					        this.baseFormData.care='时常'
					        break;
					    case 2:
					    	this.baseFormData.care='经常'
					        break;
					    
					    default:
					        return '未设置';
					}
					switch ( this.baseFormData.frequence ) {
					    case 0:
							this.baseFormData.frequence='爸爸'
					        break;
					    case 1:
					        this.baseFormData.frequence='妈妈'
					        break;
					    case 2:
					    	this.baseFormData.frequence='爷爷'
					        break;
					    case 3:
					    	this.baseFormData.frequence='奶奶'
					        break;
					    case 4:
					    	this.baseFormData.frequence='哥哥'
					        break;
						case 5:
							this.baseFormData.frequence='姐姐'
						    break;
					    default:
					        return '未设置';
					}
			    }
			}); */
			
		
		/* }, */
		methods:{
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
					
					default:
						break;
				}
			},
			confirm1(order) {
				console.log('confirm', order);
				this.showForm.show1 = false
				this.baseFormData.age=order.value[0]
			},
			confirm2(order) {
				console.log('confirm', order);
				this.showForm.show2 = false
				this.baseFormData.time=order.value[0]
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
			checkboxClick(name) {
				if(!this.problems[name].checked) {
					let arr=[]
					this.problems[name].checked = !this.problems[name].checked
					/* this.type[name]=this.problems[name].name */
					this.baseFormData.type.push(this.problems[name].name)
					arr.concat(this.problems[name].name)
					arr.push(this.problems[name].name)
					console.log(this.problems[name].name)
					console.log(arr)
					console.log(this.baseFormData.type)
				}
				
			},
			goEdit(){
				uni.navigateTo({
				    url:"/pages/users/editInfo/editInfo"
				})
			},
			submit(ref){
				this.$refs[ref].validate().then(res => {
					if(this.headPicUrl){
						uni.request({
							url: 'https://api.yuleng.top:38088/api/my-profile/volunteer', //仅为示例，并非真实接口地址。
							method:"POST",
							data: {
							    gender:this.baseFormData.sex,
								
								nativePlace:this.baseFormData.hometown,
								age:this.baseFormData.age,
								
								
								remarkChild:this.baseFormData.sayChild,
								
								headPicUrl:this.headPicUrl,
								workAddress:this.baseFormData.work,
								goodSolveProblems:this.baseFormData.type,
								isOfflineSolution:this.baseFormData.isFace,
								other:this.baseFormData.others
							},
							header: {
							    "content-type":"application/json",
								"token":uni.getStorageSync('token')
							},
							success: (res) => {
								console.log(res.data);
								uni.reLaunch({
								  url: "/pages/volunteer/volunteerhome/volunteerhome",
								});
								
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
			
		}
	}
</script>

<style lang="scss" scoped>
.content{
	height: 1650rpx;
	padding-bottom: 80rpx;
}
::v-deep .uni-card{
	height: 1600rpx !important;
	
	/* padding-bottom: 20rpx !important; */
}
::v-deep .u-cell__title-text{
	font-size: 12px !important;
	color: #ACACAC !important;
}
.tags{
	margin-left: 20rpx;
	margin-bottom: 20rpx;
}
.tagbox{
	display:flex;
	flex-direction: row;
	flex-wrap: wrap;
}
::v-deep .uni-forms-item__label{
	width: 200rpx !important;
}
.img{
	display:flex;
	justify-content: center;
	align-items: center;
}
.text{
	margin-right:40rpx;
	display:flex;
	justify-content: center;
	align-items: center;
}
.example{
	margin-top: 30rpx;
}
/* ::v-deep .uni-card{
	height: 100vh;
	padding-bottom: 20rpx;
}
.content{
	height: 100vh;
	padding-bottom: 80rpx;
} */
</style>
