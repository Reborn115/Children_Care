<template>
	<view>
		<view class="body">
			<view class="title">
				绑定父母端账号
			</view>
			<view class="text">
				请输入父母端生成的绑定验证码<br/>完成和父母端的绑定吧~
			</view>
			<view class="code">
				<view class="tip">
					验证码
				</view>
				<view class="input">
					<u--input
						border="surround"
					    clearable
					    v-model="value"
					  ></u--input>
				</view>
			</view>
			<view class="btn" @click="bind">
				绑定
			</view>
			<view class="btn" @click="out">
				暂不绑定，退出登录
			</view>
		</view>
		<view>
		  <!-- 提示窗 -->
		  <uni-popup ref="alertDialog" type="dialog">
		    <uni-popup-dialog
		      type="info"
		      cancelText="关闭"
		      confirmText="确定"
		      content="是否退出登录？"
		      @confirm="dialogConfirm"
		    ></uni-popup-dialog>
		  </uni-popup>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value:'',
				timer:'',
			}
		},
		methods: {
			//退出登录弹框
			out() {
			  this.$refs.alertDialog.open();
			},
			//点击确定退出
			dialogConfirm() {
			  uni.removeStorage({
			    key: "token",
			    success: function () {
			      uni.reLaunch({
			        url: "/pages/users/login/login",
			      });
			    },
			  });
			},
			bind(){
				uni.request({
					url: 'https://api.yuleng.top:38088/api/attend/invitation-code/', 
					method:'POST',
					data:{
						code:this.value
					},
					header: {
						'token': uni.getStorageSync('token'), 
					},
					success: (res) => {
						if(res.data.code=='A0400'){
							uni.showToast({
								title: res.data.message,
								icon:'error',
								duration: 2000
							});
						}else{
							uni.setStorage({
							  key: "isBindParents",
							  data: 1,
							});
							uni.showToast({
								title: '绑定成功',
								icon:'success',
								duration: 2000
							});
							
							this.timer = setTimeout(() => {
								clearTimeout("timer")
							    uni.switchTab({
							      url: "/pages/childs/home/home",
							    });
							}, 1000);
							
						}
						
					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
.body{
	.title{
		font-size: 55rpx;
		color: #f9dba8;
		font-weight: 700;
		text-align: center;
		margin-top: 80rpx;
		
	}
	.text{
		color: #b4b4b4;
		margin-top: 50rpx;
		text-align: center;
	}
	.code{
		margin-top: 80rpx !important;
		width: 620rpx;
		height: 150rpx;
		margin: 0 auto;
		.tip{
			color: #6a6a6a;
			font-size: 31rpx;
			padding-left: 10rpx;
		}
		.input{
			margin-top: 10rpx;
			display: flex;
			width: 620rpx;
			height: 70rpx;
			background-color: #f5e5c4;
			border-radius: 25rpx;
			/deep/.u-input--radius.data-v-fdbb9fe6, .u-input--square{
				border-radius: 25rpx;
			}
			/deep/.u-border{
				border: 1rpx solid #f5e5c4 !important;
			}
		}
	}
	.btn{
		width: 620rpx;
		height: 70rpx;
		background-color: #f9dba8;
		border-radius: 25rpx;
		margin: 0 auto;
		margin-top: 80rpx;
		text-align: center;
		color: #6a6a6a;
		line-height: 70rpx;
		font-size: 32rpx;
	}
	
}


</style>
