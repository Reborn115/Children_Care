<template>
	<view class="body">
		<!-- //未解决 -->
		<view class="box" v-for="(item,index) in nolist"  :key="index" @click="detailNo(item.id,item.isAnonymous)">
			<view class="one">
				<view class="title">{{item.name}}提出问题</view>
				<view class="status">
					未解决
				</view>
			</view>
			<view class="two">
				<view class="every">{{item.type}}</view>
				<view class="every">{{item.solveType}}</view>
				<view class="every">{{item.isNowSolve}}</view>
			</view>
			<view class="three">
				<text class="time">{{item.itme}}</text>
			</view>
		</view>
		<!-- 已解决 -->
		<view class="box" v-for="(item,index) in yeslist"  :key="index" @click="detailYes(item.id,item.isAnonymous)">
			<view class="one">
				<view class="title">{{item.name}}提出问题</view>
				<view class="status2">
					已解决
				</view>
			</view>
			<view class="two">
				<view class="every">{{item.type}}</view>
				<view class="every">{{item.solveType}}</view>
				<view class="every">{{item.isNowSolve}}</view>
			</view>
			<view class="three">
				<text class="time">{{item.itme}}</text>
			</view>
		</view>
		<view class="tip"><text class="content">仅展示最近三天的提问情况</text></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				nolist:[],
				yeslist:[],
			}
		},
		// onLoad() {
		// 	this.nolist=[],
		// 	this.yeslist=[],
		// 	this.getList()
		// },
		onShow(){
			this.nolist=[],
			this.yeslist=[],
			this.getList()
		},
		methods: {
			changeTime(e){
				let old = new Date(e*1000);
				//获取old具体时间
				let d = old.getTime();
				let h = old.getHours();
				let m = old.getMinutes();
				let Y = old.getFullYear();
				let M = old.getMonth()+1;
				let D = old.getDate();
				if(h<10){
					h = '0'+h;
				}
				if(m<10){
					m = '0'+m;
				}
				if(M<10){
					M = '0'+M;
				}
				if(D<10){
					D = '0'+D;
				}
				return Y+'/'+M+'/'+D +' '+' '+ h+':'+m
			},
			detailNo(id,isAnonymous){
				uni.navigateTo({
					url:'/pages/volunteer/problem/datails/datails?id='+JSON.stringify(id)+'&isAnonymous='+JSON.stringify(isAnonymous)
				})
			},
			detailYes(id,isAnonymous){
				uni.navigateTo({
					url:'/pages/childs/posthouse/detailYes/detailYes?id='+JSON.stringify(id)+'&isAnonymous='+JSON.stringify(isAnonymous)
				})
			},
			getList(){
				uni.request({
					url: 'https://api.yuleng.top:38088/api/disabuse-list', 
					header: {
						'token': uni.getStorageSync('token'), //自定义请求头信息
					},
					success: (res) => {
						// console.log(res);
						res.data.data.disabuseResultList.forEach((item)=>{
							item.itme=this.changeTime(item.time)
							if(item.isNowSolve==1){
								item.isNowSolve='立即解决'
							}else{
								item.isNowSolve='无需立即解决'
							}
							if(item.isFinish==1){
								this.yeslist.push(item);
							}
							if(item.isFinish==0){
								this.nolist.push(item);
							}
						})
						// console.log(this.yeslist);
						// console.log(this.nolist);
					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
.body{
	padding-bottom: 7vh;
}
 .box{
	width: 86vw;
	height: 17vh;
	background-color: #f3c9ac;
	// background-color: #f7ba92;
	margin-left: 7vw;
	border-radius: 10px;
	margin-top: 3vh;
	box-shadow: 0px 0px 8px #88888873;
	border: 1px solid #f3c9ac;
	.one{
		margin-top: 1.5vh;
		.title{
			display: inline-block;
			font-size: 42rpx;
			color: #424242;
			font-weight: 600;
			margin-left: 5vw;
		}
		.status{
			display: inline-block;
			color: #d1292f;
			float: right;
			margin-right: 50rpx;
		}
		.status2{
			display: inline-block;
			color: #797979;
			float: right;
			margin-right: 50rpx;
		}
	}
	.two{
		margin-top: 2vh;
		.every{
			display: inline-block;
			background-color: #ffdc4c;
			margin-left: 5vw;
			color: #6f6f6f;
			border-radius: 10rpx;
		}
	}
	.three{
		margin-top: 2vh;
		.time{
			color: #6f6f6f;
			float: right;
			margin-right: 4vw;
		}
	}
 }
 
 .tip{
	 height: 3vh;
	 margin-top: 1.5vh;
	 .content{
		 font-size: 28rpx;
		 color: #6f6f6f;
		 margin-right: 8vw;
		 float: right;
	 }
 }
</style>
