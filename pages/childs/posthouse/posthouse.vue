<template>
	<view>
		<view class="goproblem" @click="goproblem">
			解惑
		</view>
		<view class="lookAll" @click="lookAll">
			成长档案
		</view>
		<view class="addQuestion" @click="addQuestion">
			添加问题
		</view>
		<view class="phone" @click="phone">
			紧急联系人
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		methods: {
			//进入增加问题界面
			addQuestion(){
				uni.navigateTo({
					url:'/pages/childs/posthouse/addQuestion/addQuestion'
				})
			},
			//进入成长档案界面
			lookAll(){
				uni.navigateTo({
					url:'/pages/childs/posthouse/lookAll/lookAll?where=1'
				})
			},
			//去解惑儿童端页面
			goproblem(){
				uni.navigateTo({
					url:'/pages/parents/parentSolveProblem/parentSolveProblem?where=1'
				})
			},
			// 紧急联系人界面
			phone(){
				uni.navigateTo({
					url:'/pages/childs/posthouse/phone/phone'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
view{
	height: 200rpx;
	margin-top: 50rpx;
	background-color: #6ffff3;
}

</style>
