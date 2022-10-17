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
												  <!-- <view class="text">
												  	{{baseFormData.type}}
												  </view> -->
												  <view class="tagbox">
													  <view
													  				    class="tags"
													  				    v-for="(item, index) in baseFormData.type"
													  				    :key="index"
													  				>
													  					<u-tag
													  					    :text="item"
													  					    :plain="!item.checked"
													  					    type="warning"
													  					    :name="index"
													  					    @click="checkboxClick"
													  					>
													  					</u-tag>
													  				</view>
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
											<!-- <view class="text">
												{{baseFormData.others}}
											</view> -->
											<view>
												<u--textarea v-model="baseFormData.others" placeholder="补充能力凭证,案例等相关信息"  autoHeight disabled></u--textarea>
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
import aes from "../../../../util/aes.js"
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
					}
				],
				headPicUrl:"",
				baseFormData:{
					others:'拿过三号学生',
					isFace:'是',
					time:'20个小时',
					type:'',
					age:'18',
					sex:'男',
					
					hometown:'山东省聊城市',
					
					sayChild:'你们都是拥有能量能带给世界改变的人',
					
					address:'天津理工大学'
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
				
			};
		},
		onLoad(){
			let data = aes.encrypt(
			  JSON.stringify({
			  }),
			  "zzr@backEnd!@#$%"
			);
			uni.request({
			    url: 'https://api.yuleng.top:38088/api/privacy/my-profile', 
				method:"GET",
			    data:data,
			    header: {
			        "content-type":"application/json",
					"token":uni.getStorageSync('token')
			    },
			    success: (res) => {
					res=JSON.parse(aes.decrypt(res.data.data.result,"zzr@backEnd!@#$%"))
					this.baseFormData.age=res.age
					this.baseFormData.type=res.goodSolveProblems
					this.baseFormData.sex=res.gender
					this.baseFormData.isFace=res.isOfflineSolution
					this.baseFormData.hometown=res.nativePlace
					this.baseFormData.others=res.other
					this.baseFormData.sayChild=res.remarkChild
					this.baseFormData.time=res.loginDuration
					this.baseFormData.work=res.workAddress
					this.headPicUrl=res.headPicUrl
					switch (this.baseFormData.isFace){
						case 0:
							this.baseFormData.isFace="否"
							break;
						case 1:
							this.baseFormData.isFace="是"
							break;
						default:
							break;
					}
					switch (this.baseFormData.time){
						case 0:
							this.baseFormData.time="一小时以下";
							break;
						case 1:
							this.baseFormData.time="一小时以上三小时以下";
							break;
						case 2:
							this.baseFormData.time='三小时以上五小时以下';
							break;
						case 3:
							this.baseFormData.time="五小时以上十小时以下";
							break;
						case 4:
							this.baseFormData.time='十小时以上';
							break;
						default:
							break;
					}
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
					
			    }
			});
			
			/* uni.request({
			    url: 'https://api.yuleng.top:38088/api/my-profile/volunteer', //仅为示例，并非真实接口地址。
				method:"GET",
			    data: {
			        
			    },
			    header: {
			        "content-type":"application/json",
					"token":uni.getStorageSync('token')
			    },
			    success: (res) => {
					this.baseFormData.age=res.data.data.age
					this.baseFormData.type=res.data.data.goodSolveProblems
					this.baseFormData.sex=res.data.data.gender
					this.baseFormData.isFace=res.data.data.isOfflineSolution
					this.baseFormData.hometown=res.data.data.nativePlace
					this.baseFormData.others=res.data.data.other
					this.baseFormData.sayChild=res.data.data.remarkChild
					this.baseFormData.time=res.data.data.loginDuration
					this.baseFormData.work=res.data.data.workAddress
					this.headPicUrl=res.data.data.headPicUrl
			        console.log(res.data);
			        this.text = 'request success';
					switch (this.baseFormData.isFace){
						case 0:
							this.baseFormData.isFace="否"
							break;
						case 1:
							this.baseFormData.isFace="是"
							break;
						default:
							break;
					}
					switch (this.baseFormData.time){
						case 0:
							this.baseFormData.time="一小时以下";
							break;
						case 1:
							this.baseFormData.time="一小时以上三小时以下";
							break;
						case 2:
							this.baseFormData.time='三小时以上五小时以下';
							break;
						case 3:
							this.baseFormData.time="五小时以上十小时以下";
							break;
						case 4:
							this.baseFormData.time='十小时以上';
							break;
						default:
							break;
					}
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
					
			    }
			}); */
			
		
		},
		methods:{
			
			goEdit(){
				uni.navigateTo({
				    url:"/pages/volunteer/volunterMe/editVolun/editVolun"
				})
			},
			
		}
	}
</script>

<style lang="scss" scoped>
.tags{
	margin-left: 20rpx;
}
.tagbox{
	text-align: center;
	justify-content: center;
	display:flex;
	flex-direction: row;
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
	/* margin-right:40rpx; */
	display:flex;
	justify-content: center;
	align-items: center;
}
.example{
	margin-top: 30rpx;
}
::v-deep .uni-card{
	height: 120vh;
	padding-bottom: 20rpx;
}
.content{
	height: 120vh;
	padding-bottom: 80rpx;
}
</style>
