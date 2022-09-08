<template class="body">
	<view class="container">
		
		<image  :src='img' alt="" ref="normalImage"></image>
		<uni-forms :modelValue="formData" :rules="rules" ref="formData"  class='formNormal'>
			<uni-forms-item name="account" class="inputNormal">
						
				<uni-easyinput prefixIcon="person" type="text" v-model="formData.account" placeholder="请输入账号" @focus="changeImg(2)" @blur="recoverImg()"/>
			</uni-forms-item>
			<uni-forms-item name="password" class="inputNormal">
				
				<uni-easyinput prefixIcon="locked" type="password" v-model="formData.password" placeholder="请输入密码" @focus="changeImg(3)" @blur="recoverImg()"/>
			</uni-forms-item>
			<button type="primary" @click="submit('formData')" class="bottonNormal">登录</button>
			<view class="password_account">
				<text @click="goRegister" class="textNormal">注册账号</text>
				<text @click="goForget" class="textNormal">忘记密码？</text>
			</view>
		</uni-forms>

	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				img:'/static/neither.png',
				formData:{
					account:'',
					password:''
				},
				
				rules:{
					account:{
						//账号检验
						rules:[
							{
								required:true,
								errorMessage:'请填写账号'
							},
							{
								minLength:6,
								maxLength:12,
								errorMessage:'{label}长度在{minLength}到{maxLength}个字符'
							}
						],
						label:'账号',
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
					}
				}
			}
			
		},
		mounted() {
			console.log(this, "Vue")
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
			goForget(){
				uni.navigateTo({
					url:"/pages/users/forget/forget"
				})
			},
			goRegister(){
				uni.navigateTo({
				    url:"/pages/users/register/register"
				})
			},
			submit(ref){
				uni.navigateTo({
				    url:"/pages/users/actor/actor"
				})
				this.$refs[ref].validate().then(res => {
					uni.request({
						url: 'https://api.yuleng.top:38088', //仅为示例，并非真实接口地址。
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
	margin-left: 5vw;
}
</style>
