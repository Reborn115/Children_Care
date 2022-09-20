<template>
	<view>
		<view class="select">
			<view class="select1">
				<uni-data-select
							v-model="number"
							:localdata="range"
							:clear="false"
				></uni-data-select>
			</view>
			<button class="btn" type="default">添加新的建议</button>
		</view>
		<view class="two">
			<view class="advise">
				<view class="tit">
					实拍图:
				</view>
				<view class="upPic">
					<uni-file-picker limit="4" title="请提交2-4张互动图片" v-model="imageValue" ></uni-file-picker>
				</view>
				<view class="tit">
					孩子的状态:
				</view>
				<view class="input1">
					<view class="input2">
						<uni-easyinput type="textarea" v-model="childmood" placeholder="请输入建议"></uni-easyinput>
					</view>
				</view>
				<view class="tit">
					建议:
				</view>
				<view class="input1">
					<view class="input2">
						<uni-easyinput type="textarea" v-model="advise" placeholder="请输入建议"></uni-easyinput>
					</view>
				</view>
				<view class="tit">
					其他:
				</view>
				<view class="input1">
					<view class="input2">
						<uni-easyinput type="textarea" v-model="other" placeholder="请输入"></uni-easyinput>
					</view>
				</view>
				<view class="button">
					<button class="mini-btn1" type="default" size="mini">提交</button>
					<button class="mini-btn2" type="default" size="mini">取消</button>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//选择次数
				number: 0,
				//第几次列表
				range: [
				  { value: 0, text: "第一次建议" },
				  { value: 1, text: "第二次建议" },
				  { value: 2, text: "第三次建议" },
				],
				//图片列表
				imageValue:[],
				//孩子的状态
				childmood:'',
				// 输入的建议
				advise:'',
				//其他
				other:'',
			}
		},
		methods: {
			
		}
	}
</script>

<style scoped lang="scss">
	.select{
		// background-color: #c1fff8;
		height: 90rpx;
		margin-top: 30rpx;
		.select1{
			background-color: #ffedbc;
			display: inline-block;
			vertical-align:top;
			width: 310rpx;
			text-align: center;
			margin-left: 50rpx;
			border-radius: 14rpx;
			float: left;
		}
		/deep/.uni-select{
			height: 80rpx !important;
			border-radius: 14rpx !important;
			font-size: 30rpx !important;
		}
		.btn{
			display: inline-block;
			vertical-align:top;
			float: right;
			margin-right: 50rpx;
			background-color: #ffedbc;
			font-size: 30rpx;
			color: #424242;
			height: 80rpx;
			width: 310rpx;
			line-height: 80rpx;
		}
	}
	.two{
		display: flex;
		justify-content: center;
		.advise{
			background-color: #fee3c8;
			width: 660rpx;
			border-radius: 15rpx;
			padding-bottom: 30rpx;
			margin-top: 30rpx;
			// box-shadow: 0px 0px 5px #efd6b2;
			.tit{
				padding-left: 50rpx;
				color: #6f6f6f;
				font-size: 37rpx;
				margin-top: 30rpx;
				font-weight: 700;
			}
			.input1{
				display: flex;
				justify-content: center;
				margin-top: 15rpx;
				.input2{
					width: 88%;
				}
			}
			.upPic{
				// background-color: #47ffdb;
				width: 86%;
				margin-left: 7%;
				margin-top: 10rpx;
				/deep/.file-picker__box-content{
					background-color: #fff;
				}
			}
			.button{
				margin-top:40rpx;
				height: 80rpx;
				.mini-btn1{
					font-size: 29rpx;
					color: #424242;
					float: left;
					margin-left: 55rpx;
					background-color: #fac1a8;
					height: 63rpx;
					width: 240rpx;
					line-height: 63rpx;
				}
				.mini-btn2{
					font-size: 29rpx;
					color: #424242;
					float: right;
					margin-right: 55rpx;
					background-color: #999a9a;
					height: 63rpx;
					width: 240rpx;
					line-height: 63rpx;
				}
			}
		}
	}
</style>
