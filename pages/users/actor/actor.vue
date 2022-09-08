<template>
	<view>
		<uni-section title="选择身份" >
			<uni-card :is-shadow="true" class="child" id="child" >
				<text class="uni-body" @click="tochilds">儿童模式</text>
			</uni-card>
			<uni-card :is-shadow="true" id='parent'>
				<text class="uni-body">父母模式</text>
			</uni-card>
			<uni-card :is-shadow="true" id='volunteer'>
				<text class="uni-body">志愿者模式</text>
			</uni-card>
		</uni-section>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			tochilds(){
				uni.switchTab({
					url:'/pages/childs/home/home'
				})
			}
		}
	}
</script>

<style scoped lang="scss">
.child{
	background: linear-gradient(blue, pink)!important;
}
#child{
	background: linear-gradient(blue, pink)!important;
}
// ::v-deep .uni-section{
	
// }
::v-deep .uni-card{
	height: 20vh;
	padding-left: 50vw;
	/* background: linear-gradient(blue, pink)!important; */
	/* background-color: aqua !important; */
}
::v-deep .uni-card .uni-card__content{
	margin-left: 55vw;
}
</style>
