<!-- 父母端和小孩端复用的 -->
<template>
	<view class="body">
		<u-back-top :scroll-top="scrollTop" top="600"></u-back-top>
		<view class="picture" v-if="show">
			<image src="../../../static/nodata5.png" style="width: 700rpx;height: 640rpx;"></image>
		</view>
		<!-- //未解决 -->
		<view class="box1" v-for="(item,index) in nolist"  :key="index" @click="detailNo(item.id)">
			<view class="one1">
				<view class="title1">{{item.name}}提出问题</view>
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
				<text class="time1">{{item.time}}</text>
			</view>
		</view>
		<!-- 已接受待解决 -->
		<view class="box3" v-for="(item,index) in accepted"  :key="index" @click="detailNo(item.id)">
			<view class="one3">
				<view class="title3">{{item.name}}提出的问题</view>
				<view class="status4">
					已接受待解决
				</view>
			</view>
			<view class="two3">
				<view class="every3">{{item.type}}</view>
				<view class="every3">{{item.solveType}}</view>
				<view class="every3">{{item.isNowSolve}}</view>
			</view>
			<view class="three3">
				<text class="time3">{{item.time}}</text>
			</view>
		</view>
		<!-- 待确认 -->
		<view class="box2" v-for="(item,index) in confirm"  :key="index"  @click="detailYes1(item.id)">
			<view class="one2">
				<view class="title2">{{item.name}}提出的问题</view>
				<view class="status3">
					已解决待确认
				</view>
			</view>
			<view class="two2">
				<view class="every2">{{item.type}}</view>
				<view class="every2">{{item.solveType}}</view>
				<view class="every2">{{item.isNowSolve}}</view>
			</view>
			<view class="three2">
				<text class="time2">{{item.time}}</text>
			</view>
		</view>
		<!-- 已解决 -->
		<view class="box" v-for="(item,index) in yeslist"  :key="index" @click="detailYes2(item.id)">
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
				<text class="time">{{item.time}}</text>
			</view>
		</view>
		<view class="tip"><text class="content">仅展示最近一周的提问情况</text></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				nolist:[],
				yeslist:[],
				accepted:[],
				confirm:[],
				// 为空的显示
				show:false,
				where:0,
				scrollTop: 0
			}
		},
		onPageScroll(e) {
				this.scrollTop = e.scrollTop;
		},
		onLoad(e) {
			this.where=JSON.parse(e.where)
			this.nolist=[],
			this.yeslist=[],
			this.accepted=[],
			this.confirm=[],
			this.getList()
		},
		onShow() {
			this.nolist=[],
			this.yeslist=[],
			this.accepted=[],
			this.confirm=[],
			this.getList()
		},
		onPullDownRefresh() {
			this.getList()
		},
		methods: {
			//时间转换
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
			//未解决问题（根据参数跳转）
			detailNo(id){
				// 孩子端未解决问题页面
				if(this.where==1){
					uni.navigateTo({
						url:"/pages/childs/posthouse/detailNo/detailNo?id="+JSON.stringify(id)
					})
				}else{
					uni.navigateTo({
						url:"/pages/parents/parentSolveProblem/noresolve/noresolve?id="+JSON.stringify(id)
					})
				}
			},
			//已接受待解决
			//已解决待确认问题
			detailYes1(id){
				if(this.where==1){
					uni.navigateTo({
						url:'/pages/childs/posthouse/detailYes/detailYes?is=1&id='+JSON.stringify(id)
					})
				}else{
					uni.navigateTo({
						url:'/pages/childs/posthouse/detailYes/detailYes?is=2&id='+JSON.stringify(id)
					})
				}
			},
			//已解决问题
			detailYes2(id){
				uni.navigateTo({
					url:'/pages/childs/posthouse/detailYes/detailYes?is=2&id='+JSON.stringify(id)
				})
			},
			// 获取问题列表
			getList(){
				uni.request({
					url: 'https://api.yuleng.top:38088/api/disabuse-list', 
					header: {
						'token': uni.getStorageSync('token'), //自定义请求头信息
					},
					success: (res) => {
						console.log(res)
						this.nolist=[]
						this.yeslist=[]
						this.accepted=[]
						this.confirm=[]
						if(res.data.data.disabuseResultList.length==0){
							this.show=true
						}else{
							this.show=false
						}
						let list=res.data.data.disabuseResultList.reverse()
						list.forEach((item)=>{
							item.time=this.changeTime(item.time)
							if(item.isNowSolve==1){
								item.isNowSolve='立即解决'
							}else{
								item.isNowSolve='无需立即解决'
							}
							switch(item.isFinish){
								case 0:
									this.nolist.push(item);
									break;
								case 1:
									this.accepted.push(item);
									break;
								case 2:
									this.confirm.push(item);
									break;
								case 3:
									this.yeslist.push(item);
									break;
							}
						})
						// console.log(this.nolist)
						// console.log(this.accepted)
						// console.log(this.confirm)
						// console.log(this.yeslist)
						setTimeout(function(){
							uni.stopPullDownRefresh();
						},1000)
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
	.box2{
		width: 84vw;
		height: 17vh;
		background-color: #ffe8d0;
		margin-left: 7vw;
		border-radius: 6px;
		margin-top: 3vh;
		// box-shadow: 0px 0px 8px #88888873;
		border: 1px solid #ffe8d0;
		border-left: 20rpx solid #e59e36;
		.one2{
			margin-top: 1.5vh;
			.title2{
				display: inline-block;
				font-size: 42rpx;
				color: #424242;
				font-weight: 700;
				margin-left: 5vw;
			}
			.status3{
				display: inline-block;
				color: #e2a13c;
				float: right;
				margin-right: 50rpx;
			}
		}
		.two2{
			margin-top: 2vh;
			.every2{
				display: inline-block;
				// background-color: #a7d9c8;
				margin-left: 5vw;
				color: #6f6f6f;
				border-radius: 10rpx;
			}
		}
		.three2{
			margin-top: 2vh;
			.time2{
				color: #6f6f6f;
				float: right;
				margin-right: 4vw;
			}
		}
	}
	.box3{
		width: 84vw;
		height: 17vh;
		background-color: #e7e4ff;
		margin-left: 7vw;
		border-radius: 6px;
		margin-top: 3vh;
		// box-shadow: 0px 0px 8px #88888873;
		border: 1px solid #e7e4ff;
		border-left: 20rpx solid #243d61;
		.one3{
			margin-top: 1.5vh;
			.title3{
				display: inline-block;
				font-size: 42rpx;
				color: #424242;
				font-weight: 700;
				margin-left: 5vw;
			}
			.status4{
				display: inline-block;
				color: #7631ce;
				float: right;
				margin-right: 50rpx;
			}
		}
		.two3{
			margin-top: 2vh;
			.every3{
				display: inline-block;
				// background-color: #a7d9c8;
				margin-left: 5vw;
				color: #6f6f6f;
				border-radius: 10rpx;
			}
		}
		.three3{
			margin-top: 2vh;
			.time3{
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
			.status2{
				display: inline-block;
				color: #285006;
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
