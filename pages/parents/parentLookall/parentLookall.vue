<template>
	<view class="body">
		<view class="calendar">
			<!-- 插入模式 -->
			<uni-calendar class="uni-calendar--hook" :selected="info.selected" :showMonth="true" @change="change1" @monthSwitch="monthSwitch" />
		</view>
		<view class="toptime">
			2022-9-20
		</view>
		<!-- 未解决 -->
		<view class="box" v-for="item in 3"  :key="item" @click="detailNo">
			<view class="one">
				<view class="title">提出的问题</view>
				<view class="status">
					未解决
				</view>
			</view>
			<view class="two">
				<view class="every">心理</view>
				<view class="every">线下</view>
				<view class="every">无需立即解决</view>
			</view>
			<view class="three">
				<text class="time">2022/9/7&nbsp;&nbsp;&nbsp;19:00</text>
			</view>
		</view>
		<!-- 已解决 -->
		<view class="box" v-for="item in 2"  :key="item" @click="detailYes">
			<view class="one">
				<view class="title">提出的问题</view>
				<view class="status2">
					已解决
				</view>
			</view>
			<view class="two">
				<view class="every">心理</view>
				<view class="every">线下</view>
				<view class="every">无需立即解决</view>
			</view>
			<view class="three">
				<text class="time">2022/9/7&nbsp;&nbsp;&nbsp;19:00</text>
			</view>
		</view>
		
		<view class="box" v-for="item in 2"  :key="item">
			<view class="one">
				<view class="title">学习过的内容</view>
				<!-- <view class="status2">
					已解决
				</view> -->
			</view>
			<view class="two">
				<view class="every">学习了XX时长的XX类型的内容</view>
				<!-- <view class="every">线下</view>
				<view class="every">无需立即解决</view> -->
			</view>
			<view class="three">
				<text class="time">2022/9/7&nbsp;&nbsp;&nbsp;19:00</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info: {
					selected: [{
						date: "2022-09-15",
						
					},
					{
						date: "2022-09-13",
						
					},
					{
						date: "2022-09-18",
						
					}]
				}
			}
		},
		methods: {
			change1(e) {
				console.log('change 返回:', e)
			},
			monthSwitch(e) {
				console.log('monthSwitchs 返回:', e)
			},
			detailNo(){
				uni.navigateTo({
					url:'/pages/parents/parentSolveProblem/noresolve/noresolve'
				})
			},
			detailYes(){
				uni.navigateTo({
					url:'/pages/childs/posthouse/detailYes/detailYes'
				})
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
				margin-left: 28vw;
			}
			.status2{
				display: inline-block;
				color: #0055ff;
				margin-left: 28vw;
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
