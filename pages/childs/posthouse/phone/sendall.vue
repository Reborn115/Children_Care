<template>
	<view class="all">
		<view class="page-body">
			<view class="page-section page-section-gap">
				<map style="width: 100%; height: 650rpx;" :latitude="latitude" :longitude="longitude" :markers="covers">
				</map>
			</view>
		</view>
		<view class="xia">
			<view class="location">
					你现在位于{{address}}
			</view>
			<view class="out">
				<view class="button1" @click="sendLocation">
					发送位置信息给所有联系人
				</view>
			</view>
			<view class="out">
				<view class="button2" @click="call">
					拨打紧急电话给第一联系人
				</view>
			</view>
			<view class="out">
				<view class="button3" @click="gophone">
					求助于其他联系人
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import aes from "../../../../util/aes.js"
	export default{
		data(){
			return{
				// 定位
				address:'',
				latitude: 39.909,
				longitude: 116.39742,
				covers: [{
					id:1,
					latitude: 39.909,
					longitude: 116.39742,
					iconPath: '../../../../static/location.png',
					width:1,
					height:1
				}],
				// 打电话给第一联系人
				onephone:0,
				// 发送给所有联系人的数组
				phonelist:[],
			}
		},
		onLoad() {
			this.getLocation()
		},
		onShow() {
			this.getdata()
			this.getLocation()
		},
		methods:{
			// 获取联系人
			getdata(){
				uni.request({
					url: 'https://api.yuleng.top:38088/api/privacy/emerge-person', 
					header: {
						'token': uni.getStorageSync('token'), 
					},
					method: "GET",
					success: (res) => {
						res=JSON.parse(aes.decrypt(res.data.data.result,"zzr@backEnd!@#$%"))
						this.phonelist=res.emergePersonList.map((item,index)=>{
							return{phone:item.phone,location:this.address}
						})
						console.log(this.phonelist)
						if(this.phonelist.length!=0){
							this.onephone=this.phonelist[0].phone
						}else{
							uni.showToast({
							    title: '你还未设置紧急联系人',
							    icon:'none'
							});
						}
						
					}
				});
				
				// uni.request({
				// 	url: 'https://api.yuleng.top:38088/api/get/emerge-person', 
				// 	header: {
				// 		'token': uni.getStorageSync('token'), 
				// 	},
				// 	method: "POST",
				// 	success: (res) => {
				// 		this.phonelist=res.data.data.emergePersonList.map((item,index)=>{
				// 			return{phone:item.phone,location:this.address}
				// 		})
				// 		console.log(this.phonelist)
				// 		if(this.phonelist.length!=0){
				// 			this.onephone=this.phonelist[0].phone
				// 		}else{
				// 			uni.showToast({
				// 			    title: '你还未设置紧急联系人',
				// 			    icon:'none'
				// 			});
				// 		}
						
				// 	}
				// });
			},
			// 获取位置
			getLocation(){
				//获取位置信息
				uni.getLocation({
				    type: 'gcj02',
				    geocode:true,//设置该参数为true可直接获取经纬度及城市信息
				    success: (res)=> {
						this.latitude=res.latitude
						this.covers[0].latitude=res.latitude
						this.longitude=res.longitude
						this.covers[0].longitude=res.longitude
				        console.log('获取定位信息',res);
				        // 创建地图坐标对象
				        var point = new plus.maps.Point(res.longitude, res.latitude);
				        //静态方法，反向地理编码
				        plus.maps.Map.reverseGeocode(point, {},(event)=>{
				            var address = event.address; // 转换后的地理位置
							console.log(address,'address');
							this.address=address
				            },
				        	function(e) {
				            	console.log("失败回调",e);
				        	}
				        );
				    },
				    fail: function (err) {
				        console.log("获取定位失败",err);
				        uni.showToast({
				            title: '获取定位失败',
				            icon:'none'
				        });
				    }
				});
			},
			// 其他联系人
			gophone(){
				uni.navigateTo({
					url:'/pages/childs/posthouse/phone/phone'
				})
			},
			// 拨打电话
			call(){
				uni.makePhoneCall({
					phoneNumber: this.onephone 
				});
			},
			// 发送短信
			sendLocation(){
				this.getLocation()
				if(this.address!=''){
					uni.request({
						url: 'https://api.yuleng.top:38088/api/track/send', 
						header: {
							'token': uni.getStorageSync('token'), 
						},
						method: "POST",
						data:{seedMessageList:this.phonelist
						},
						success: (res) => {
							uni.showToast({
								title: '发送成功',
								icon:'success',
								duration: 2000
							});
						}
					});
				}else{
					uni.showToast({
						title: '获取定位失败',
						icon:'error',
						duration: 2000
					});
				}
			},
		}
	}
</script>

<style scoped lang="scss">
	.location{
		width: 550rpx;
		// background-color: #ffaa00;
		margin: 0 auto;
		margin-top: 25rpx;
		text-align: center;
		color: #8a8a8a;
	}
	.xia{
		padding-bottom: 30rpx;
	}
	.out{
		// background-color: #b7fff3;
		height: 150rpx;
		width: 100%;
		display: flex;
		justify-content: center;
		margin-top: 60rpx;
		.button1{
			// background-color: #d81e06;
			background-color: #ee7b7b;
			width: 570rpx;
			height: 150rpx;
			border-radius: 50rpx;
			font-size: 43rpx;
			line-height: 150rpx;
			text-align: center;
			font-weight: 700;
			color: white;
		}
		.button2{
			// background-color: #2b29b5;
			background-color: #849fea;
			width: 570rpx;
			height: 150rpx;
			border-radius: 50rpx;
			font-size: 43rpx;
			line-height: 150rpx;
			text-align: center;
			font-weight: 700;
			color: white;
		}
		.button3{
			// background-color: #5e2283;
			background-color: #bd75ea;
			width: 570rpx;
			height: 150rpx;
			border-radius: 50rpx;
			font-size: 43rpx;
			line-height: 150rpx;
			text-align: center;
			font-weight: 700;
			color: white;
		}
	}
</style>