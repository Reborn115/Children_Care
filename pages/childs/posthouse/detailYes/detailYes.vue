<template>
	<view class="all">
		<view class="toppic">
			<image src="https://s2.loli.net/2022/09/12/KnGWJv98kQ1ycRA.png" style="width: 100rpx;height: 90rpx;margin-top: 20rpx;margin-left: 50rpx;"></image>
			<view style="margin-left: 55rpx;color: #595959;">
				交流区
			</view>
		</view>
		<view class="pic">
			<image src="https://s2.loli.net/2022/09/12/ChR4B1uXUI86sTv.jpg" style="width: 550rpx;height: 500rpx;margin-top: -80rpx;"></image>
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
						<uni-data-select
							v-model="parentnum"
							:localdata="range1"
							style="display: inline-block;"
							:clear="false"
						  ></uni-data-select>
						
					</view>
					<view class="text1">
						<!-- <view class="parent"> -->
							<!-- <text style="font-weight: 600;color: #6f6f6f;">父母：</text> -->
							<!-- <text>加油宝贝，相信你是最棒</text>
						</view> -->
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
						<!-- <view class="volunter" style="margin-top: 15rpx;">
							<text style="font-weight: 600;color: #6f6f6f;">志愿者：</text>
							<text>小朋友相信你自己</text>
						</view> -->
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
							线下直拍:
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
				parentsAdvise:'',
				//志愿者建议
				volunterAdvise:'',
			}
		},
		onLoad(e){
			this.id = JSON.parse(e.id)
			this.gedetail()
			this.getnum()
		},
		watch:{
			parentnum(){
				this.getparents()
			},
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
						'token': uni.getStorageSync('token'), //自定义请求头信息
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
			// 获取有几次
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
			getparents(){
				if(this.parentnum){
					uni.request({
						url: 'https://api.yuleng.top:38088/api/disabuse/parent', 
						data:{
							disabuseId:this.id,
							order:this.parentnum
						},
						header: {
							'token': uni.getStorageSync('token'), //自定义请求头信息
						},
						success: (res) => {
							// console.log(res,"parents")
							this.parentsAdvise=res.data.data
						}
					});
				}
			},
			getvolunter(){
				if(this.volunternum){
					uni.request({
						url: 'https://api.yuleng.top:38088/api/disabuse/volunteer', 
						data:{
							disabuseId:this.id,
							order:this.volunternum
						},
						header: {
							'token': uni.getStorageSync('token'), //自定义请求头信息
						},
						success: (res) => {
							// console.log(res,"volunter")
							this.volunterAdvise=res.data.data
						}
					});
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.all{
		padding-bottom: 55rpx;
	}
	.toppic{
		position: relative;
		z-index: 10;
	}
	.pic{
		display: flex;
		justify-content: center;
	}
	.body{
		// background-color: #ffaa00;
		display: flex;
		justify-content: center;
		margin-bottom: 30rpx;
		.content{
				width: 653rpx;
				background-color: #fee3c8;
				border-radius: 25rpx;
				box-shadow: 0px 0px 5px #efd6b2;
				padding-bottom: 30rpx;
				.item{
					.text{
						// background-color: #fff;
						padding-left: 40rpx;
						color: #6f6f6f;
						font-size: 34rpx;
						margin-top: 20rpx;
						font-weight: 700;
						width: 450rpx;
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
</style>

