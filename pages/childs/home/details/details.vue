<template>
	<view class="container">
		<view class="introduce">
			<view class="u-page__image-item">
				<u--image
					radius="10"
				    :src="src"
				    width="220rpx"
				    height="220rpx"
					mode="widthFit"
				>
					<template v-slot:loading>
						<u-loading-icon color="red"></u-loading-icon>
					</template>
				</u--image>
			</view>
			<view class="text-intro">
				<text class="title">《{{title}}》</text>
				<text class="type">类型：{{type}}</text>
				<text class="idea">主题：{{idea}}</text>
				<u-button type="error" text="故事详情" size="small" shape="circle" class="bottonStory" @click='goSummary'></u-button>
				<u-button type="error" text="故事评分" size="small" shape="circle" class="bottonStory" @click='openEvaluate'></u-button>
			</view>
		</view>
		<view class="main">
			<view class="slid">
				<u-subsection
					:list="list"
					mode="button"
					:current="current"
					activeColor="#f9ae3d"
					@change="change"
				>
				</u-subsection>
			</view>
			<view class="content">
				<view v-if="current === 0">
					<view class="audio">
						<!-- <u-icon name="play-circle" size='35' @click='playAudio'></u-icon> -->
						<!-- <u-icon name="play-circle" size='35' @click='playAudio' v-if="!isPlay"></u-icon>
						<u-icon name="pause-circle-fill" size='35' @click='pauseAudio' v-if="isPlay"></u-icon>
						<text>播放全部</text> -->
						<text>（共{{total}}集）</text>
						<!-- <u-button type="error" text="故事详情" size="small" shape="circle" class="bottonStory" @click='goSummary'></u-button> -->
					</view>
					<view class="list">
						<view v-for="(item, index) in chapter" :key="index" @click="goAudio1(item)">
							<text class="list-item" >
								{{item.order}}&nbsp;&nbsp;&nbsp;&nbsp;《{{positionResult.name}}》--{{item.headName}}
								<!-- <HR align=center width=300 color=#987cb9 SIZE=1> -->
							</text>
							<u-divider ></u-divider>
						</view>
						
						
					</view>
				</view>
				<view v-if="current === 1">
					<view class="audio">
						<!-- <u-icon name="play-circle" size='35' @click='playAudio'></u-icon>
						<text>播放全部</text> -->
						<text>（共{{total}}集）</text>
						<!-- <u-button type="error" text="故事详情" size="small" shape="circle" class="bottonStory" @click='goSummary'></u-button> -->
					</view>
					<view class="list">
						<!-- <text class="list-item" v-for="(item, index) in chapter" :key="index" @click="goAudio2(item)">
							{{item.order}}&nbsp;&nbsp;&nbsp;&nbsp;《{{positionResult[0].name}}》--{{item.headName}}
						</text> -->
						<view v-for="(item, index) in chapter" :key="index" @click="goAudio2(item)">
							<text class="list-item" >
								{{item.order}}&nbsp;&nbsp;&nbsp;&nbsp;《{{positionResult.name}}》--{{item.headName}}
								<!-- <HR align=center width=300 color=#987cb9 SIZE=1> -->
							</text>
							<u-divider ></u-divider>
						</view>
					</view>
				</view>
				<view v-if="current === 2">
					<view class="read">
						<!-- <u-icon name="play-circle" size='35' @click='playAudio'></u-icon>
						<text>播放全部</text> -->
						<text>（共{{total}}章）</text>
						<!-- <u-button type="error" text="故事详情" size="small" shape="circle" class="bottonStory" @click='goSummary'></u-button> -->
					</view>
					<view class="list">
						<!-- <text class="list-item" v-for="(item, index) in chapter" :key="index" @click="goRead(item)">
							{{item.order}}&nbsp;&nbsp;&nbsp;&nbsp;《{{positionResult[0].name}}》--{{item.headName}}
						</text> -->
						<view v-for="(item, index) in chapter" :key="index" @click="goRead(item)">
							<text class="list-item" >
								{{item.order}}&nbsp;&nbsp;&nbsp;&nbsp;《{{positionResult.name}}》--{{item.headName}}
								<!-- <HR align=center width=300 color=#987cb9 SIZE=1> -->
							</text>
							<u-divider ></u-divider>
						</view>
					</view>
				</view>
			</view>
		</view>
		<u-popup :show="show" :round="30" mode="bottom" :overlay="true" :closeable="true" :closeOnClickOverlay="true" @close="close">
		<view class="evaluate">
			<text class="evaText">
				给这本书打个分吧
			</text>
			<view class="evaIcon">
				<u-rate count="5" v-model="evaluate" touchable="true" size="30"></u-rate>
			</view>
            
			<u-button type="error" text="提交评分" size="small" shape="circle" class="bottonStory" @click='goEvaluate' ></u-button>
		</view>
	</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				evaluate:'',
				show:false,
				total:'',
				contentAudio:'',
				isPlay:false,
				title:'',
				type:'',
				idea:'',
				positionResult:'',
				contentId:'',
				chapter:[],
				audioUrl:'',
				sumAudio:38,
				sumRead:98,
				list: ['亲属智慧语音', '原声朗读', '文字阅读'],
				// 或者如下，也可以配置keyName参数修改对象键值
				// list: [{name: '未付款'}, {name: '待评价'}, {name: '已付款'}],
				current: 1,
				/* src:'https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/6acec660-4f31-11eb-a16f-5b3e54966275.jpg', */
				src:''
			};
		},
		
		onLoad(e){
			if(e.positionResult){
				this.positionResult = JSON.parse(e.positionResult)
				console.log("进入details",e.positionResult)
				this.contentId=this.positionResult.contentId
				this.title=this.positionResult.name
				this.type=this.positionResult.type
				this.idea=this.positionResult.theme
				this.src=this.positionResult.coverPictureUrl
			}
			
		    uni.request({
		        url: 'https://api.yuleng.top:38088/api/home-interface/list', //仅为示例，并非真实接口地址。
		    	method:"POST",
		        data: {
		            contentId:this.contentId
		        },
		        header: {
		            "content-type":"application/json",
		    		"token":uni.getStorageSync('token')
		        },
		        success: (res) => {
		            console.log(res.data);
		            this.text = 'request success';
		    		this.chapter=res.data.data.homeListContentParamList
					this.total=res.data.data.total
		        }
		    });
			let innerAudioContext = uni.createInnerAudioContext();
			innerAudioContext.src = this.audioUrl;
			this.contentAudio=innerAudioContext;
		},
		onHide(){
			this.contentAudio.destroy();
		},
		methods:{
			goEvaluate(){
				uni.request({
				    url: 'https://api.yuleng.top:38088/api/set-score', 
					method:"POST",
				    data: {
				        contentId:this.contentId,
						score:this.evaluate
				    },
				    header: {
				        "content-type":"application/json",
						"token":uni.getStorageSync('token')
				    },
				    success: (res) => {
						uni.showToast({
							title: "评价成功",
							icon:'success'
						});
						this.show=false
				    }
				});
			},
			close(){
				this.show=false
			},
			openEvaluate(){
				this.show=true
			},
			goRead(item){
				item.src=this.src
				item.total=this.total
				uni.navigateTo({
				    url:"/pages/childs/home/details/goRead/goRead?positionResult="+JSON.stringify(item)
				})
			},
			goSummary(){
				let data={
					contentId:this.contentId,
					src:this.src
				};
				uni.navigateTo({
				    url:"/pages/childs/home/details/summary/summary?positionResult="+JSON.stringify(data)
				})
			},
			goAudio1(item){
				
				
				uni.request({
				    url: 'https://api.yuleng.top:38088/api/audio/ai-cache', //仅为示例，并非真实接口地址。
					method:"GET",
				    data: {
				        contentInfoId:item.id
				    },
				    header: {
				        "content-type":"application/json",
						"token":uni.getStorageSync('token')
				    },
				    success: (res) => {
				        console.log(res.data);
				        if(res.data.code=='A0400'){
							uni.navigateTo({
							    url:"/pages/childs/home/details/waitAudio/waitAudio?positionResult="+JSON.stringify(item)
							})
							
						} else {
							item.isSmart=true
							item.smartAudio=res.data.message
							console.log(item)
							item.total=this.total
							item.src=this.src
							uni.navigateTo({
							    url:"/pages/childs/home/details/audioPlayer/audioPlayer?positionResult="+JSON.stringify(item)
							})
						}
				    }
				});
				/* uni.navigateTo({
				    url:"/pages/childs/home/details/audioPlayer/audioPlayer?positionResult="+JSON.stringify(item)
				}) */
			},
			goAudio2(item){
				item.total=this.total
				item.src=this.src
				uni.navigateTo({
					
				    url:"/pages/childs/home/details/creatAudio/creatAudio?positionResult="+JSON.stringify(item)
				})
			},
			pauseAudio(){
				this.contentAudio.pause();
				this.isPlay=!this.isPlay;
				/* console.log(this.isPlay); */
			},
			playAudio(){
				/* this.innerAudioContext.play(); */
				
				this.contentAudio.play();
				this.isPlay=!this.isPlay;
				/* console.log(this.isPlay); */
				
			},
			change(index) {
				this.current = index
				console.log(this.current)
			}
		}
	}
</script>

<style lang="scss" scoped>
.evaIcon{
	margin-bottom: 40rpx;
}
.evaText{
	font-size: 25px;
	margin-bottom: 40rpx;
	font-weight: bold;
}
.evaluate{
	display: flex;
	align-items: center;
	justify-content: center;
	height: 500rpx;
	flex-direction: column;
}
.list-item{
	white-space: nowrap; 
	 overflow: hidden;
	 text-overflow: ellipsis;
	width:600rpx
}
.read{
	display: flex;
	align-items: center;
	width: 800rpx;
	margin-left: 28rpx;
	margin-top: 50rpx;
	::v-deep .u-botton{
		margin-left: 20rpx;
	}
}
.list{
	margin-left:49rpx ;
	margin-top: 40rpx;
}
::v-deep .u-button{
	width: 200rpx !important;
	
}
.audio{
	display: flex;
	align-items: center;
	width: 800rpx;
	margin-left: 28rpx;
	margin-top: 50rpx;
}
.content {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		/* justify-content: center;
		align-items: center; */
		height: 150px;
		/* text-align: center; */
	}

	.content-text {
		font-size: 14px;
		color: #666;
	}
/* ::v-deep .u-subsection__item--no-border-right{
	border-radius: 30px !important;
}
::v-deep .u-subsection__item{
	border-radius: 30px !important;
}
.u-subsection--button{
		border-radius: 30px !important;
	} */
::v-deep .u-subsection{
	margin-top: 20rpx;
	width: 70% !important;
	
	
}
.slid{
	display: flex;
	align-items: center;
	justify-content: center;
}
.main{
	padding-top:50rpx ;
	margin-top: 100rpx;
	height: 950rpx;
	background-color: white;
	border-radius: 25px;
}
.u-page__image-item{
	height:220rpx;
	width:220rpx;
	border-radius: 10px;
	padding: 10rpx;
	background-color: white;
}
text{
	display: block;
}
.idea{
	margin-left: 50rpx;
	font-size: 15px;
	width: 400rpx;
	margin-bottom: 1vh;
}
.type{
	font-size: 15px;
	margin-bottom: 1vh;
	margin-left: 50rpx;
	width: 400rpx;
}
.title{
	border-radius: 8px;
	/* background-color: #A4B3DA; */
	width: 400rpx;
	font-size: 20px;
	margin-top: 1vh;
	margin-left: 50rpx;
	margin-bottom: 1vh;
	height: 50rpx;
}
.text-intro{
	color: aliceblue;
	display: flex;
	flex-wrap: wrap;
	/* flex-direction: column; */
}
.introduce{
	height:300rpx;
	display: flex;
	margin-left: 30rpx;
	margin-right: 30rpx;
	padding-top: 100rpx;
	align-items: center;
}
.container{
	background-color: #B6C8C8;
	height: 100vh;
}
</style>
