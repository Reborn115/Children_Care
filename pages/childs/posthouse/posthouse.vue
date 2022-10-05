<template>
	<view>
		<view class="picture" v-if="show">
			<image src="../../../static/nodata.png" style="width: 700rpx;height: 640rpx;"></image>
		</view>
		<!-- //未解决 -->
		<view class="box1" v-for="(item,index) in nolist"  :key="index" @click="detailNo(item.id)">
			<view class="one1">
				<view class="title1">提出的问题</view>
				<view class="status1">
					未解决
				</view>
			</view>
			<view class="two1">
				<view class="every1">{{item.type}}</view>
				<view class="every1">{{item.solveType}}</view>
				<view class="every1">{{item.isNowSolve}}</view>
			</view>
			<view class="three1">
				<text class="time1">{{item.itme}}</text>
			</view>
		</view>
		<!-- 已解决 -->
		<view class="box" v-for="(item,index) in yeslist"  :key="index" @click="detailYes(item.id)">
			<view class="one">
				<view class="title">提出的问题</view>
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
		<view class="tip"><text class="content">仅展示最近一周的问题</text></view>
		<view class="button">
			<button class="mini-btn1" type="default" size="mini" @click="lookAll">查看成长档案</button>
			<button class="mini-btn2" type="default" size="mini" @click="addQuestion">添加问题</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				nolist:[],
				yeslist:[],
				show:false
			}
		},
		onLoad() {
			this.nolist=[],
			this.yeslist=[],
			this.getList()
		},
		//下拉刷新更新数据
		onPullDownRefresh() {
			// this.nolist=[],
			// this.yeslist=[],
			this.getList()
		},
		methods: {
			// 转换时间戳
			changeTime(e){
				let old = new Date(e*1000);
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
			//进入增加问题界面
			addQuestion(){
				uni.navigateTo({
					url:'/pages/childs/posthouse/addQuestion/addQuestion'
				})
			},
			//进入成长档案界面
			lookAll(){
				uni.navigateTo({
					url:'/pages/childs/posthouse/lookAll/lookAll?where=1'
				})
			},
			// 未解决问题
			detailNo(id){
				uni.navigateTo({
					url:"/pages/childs/posthouse/detailNo/detailNo?id="+JSON.stringify(id)
				})
			},
			// 已解决问题
			detailYes(id){
				uni.navigateTo({
					url:'/pages/childs/posthouse/detailYes/detailYes?id='+JSON.stringify(id)
				})
			},
			// 获取问题列表
			getList(){
				uni.request({
					url: 'https://api.yuleng.top:38088/api/disabuse-list', 
					header: {
						'token': uni.getStorageSync('token'), 
					},
					success: (res) => {
						this.nolist=[]
						this.yeslist=[]
						if(res.data.data.disabuseResultList.length==0){
							this.show=true
						}else{
							this.show=false
						}
						// 数组翻转
						let list=res.data.data.disabuseResultList.reverse()
						list.forEach((item)=>{
							item.itme=this.changeTime(item.time)
							if(item.isNowSolve==1){
								item.isNowSolve='立即解决'
							}else{
								item.isNowSolve='无需立即解决'
							}
							if(item.isFinish==1){
								this.yeslist.push(item);
							}else{
								this.nolist.push(item);
							}
						})
						setTimeout(function(){
							uni.stopPullDownRefresh();
						},1000)
					}
				});
				
			},
		}
	}
</script>

<style lang="scss" scoped>
.picture{
	display: flex;
	justify-content: center;
	width: 100%;
}

 .box1{
	width: 84vw;
	height: 17vh;
	background-color: #f9dad5;
	margin-left: 7vw;
	border-radius: 6px;
	margin-top: 3vh;
	// box-shadow: 0px 0px 8px #88888873;
	border: 1px solid #f9dad5;
	border-left: 20rpx solid #ff938c;
	.one1{
		margin-top: 1.5vh;
		.title1{
			display: inline-block;
			font-size: 42rpx;
			color: #424242;
			font-weight: 700;
			margin-left: 5vw;
		}
		.status1{
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
	.two1{
		margin-top: 2vh;
		.every1{
			display: inline-block;
			// background-color: #a7d9c8;
			margin-left: 5vw;
			color: #6f6f6f;
			border-radius: 10rpx;
		}
	}
	.three1{
		margin-top: 2vh;
		.time1{
			color: #6f6f6f;
			float: right;
			margin-right: 4vw;
		}
	}
 }


 .box{
	width: 84vw;
	height: 17vh;
	background-color: #d5eae3;
	margin-left: 7vw;
	border-radius: 6px;
	margin-top: 3vh;
	// box-shadow: 0px 0px 8px #88888873;
	border: 1px solid #d5eae3;
	border-left: 20rpx solid #a7d9c8;
	.one{
		margin-top: 1.5vh;
		.title{
			display: inline-block;
			font-size: 42rpx;
			color: #424242;
			font-weight: 700;
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
			// background-color: #ffdc4c;
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
.button{
	margin-top:3vh;
	height: 9vh;
	.mini-btn1{
		font-size: 29rpx;
		color: #424242;
		margin-left: 7vw;
		background-color: #b0def7;
		height: 6vh;
		width: 38vw;
		line-height: 6vh;
	}
	.mini-btn2{
		font-size: 29rpx;
		color: #424242;
		margin-left: 10vw;
		background-color: #ebbda4;
		height: 6vh;
		width: 38vw;
		line-height: 6vh;
	}
}

</style>
