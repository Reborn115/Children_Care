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
										<uni-forms-item label="年级" name="grade">
											<!-- <uni-easyinput v-model="baseFormData.work" placeholder="请输入工作地址" /> -->
											<view class="text">
												{{baseFormData.grade}}
											</view>
										</uni-forms-item>
										
										<uni-forms-item label="个性签名" name="sign">
											<!-- <uni-easyinput v-model="baseFormData.sayChild" placeholder="请输入对儿童的寄语" /> -->
											<view class="text">
												{{baseFormData.sign}}
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
					age:'',
					sex:'',
					grade:'',
					hometown:'',
					sign:'',
					
				},
				src:'https://s2.loli.net/2022/09/15/cZS6YUJlA2HqvbN.jpg',
				fileList1: [],
				
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
					this.baseFormData.grade=res.data.data.grade
					this.baseFormData.sex=res.data.data.gender
					this.baseFormData.sign=res.data.data.sign
					this.baseFormData.hometown=res.data.data.nativePlace
					
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
					
			    }
			});
			this.init()
		
		},
		methods:{
			
			goEdit(){
				uni.navigateTo({
				    url:"/pages/users/editChild/editChild"
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
