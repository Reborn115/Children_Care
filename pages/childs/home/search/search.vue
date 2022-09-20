<template>
	<view class="container">
		<uni-search-bar v-model="searchValue" @cancel="search" @clear="clear" bgColor="white" cancel-text='搜索'>
		</uni-search-bar>
		<view class="box">
			<view class="tips" v-for="(item, index) in tips" :key="index" @click="goDetail(item)">
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
	</view>
</template>

<script>
	export default {
		data() {
			return {
				searchValue:'',
				tips:[],
				positionResult:''
			};
		},
		onLoad(e){
			this.positionResult = JSON.parse(e.positionResult)
			this.tips=this.positionResult
			console.log(e.positionResult)
			console.log(this.positionResult)
			
		},
		methods:{
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
				        console.log(res.data);
				        this.text = 'request success';
						if(res.data.data.homeInfoParamList.length<1){
							uni.navigateTo({
							    url:"/pages/childs/home/emptySearch/emptySearch"
							})
						}else{
							uni.navigateTo({
							    url:"/pages/childs/home/search/search?positionResult="+JSON.stringify(this.tips)
							})
						}
				    }
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
.container{
	background-color: #F4F4F4;
	height: 100vh;
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
</style>
