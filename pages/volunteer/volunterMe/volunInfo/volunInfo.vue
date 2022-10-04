<template>
	<view class="container">
		<view class="content">
			<uni-card :is-shadow="true">
				
					<uni-section title="我的资料" type="line" titleFontSize="22px">
								<view class="example">
									<!-- 基础用法，不包含校验规则 -->
									<uni-forms ref="baseFormData" :modelValue="baseFormData" :rules="rules">
										<uni-forms-item label="头像" name="headPic" >
											<!-- <u--image
												shape="circle"
												:src="src"
												width="80px"
												height="80px"
											></u--image> -->
											<view class="img">
												<u--image
																	    :src="headPicUrl"
																	    width="80px"
																	    height="80px"
																		mode="widthFit"
																	>
																		<template v-slot:loading>
																			<u-loading-icon color="red"></u-loading-icon>
																		</template>
																	</u--image>
											</view>
											
										</uni-forms-item>
										<uni-forms-item label="年龄"  name="age">
											<!-- <uni-easyinput type="number" v-model.number="baseFormData.age" placeholder="请输入年龄" /> -->
											<view class="text">
												{{baseFormData.age}}
											</view>
										</uni-forms-item>
										<uni-forms-item label="性别" name="sex">
											<!-- <uni-data-checkbox v-model="baseFormData.sex" :localdata="sexs" /> -->
											<!-- <uni-data-checkbox v-model="baseFormData.sex" :localdata="sex"></uni-data-checkbox> -->
											<view class="text">
												{{baseFormData.sex}}
											</view>
										</uni-forms-item>
										
										<!-- <uni-forms-item label="与儿童关系" name="relationship">
											<uni-data-select
											        v-model="baseFormData.relationship"
											        :localdata="relationship"
											        @change="change"
											      ></uni-data-select>
										</uni-forms-item> -->
										
										<uni-forms-item label="籍贯" name="hometown">
											<!-- <uni-easyinput v-model="baseFormData.hometown" placeholder="请输入省市区" /> -->
											<view class="text">
												{{baseFormData.hometown}}
											</view>
										</uni-forms-item>
										<uni-forms-item label="长居地址" name="address">
											<!-- <uni-easyinput v-model="baseFormData.work" placeholder="请输入工作地址" /> -->
											<view class="text">
												{{baseFormData.address}}
											</view>
										</uni-forms-item>
										<uni-forms-item label="擅长解决儿童问题的类型" name="type">
											<!-- <uni-data-select
											        v-model="baseFormData.frequence"
											        :localdata="frequence"
											        @change="change"
											      ></uni-data-select> -->
												  <view class="text">
												  	{{baseFormData.type}}
												  </view>
										</uni-forms-item>
										<uni-forms-item label="平均每周登录软件的时长" name="time" >
											<!-- <uni-data-select
											        v-model="baseFormData.care"
											        :localdata="care"
											        @change="change"
											      ></uni-data-select> -->
												  <view class="text">
												  	{{baseFormData.time}}
												  </view>
										</uni-forms-item>
										<uni-forms-item label="寄语儿童" name="sayChild">
											<!-- <uni-easyinput v-model="baseFormData.sayChild" placeholder="请输入对儿童的寄语" /> -->
											<view class="text">
												{{baseFormData.sayChild}}
											</view>
										</uni-forms-item>
										<uni-forms-item label="是否可以线下解决儿童问题" name="isFace">
											<!-- <uni-easyinput v-model="baseFormData.sayChild" placeholder="请输入对儿童的寄语" /> -->
											<view class="text">
												{{baseFormData.isFace}}
											</view>
										</uni-forms-item>
										<uni-forms-item label="其他" name="others">
											<!-- <uni-easyinput v-model="baseFormData.sayVolunteer" placeholder="请输入对志愿者的寄语" /> -->
											<view class="text">
												{{baseFormData.others}}
											</view>
										</uni-forms-item>
										<button type="primary" @click="goEdit">编辑资料</button>
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
					others:'',
					isFace:'',
					time:'',
					type:'',
					age:'',
					sex:'',
					relationship:'',
					hometown:'',
					frequence:'',
					care:'',
					sayChild:'',
					sayVolunteer:'',
					address:''
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
				
				
				frequence: [
				          { value: 0, text: "爸爸" },
				          { value: 1, text: "妈妈" },
				          { value: 2, text: "爷爷" },
						  { value: 3, text: "奶奶" },
						  { value: 4, text: "哥哥" },
						  { value: 5, text: "姐姐" },
				        ],
				care:[
				          { value: 0, text: "偶尔" },
				          { value: 1, text: "时常" },
				          { value: 2, text: "经常" },
						  
				        ],
				
			};
		},
		onLoad(){
			
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
			});
			
		
		},
		methods:{
			
			goEdit(){
				uni.navigateTo({
				    url:"/pages/users/editInfo/editInfo"
				})
			},
			
		}
	}
</script>

<style lang="scss" scoped>
::v-deep .uni-forms-item__label{
	width: 200rpx !important;
}
.img{
	display:flex;
	justify-content: center;
	align-items: center;
}
.text{
	display:flex;
	justify-content: center;
	align-items: center;
}
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
