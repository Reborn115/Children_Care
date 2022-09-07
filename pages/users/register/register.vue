<template class="body">
	<view class="container">
		<image  :src='img' alt="" ref="normalImage">
		<uni-forms :modelValue="formData" :rules="rules" ref="formData" class='formNormal'>
				<uni-forms-item name="name" class="inputNormal">
							
					<uni-easyinput prefixIcon="heart" type="text" v-model="formData.name" placeholder="请输入昵称" />
				</uni-forms-item>
				<uni-forms-item name="newPassword" class="inputNormal">
					
					<uni-easyinput prefixIcon="locked" type="password" v-model="formData.newPassword" placeholder="请输入密码" @focus="changeImg(3)" @blur="recoverImg()"/>
				</uni-forms-item>
				<uni-forms-item name="confirmPassword" class="inputNormal">
							
					<uni-easyinput prefixIcon="locked" type="password" v-model="formData.confirmPassword" placeholder="请再次确认密码" @focus="changeImg(3)" @blur="recoverImg()" />
				</uni-forms-item>
				<uni-forms-item name="phone" class="inputNormal">
					
					<uni-easyinput prefixIcon="phone" type="text" v-model="formData.phone" placeholder="请输入电话号码" />
				</uni-forms-item>
				<button type="primary" @click="submit('formData')" class="bottonNormal">注册</button>
			</uni-forms>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				img:'/static/neither.png',
				formData:{
					name:'',
					newPassword:'',
					confirmPassword:'',
					phone:''
				},
				
				rules:{
					name:{
						//昵称检验
						rules:[
							{
								required:true,
								errorMessage:'请填写昵称'
							},
							{
								minLength:2,
								maxLength:20,
								errorMessage:'{label}长度在{minLength}到{maxLength}个字符'
							}
						],
						label:'昵称',
						validateTrigger:'submit'
					},
					newPassword:{
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
					confirmPassword:{
						//确认密码检验
						rules:[
							{
								required:true,
								errorMessage:'请再次确认密码'
							},
							{
								minLength:6,
								maxLength:12,
								errorMessage:'{label}长度在{minLength}到{maxLength}个字符'
							}
						],
						label:'确认密码',
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
					}
				}
			};
		},
		methods:{
			recoverImg(){
				this.img='/static/neither.png'
			},
			changeImg(num){
				/* if(num==2){
					this.img='../../static/account.png';
					
					this.$refs.normalImage.style.width="130px";
					this.$refs.normalImage.style.height="110px";
				} */
				if(num==3){
					this.img='/static/password.png'
				}
			},
			submit(ref){
				
							this.$refs[ref].validate().then(res => {
								uni.request({
								    url: 'https://www.example.com/request', //仅为示例，并非真实接口地址。
									method:"GET",
								    data: {
								        formData:this.formData,
								    },
								    header: {
								        'custom-header': 'hello' //自定义请求头信息
								    },
								    success: (res) => {
								        console.log(res.data);
								        this.text = 'request success';
										uni.navigateTo({
											url:"/pages/login/login"
										})
								    }
								});
			
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

<style lang="scss" scoped>
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
	.container image{
	    position: absolute;
	    width: 120px;
	    height: 95px;
	    top: 11%;
	    left: 50%;
	    transform: translate(-50%,0);
	}
	
	::v-deep .uni-easyinput{
		width: 60vw !important;
		outline: none !important;
		
		border-style:none !important;
		
		width: 100%;
		
		
		box-sizing: border-box;
		font-size: 16px;
	}
	::v-deep .uni-forms-item__label{
		visibility: hidden !important;
		padding: 0;
	}
	
	.bottonNormal{
		align-items: center;
		justify-content: center;
		display: flex;
		width: 20vw;
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
		margin-top:26.7vh;
		margin-left: 10vw;
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
