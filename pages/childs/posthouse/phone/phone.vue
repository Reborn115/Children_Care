<template>
	<view>
		<uni-list v-for="(item,index) in phonelist" :key="index">
			<uni-list-item :title="item.name" :note="item.phone" @click="open(item.phone)" link  rightText="点击求助"
				thumb="../../../../static/phone.png"
				thumb-size="sm" />
		</uni-list>
		<button class="btn" @click="addphone">编辑联系人</button>
		<uni-popup
		  ref="popup"
		  background-color="#fff"
		  style="border-radius: 30rpx"
		>
		  <view class="change">
		    <!-- <image
		      src="../../static/baby3.jpg"
		      style="width: 300rpx; height: 400rpx; margin-top: 60rpx"
		    ></image> -->
		    <view class="button">
		      <button class="mini-btn1 btncolor1" type="default" size="mini" @click="sendLocation">
		        发送位置短信
		      </button>
		      <button class="mini-btn1 btncolor2" type="default" size="mini" @click="call">
		        拨打紧急电话
		      </button>
		    </view>
		  </view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phonelist:[],
				phone:'',
				address:'',
				
			}
		},
		onShow() {
			this.getdata()
			this.getLocation()
			this.getLocation()
		},
		methods: {
			addphone(){
				uni.navigateTo({
					url:'/pages/childs/posthouse/phone/editphone'
				})
			},
			getdata(){
				uni.request({
					url: 'https://api.yuleng.top:38088/api/get/emerge-person', 
					header: {
						'token': uni.getStorageSync('token'), 
					},
					method: "POST",
					success: (res) => {
						this.phonelist=res.data.data.emergePersonList
					}
				});
			},
			open(phone){
				this.phone=phone
				this.$refs.popup.open();
				// uni.getLocation({
				// 	type: 'wgs84',
				// 	geocode:true,
				// 	success: function (res) {
				// 		console.log(res)
				// 		console.log(res.address);
				// 		console.log('当前位置的经度：' + res.longitude);
				// 		console.log('当前位置的纬度：' + res.latitude);
				// 	}
				// });
			},
			//拨打电话
			call(){
				uni.makePhoneCall({
					phoneNumber: this.phone 
				});
			},
			getLocation(){
				//获取位置信息
				uni.getLocation({
				    type: 'gcj02',
				    geocode:true,//设置该参数为true可直接获取经纬度及城市信息
				    success: (res)=> {
				        console.log('获取定位信息',res);
				        // 创建地图坐标对象
				        var point = new plus.maps.Point(res.longitude, res.latitude);
				        //静态方法，反向地理编码
				        plus.maps.Map.reverseGeocode(point, {},(event)=>{
				            var address = event.address; // 转换后的地理位置
							console.log(address,'address');
							this.address=address
				            // var point = event.coord; // 转换后的坐标信息
				            // var coordType = event.coordType; // 转换后的坐标系类型
				            // var reg = /.+?(省|市|自治区|自治州|县|区)/g;
				            // var addressList = address.match(reg).toString().split(",");
				            //注意 因为存在直辖市， 当所在地区为普通省市时，addressList.length == 3，city = addressList[1];当所在地区为直辖市时addressList.length == 2，city = addressList[0];
				   //          let city = addressList.length == 3?addressList[1]:addressList[0];
							// this.address=addressList.toString(),
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
			//发送位置信息
			sendLocation(){
				this.getLocation()
				if(this.address!=''){
					uni.request({
						url: 'https://api.yuleng.top:38088/api/track/send', 
						header: {
							'token': uni.getStorageSync('token'), 
						},
						method: "POST",
						data:{seedMessageList:[
							{
								phone:this.phone,
								location:this.address
							}
						]
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
				// setTimeout(()=>{
				// 	var msg = plus.messaging.createMessage(plus.messaging.TYPE_SMS);
				// 	msg.to = [this.phone];
				// 	msg.body = '我在<'+this.address+'>遇到了紧急情况';
				// 	plus.messaging.sendMessage( msg );
				// },1000)
			},
		}
	}
</script>

<style scoped lang="scss">
.btn{
	color: #1296db;
	background: #fff;
	border: 1px solid #1296db;
	width: 640rpx;
	height: 70rpx;
	line-height: 70rpx;
	margin-top: 40rpx;
}
.change {
  height: 417rpx;
  width: 497rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  .button {
    display: inline-block;
    // background-color: #fff0a1;
    width: 300rpx;
    height: 300rpx;
    .mini-btn1 {
      font-size: 36rpx;
      font-weight: 700;
      color: #ffffff;
      height: 7vh;
      width: 300rpx;
      line-height: 7vh;
      margin-top: 10rpx;
      margin-bottom: 42rpx;
      border-radius: 23rpx;
    }
    .btncolor1 {
      background: linear-gradient(#eeb7ec, #9f84e0);
    }
    .btncolor2 {
      background: linear-gradient(#55caf3, #3c82df);
    }
    .btncolor3 {
      background: linear-gradient(#d9c0fa, #abc1f9);
    }
  }
}
</style>
