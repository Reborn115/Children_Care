<template>
	<view class="container">
		
					<uni-card :cover="cover" @click="onClick">
						<!-- <image slot='cover' style="width: 100%;" :src="cover"></image> -->
						<swiper class="swiper" slot='cover' circular :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval"
										:duration="duration">
										<swiper-item>
											<view class="swiper-item uni-bg-red">A</view>
										</swiper-item>
										<swiper-item>
											<view class="swiper-item uni-bg-green">B</view>
										</swiper-item>
										<swiper-item>
											<view class="swiper-item uni-bg-blue">C</view>
										</swiper-item>
									</swiper>
						<text class="uni-body"></text>
						<view slot="actions" class="card-actions">
							<view class="card-actions-item" @click="actionsClick('喜爱')">
								<uni-icons type="heart" size="18" color="#999"></uni-icons>
								<!-- <text class="card-actions-item-text">喜爱</text> -->
							</view>
							<view class="card-actions-item" @click="actionsClick('听')">
								<uni-icons type="sound" size="18" color="#999"></uni-icons>
								<!-- <text class="card-actions-item-text">听</text> -->
							</view>
							<view class="card-actions-item" @click="actionsClick('分享')">
								<uni-icons type="redo" size="18" color="#999"></uni-icons>
								<!-- <text class="card-actions-item-text">分享</text> -->
							</view>
						</view>
					</uni-card>
					<uni-section title="精选内容" type="line">
								<uni-card :cover="cover" @click="onClick" spacing="10px">
									<!-- <image slot='cover' style="width: 100%;" :src="cover"></image> -->
								<view>
									<text>111</text>
								</view>
									
								</uni-card>
							</uni-section>

	</view>
</template>

<script>
	export default {
		data() {
			return {
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
		height: 300rpx;
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
