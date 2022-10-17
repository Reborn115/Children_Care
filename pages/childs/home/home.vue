<template>
	<view class="container">
		<uni-search-bar v-model="searchValue" 
						@cancel="search" @clear="clear" bgColor="white" cancel-text='搜索' @search="search" @confirm="search">
		</uni-search-bar>
		<!-- <u-search placeholder="日照香炉生紫烟" v-model="keyword" bgColor="white" :showAction="true" actionText="搜索" :animation="true"></u-search> -->
					<uni-card :cover="cover" >
						<!-- <image slot='cover' style="width: 100%;" :src="cover"></image> -->
						<swiper class="swiper" slot='cover' circular :autoplay="autoplay" :interval="interval"
										:duration="duration" >
										<swiper-item v-for="(item, index) in swiper" :key="index" @click="goDetail2(item)">
											<view class="swiper-item uni-bg-red" >
												<image style="width: 500rpx; height: 500rpx; background-color: #eeeeee;margin-top: 2vh;margin-left: 4vw;border-radius: 4px;vertical-align:middle;" :mode="item.mode" :src="item.coverPictureUrl" @error="imageError"></image>
											</view>
										</swiper-item>
									</swiper>
						<text class="uni-body"></text>
						
					</uni-card>
					<uni-section title="精选内容" type="line">
						<view class="box">
							<view class="tips" v-for="(item, index) in tips" :key="index" @click="goDetail1(item)">
								<view>
									<image style="width: 70px; height: 70px; background-color: #eeeeee;margin-top: 2vh;margin-left: 4vw;border-radius: 4px;vertical-align:middle;" :mode="item.mode" :src="item.coverPictureUrl" @error="imageError"></image>
								</view>
								<view>
									<text class="title">《{{item.name}}》</text>
									<text class="type">类型：{{item.type}}</text>
									<text class="idea">主题：{{item.theme}}</text>
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
				isEmpty:false,
				searchValue:'',
				tips:[],
				swiper:[],
				/* src:'https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/6acec660-4f31-11eb-a16f-5b3e54966275.jpg', */
				src:'',
				cover: '',
				avatar: '',
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
		/* onShow(){
			uni.request({
			    url: 'https://api.yuleng.top:38088/api/home-interface', //仅为示例，并非真实接口地址。
				method:"POST",
			    data: {
			        searchWord:	this.searchValue  
			    },
			    header: {
			        "content-type":"application/json",
					"token":uni.getStorageSync('token')
			    },
			    success: (res) => {
					this.swiper=res.data.data.homeInfoPictureParamList
					this.tips=res.data.data.homeInfoParamList
			        console.log(res.data);
			        this.text = 'request success';
					
			    }
			});
		}, */
		onShow(){
			uni.setStorage({
				key:"isCertification",
				data:1
			})
			uni.request({
			    url: 'https://api.yuleng.top:38088/api/is-evaluation', 
				method:"POST",
			    data: {
			    },
			    header: {
			        "content-type":"application/json",
					"token":uni.getStorageSync('token')
			    },
			    success: (res) => {
					if(res.data.data.isEvaluation){
						console.log("已评价")
						uni.request({
						    url: 'https://api.yuleng.top:38088/api/recommend-book', 
							method:"POST",
						    data: { 
						    },
						    header: {
						        "content-type":"application/json",
								"token":uni.getStorageSync('token')
						    },
						    success: (res) => {
								if(res.data.data.total>=3) {
									this.swiper=res.data.data.homeInfoPictureParamList
									this.tips=res.data.data.homeInfoParamList
									console.log(res.data);
								} else {
									uni.request({
									    url: 'https://api.yuleng.top:38088/api/home-interface', 
										method:"POST",
									    data: {
									        searchWord:	this.searchValue  
									    },
									    header: {
									        "content-type":"application/json",
											"token":uni.getStorageSync('token')
									    },
									    success: (res) => {
											this.swiper=res.data.data.homeInfoPictureParamList
											this.tips=res.data.data.homeInfoParamList
									        console.log(res.data);
									    }
									});
								}
								
						    }
						});
					} else{
						console.log("未评价")
						uni.request({
						    url: 'https://api.yuleng.top:38088/api/home-interface', 
							method:"POST",
						    data: {
						        searchWord:	this.searchValue  
						    },
						    header: {
						        "content-type":"application/json",
								"token":uni.getStorageSync('token')
						    },
						    success: (res) => {
								this.swiper=res.data.data.homeInfoPictureParamList
								this.tips=res.data.data.homeInfoParamList
						        console.log(res.data);
						    }
						});
					}
			    }
			});
			
			/* if(uni.getStorageSync('is')){
				uni.request({
				    url: 'https://api.yuleng.top:38088/api/recommend-book', //仅为示例，并非真实接口地址。
					method:"POST",
				    data: {
				    },
				    header: {
				        "content-type":"application/json",
						"token":uni.getStorageSync('token')
				    },
				    success: (res) => {
						this.swiper=res.data.data.homeInfoPictureParamList
						this.tips=res.data.data.homeInfoParamList
				        console.log(res.data);
				    }
				});
			} else {
				uni.request({
				    url: 'https://api.yuleng.top:38088/api/home-interface', 
					method:"POST",
				    data: {
				        searchWord:	this.searchValue  
				    },
				    header: {
				        "content-type":"application/json",
						"token":uni.getStorageSync('token')
				    },
				    success: (res) => {
						this.swiper=res.data.data.homeInfoPictureParamList
						this.tips=res.data.data.homeInfoParamList
				        console.log(res.data);
				    }
				});
			} */
			
		},
		methods: {
			goDetail1(item){
				console.log(item)
				uni.navigateTo({
				    url:"/pages/childs/home/details/details?positionResult="+JSON.stringify(item)
				})
			},
			goDetail2(item){
				console.log(item)
				uni.navigateTo({
				    url:"/pages/childs/home/details/details?positionResult="+JSON.stringify(item)
				})
			},
			
			search(){
				uni.request({
				    url: 'https://api.yuleng.top:38088/api/home-interface', //仅为示例，并非真实接口地址。
					method:"POST",
				    data: {
				        searchWord:	this.searchValue  
				    },
				    header: {
				        "content-type":"application/json",
						"token":uni.getStorageSync('token')
				    },
				    success: (res) => {
						this.tips=res.data.data.homeInfoParamList
						this.swiper=res.data.data.homeInfoPictureParamList
				        console.log(res.data);
				        this.text = 'request success';
						if(res.data.data.homeInfoParamList.length<1&&res.data.data.homeInfoPictureParamList<1){
							uni.navigateTo({
							    url:"/pages/childs/home/emptySearch/emptySearch"
							})
						}else{
							uni.navigateTo({
							    url:"/pages/childs/home/search/search?positionResult="+JSON.stringify(this.tips.concat(this.swiper))
							})
						}
				    }
				});
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
.container{
	background-color: #F4F4F4;
}
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
	white-space: nowrap; 
	 overflow: hidden;
	 text-overflow: ellipsis;
	width:330rpx
}
.type{
	font-size: 12px;
	margin-bottom: 1vh;
	margin-left: 13vw;
}
.title{
	white-space: nowrap; 
	 overflow: hidden;
	 text-overflow: ellipsis;

	display:inline-block;
	border-radius: 8px;
	background-color: #A4B3DA;
	/* width: 170rpx; */
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
	background-color: #FFFFFF!important;
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
	margin-left: 80rpx !important;
	border-radius: 10px;
	height: 550rpx;
	width:550rpx;
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
		width: 500rpx;
		width: 100%;
	}
	.swiper {
		height: 500rpx;
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
		width: 500rpx;
		padding: 0 100rpx;
	}
</style>
