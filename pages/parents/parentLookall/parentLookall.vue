<template>
	<view class="body">
		<view class="calendar">
			<!-- 插入模式 -->
			<uni-calendar class="uni-calendar--hook" :selected="info.selected" :showMonth="true" @change="change1" />
		</view>
		<view class="toptime">
			{{time}}
		</view>
		<!-- 未解决 -->
		<view class="box" v-for="(item,index) in nolist"  :key="index" @click="detailNo(item.disabuseId)">
			<view class="one">
				<view class="title">提出的问题</view>
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
				<text class="time">{{item.time}}</text>
			</view>
		</view>
		<!-- 已解决 -->
		<view class="box" v-for="(item,index) in yeslist"  :key="index" @click="detailYes(item.disabuseId)">
			<view class="one">
				<view class="title">提出的问题</view>
				<view class="status">
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
		
		<view class="box" v-for="(item,index) in otherlist"  :key="index">
			<view class="one">
				<view class="title">学习{{item.bookName}}</view>
				<!-- <view class="status2">
					已解决
				</view> -->
			</view>
			<view class="two">
				<view class="every">学习了{{item.type}}类型的{{item.bookName}}</view>
				<!-- <view class="every">线下</view>
				<view class="every">无需立即解决</view> -->
			</view>
			<!-- <view class="three">
				<text class="time">2022/9/7&nbsp;&nbsp;&nbsp;19:00</text>
			</view> -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info: {
					selected: [
					// {
					// 	date: "2022-09-13",
					// },
					]
				},
				time:'',
				nolist:[],
				yeslist:[],
				otherlist:[],
			}
		},
		onLoad(){
			this.time=this.changeTime3(new Date())
			this.gettime()
			this.getlist()
		},
		methods: {
			// 列表时间转换
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
			// 日历标点时间转换 
			changeTime2(e){
				let old = new Date(e*1000);
				//获取old具体时间
				let Y = old.getFullYear();
				let M = old.getMonth()+1;
				let D = old.getDate();
				if(M<10){
					M = '0'+M;
				}
				if(D<10){
					D = '0'+D;
				}
				return Y+'-'+M+'-'+D 
			},
			// 刚进入头部时间转换
			changeTime3(e){
				let old = new Date(e);
				//获取old具体时间
				let Y = old.getFullYear();
				let M = old.getMonth()+1;
				let D = old.getDate();
				if(M<10){
					M = '0'+M;
				}
				if(D<10){
					D = '0'+D;
				}
				return Y+'-'+M+'-'+D 
			},
			//改变日期
			change1(e) {
				this.nolist=[],
				this.yeslist=[],
				this.otherlist=[],
				console.log('change 返回:', e)
				this.time=e.fulldate
				this.getlist()
			},
			detailNo(id){
				uni.navigateTo({
					url:'/pages/parents/parentSolveProblem/noresolve/noresolve?id='+JSON.stringify(id)
				})
			},
			detailYes(id){
				uni.navigateTo({
					url:'/pages/childs/posthouse/detailYes/detailYes?id='+JSON.stringify(id)
				})
			},
			// 获取日期并转换
			gettime(){
				uni.request({
					url: 'https://api.yuleng.top:38088/api/track-record', 
					method:"POST",
					header: {
						'token': uni.getStorageSync('token'), //自定义请求头信息
					},
					success: (res) => {
						let hh=res.data.data.scheduleTime
						hh.forEach((item)=>{
							item=this.changeTime2(item)
							this.info.selected.push({date: item})
						})
						// console.log(this.info.selected)
					}
				});
			},
			//获取列表信息
			getlist(){
				uni.request({
					url: 'https://api.yuleng.top:38088/api/track-record/list', 
					method:"POST",
					data:{
						time:Date.parse(new Date(this.time).toString())/1000,
					},
					header: {
						'token': uni.getStorageSync('token'), //自定义请求头信息
					},
					success: (res) => {
						console.log(res,'成长档案列表数据')
						let data1=res.data.data.postResultList
						this.otherlist=res.data.data.selectContentList
						data1.forEach((item)=>{
							//转换类型
							if(item.type==1){
								item.type='心理'
							}else if(item.type==2){
								item.type='学习'
							}else if(item.type==3){
								item.type='安全'
							}else if(item.type==4){
								item.type='生活'
							}else if(item.type==5){
								item.type='兴趣'
							}else if(item.type==6){
								item.type='感情'
							}else{
								item.type='健康'
							}
							//转换解决方式
							if(item.solveType==1){
								item.solveType='线下'
							}else if(item.solveType==2){
								item.solveType='视频'
							}else if(item.solveType==3){
								item.solveType='语音'
							}else{
								item.solveType='文字'
							}
							//转换是否立即解决
							if(item.isNowSolve==1){
								item.isNowSolve='立即解决'
							}else{
								item.isNowSolve='无需立即解决'
							}
							//转换时间
							item.time=this.changeTime(item.time)
							if(item.isFinish==0){
								this.nolist.push(item)
							}else{
								this.yeslist.push(item)
							}
						})
						
					}
				});
			}
		}
	}
</script>

<style scoped lang="scss">
	.body{
		padding-bottom: 5vh;
		// background-color: #feedbc;
	}
	.toptime{
		background-color: #6f6f6f17;
		font-size: 34rpx;
		height: 5vh;
		line-height: 5vh;
		border-radius: 15rpx;
		color: #4c4c4cc2;
		margin-left: 7vw;
		margin-right: 6vw;
		padding-left: 4vw;
		// box-shadow: 0px 0px 8px #88888873;
	}
	.calendar{
		width: 100vw;
		height: 58vh;
		display: flex;
		justify-content: center;
		align-items: center;
		// background-color: #ffaa7f;
	}
	/deep/.uni-calendar__content{
		width: 88vw;
		height: 53vh;
		border-radius: 26rpx;
		box-shadow: 0px 0px 8px #88888873;
	}
	/deep/.uni-calendar__weeks-item{
		width: 11vw;

	}
	/deep/.uni-calendar__header{
		border-top-left-radius: 26rpx;
		border-top-right-radius: 26rpx;
	}
	.box{
		width: 86vw;
		height: 17vh;
		background-color: #f3f2f2;
		// background-color: #feedbc;
		margin-left: 7vw;
		border-radius: 10px;
		margin-top: 2vh;
		// box-shadow: 0px 0px 8px #88888873;
		border: 1px solid #f3f2f2;
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
				color: #0055ff;
				float: right;
				margin-right: 50rpx;
			}
		}
		.two{
			margin-top: 2vh;
			.every{
				display: inline-block;
				// background-color: #ffdc4c;
				// background-color: #e0e0e0;
				margin-left: 5vw;
				color: #6d6d6d;
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
</style>
