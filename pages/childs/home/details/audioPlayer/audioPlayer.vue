<template>
	<view class="container">
		<view>
			<view class="u-page__image-item">
				<u--image
					radius="10"
				    :src="src"
				    width="550rpx"
				    height="550rpx"
					mode="widthFit"
				>
					<template v-slot:loading>
						<u-loading-icon color="red"></u-loading-icon>
					</template>
				</u--image>
			</view>
			<view class="main">
				<view class="text">
					<text class="name">
						{{name}}
					</text>
					<text class="author">
						{{author}}
					</text>
				</view>
				<view class="icon">
					<u-icon name="rewind-left-fill" size='35'></u-icon>
					<u-icon name="play-circle" size='35' @click='playAudio' v-if="!isPlay"></u-icon>
					<u-icon name="pause-circle-fill" size='35' @click='pauseAudio' v-if="isPlay"></u-icon>
					<u-icon name="rewind-right-fill" size='35'></u-icon>
					
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				audioUrl:'https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-hello-uniapp/2cc220e0-c27a-11ea-9dfb-6da8e309e0d8.mp3',
				src:'https://s2.loli.net/2022/09/15/cZS6YUJlA2HqvbN.jpg',
				isPlay:false,
				contentAudio:'',
			};
		},
		methods:{
			pauseAudio(){
				this.contentAudio.pause();
				this.isPlay=!this.isPlay;
				/* console.log(this.isPlay); */
			},
			playAudio(){
				/* this.innerAudioContext.play(); */
				const innerAudioContext = uni.createInnerAudioContext();
				innerAudioContext.src = this.audioUrl;
				innerAudioContext.play();
				this.isPlay=!this.isPlay;
				/* console.log(this.isPlay); */
				this.contentAudio=innerAudioContext;
				/* console.log(this.contentAudio) */
			},
		}
	}
</script>

<style lang="scss" scoped>
.icon{
	display: flex;
	justify-content:space-around;
	width: 400rpx;
	margin-left: 180rpx;
	margin-top: 50px;
}
.author{
	font-size: 22px;
	display: flex;
	justify-content: center;
	margin-top: 20rpx;
}
.name{
	margin-top: 50rpx;
	font-size: 40px;
	justify-content: center;
	/* align-items: center; */
	display: flex;
}
.text{
	display: flex;
	flex-direction: column;
	width: 750rpx;
}
.main{
	padding-top:50rpx ;
	margin-top: 100rpx;
	height: 950rpx;
	background-color: white;
	border-radius: 25px;
	display:flex;
	
	flex-wrap: wrap;
	flex-direction: column;
}
.u-page__image-item{
	border-radius: 10px;
	padding: 10rpx;
	background-color: white;
	display: flex;
	align-items: center;
	justify-content: center;
	width:600rpx;
	height:600rpx;
	margin-left: 70rpx;
	
}
.container{
	background-color: #B6C8C8;
	height: 100vh;
	padding-top: 70rpx;
}
</style>
