<template>
	<view class="container">
		
						
					
		<view class="introduce">
			<view class="u-page__image-item">
				<u--image
					radius="10"
				    :src="src"
				    width="120px"
				    height="120px"
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
						<u-icon name="play-circle" size='35' @click='playAudio'></u-icon>
						<text>播放全部</text>
						<text>（共{{sumAudio}}集）</text>
						<u-button type="error" text="故事详情" size="small" shape="circle" class="bottonStory"></u-button>
					</view>
					<view class="list">
						<text class="list-item" v-for="(item, index) in chapter" :key="index" @click="goAudio(item.title)">
							{{item.order}}&nbsp;&nbsp;&nbsp;&nbsp;《{{item.book}}》--{{item.title}}
						</text>
					</view>
				</view>
				<view v-if="current === 1">
					<view class="audio">
						<u-icon name="play-circle" size='35' @click='playAudio'></u-icon>
						<text>播放全部</text>
						<text>（共{{sumAudio}}集）</text>
						<u-button type="error" text="故事详情" size="small" shape="circle" class="bottonStory"></u-button>
					</view>
					<view class="list">
						<text class="list-item" v-for="(item, index) in chapter" :key="index" @click="goAudio(item.title)">
							{{item.order}}&nbsp;&nbsp;&nbsp;&nbsp;《{{item.book}}》--{{item.title}}
						</text>
					</view>
				</view>
				<view v-if="current === 2">
					<view class="read">
						<!-- <u-icon name="play-circle" size='35' @click='playAudio'></u-icon>
						<text>播放全部</text> -->
						<text>（共{{sumRead}}章）</text>
						<u-button type="error" text="故事详情" size="small" shape="circle" class="bottonStory"></u-button>
					</view>
					<view class="list">
						<text class="list-item" v-for="(item, index) in chapter" :key="index" @click="goAudio(item.title)">
							{{item.order}}&nbsp;&nbsp;&nbsp;&nbsp;《{{item.book}}》--{{item.title}}
						</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				contentId:'',
				chapter:[
					{order:1,book:"小王子",title:"标题一"},
					{order:2,book:"小王子",title:"标题一"},
					{order:3,book:"小王子",title:"标题一"},
					{order:1,book:"小王子",title:"标题一"},
				],
				audioUrl:'https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-hello-uniapp/2cc220e0-c27a-11ea-9dfb-6da8e309e0d8.mp3',
				sumAudio:38,
				sumRead:98,
				list: ['亲属智慧语音', '原声朗读', '文字阅读'],
				// 或者如下，也可以配置keyName参数修改对象键值
				// list: [{name: '未付款'}, {name: '待评价'}, {name: '已付款'}],
				current: 1,
				/* src:'https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/6acec660-4f31-11eb-a16f-5b3e54966275.jpg', */
				src:'https://s2.loli.net/2022/09/15/cZS6YUJlA2HqvbN.jpg'
			};
		},
		onLoad(e){
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
		    		
		        }
		    });
		},
		methods:{
			goAudio(title){
				uni.navigateTo({
				    url:"/pages/childs/home/details/audioPlayer/audioPlayer"
				})
			},
			playAudio(){
				/* this.innerAudioContext.play(); */
				const innerAudioContext = uni.createInnerAudioContext();
				innerAudioContext.src = this.audioUrl;
				innerAudioContext.play();
				
			},
			change(index) {
				this.current = index
				console.log(this.current)
			}
		}
	}
</script>

<style lang="scss" scoped>
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
}
.type{
	font-size: 15px;
	margin-bottom: 1vh;
	margin-left: 50rpx;
}
.title{
	border-radius: 8px;
	/* background-color: #A4B3DA; */
	width: 170rpx;
	font-size: 20px;
	margin-top: 1vh;
	margin-left: 50rpx;
	margin-bottom: 1vh;
	height: 50rpx;
}
.text-intro{
	display: flex;
	flex-wrap: wrap;
}
.introduce{
	display: flex;
	margin-left: 30rpx;
	margin-right: 30rpx;
	padding-top: 100rpx;
	
}
.container{
	background-color: #B6C8C8;
	height: 100vh;
}
</style>
