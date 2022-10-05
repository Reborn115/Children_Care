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
				<text class="time">{{item.time}}</text>
			</view>
		</view>
		<!-- 已解决 -->
		<view class="box" v-for="(item,index) in yeslist"  :key="index" @click="detailYes(item.disabuseId)">
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
		
		<view class="box" v-for="(item,index) in otherlist"  :key="index">
			<view class="one">
				<view class="title">{{item.name}}学习{{item.bookName}}</view>
				<!-- <view class="status2">
					已解决
				</view> -->
			</view>
			<view class="two"> 
				<view class="every">学习了{{item.type}}类型的{{item.bookName}}</view>
				<!-- <view class="every">线下</view>
				<view class="every">无需立即解决</view> -->
			</view>
			<view class="three">
				<text class="time">{{item.time}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info: {
					//日历上的标点日期
					selected: [
					// {
					// 	date: "2022-09-13",
					// },
					]
				},
				// 列表上方显示的时间
				time:'',
				// 未解决问题列表
				nolist:[],
				// 已解决问题列表
				yeslist:[],
				// 其他问题列表
				otherlist:[],
				// 未解决问题跳转到哪儿
				where:0,
			}
		},
		onLoad(e){
			this.where=JSON.parse(e.where)
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
			// 改变日历时间
			change1(e) {
				this.nolist=[],
				this.yeslist=[],
				this.otherlist=[],
				console.log('change 返回:', e)
				this.time=e.fulldate
				this.getlist()
			},
			// 跳转携带id
			detailNo(id){
				if(this.where==1){
					uni.navigateTo({
						url:'/pages/childs/posthouse/detailNo/detailNo?id='+JSON.stringify(id)
					})
				}else{
					uni.navigateTo({
						url:'/pages/parents/parentSolveProblem/noresolve/noresolve?id='+JSON.stringify(id)
					})
				}
			},
			// 跳转携带id
			detailYes(id){
				uni.navigateTo({
					url:'/pages/childs/posthouse/detailYes/detailYes?id='+JSON.stringify(id)
				})
			},
			// 获取有列表的日期
			gettime(){
				if(this.where==1){
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
						}
					});
				}else{
					uni.request({
						url: 'https://api.yuleng.top:38088/api/track-record/parent', 
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
						}
					});
				}
				
			},
			// 获取具体某一个日期的列表
			getlist(){
				uni.request({
					url: 'https://api.yuleng.top:38088/api/track-record/list', 
					method:"POST",
					data:{
						time:Date.parse(new Date(this.time).toString())/1000,
					},
					header: {
						'token': uni.getStorageSync('token'), 
					},
					success: (res) => {
						console.log(res,'成长档案列表数据')
						// 问题列表
						let data1=res.data.data.postResultList
						data1.forEach((item)=>{
							//转换类型
							switch(item.type){
								case 1:
									item.type='心理'
									break;
								case 2:
									item.type='学习'
									break;
								case 3:
									item.type='安全'
									break;
								case 4:
									item.type='生活'
									break;
								case 5:
									item.type='兴趣'
									break;
								case 6:
									item.type='感情'
									break;
								case 7:
									item.type='健康'
									break;
								default:
									item.type='无数据'
							}
							//转换解决方式
							switch(item.solveType){
								case 1:
									item.solveType='线下'
									break;
								case 2:
									item.solveType='视频'
									break;
								case 3:
									item.solveType='语音'
									break;
								case 4:
									item.solveType='文字'
									break;
								default:
									item.solveType='无数据'
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
						// 学习列表
						this.otherlist=res.data.data.selectContentList
						this.otherlist.forEach((item)=>{
							item.time=this.changeTime(item.time)
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
		// background-color: #b0def7;
		margin-left: 7vw;
		border-radius: 10px;
		margin-top: 2vh;
		// box-shadow: 0px 0px 8px #88888873;
		border: 1px solid #f3f2f2;
		.one{
			margin-top: 2vh;
			.title{
				display: inline-block;
				font-size: 40rpx;
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
				color: #0055ff;
				float: right;
				margin-right: 50rpx;
			}
		}
		.two{
			margin-top: 2vh;
			.every{
				display: inline-block;
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
