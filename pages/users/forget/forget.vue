<template class="body">
	<view class="container">
		<image  :src='img' alt="" ref="normalImage" class="bg-img">
		<uni-forms :modelValue="formData" :rules="rules" ref="formData" class='formNormal'>
				<uni-forms-item name="account" class="inputNormal">
							
					<u-input prefixIcon="heart" type="text" v-model="formData.account" placeholder="请输入用户名" placeholderStyle="color:#CADDEB;"/>
				</uni-forms-item>
				<uni-forms-item name="password" class="inputNormal">
					
					<u-input prefixIcon="lock" type="password" v-model="formData.password" placeholder="请输入新密码" placeholderStyle="color:#CADDEB;" @focus="changeImg(3)" @blur="recoverImg()"/>
				</uni-forms-item>
				<uni-forms-item name="phone" class="inputNormal">
					
					<u-input prefixIcon="phone" type="text" v-model="formData.phone" placeholder="请输入电话号码" placeholderStyle="color:#CADDEB;"/>
				</uni-forms-item>
				
				<uni-forms-item name="confirm" class="inputNormal">
					<u-input placeholder="请输入验证码" placeholderStyle="color:#CADDEB;" type="number" v-model="formData.confirm" prefixIcon="checkmark-circle" >
						<template slot="suffix">
											<u-code
												ref="uCode"
												@change="codeChange"
												seconds="20"
												changeText="60秒后重新获取"
											></u-code>
											<u-button
												@tap="getCode"
												:text="tips"
												type="success"
												size="mini"
											>获取验证码</u-button>
										</template>
									
									</u-input>
				
					<!-- <uni-easyinput prefixIcon="checkbox" type="text" v-model="formData.confirm" placeholder="请输入验证码" />
					<button type="primary" @click="getCheck" class="bottonCheck">获取验证码</button> -->
				</uni-forms-item>
				<button type="primary" @click="submit('formData')" class="bottonNormal">找回密码</button>
				<view class="privacy">
					<uni-data-checkbox multiple :localdata="range" @change="change" class="checkbotton"></uni-data-checkbox>
					<text>已阅读并同意</text>
					<uni-link href="https://www.yuleng.top/app-huimao-yszc/" text="护苗隐私协议" color="#CF6A1B" font-weight='bold' showUnderLine="false"></uni-link>
				</view>
			</uni-forms>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isPrivacy:0,
				img:'../../../static/blue.jpg',
				formData:{
					password:'',
					account:'',
					phone:'',
					confirm:'',
					
				},
				range: [{"value":1 ,"text": ""	}],
				rules:{
					account:{
						//昵称检验
						rules:[
							{
								required:true,
								errorMessage:'请填写用户名'
							},
							{
								minLength:2,
								maxLength:20,
								errorMessage:'{label}长度在{minLength}到{maxLength}个字符'
							}
						],
						label:'用户名',
						validateTrigger:'submit'
					},
					password:{
						//密码检验
						rules:[
							{
								required:true,
								errorMessage:'请填写密码'
							},
							{
								minLength:6,
								maxLength:12,
								errorMessage:'{label}长度在{minLength}到{maxLength}个字符'
							}
						],
						label:'密码',
						validateTrigger:'submit'
					},
					
					phone:{
						//手机号检验
						rules:[
							{
								required:true,
								errorMessage:'请填写手机号'
							},
							{
								minLength:11,
								maxLength:11,
								errorMessage:'{label}长度为{minLength}个数字'
							}
						],
						label:'手机号码',
						validateTrigger:'submit'
					},
					confirm:{
						//验证码检验
						rules:[
							{
								required:true,
								errorMessage:'请填写验证码'
							},
							{
								minLength:4,
								maxLength:4,
								errorMessage:'{label}长度为{minLength}个数字'
							}
						],
						label:'验证码',
						validateTrigger:'submit'
					}
				}
			};
		},
		methods:{
			change(e){
				this.isPrivacy=!this.isPrivacy;
			},
			codeChange(text) {
			        this.tips = text;
			      },
			getCode() {
				if(this.formData.phone==''){
					uni.showToast({
						title: "请先输入手机号",
						icon:"error"
					});
				} else {
					uni.request({
					  url: "https://api.yuleng.top:38088/api/seed-code", //仅为示例，并非真实接口地址。
					  method: "POST",
					  data: {
					    phone:this.formData.phone,
					  },
					  header: {
					    "content-type": "application/json",
					   /* token: uni.getStorageSync("token"), */
					  },
					  success: (res) => {
					    console.log(res.data);
					    if(res.data.code=="A0400"){
							uni.showToast({
								title: res.data.message,
								icon:"error"
							});
						} else {
							uni.showToast({
								title: "验证码发送成功",
								icon:"success"
							});
						}/* else{
							if (this.$refs.uCode.canGetCode) {
							  // 模拟向后端请求验证码
							  uni.request({
							  	url: 'https://api.yuleng.top:38088/api/seed-code', //仅为示例，并非真实接口地址。
							  	method:"POST",
							  	data: {
							  	    phone:this.formData.phone,
							  	},
							  	header: {
							  	    "content-type":"application/json",
							  	},
							  	success: (res) => {
							  		console.log(res.data);
							  		this.text = 'request success';
							  	 }
							  });
							  uni.showLoading({
							    title: '正在获取验证码'
							  })
							  setTimeout(() => {
							    uni.hideLoading();
							    // 这里此提示会被this.start()方法中的提示覆盖
							    uni.$u.toast('验证码已发送');
							    // 通知验证码组件内部开始倒计时
							    this.$refs.uCode.start();
							  }, 2000);
							} else {
							  uni.$u.toast('倒计时结束后再发送');
							}
						} */
					    
					  },
					});
				}
				
			       
			},
			recoverImg(){
				this.img='../../../static/blue.jpg'
			},
			changeImg(num){
				/* if(num==2){
					this.img='../../static/account.png';
					
					this.$refs.normalImage.style.width="130px";
					this.$refs.normalImage.style.height="110px";
				} */
				if(num==3){
					this.img='../../../static/bluepassword.jpg'
				}
			},
			submit(ref){
				
							this.$refs[ref].validate().then(res => {
								if(!this.isPrivacy){
									uni.showToast({
										title: '请同意隐私政策',
										icon:'error'
									});
								} else {
									uni.request({
									    url: 'https://api.yuleng.top:38088/api/find-password', //仅为示例，并非真实接口地址。
										method:"POST",
									    data: {
									        code:this.formData.confirm,
											userName:this.formData.account,
											phone:this.formData.phone,
											password:this.formData.password
									    },
									    header: {
									        "content-type":"application/json",
									        
									    },
									    success: (res) => {
											if(res.data.code=='00000') {
												uni.showToast({
													title: '找回密码成功',
													icon:'success'
												});
												console.log(res.data);
												this.text = 'request success';
												uni.navigateTo({
													url:"/pages/users/login/login"
												})
											} else {
												uni.showToast({
													title: '验证码错误',
													icon:'error'
												});
											}
									        
									    }
									});
								}
								
			
								console.log('success', res);
								
							}).catch(err => {
								console.log('err', err);
							})
						},
		}
	}
</script>

<style lang="scss" scoped>
.privacy{
	margin-bottom: 80rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	text{
		font-size: 13.5px;
	}
}
::v-deep .uni-data-checklist{
	font-size:0px
}
::v-deep .u-icon__icon{
	color:#72B1D4 !important;
}
.bg-img{
	
	    position: absolute;
	    z-index: -1;
	    left: 0;
	    right: 0;
	    bottom: 0;
	    right: 0;
	    width: 100%;
	    height: 100%;
	
}
	.container{
		display:flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
	}
	.container input{
	    outline: none;
	    padding: 10px;
	    width: 100%;
	    border:solid 1px #ececec;
	    border: radius 2px;
	    margin-bottom: 10px;
	    box-sizing: border-box;
	    font-size: 16px;
	}
	/* .container image{
	    position: absolute;
	    width: 120px;
	    height: 95px;
	    top: 19.5%;
	    left: 50%;
	    transform: translate(-50%,0);
	} */
	::v-deep .u-input{
		height: 80rpx;
		margin-bottom: 20rpx;
		width: 60vw !important;
		outline: none !important;
		background-color: white;
		/* border-style:none !important; */
		width: 100%;
		box-sizing: border-box;
		font-size: 16px;
		/* margin-left: 2vw; */
	}
	/* #normalImage{
		display: block;
		width: 103px;
		height: 83px;
		top: -12%;
	}	 */
	::v-deep .uni-easyinput{
		width: 60vw !important;
		outline: none !important;
		
		border-style:none !important;
		/* padding: 10px; */
		width: 100%;
		/* border:solid 1px #ececec!important;
		border: radius 2px!important; */
		
		box-sizing: border-box;
		font-size: 16px;
	}
	::v-deep .uni-forms-item__label{
		visibility: hidden !important;
		padding: 0;
	}
	
	.bottonNormal{
		border-radius: 20px;
		background-color: #E48B47;
		align-items: center;
		justify-content: center;
		display: flex;
		width: 60vw;
		height: 80rpx;
		margin-top: 20rpx;
		margin-bottom: 40rpx;
	}
	.formNormal{
		align-items: center;
		justify-content: center;
		display: flex;
		width: 70vw;
	}
	::v-deep .uni-forms{
		margin-top: 300rpx;
		/* margin-top:26.7vh;
		margin-left: 10vw; */
		width: 80vw;
		align-items: center;
		justify-content: center;
		display: flex;
	}
	.body{
		background-color: #E9BA84;
		position: relative;
		z-index: 0;
	}
	
	.password_account{
		align-items: center;
		justify-content: center;
		display: flex;
	}
	.textNormal{
		margin-left: 10vw;
	}

</style>

