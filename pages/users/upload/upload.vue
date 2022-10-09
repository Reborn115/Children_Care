<template>
	<view class="container">
		<view class="head">
			<u--image
				radius="50"
			    :src="src"
			    width="150px"
			    height="200px"
				mode="widthFit"
			>
				<template v-slot:loading>
					<u-loading-icon color="red"></u-loading-icon>
				</template>
			</u--image>
			<text>
				请读一下下面这句话
			</text>
		</view>
		<view class="textbox">
			世间很多美好的事物，并非是触手可及的，经过了时间的酝酿和打磨，等待的结果才会显得更加珍贵。
		</view>
		<view class="bottonbox">
			<view class="box" v-if="!isVoice" @click="startRecord">
				<u-icon name="mic" color="#377F7E" size="28" ></u-icon>
				<text>开始录音</text>
			</view>
			<view class="box" v-if="isVoice" @click="endRecord">
				<u-icon name="mic-off"  size="28" ></u-icon>
				<text>结束录音</text>
			</view>
			<view class="box" @click="playVoice">
				<u-icon name="server-fill" color="#377F7E" size="28" ></u-icon>
				<text>试听录音</text>
			</view>
			<!-- <view class="box" @click="upload">
				<u-icon name="share-square" color="#377F7E" size="28" ></u-icon>
				<text>上传录音</text>
			</view> -->
			
		</view>
		<view class="submit">
			<u-button type="primary" text="上传录音" @click="upload" shape="circle" size="large"></u-button>
		</view>
		<view class='linkbox'  v-if="!isCertification">
			<text @click="goHome">
				稍后进行录音
			</text>
			<u-icon name="arrow-right-double" color=#3c9cff;></u-icon>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				timer1:'',
				timer2:'',
				show:true,
				isCertification:0,
				myurl:'',
				innerAudio:'',
				voicePath: '',
				recorder:'',
				isVoice:false,
				home:false,
				src:"https://s2.loli.net/2022/10/08/KvjNfHig1mq9B3n.jpg"
			};
		},
		onHide(){
			
				this.pauseAudio()
				this.innerAudio.destroy();
			
			
			
		},
		onUnload(){
			
				this.pauseAudio()
				this.innerAudio.destroy();
			
			
		},
		onLoad(e) {
			console.log(e)
			this.show=e.show
			
			
			this.isCertification=uni.getStorageSync('isCertification')
			let recorderManager = uni.getRecorderManager();
			let innerAudioContext = uni.createInnerAudioContext();
			this.recorder=recorderManager;
			this.innerAudio=innerAudioContext;
			this.recorder.start.format="wav";
			this.recorder.start.duration=10000;
				
			},
		watch:{
			voicePath(newVal, oldVal){
				this.isVoice=!this.isVoice
				uni.showToast({
					title: "录音结束",
					icon:'success'
				});
			},
			home(newVal, oldVal){
				this.goHome()
			}
		},
		onUnload() {
			if(this.timer1) {  
				clearTimeout(this.timer1);  
				this.timer1 = null;  
			}  
			if(this.timer2) {
				clearTimeout(this.timer2);  
				this.timer2 = null;  
			}  
		},
		methods:{
			pauseAudio(){
				this.innerAudio.pause();
				
				/* console.log(this.isPlay); */
			},
			goHome(){
				console.log('555')
				uni.navigateTo({
				  url: "/pages/parents/homepage/homepage",
				});
			},
			initVoice(){
				uni.request({
				    url: 'https://api.yuleng.top:38088/api/audio/init', //仅为示例，并非真实接口地址。
					method:"POST",
				    data: {
				        audioUrl:this.myurl
				    },
				    header: {
				        "content-type":"application/json",
						"token":uni.getStorageSync('token')
				    },
				    success: (res) => {
						/* this.mainText=this.phaseWrapList(res.data.data.mainText); */
						
				        console.log(res.data);
				       /* this.getAudio(); */
						
				    }
				});
			},
			upload(){
				if(this.isVoice==true) {
					uni.showToast({
						title: "请先结束录音",
						icon:'error'
					});
				} else {
					uni.uploadFile({
							url: 'https://api.yuleng.top:38088/api/upload',// 仅为示例，非真实的接口地址
							/* url: 'http://192.168.115.133:38088/api/upload', */
							filePath: this.voicePath,
							name: 'file',
							formData: {
								fileType:2
							},
							header: {
							    "content-type":"application/json",
								"token":uni.getStorageSync('token')
							},
							success: (res) => {
							
								res=JSON.parse(res.data)
								console.log(res);
								
								console.log(res.data.files[0].fileUrl)
								this.myurl=res.data.files[0].fileUrl
								this.initVoice();
								/* setTimeout(() => {
									resolve(res.data.data)
								}, 1000) */
								uni.showToast({
									title: '录音上传成功',
									icon:'success'
								});
								this.timer2 = setTimeout(() => {
									this.home=!this.home
								}, 3000);
								
								
								
								
							}
						});
				}
					
				
				
				
			},
			startRecord() {
				this.isVoice=!this.isVoice
						console.log('开始录音');
						let format={
							format:"wav",
							duration:10000
						}
						this.recorder.start(format);
						let self = this;
						uni.showToast({
							title: "开始录音",
							icon:'success'
						});
						this.recorder.onStop(function (res) {
							console.log('recorder stop' + JSON.stringify(res));
							self.voicePath = res.tempFilePath;
							uni.showToast({
								title: "录音结束",
								icon:'success'
							});
							
						});
						/* this.voicePath=this.recorder.onStop(()=>{
							this.isVoice=0;
						}) */
						/* this.timer1 = setTimeout(() => {
						    this.isVoice=!this.isVoice
						}, 10000);
						clearTimeout(this.timer1) */
					},
					endRecord() {
						this.isVoice=!this.isVoice
						console.log('录音结束');
						this.recorder.stop();
					},
					playVoice() {
						console.log('播放录音');
			
						if (this.voicePath) {
							this.innerAudio.src = this.voicePath;
							this.innerAudio.play();
						}
					}
		},
	}
</script>

<style lang="scss" scoped>
.submit{
	margin-top: 30rpx;
}
.linkbox{
	margin-top: 200rpx;
	display: flex;
	color: #3c9cff;
}
.box{
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
.bottonbox{
	width: 600rpx;
	height: 200rpx;
	display: flex;
	justify-content: space-around;
}
.container{
	display: flex;
	justify-content: center;
	flex-direction: column;
	align-items: center;
	height:100vh;
}
.textbox{
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: #CADEDD;
	width: 600rpx;
	height: 200rpx;
	border-radius: 20px;
	padding: 20rpx;
}
.head{
	display:flex;
	justify-content: center;
	align-items: center;
	margin-bottom: 100rpx;
}
</style>
