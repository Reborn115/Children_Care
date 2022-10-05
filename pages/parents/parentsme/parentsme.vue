<template>
  <view>
    <view class="pic">
      <image
        :src="img"
        style="width: 200rpx; height: 200rpx; border-radius: 100rpx"
      ></image>
    </view>
    <view class="name">
      <text class="nametext">{{ name }}</text>
    </view>
    <view class="one">
      <view class="item1" @click="goChatlist">
        <text>我的消息</text>
        <uni-badge class="uni-badge-left-margin" :text="messageNumber" />
        <image
          src="../../../static/email.png"
          style="width: 50rpx; height: 50rpx"
        ></image>
      </view>
      <view class="item2">
        <text>父母模式</text>
        <image
          src="../../../static/model.png"
          style="width: 50rpx; height: 50rpx"
        ></image>
      </view>
    </view>
    <view class="two" @click="bind">
      <image
        src="../../../static/parents.png"
        style="width: 45rpx; height: 40rpx"
        class="icon"
      ></image>
      <text class="content">孩子账号</text>
      <image
        src="../../../static/inter2.png"
        style="width: 50rpx; height: 50rpx"
        class="inter"
      ></image>
    </view>
    <view class="two" @click="govedio">
      <image
        src="../../../static/voice.png"
        style="width: 40rpx; height: 40rpx"
        class="icon"
      ></image>
      <text class="content">录入声音</text>
      <image
        src="../../../static/inter4 .png"
        style="width: 50rpx; height: 50rpx"
        class="inter"
      ></image>
    </view>
    <view class="two" @click="goInfo">
      <image
        src="../../../static/me.png"
        style="width: 40rpx; height: 40rpx"
        class="icon"
      ></image>
      <text class="content">我的资料</text>
      <image
        src="../../../static/inter1.png"
        style="width: 50rpx; height: 50rpx"
        class="inter"
      ></image>
    </view>
    <view class="two">
      <image
        src="../../../static/we.png"
        style="width: 40rpx; height: 40rpx"
        class="icon"
      ></image>
      <text class="content">关于我们</text>
      <image
        src="../../../static/inter3.png"
        style="width: 50rpx; height: 50rpx"
        class="inter"
      ></image>
    </view>
    <view class="two" @click="out">
      <image
        src="../../../static/out.png"
        style="width: 40rpx; height: 40rpx"
        class="icon"
      ></image>
      <text class="content">退出登录</text>
      <image
        src="../../../static/inter5.png"
        style="width: 50rpx; height: 50rpx"
        class="inter"
      ></image>
    </view>
    <view>
      <!-- 提示窗 -->
      <uni-popup ref="alertDialog" type="dialog">
        <uni-popup-dialog
          type="info"
          cancelText="关闭"
          confirmText="确定"
          content="是否退出登录？"
          @confirm="dialogConfirm"
        ></uni-popup-dialog>
      </uni-popup>
    </view>
    <!-- 切换模式弹窗 -->
    <!-- <uni-popup ref="popup1" background-color="#fff" style="border-radius: 30rpx;">
			<view class="change">
				<image src="https://s2.loli.net/2022/09/11/cGDVIO75kn3rqey.jpg" style="width: 300rpx;height: 400rpx;margin-top: 60rpx;"></image>
				<view class="button">
					<button class="mini-btn1 btncolor1" type="default" size="mini">儿童模式</button>
					<button class="mini-btn1 btncolor2" type="default" size="mini">父母模式</button>
					<button class="mini-btn1 btncolor3" type="default" size="mini">志愿者模式</button>
				</view>
			</view>
		</uni-popup> -->
  </view>
</template>

<script>
export default {
  data() {
    return {
      // 头像
      img: "",
      // 名字
      name: "",
      // 未读消息
      messageNumber: 0,
      download: 0,
      myLove: 0,
    };
  },
  onShow() {
    this.getdata();
    this.getmessageNumber();
  },
  methods: {
    //进入个人资料页面
    goInfo() {
      uni.navigateTo({
        url: "/pages/childs/personal/personalInfo/personalInfo",
      });
    },
    //打开切换模式弹窗
    // changeType(){
    // 	this.$refs.popup1.open()
    // },
    //进入我的消息
    goChatlist() {
      uni.navigateTo({
        url: "/pages/chat/chatlist/chatlist",
      });
    },
    //获取数据
    getdata() {
      uni.request({
        url: "https://api.yuleng.top:38088/api/my-interface/parent",
        method: "POST",
        header: {
          token: uni.getStorageSync("token"), //自定义请求头信息
        },
        success: (res) => {
          // console.log(this.data,"ziliao")
          this.img = res.data.data.headPicUrl;
          this.name = res.data.data.userName;
          // this.messageNumber=res.data.data.messageNumber
          // this.download=res.data.data.download
          // this.myLove=res.data.data.myLove
        },
      });
    },
    // 进入录音界面
    govedio() {
      uni.navigateTo({
        url: "/pages/users/upload/upload?show=false",
      });
    },
    //进入绑定账号界面
    bind() {
      uni.navigateTo({
        url: "/pages/parents/parentsme/parentBind/parentBind",
      });
    },
    //退出登录
    out() {
      this.$refs.alertDialog.open();
    },
    //点击确定退出
    dialogConfirm() {
      uni.removeStorage({
        key: "token",
        success: function () {
          uni.reLaunch({
            url: "/pages/users/login/login",
          });
        },
      });
    },
    // 获取未读消息
    getmessageNumber() {
      uni.request({
        url: "https://api.yuleng.top:38088/api/message-num-list",
        header: {
          token: uni.getStorageSync("token"), //自定义请求头信息
        },
        success: (res) => {
          this.messageNumber = res.data.data.total;
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.pic {
  height: 270rpx;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  // background-color: #55ffff;
}
.name {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100rpx;
  // background-color: #ffaa00;
  .nametext {
    font-size: 46rpx;
  }
}
.one {
  height: 93rpx;
  margin-top: 20rpx;
  // background-color: #55ff7f;
  .item1,
  .item2 {
    // background-color: #00aaff;
    box-shadow: 2px 2px 4px #88888873;
    border-radius: 15rpx;
    width: 315rpx;
    height: 88rpx;
    font-size: 32rpx;
  }
  .item1 {
    position: relative;
    float: left;
    margin-left: 46rpx;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .uni-badge-left-margin {
      position: absolute;
      z-index: 10;
      right: 14rpx;
      top: 3rpx;
    }
  }
  .item2 {
    float: right;
    margin-right: 46rpx;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
}
.two {
  position: relative;
  margin-top: 30rpx;
  margin-left: 46rpx;
  box-shadow: 2px 2px 4px #88888873;
  border-radius: 15rpx;
  width: 662rpx;
  height: 88rpx;
  font-size: 32rpx;
  display: flex;
  align-items: center;
  .icon {
    float: left;
    margin-left: 47rpx;
  }
  .content {
    float: left;
    margin-left: 33rpx;
  }
  .inter {
    position: absolute;
    right: 50rpx;
  }
}
.change {
  height: 540rpx;
  width: 600rpx;
  .button {
    display: inline-block;
    // background-color: #fff0a1;
    width: 300rpx;
    height: 400rpx;
    .mini-btn1 {
      font-size: 36rpx;
      font-weight: 700;
      color: #ffffff;
      height: 7vh;
      width: 36vw;
      line-height: 7vh;
      margin-top: 40rpx;
      border-radius: 23rpx;
    }
    .btncolor1 {
      background: linear-gradient(#fbcdbb, #f9a7aa);
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
