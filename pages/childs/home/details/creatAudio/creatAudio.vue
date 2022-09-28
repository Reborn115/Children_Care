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
					@click="goRead"
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
						作者：{{author}}
					</text>
				</view>
				<view class="icon">
					<u-icon name="rewind-left-fill" size='35'></u-icon>
					<u-icon name="play-circle" size='35' @click='playAudio' v-if="!isPlay"></u-icon>
					<u-icon name="pause-circle-fill" size='35' @click='pauseAudio' v-if="isPlay"></u-icon>
					<u-icon name="rewind-right-fill" size='35'></u-icon>
					
				</view>
				<view class="speed">
					<!-- <u-number-box v-model="speed" @change="speedChange" :step="0.25" @click="speedChange"></u-number-box> -->
					<u-number-box v-model='speed' :step="0.25" @change="speedChange()" :min="0.25" :max="2">
					        <view
					            slot="minus"
					            class="minus"
					        >
					            <u-icon
					                name="minus"
					                size="12"
					            ></u-icon>
					        </view>
					        <text
					            slot="input"
					            style="width: 50px;text-align: center;"
					            class="input"
					        >{{speed}}</text>
					        <view
					            slot="plus"
					            class="plus"
					        >
					            <u-icon
					                name="plus"
					                color="#FFFFFF"
					                size="12"
					            ></u-icon>
					        </view>
					    </u-number-box>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				originalAudioId:'',
				contentInfoId:'',
				contentId:'',
				author:'',
				name:'',
				speed:1,
				audioUrl:'http://hbws.file.yuleng.top/audio/xiaowangzi/original/1.m4a',
				src:'',
				isPlay:false,
				contentAudio:'',
			};
		},
		watch:{
			speed(newVal, oldVal){
				this.contentAudio.playbackRate=newVal
			}
		},
		methods:{
			getAudio(){
				uni.request({
				    url: 'https://api.yuleng.top:38088/api/home-interface/play', //仅为示例，并非真实接口地址。
					method:"POST",
				    data: {
				        contentId:this.contentId,
						originalAudioId:this.originalAudioId
				    },
				    header: {
				        "content-type":"application/json",
						"token":uni.getStorageSync('token')
				    },
				    success: (res) => {
				        console.log(res.data);
				        this.text = 'request success';
						
						this.audioUrl=res.data.data.audioUrl
				    }
				});
			},
			goRead(){
				uni.navigateTo({
				    url:"/pages/childs/home/details/goRead/goRead"
				})
			},
			speedChange(){
				console.log(this.speed)
				this.contentAudio.playbackRate=this.speed
				console.log(this.speed,this.contentAudio.playbackRate)
			},
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
				this.contentAudio.playbackRate=this.speed
				/* console.log(this.contentAudio) */
			},
		},
		onHide(){
			this.pauseAudio()
			this.contentAudio.destroy();
		},
		onUnload(){
			this.pauseAudio()
			this.contentAudio.destroy();
		},
		onLoad(e){
			this.positionResult = JSON.parse(e.positionResult)
			console.log(e.positionResult)
			this.contentId=this.positionResult.contentId
			this.contentInfoId=this.positionResult.id
			this.name=this.positionResult.headName
			this.originalAudioId=this.positionResult.originalAudioId
		    uni.request({
		        url: 'https://api.yuleng.top:38088/api/home-interface/play', //仅为示例，并非真实接口地址。
		    	method:"POST",
		        data: {
		            contentId:this.contentId,
					originalAudioId:this.originalAudioId
		        },
		        header: {
		            "content-type":"application/json",
		    		"token":uni.getStorageSync('token')
		        },
		        success: (res) => {
		            console.log(res.data);
		            this.text = 'request success';
		    		this.name=res.data.data.storyName
					this.author=res.data.data.writer
					this.audioUrl=res.data.data.audioUrl
		        }
		    });
			this.getAudio()
			
		},
	}
</script>

<style lang="scss" scoped>
.minus {
		width: 22px;
		height: 22px;
		border-width: 1px;
		border-color: #E6E6E6;
		border-top-left-radius: 100px;
		border-top-right-radius: 100px;
		border-bottom-left-radius: 100px;
		border-bottom-right-radius: 100px;
		@include flex;
		justify-content: center;
		align-items: center;
	}

	.input {
		padding: 0 10px;
	}

	.plus {
		width: 22px;
		height: 22px;
		background-color: #FF0000;
		border-radius: 50%;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		justify-content: center;
		align-items: center;
	}
.speed{
	display: flex;
	justify-content: center;
	align-items:center;
	margin-top: 30px;
}
.icon{
	display: flex;
	justify-content:space-around;
	width: 400rpx;
	margin-left: 180rpx;
	margin-top: 50px;
}
.author{
	font-size: 15px;
	display: flex;
	justify-content: center;
	margin-top: 20rpx;
}
.name{
	font-weight: bold;
	margin-top: 50rpx;
	font-size: 15px;
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
	height: 600rpx;
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
	height: 89vh;
	padding-top: 70rpx;
}
</style>
