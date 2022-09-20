<template>
	<view class="body">
		<!-- //未解决 -->
		<view class="box" v-for="item in 2"  :key="item" @click="detailNo">
			<view class="one">
				<view class="title">孩子提出的问题</view>
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
				<view class="title">孩子提出的问题</view>
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
		<view class="tip"><text class="content">仅展示最近一周的问题</text></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
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

<style lang="scss" scoped>
.body{
	padding-bottom: 7vh;
}
 .box{
	width: 86vw;
	height: 17vh;
	background-color: #ebbda4;
	// background-color: #b0def7;
	margin-left: 7vw;
	border-radius: 10px;
	margin-top: 3vh;
	box-shadow: 0px 0px 8px #88888873;
	border: 1px solid #ebbda4;
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
			margin-left: 24vw;
		}
		.status2{
			display: inline-block;
			color: #797979;
			margin-left: 24vw;
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
</style>
