<template>
	<view class="container">
		<uni-search-bar v-model="searchValue" @cancel="search" @clear="clear" bgColor="white" cancel-text='搜索'>
		</uni-search-bar>
		<view class="imgBox">
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
			<text>
				没有搜索到相关内容
			</text>
		</view>
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				searchValue:'',
				src:'https://s2.loli.net/2022/09/19/WZxymYqzAt2BGbF.png'
			};
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
.imgBox{
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
}
</style>
