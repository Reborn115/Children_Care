<template>
  <view class="body">
    <view class="top">
      <view class="hello"> {{ hellomsg }}<br />欢迎来到“护苗” </view>
      <view class="pic">
        <image
          :src="headUrl"
          style="width: 120rpx; height: 120rpx; border-radius: 100rpx"
        ></image>
      </view>
    </view>
    <view class="notice">
      <uni-notice-bar
        show-icon
        speed="20"
        scrollable
        backgroundColor="#fff"
        color="#1e1e1e73"
        :text="question"
      />
    </view>
    <view class="content">
      <view class="box" @click="goVolunteerSolve">
        <view class="card" id="card1">
          <view class="textInline">
            <text>解惑</text>
          </view>
          <image
            src="../../../static/panda.png"
            style="
              width: 330rpx;
              height: 255rpx;
              position: absolute;
              bottom: 0rpx;
              right: 50rpx;
            "
          ></image>
        </view>
      </view>
      <view class="box" @click="goVolunteerMe">
        <view class="card" id="card2">
          <view class="textInline">
            <text>我的</text>
          </view>
          <image
            src="../../../static/panda.png"
            style="
              width: 330rpx;
              height: 255rpx;
              position: absolute;
              bottom: 0rpx;
              right: 50rpx;
            "
          ></image>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      hellomsg: "",
      question: "",
      headUrl: "",
	  timer:""
    };
  },
  onShow() {
    uni.setStorage({
      key: "isCertification",
      data: 1,
    });
	this.timer = setInterval(this.getdata, 60000);
    this.getdata();
  },
  mounted() {
    this.getdata();
  },

  onHide() {
    clearInterval(this.timer);
  },
  methods: {
    // 志愿者端解惑界面
    goVolunteerSolve() {
      uni.navigateTo({
        url: "/pages/volunteer/problem/problem",
      });
    },
    // 志愿者端我的界面
    goVolunteerMe() {
      uni.navigateTo({
        url: "/pages/volunteer/volunterMe/volunterMe",
      });
    },
    // 获取数据
    getdata() {
      uni.request({
        url: "https://api.yuleng.top:38088/api/home/parent",
        header: {
          token: uni.getStorageSync("token"),
        },
        success: (res) => {
		  if(res.data.code=='A0221'){
			  uni.showToast({
			  	title: '登录已过期',
			  	icon:'error'
			  });
		  	console.log("登录已过期，请重新登录")
		  	uni.removeStorage({
		  	  key: "token",
		  	  success: function () {
		  	    uni.reLaunch({
		  	      url: "/pages/users/login/login",
		  	    });
		  	  },
		  	});
		  } else {
			  this.headUrl = res.data.data.headUrl;
			  // 处理后端返回来的数据格式
			  this.hellomsg = res.data.data.helloMessage.slice(0, 4);
			  if (res.data.data.disabuseList.length != 0) {
			    this.question = res.data.data.disabuseList[0];
			  }
		  }
          
        },
      });
    },
  },
};
</script>

<style scoped lang="scss">
.top {
  // background-color: #acffe7;
  // width: 500rpx;
  height: 180rpx;
  .hello {
    width: 300rpx;
    height: 150rpx;
    font-size: 37rpx;
    margin-left: 50rpx;
    line-height: 63rpx;
    display: flex;
    flex-direction: column;
    justify-content: center;
    // background-color: #fff;
    display: inline-block;
    margin-top: 20rpx;
  }
  .pic {
    display: inline-block;
    height: 150rpx;
    // background-color: #e8ffd8;
    text-align: center;
    line-height: 180rpx;
    width: 300rpx;
    float: right;
    margin-top: 15rpx;
  }
}
.notice {
  /deep/.uni-noticebar {
    width: 86%;
    margin-left: 7%;
    border: 1px solid #9e9e9e7d;
    border-radius: 30rpx;
  }
}
.content {
  .textInline {
    margin-top: 2vh;
    margin-left: 8vw;
    font-size: 36px;
    color: #fff;
    font-weight: 700;
    // text-shadow: 0 0 5px #fff;
  }
  #card1 {
    /* background: linear-gradient(#F78FAD, #FDEB82)!important; */
    background: linear-gradient(#fbcdbb, #f9a7aa) !important;
  }
  #card2 {
    // background: linear-gradient(#55caf3, #3c82df) !important;
	background: linear-gradient(#55caf3, #a5ccff) !important
  }
  #card3 {
    background: linear-gradient(#d9c0fa, #abc1f9) !important;
  }
  .card {
    height: 18vh;
    width: 86vw;
    border-radius: 8px;
    // margin-bottom: 45vh;
    position: relative;
    margin-top: 35rpx;
  }
  .box {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
