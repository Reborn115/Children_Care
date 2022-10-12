<template>
	<view class="all">
		<view class="pic">
			<image src="../../../../static/baby.jpg" style="width: 700rpx;height: 350rpx;margin-top: 10rpx;"></image>
		</view>
		<view class="body">
			<view class="content">
				<view class="item">
					<view class="text">
						遇到问题的类型
					</view>
					<view class="text1">
						<text class="answer">{{data.type}}</text>
					</view>
				</view>
				<view class="item">
					<view class="text">
						解决问题的方式
					</view>
					<view class="text1">
						{{data.solveType}}
					</view>
				</view>
				<view class="item">
					<view class="text">
						是否要立即解决
					</view>
					<view class="text1">
						{{data.isNowSolve}}
					</view>
				</view>
				<view class="item">
					<view class="text">
						具体问题描述
					</view>
					<view class="text1">
						{{data.question}}
					</view>
				</view>
				<view class="item">
					<view class="text">
						<text>父母的建议</text>
						<view class="select">
							<uni-data-select
								v-model="parentnum"
								:localdata="range1"
								style="display: inline-block;"
								:clear="false"
							  ></uni-data-select>
						</view>
					</view>
					<view class="text1">
						
						<view class="text4">
							建议:
						</view>
						<view class="text5">
							{{parentsAdvise.advise}}
						</view>
						<view class="text4">
							其他：
						</view>
						<view class="text5">
							{{parentsAdvise.other}}
						</view>
					</view>
				</view>
				<view class="item">
					<view class="text">
						<text>志愿者的记录</text>
						<uni-data-select
							v-model="volunternum"
							:localdata="range2"
							style="display: inline-block;"
							:clear="false"
						  ></uni-data-select>
					</view>
					<view class="text1">
						<view class="text4">
							建议:
						</view>
						<view class="text5">
							{{volunterAdvise.suggestion}}
						</view>
						<view class="text4">
							解决过程图片:
						</view>
						<image v-for="(item,index) in volunterAdvise.imageUrlList" :key="index" :src="item" style="width: 250rpx;height: 250rpx;margin-left: 13rpx;margin-top: 10rpx;"></image>
						
						<view class="text4">
							孩子的情绪状态：
						</view>
						<view class="text5">
							{{volunterAdvise.emotionalState}}
						</view>
						<view class="text4">
							其他：
						</view>
						<view class="text5">
							{{volunterAdvise.other}}
						</view>
					</view>
				</view>
			</view>
		</view>
		<button v-if="show" class="button" @click="dialogToggle" :disabled="buttonDisusable"><text
				class="button-text warn-text">{{problemSolved}}</text></button>
		<view>
			<!-- 提示窗 -->
			<uni-popup ref="alertDialog" type="dialog">
				<uni-popup-dialog type="info" cancelText="关闭" confirmText="确定"  content="帮助你解决问题的志愿者反馈此问题已解决.你是否确定问题已解决？" @confirm="dialogConfirm"
				></uni-popup-dialog>
			</uni-popup>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//儿童问题详情
				id:0,
				data:{},
				//父母第几次
				parentnum: 0,
				// 志愿者第几次
				volunternum:0,
				//父母的选择第几次
				range1: [
				  // { value: 1, text: "第一次" },
				],
				// 志愿者选择的第几次
				range2: [],
				//父母建议
				parentsAdvise:{
					advise:'暂无数据',
					other:'暂无数据'
				},
				//志愿者建议
				volunterAdvise:{
					emotionalState:'暂无数据',
					suggestion:'暂无数据',
					other:'暂无数据',
				},
				// 确认解决的按钮是否显示
				show:true,
				problemSolved:'确认已解决',
				//点击按钮的是否禁用
				buttonDisusable:false,
				//判断是已解决还是待确认
				is:0
			}
		},
		onLoad(e){
			this.id = JSON.parse(e.id)
			this.is=e.is
			if(this.is==1){
				this.show=true
			}else{
				this.show=false
			}
			this.gedetail()
			this.getnum()
		},
		onShow() {
			this.gedetail()
		},
		watch:{
			// 父母第几次建议改变
			parentnum(){
				this.getparents()
			},
			// 志愿者第几次建议改变
			volunternum(){
				this.getvolunter()
			}
		},
		methods: {
			// 获取儿童基本问题
			gedetail(){
				uni.request({
					url: 'https://api.yuleng.top:38088/api/disabuse', 
					data:{
						disabuseId:this.id,
					},
					header: {
						'token': uni.getStorageSync('token'),
					},
					success: (res) => {
						this.data=res.data.data
						// console.log(this.data,"问题详情yes")
						if(this.data.isNowSolve==1){
							this.data.isNowSolve="是"
						}else{
							this.data.isNowSolve="否"
						}
					}
				});
			},
			// 获取志愿者和家长的建议都有几次
			getnum(){
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
							this.parentnum=1
							for(let i=1;i<=res.data.data.parentCount;i++){
								this.range1.push({value:i,text:'第'+i+'次'})
							}
						}
						if(res.data.data.volunteerCount!=0){
							this.volunternum=1
							for(let i=1;i<=res.data.data.volunteerCount;i++){
								this.range2.push({value:i,text:'第'+i+'次'})
							}
						}
					}
				});
			},
			// 获取家长的第n次建议
			getparents(){
				if(this.parentnum){
					uni.request({
						url: 'https://api.yuleng.top:38088/api/disabuse/parent', 
						data:{
							disabuseId:this.id,
							order:this.parentnum
						},
						header: {
							'token': uni.getStorageSync('token'), 
						},
						success: (res) => {
							// console.log(res,"parents")
							this.parentsAdvise=res.data.data
						}
					});
				}
			},
			// 获取志愿者的第n次建议
			getvolunter(){
				if(this.volunternum){
					uni.request({
						url: 'https://api.yuleng.top:38088/api/disabuse/volunteer', 
						data:{
							disabuseId:this.id,
							order:this.volunternum
						},
						header: {
							'token': uni.getStorageSync('token'), 
						},
						success: (res) => {
							// console.log(res,"volunter")
							this.volunterAdvise=res.data.data
						}
					});
				}
			},
			//打开修改问题状态弹窗
			dialogToggle() {
				this.$refs.alertDialog.open()
			},
			//点击修改问题状态的确认按钮
			dialogConfirm() {
				uni.request({
					url: 'https://api.yuleng.top:38088/api/disabuse/accept-solve?disabuseId='+JSON.stringify(this.id), 
					method:'POST',
					header: {
						'token': uni.getStorageSync('token'), //自定义请求头信息
					},
					success: () => {
						uni.showToast({
							title: '确认成功',
							icon:'success',
							duration: 2000
						});
						this.problemSolved="问题已解决"
						this.buttonDisusable=true
					}
				});
				
			},
		}
	}
</script>

<style scoped lang="scss">
	.all{
		padding-bottom: 55rpx;
	}
	// .toppic{
	// 	position: relative;
	// 	z-index: 10;
	// }
	.pic{
		display: flex;
		justify-content: center;
	}
	.body{
		// background-color: #ffaa00;
		display: flex;
		justify-content: center;
		margin-bottom: 30rpx;
		margin-top: 15rpx;
		.content{
				width: 653rpx;
				background-color: #fee3c8;
				border-radius: 25rpx;
				box-shadow: 0px 0px 5px #efd6b2;
				padding-bottom: 30rpx;
				.item{
					.text{
						padding-left: 40rpx;
						color: #6f6f6f;
						font-size: 34rpx;
						margin-top: 20rpx;
						font-weight: 700;
						width: 450rpx;
						.select{
							display: inline-block;
							width: 220rpx;
							height: 67rpx;
							margin-left: 27rpx;
						}
					}
					.text1{
						background-color: #fedcba;
						width: 550rpx;
						margin-left: 40rpx;
						border-radius: 10rpx;
						padding-left: 20rpx;
						color: #343434;
						font-size: 34rpx;
						margin-top: 20rpx;
						font-weight: 500;
						padding-top: 10rpx;
						padding-bottom: 10rpx;
					}
					// .text2{
					// 	display: inline-block;
					// 	padding-left: 40rpx;
					// 	color: #6f6f6f;
					// 	font-size: 34rpx;
					// 	margin-top: 20rpx;
					// 	font-weight: 700;
					// 	width: 270rpx;
					// }
					// .text22{
					// 	display: inline-block;
					// 	font-size: 34rpx;
					// 	// color: #6f6f6f;
					// }
					.text4{
						// background-color: #fff;
						padding-left: 10rpx;
						color: #7e7e7e;
						font-size: 34rpx;
						margin-top: 10rpx;
						font-weight: 600;
						width: 280rpx;
					}
					.text5{
						// background-color: #fee3c8;
						width: 500rpx;
						margin-left: 5rpx;
						border-radius: 10rpx;
						padding-left: 10rpx;
						padding-right: 10rpx;
						color: #343434;
						font-size: 34rpx;
						margin-top: 8rpx;
						font-weight: 500;
						padding-top: 10rpx;
						padding-bottom: 10rpx;
					}
				}
			}
		}
/deep/.uni-select{
	font-size: 30rpx;
	margin-left: 30rpx;
	// color: #6f6f6f;
	// background-color: #fff;
}
.button{
	width: 485rpx;
	height: 80rpx;
	line-height: 80rpx;
	margin-top: 55rpx;
	background-color: #ffedbc;
	// border: 1px solid #fff5d0;
}
</style>

