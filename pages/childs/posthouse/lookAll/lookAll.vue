<template>
	<view class="body">
		<view class="calendar">
			<!-- 插入模式 -->
			<uni-calendar class="uni-calendar--hook" :selected="info.selected" :showMonth="true" @change="change1" />
		</view>
		<view class="toptime">
			{{time}}
		</view>
		<view class="pic" v-if="show">
			<image src="../../../../static/nomessage.png" style="width: 700rpx;height: 640rpx;"></image>
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
		<!-- 已接受待解决 -->
		<view class="box" v-for="(item,index) in accepted"  :key="index" @click="detailNo(item.disabuseId)">
			<view class="one">
				<view class="title">{{item.name}}提出问题</view>
				<view class="status1">
					已接受待解决
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
		<!-- 待确认 -->
		<view class="box" v-for="(item,index) in confirm"  :key="index"  @click="detailYes1(item.disabuseId)">
			<view class="one">
				<view class="title">{{item.name}}提出问题</view>
				<view class="status3">
					已解决待确认
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
		<view class="box" v-for="(item,index) in yeslist"  :key="index" @click="detailYes2(item.disabuseId)">
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
		
		<!-- 学习内容 -->
		<view class="box" v-for="(item,index) in otherlist"  :key="index">
			<view class="one">
				<view class="title">{{item.name}}学习{{item.bookName}}</view>
			</view>
			<view class="two"> 
				<view class="every">学习了{{item.type}}类型的{{item.bookName}}</view>
			</view>
			<view class="three">
				<text class="time">{{item.time}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import aes from "../../../../util/aes.js"
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
				// 其他列表
				otherlist:[],
				// 已接受待解决问题列表
				accepted:[],
				// 待确定问题列表
				confirm:[],
				// 未解决问题跳转到哪儿
				where:0,
				//没有数据的图片
				show:false
			}
		},
		onLoad(e){
			this.where=JSON.parse(e.where)
			this.nolist=[],
			this.yeslist=[],
			this.accepted=[],
			this.confirm=[],
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
			// 已解决问题
			detailYes2(id){
				uni.navigateTo({
					url:'/pages/childs/posthouse/detailYes/detailYes?is=2&id='+JSON.stringify(id)
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
					url: 'https://api.yuleng.top:38088/api/privacy/track-record/list', 
					method:"GET",
					data:{
						time:Date.parse(new Date(this.time).toString())/1000,
					},
					header: {
						'token': uni.getStorageSync('token'), 
					},
					success: (res) => {
						console.log(res)
						console.log(res.data.data)
						res=JSON.parse(aes.decrypt(res.data.data.result,"zzr@backEnd!@#$%"))
						this.nolist=[]
						this.yeslist=[]
						this.accepted=[]
						this.confirm=[]
						// console.log(res,'成长档案列表数据')
						if(res.postResultList.length==0&&res.selectContentList==0){
							this.show=true
						}else{
							this.show=false
						}
						// 问题列表
						let data1=res.postResultList
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
						// 学习列表
						this.otherlist=res.selectContentList
						this.otherlist.forEach((item)=>{
							item.time=this.changeTime(item.time)
						})
					}
				});
				
				// uni.request({
				// 	url: 'https://api.yuleng.top:38088/api/track-record/list', 
				// 	method:"POST",
				// 	data:{
				// 		time:Date.parse(new Date(this.time).toString())/1000,
				// 	},
				// 	header: {
				// 		'token': uni.getStorageSync('token'), 
				// 	},
				// 	success: (res) => {
				// 		this.nolist=[]
				// 		this.yeslist=[]
				// 		this.accepted=[]
				// 		this.confirm=[]
				// 		// console.log(res,'成长档案列表数据')
				// 		if(res.data.data.postResultList.length==0&&res.data.data.selectContentList==0){
				// 			this.show=true
				// 		}else{
				// 			this.show=false
				// 		}
				// 		// 问题列表
				// 		let data1=res.data.data.postResultList
				// 		data1.forEach((item)=>{
				// 			//转换类型
				// 			switch(item.type){
				// 				case 1:
				// 					item.type='心理'
				// 					break;
				// 				case 2:
				// 					item.type='学习'
				// 					break;
				// 				case 3:
				// 					item.type='安全'
				// 					break;
				// 				case 4:
				// 					item.type='生活'
				// 					break;
				// 				case 5:
				// 					item.type='兴趣'
				// 					break;
				// 				case 6:
				// 					item.type='感情'
				// 					break;
				// 				case 7:
				// 					item.type='健康'
				// 					break;
				// 				default:
				// 					item.type='无数据'
				// 			}
				// 			//转换解决方式
				// 			switch(item.solveType){
				// 				case 1:
				// 					item.solveType='线下'
				// 					break;
				// 				case 2:
				// 					item.solveType='视频'
				// 					break;
				// 				case 3:
				// 					item.solveType='语音'
				// 					break;
				// 				case 4:
				// 					item.solveType='文字'
				// 					break;
				// 				default:
				// 					item.solveType='无数据'
				// 			}
				// 			//转换是否立即解决
				// 			if(item.isNowSolve==1){
				// 				item.isNowSolve='立即解决'
				// 			}else{
				// 				item.isNowSolve='无需立即解决'
				// 			}
				// 			//转换时间
				// 			item.time=this.changeTime(item.time)
				// 			switch(item.isFinish){
				// 				case 0:
				// 					this.nolist.push(item);
				// 					break;
				// 				case 1:
				// 					this.accepted.push(item);
				// 					break;
				// 				case 2:
				// 					this.confirm.push(item);
				// 					break;
				// 				case 3:
				// 					this.yeslist.push(item);
				// 					break;
				// 			}
				// 		})
				// 		// 学习列表
				// 		this.otherlist=res.data.data.selectContentList
				// 		this.otherlist.forEach((item)=>{
				// 			item.time=this.changeTime(item.time)
				// 		})
				// 	}
				// });
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
	.pic{
		display: flex;
		justify-content: center;
		width: 100%;
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
		width: 84vw;
		height: 17vh;
		background-color: #f3f2f2;
		// background-color: #b0def7;
		margin-left: 7vw;
		border-radius: 6px;
		margin-top: 2vh;
		// box-shadow: 0px 0px 8px #88888873;
		border: 1px solid #f3f2f2;
		border-left: 20rpx solid #b1b1b1;
		.one{
			margin-top: 2vh;
			.title{
				display: inline-block;
				font-size: 39rpx;
				color: #424242;
				font-weight: 700;
				margin-left: 5vw;
			}
			.status{
				display: inline-block;
				color: #d0474c;
				float: right;
				margin-right: 50rpx;
			}
			.status1{
				display: inline-block;
				color: #d09119;
				float: right;
				margin-right: 50rpx;
			}
			.status2{
				display: inline-block;
				color: #6b6868;
				float: right;
				margin-right: 50rpx;
			}
			.status3{
				display: inline-block;
				color: #7631ce;
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
