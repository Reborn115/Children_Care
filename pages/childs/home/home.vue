<template>
	<view class="container">
		<uni-search-bar @confirm="search" v-model="searchValue" @blur="blur" @focus="focus" @input="input"
						@cancel="cancel" @clear="clear" bgColor="white">
		</uni-search-bar>
					<uni-card :cover="cover" @click="onClick">
						<!-- <image slot='cover' style="width: 100%;" :src="cover"></image> -->
						<swiper class="swiper" slot='cover' circular :autoplay="autoplay" :interval="interval"
										:duration="duration">
										<swiper-item>
											<view class="swiper-item uni-bg-red">
												<image style="width: 500rpx; height: 500rpx; background-color: #eeeeee;margin-top: 2vh;margin-left: 4vw;border-radius: 4px;vertical-align:middle;" :mode="item.mode" :src="src" @error="imageError"></image>
											</view>
										</swiper-item>
										<swiper-item>
											<view class="swiper-item uni-bg-red">
												<image style="width: 500rpx; height: 500rpx; background-color: #eeeeee;margin-top: 2vh;margin-left: 4vw;border-radius: 4px;vertical-align:middle;" :mode="item.mode" :src="src" @error="imageError"></image>
											</view>
										</swiper-item>
										<swiper-item>
											<view class="swiper-item uni-bg-red">
												<image style="width: 500rpx; height: 500rpx; background-color: #eeeeee;margin-top: 2vh;margin-left: 4vw;border-radius: 4px;vertical-align:middle;" :mode="item.mode" :src="src" @error="imageError"></image>
											</view>
										</swiper-item>
									</swiper>
						<text class="uni-body"></text>
						
					</uni-card>
					<uni-section title="精选内容" type="line">
						<view class="box">
							<view class="tips" v-for="(item, index) in tips" :key="index" @click="goStory(item.url)">
								<view>
									<image style="width: 70px; height: 70px; background-color: #eeeeee;margin-top: 2vh;margin-left: 4vw;border-radius: 4px;vertical-align:middle;" :mode="item.mode" :src="item.picture" @error="imageError"></image>
								</view>
								<view>
									<text class="title">《{{item.title}}》</text>
									<text class="type">类型：{{item.type}}</text>
									<text class="idea">主题：{{item.idea}}</text>
								</view>
								
							</view>
						</view>
						
					</uni-section>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				tips:[
					{url:"http://www.xiaowangzi.org/",picture:"https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/6acec660-4f31-11eb-a16f-5b3e54966275.jpg",title:'小王子',type:'童话文学',idea:'坠落凡间的小王子'},
					{url:"http://www.xiaowangzi.org/",picture:"https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/6acec660-4f31-11eb-a16f-5b3e54966275.jpg",title:'啊啊啊',type:'童话文学',idea:'坠落凡间的啊啊啊'},
					{url:"http://www.xiaowangzi.org/",picture:"https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/6acec660-4f31-11eb-a16f-5b3e54966275.jpg",title:'小王子',type:'童话文学',idea:'坠落凡间的小王子'},
					{url:"http://www.xiaowangzi.org/",picture:"https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/6acec660-4f31-11eb-a16f-5b3e54966275.jpg",title:'啊啊啊',type:'童话文学',idea:'坠落凡间的啊啊啊'},
					{url:"http://www.xiaowangzi.org/",picture:"https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/6acec660-4f31-11eb-a16f-5b3e54966275.jpg",title:'小王子',type:'童话文学',idea:'坠落凡间的小王子'},
					{url:"http://www.xiaowangzi.org/",picture:"https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/6acec660-4f31-11eb-a16f-5b3e54966275.jpg",title:'啊啊啊',type:'童话文学',idea:'坠落凡间的啊啊啊'}
				],
				src: 'https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/6acec660-4f31-11eb-a16f-5b3e54966275.jpg',
				cover: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/094a9dc0-50c0-11eb-b680-7980c8a877b8.jpg',
				avatar: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png',
				extraIcon:{
					color: '#4cd964',
					size: '22',
					type: 'gear-filled'
				},
				background: ['color1', 'color2', 'color3'],
				            indicatorDots: true,
				            autoplay: true,
				            interval: 2000,
				            duration: 500
				
			};
		},
		methods: {
			search(searchValue){
				
			},
			goStory(url){
				
			},
		        changeIndicatorDots(e) {
		            this.indicatorDots = !this.indicatorDots
		        },
		        changeAutoplay(e) {
		            this.autoplay = !this.autoplay
		        },
		        intervalChange(e) {
		            this.interval = e.target.value
		        },
		        durationChange(e) {
		            this.duration = e.target.value
		        }
		    }
	}
</script>

<style lang="scss" scoped>
.swiper-item{
	image{
		margin-left: 0!important;
		margin-top: 50rpx !important;
	}
}
text{
	display: block;
}
.idea{
	margin-left: 13vw;
	font-size: 12px;
}
.type{
	font-size: 12px;
	margin-bottom: 1vh;
	margin-left: 13vw;
}
.title{
	border-radius: 8px;
	background-color: #A4B3DA;
	width: 170rpx;
	font-size: 18px;
	margin-top: 1vh;
	margin-left: 13vw;
	margin-bottom: 2vh;
	height: 50rpx;
}
.box{
	padding-top: 4vh;
	margin-left: 2vw;
	/* background-color: #F4F4F4; */
	background-color: #FFFFFF;
	width: 96vw;
	height: 100%;
	display: flex;
	justify-content: center;
	border-radius: 8px;
	flex-wrap:wrap;
	align-content:flex-start
}
.tips{
	box-shadow: 0px 0px 12px 1px rgba(0, 0, 0, 0.2);
	display: flex;
	width:85vw ;
	height: 14vh;
	background-color: white;
	border-radius: 8px;
	margin-bottom:40rpx;
}
::v-deep .uni-card{
	border-radius: 10px;
	height: 600rpx;
	box-shadow: 0px 0px 12px 1px rgba(0, 0, 0, 0.2)!important;
}
.uni-card .uni-card__cover{
	margin-top: 0!important;
}
image{
	width:25vh
}
.uni-card .uni-card__content{
	/* display: none; */
}
.card-actions-item{
	margin-right:20vw ;
}
.card-actions{
	display: flex;
	/* align-items: center;
	justify-content: center; */
	flex-direction: space-around;
	padding-left: 12.5vw;
}
.uni-margin-wrap {
		width: 690rpx;
		width: 100%;
	}
	.swiper {
		height: 600rpx;
	}
	.swiper-item {
		display: block;
		height: 300rpx;
		line-height: 300rpx;
		text-align: center;
	}
	.swiper-list {
		margin-top: 40rpx;
		margin-bottom: 0;
	}
	.uni-common-mt {
		margin-top: 60rpx;
		position: relative;
	}
	.info {
		position: absolute;
		right: 20rpx;
	}
	.uni-padding-wrap {
		width: 550rpx;
		padding: 0 100rpx;
	}
</style>
