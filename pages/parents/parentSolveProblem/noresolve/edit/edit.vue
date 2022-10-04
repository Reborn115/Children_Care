<template>
	<view>
		<view class="select">
			<view class="select1">
				<uni-data-select
							v-model="number"
							:localdata="range"
							:clear="false"
				></uni-data-select>
			</view>
			<button class="btn" type="default" @click="add">添加新的建议</button>
		</view>
		<view class="two">
			<view class="advise">
				<view class="tit">
					建议:
				</view>
				<view class="input1">
					<view class="input2">
						<uni-easyinput type="textarea" v-model="advise" placeholder="请输入建议"></uni-easyinput>
					</view>
				</view>
				<view class="tit">
					其他:
				</view>
				<view class="input1">
					<view class="input2">
						<uni-easyinput type="textarea" v-model="other" placeholder="请输入"></uni-easyinput>
					</view>
				</view>
				<view class="button" >
					<button class="mini-btn1" type="default" size="mini" @click="submit">提交</button>
					<button  class="mini-btn2" type="default" size="mini" @click="cancel" v-if="show">取消添加</button>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id:0,
				//选择次数
				number: 0,
				//一共有多少次
				parentCount:0,
				range: [
				  // { value: 1, text: "第一次建议" },
				],
				// 输入的建议
				advise:'',
				//其他
				other:'',
				// 按钮的显示与隐藏
				show:false,
				// 选择框禁用
				// disable:false
				// 判断是否连击
				clickclick:0,
			}
		},
		onLoad(e){
			this.id = JSON.parse(e.id)
			this.getnum()
		},
		watch:{
			number(){
				this.getparents()
			},
		},
		methods: {
			// 点击提交
			submit(){
				if(this.number==0){
					uni.showToast({
						title: '请点击添加按钮',
						icon:'error',
						duration: 2000
					});
				}
				else if(this.advise==''||this.other==''){
					uni.showToast({
						title: '请填写完整建议',
						icon:'error',
						duration: 2000
					});
				}
				else 
				{
					uni.request({
						url: 'https://api.yuleng.top:38088/api/disabuse/parent', 
						method:'POST',
						data:{
							"disabuseId":this.id,
							"order":this.number,
							"advise":this.advise,
							"other":this.other
						},
						header: {
							'token': uni.getStorageSync('token'), //自定义请求头信息
						},
						success: (res) => {
							
							uni.showToast({
								title: '提交成功',
								icon:'success',
								duration: 2000
							});
							this.clickclick=0
							this.getnum2()
							this.show=false
						}
					});
				}
			},
			// 点击取消
			cancel(){
				this.clickclick=0
				this.advise=''
				this.other=''
				this.range.pop()
				this.number=0
				if(this.range.length!=0){
					this.number=1
					this.getparents()
				}
				this.show=false
			},
			//获取之前的建议
			getparents(){
				if(this.number>0&&this.number<=this.parentCount){
					uni.request({
						url: 'https://api.yuleng.top:38088/api/disabuse/parent', 
						data:{
							disabuseId:this.id,
							order:this.number
						},
						header: {
							'token': uni.getStorageSync('token'), //自定义请求头信息
						},
						success: (res) => {
							// console.log(res,"parents")
							let mesg=res.data
							if(mesg.data){
								if(mesg.data.advise){
									this.advise=mesg.data.advise
								}
								if(mesg.data.other){
									this.other=mesg.data.other
								}	
							}else{
								this.advise='',
								this.other=''
							}
						}
					});
				}
			},
			// 获取共有几次解惑
			getnum(){
				this.number=0
				this.range=[]
				uni.request({
					url: 'https://api.yuleng.top:38088/api/disabuse/num', 
					data:{
						disabuseId:this.id,
					},
					header: {
						'token': uni.getStorageSync('token'), //自定义请求头信息
					},
					success: (res) => {
						// console.log(res,'次数')
						if(res.data.data.parentCount!=0){
							this.number=1
							this.parentCount=res.data.data.parentCount
							let i=1
							for(i=1;i<=res.data.data.parentCount;i++){
								this.range.push({value:i,text:'第'+i+'次建议'})
							}
						}
					}
				});
			},
			//成功提交以后
			getnum2(){
				this.number=0
				this.range=[]
				uni.request({
					url: 'https://api.yuleng.top:38088/api/disabuse/num', 
					data:{
						disabuseId:this.id,
					},
					header: {
						'token': uni.getStorageSync('token'), //自定义请求头信息
					},
					success: (res) => {
						// console.log(res,'次数')
						if(res.data.data.parentCount!=0){
							this.parentCount=res.data.data.parentCount
							let i=1
							for(i=1;i<=res.data.data.parentCount;i++){
								this.range.push({value:i,text:'第'+i+'次建议'})
							}
							this.number=res.data.data.parentCount
						}
					}
				});
			},
			// 点击增加问题
			add(){
				this.clickclick++
				if(this.clickclick==1){
					this.advise=''
					this.other=''
					let d=this.parentCount+1
					this.range.push({value:d,text:'第'+d+'次建议'})
					this.number=this.parentCount+1
					this.show=true
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.select{
		// background-color: #c1fff8;
		height: 90rpx;
		margin-top: 30rpx;
		.select1{
			background-color: #ffedbc;
			display: inline-block;
			vertical-align:top;
			width: 310rpx;
			text-align: center;
			margin-left: 50rpx;
			border-radius: 14rpx;
			float: left;
		}
		/deep/.uni-select{
			height: 80rpx !important;
			border-radius: 14rpx !important;
			font-size: 30rpx !important;
		}
		.btn{
			display: inline-block;
			vertical-align:top;
			float: right;
			margin-right: 50rpx;
			background-color: #ffedbc;
			font-size: 30rpx;
			color: #424242;
			height: 80rpx;
			width: 310rpx;
			line-height: 80rpx;
		}
	}
	.two{
		display: flex;
		justify-content: center;
		.advise{
			background-color: #fee3c8;
			width: 660rpx;
			border-radius: 15rpx;
			padding-bottom: 30rpx;
			margin-top: 30rpx;
			// box-shadow: 0px 0px 5px #efd6b2;
			.tit{
				padding-left: 50rpx;
				color: #6f6f6f;
				font-size: 37rpx;
				margin-top: 30rpx;
				font-weight: 700;
			}
			.input1{
				display: flex;
				justify-content: center;
				margin-top: 15rpx;
				.input2{
					width: 88%;
				}
			}
			.button{
				margin-top:40rpx;
				height: 80rpx;
				display: flex;
				justify-content: space-around;
				.mini-btn1{
					font-size: 29rpx;
					color: #424242;
					// float: left;
					// margin-left: 55rpx;
					background-color: #fac1a8;
					height: 63rpx;
					width: 240rpx;
					line-height: 63rpx;
				}
				.mini-btn2{
					font-size: 29rpx;
					color: #424242;
					// float: right;
					// margin-right: 55rpx;
					background-color: #999a9a;
					height: 63rpx;
					width: 240rpx;
					line-height: 63rpx;
				}
			}
		}
	}
	/deep/.uni-select__input-placeholder{
		color: #484545;
		font-size: 17px;
	}
</style>
