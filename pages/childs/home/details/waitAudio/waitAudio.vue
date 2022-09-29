<template>
	<view class="container">
		<u--image
			radius="50"
		    :src="src"
		    width="300px"
		    height="300px"
			mode="widthFit"
		>
			<template v-slot:loading>
				<u-loading-icon color="red"></u-loading-icon>
			</template>
		</u--image>
		<view class="small">
			<text>
				第一次收听智能语音需要等待较长时间
			</text>
		</view>
		<view class="big">
			<text>
				当前进度：
			</text>
		</view>
		<view class="bar">
			<u-line-progress :percentage="process">
			</u-line-progress>
		</view>
		<view >
			<u-modal :show="show" :content='content'></u-modal>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				content:'功能暂不可用',
				show:false,
				process:'0',
				src:'https://s2.loli.net/2022/09/25/fkP8XNFCBIaAqlU.png',
				positionResult:'',
				contentInfoId:'',
				serveSrc:'',
				smartAudio:'',
				audioHead:'',
				processHead:'',
				userId:'',
				timer:'',
				isFirst:true
			};
		},
		onLoad(e){
			this.positionResult = JSON.parse(e.positionResult)
			console.log(e.positionResult)
			this.contentInfoId=this.positionResult.id
			this.userId=uni.getStorageSync('userId')
			this.getServe()
			
			
			
		},
		methods:{
			goHome(){
				uni.switchTab({
				  url: "/pages/childs/home/home",
				});
			},
			getProgress(){
				uni.request({
				    url: this.processHead, //仅为示例，并非真实接口地址。
					method:"GET",
				    data: {
				       
				    },
				    header: {
				        "content-type":"application/json",
						"token":uni.getStorageSync('token')
				    },
				    success: (res) => {
						if(res.data.code=='00000'){
							console.log(res.data);
							this.process=res.data.progress
							console.log(this.process)
							if(this.process=='100'){
								clearInterval(this.timer)
								/* let arr=[{smartAudio:this.smartAudio}]
								console.log(this.positionResult) */
								/* this.positionResult=JSON.stringify(this.positionResult) */
								console.log(this.positionResult)
								this.positionResult.smartAudio=this.smartAudio
								this.timer = setTimeout(() => {
								    
								}, 1000);
								clearTimeout(this.timer)
								this.positionResult.isFirst=this.isFirst
								uni.navigateTo({
								    url:"/pages/childs/home/details/audioPlayer/audioPlayer?positionResult="+JSON.stringify(this.positionResult)
								})
							}
						} else {
							this.show=true
							/* uni.showToast({
								title: '功能暂不可用',
								icon:'error'
							});
							this.timer = setTimeout(() => {
							    
							}, 1000);
							clearTimeout(this.timer)
							uni.switchTab({
							  url: "/pages/childs/home/home",
							}); */
						}
				        
				    },
					fail:(res)=>{
						console.log("请求失败")
					}
				});
			},
			getAudio(){
				
				uni.request({
					timeout:3000000,
				    url: this.audioHead, //仅为示例，并非真实接口地址。
					method:"POST",
				    data: {
				        contentInfoId:this.contentInfoId
				    },
				    header: {
				        "content-type":"application/json",
						"token":uni.getStorageSync('token')
				    },
				    success: (res) => {
						if(res.data.code=='00000'){
							console.log(res.data);
							this.text = 'request success';
							this.smartAudio=res.data.fileUrl;
							console.log(this.smartAudio)
						} else {
							uni.showToast({
								title: '功能暂不可用',
								icon:'error'
							});
							/* this.timer = setTimeout(() => {
							    
							}, 1000);
							clearTimeout(this.timer) */
							this.show=true
							this.goHome()
						}
				        
						
				    },
					fail:(res)=>{
						console.log("请求失败")
					}
				});
			},
			getServe(){
				uni.request({
				    url: 'https://api.yuleng.top:38088/api/audio/server', //仅为示例，并非真实接口地址。
					method:"GET",
				    data: {
				       
				    },
				    header: {
				        "content-type":"application/json",
						"token":uni.getStorageSync('token')
				    },
				    success: (res) => {
				        console.log(res.data);
				        this.serveSrc=res.data.message
						this.audioHead=this.serveSrc+'/api/audio/sys'
						this.processHead=this.serveSrc+'/api/progress'
						console.log(this.audioHead)
						this.getAudio()
						this.timer=setInterval(() => {
							
						    this.getProgress()
						}, 2000);
				    }
				});
			},
		}
	}
</script>

<style lang="scss">
.big{
	font-size: 20px;
	margin-bottom: 50rpx;
	font-weight: bold;
}
.small{
	margin-bottom: 80rpx;
}
::v-deep .u-line-progress__line{
	width: 500rpx;
	height: 40rpx !important;
}
::v-deep .u-line-progress__text{
	width: 500rpx;
	height: 40rpx !important;
	font-size: 17px !important;
}
::v-deep .u-line-progress{
	.u-line-progress__background{
		width: 500rpx;
		height: 40rpx !important;
	}
	
}
.container{
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
}
</style>
