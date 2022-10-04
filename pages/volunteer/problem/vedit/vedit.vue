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
			<button class="btn" type="default" @click="add">添加新的建议</button>
		</view>
		<view class="two">
			<view class="advise">
				<view class="tit">
					解决过程图片:
				</view>
				<view class="upPic">
					<image v-for="(item,index) in image" :key="index" :src="item" style="width: 200rpx;height: 200rpx;margin-right: 30rpx;margin-top: 20rpx;"></image>
				</view>
				<view class="tit">
					修改图片:
				</view>
				<view class="upPic">
					<u-upload
							:fileList="fileList1"
							@afterRead="afterRead"
							@delete="deletePic"
							name="1"
							multiple
							:maxCount="4"
						></u-upload>
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
				<view class="button" >
					<button class="mini-btn1" type="default" size="mini" @click="submit">提交</button>
					<button class="mini-btn2" type="default" size="mini" @click="cancel" v-if="show">取消添加</button>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id:0,
				//选择次数
				number: 0,
				//一共有多少次
				volunteerCount:0,
				//请求回来的实拍图
				image:[],
				//第几次列表
				range: [
				  // { value: 0, text: "第一次建议" },
				],
				//图片列表
				fileList1:[],
				// 上传给后端的图片列表
				imageList:[],
				//孩子的状态
				childmood:'',
				// 输入的建议
				advise:'',
				//其他
				other:'',
				show:false,
				// 判断是否连击
				clickclick:0,
			}
		},
		onLoad(e){
			this.id = JSON.parse(e.id)
			this.getnum()
		},
		watch:{
			number(){
				this.getvolunter()
			},
		},
		methods: {
				deletePic(event) {
					this[`fileList${event.name}`].splice(event.index, 1)
					// console.log(event.index)
					let arr=this.imageList.filter((item,index)=>{
						return index!=event.index
					})
					this.imageList=arr
				},
				// 新增图片
				async afterRead(event) {
					// 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
					let lists = [].concat(event.file)
					let fileListLen = this[`fileList${event.name}`].length
					lists.map((item) => {
						this[`fileList${event.name}`].push({
							...item,
							status: 'uploading',
							message: '上传中'
						})
					})
					for (let i = 0; i < lists.length; i++) {
						const result = await this.uploadFilePromise(lists[i].url)
						let item = this[`fileList${event.name}`][fileListLen]
						this[`fileList${event.name}`].splice(fileListLen, 1, Object.assign(item, {
							status: 'success',
							message: '',
							url: result
						}))
						fileListLen++
					}
				},
				uploadFilePromise(url) {
					return new Promise((resolve, reject) => {
						let a = uni.uploadFile({
							url: 'https://api.yuleng.top:38088/api/upload',
							filePath: url,
							name: 'file',
							formData: {
								fileType:1
							},
							header: {
							    "content-type":"application/json",
								"token":uni.getStorageSync('token')
							},
							success: (res) => {
								res=JSON.parse(res.data)
								// console.log(res,'1111');
								// console.log(res.data.files[0].fileUrl,'2222')
								this.imageList.push(res.data.files[0].fileUrl)
								setTimeout(() => {
									resolve(res.data.data)
								}, 1000)
							}
						});
					})
				},
				// 提交
				submit(){
					if(this.number==0){
						uni.showToast({
							title: '请点击添加按钮进行添加',
							icon:'error',
							duration: 2000
						});
					}
					else if(this.childmood==''||this.other==''||this.advise==''){
						console.log(this.imageList.length)
						console.log(this.fileList1)
						uni.showToast({
							title: '请填写完整建议',
							icon:'error',
							duration: 2000
						});
					}
					else if(this.imageList.length<2){
						uni.showToast({
							title: '至少添加两个图片',
							icon:'none',
							duration: 2000
						});
					}
					else{
						uni.request({
							url: 'https://api.yuleng.top:38088/api/disabuse/volunteer', 
							method:'POST',
							data:{
								"disabuseId":this.id,
								"order":this.number,
								"imageList":this.imageList,
								"emotionState":this.childmood,
								"suggestion":this.advise,
								"other":this.other
							},
							header: {
								'token': uni.getStorageSync('token'), //自定义请求头信息
							},
							success: (res) => {
								uni.showToast({
									title: '提交成功',
									icon:'success',
									duration: 2000
								});
								// this.number=1
								this.getnum2()
								this.show=false
								this.clickclick=0
							}
						});
					}
				},
				// 点击取消
				cancel(){
					this.range.pop()
					this.clickclick=0
					this.childmood=''
					this.advise=''
					this.other=''
					this.image=[]
					this.imageList=[]
					//判断
					this.number=0
					if(this.range.length!=0){
						this.number=1
						this.getvolunter()
					}
					this.show=false
					// this.disable=false
				},
				// 获取建议
				getvolunter(){
					if(this.number>0&&this.number<=this.volunteerCount){
						uni.request({
							url: 'https://api.yuleng.top:38088/api/disabuse/volunteer', 
							data:{
								disabuseId:this.id,
								order:this.number
							},
							header: {
								'token': uni.getStorageSync('token'), //自定义请求头信息
							},
							success: (res) => {
								// console.log(res,"volunter")
								let mesg=res.data
								if(mesg.data){
									if(mesg.data.suggestion){
										this.advise=mesg.data.suggestion
									}
									if(mesg.data.other){
										this.other=mesg.data.other
									}	
									if(mesg.data.emotionalState){
										this.childmood=mesg.data.emotionalState
									}	
									if(mesg.data.imageUrlList){
										this.image=mesg.data.imageUrlList
									}
								}else{
									this.childmood=''
									this.advise=''
									this.other=''
									this.imageList=[]
								}
							}
						});
					}
				},
				// 获取次数
				getnum(){
					this.number=0
					this.range=[]
					uni.request({
						url: 'https://api.yuleng.top:38088/api/disabuse/num', 
						data:{
							disabuseId:this.id,
						},
						header: {
							'token': uni.getStorageSync('token'), //自定义请求头信息
						},
						success: (res) => {
							if(res.data.data.volunteerCount!=0){
								this.number=1
								this.volunteerCount=res.data.data.volunteerCount
								let i=1
								for(i=1;i<=res.data.data.volunteerCount;i++){
									this.range.push({value:i,text:'第'+i+'次建议'})
								}
							}
						}
					});
				},
				// 提交成功后调用
				getnum2(){
					this.number=0
					this.range=[]
					uni.request({
						url: 'https://api.yuleng.top:38088/api/disabuse/num', 
						data:{
							disabuseId:this.id,
						},
						header: {
							'token': uni.getStorageSync('token'), //自定义请求头信息
						},
						success: (res) => {
							if(res.data.data.volunteerCount!=0){
								this.volunteerCount=res.data.data.volunteerCount
								let i=1
								for(i=1;i<=res.data.data.volunteerCount;i++){
									this.range.push({value:i,text:'第'+i+'次建议'})
								}
								this.number=res.data.data.volunteerCount
							}
						}
					});
				},
				// 点击增加
				add(){
					this.clickclick++
					if(this.clickclick==1){
						this.childmood=''
						this.advise=''
						this.other=''
						this.imageList=[]
						this.image=[]
						this.fileList1=[]
						let d=this.volunteerCount+1
						this.range.push({value:d,text:'第'+d+'次建议'})
						this.number=this.volunteerCount+1
						this.show=true
						// this.disable=true
					}
				},
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
				/deep/.u-upload__wrap__preview__image{
					width: 200rpx !important;
					height: 200rpx !important;
				}
				/deep/.u-upload__button{
					width: 200rpx !important;
					height: 200rpx !important;
					margin-right: 30rpx !important;
				}
			}
			.button{
				margin-top:40rpx;
				height: 80rpx;
				display: flex;
				justify-content: space-around;
				.mini-btn1{
					font-size: 29rpx;
					color: #424242;
					// float: left;
					// margin-left: 55rpx;
					background-color: #fac1a8;
					height: 63rpx;
					width: 240rpx;
					line-height: 63rpx;
				}
				.mini-btn2{
					font-size: 29rpx;
					color: #424242;
					// float: right;
					// margin-right: 55rpx;
					background-color: #999a9a;
					height: 63rpx;
					width: 240rpx;
					line-height: 63rpx;
				}
			}
		}
	}
	/deep/.uni-select__input-placeholder{
		color: #484545;
		font-size: 17px;
	}
	
</style>
