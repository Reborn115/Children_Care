<template>
  <view class="container">
    <view class="textTop">
      <text>选择身份</text>
    </view>
    <view class="box" @click="setIdentity(1)">
      <view class="card" id="card1">
		  <image src="../../../static/child.png" alt="" ref="normalImage" class="bg-img"></image>
        <!-- <view class="textInline">
          <text class="textBottom">儿童模式</text>
        </view> -->
      </view>
    </view>
    <view class="box" @click="setIdentity(2)">
      <view class="card" id="card2">
		  <image src="../../../static/parent.png" alt="" ref="normalImage" class="bg-img"></image>
        <!-- <view class="textInline">
          <text class="textBottom">父母模式</text>
        </view> -->
      </view>
    </view>
    <view class="box" @click="setIdentity(3)">
      <view class="card" id="card3">
		  <image src="../../../static/volunteer.png" alt="" ref="normalImage" class="bg-img"></image>
        <!-- <view class="textInline">
          <text class="textBottom">志愿者模式</text>
        </view> -->
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
		positionResult:'',
      permission: "",
      isCertification: 0,
    };
  },
  onLoad(e) {
    this.positionResult = JSON.parse(e.positionResult);
	this.isCertification=this.positionResult.isCertification
    console.log(this.isCertification);
  },
  methods: {
    setIdentity(order) {
      uni.request({
        url: "https://api.yuleng.top:38088/api/set-identity", //仅为示例，并非真实接口地址。
        method: "POST",
        data: {
          permission: order,
        },
        header: {
          "content-type": "application/json",
          token: uni.getStorageSync("token"),
        },
        success: (res) => {
          console.log(res.data);
          this.text = "request success";
          this.permission = res.data.data.permission;
		  console.log(this.isCertification,"这是isCertification")
          if (!this.isCertification) {
            if (this.permission == 1) {
              uni.navigateTo({
                url: "/pages/users/editChild/editChild",
              });
            } else {
              uni.navigateTo({
                url: "/pages/users/editInfo/editInfo",
              });
            }
          } else if(this.permission==1){
            uni.switchTab({
              url: "/pages/childs/home/home",
            });
          } else if(this.permission==2){
			  uni.navigateTo({
			    url: "/pages/parents/homepage/homepage",
			  });
		  } else{
			  uni.reLaunch({
			    url: "/pages/volunteer/volunteerhome/volunteerhome",
			  });
		  }
        },
      });
    },
    goParents() {
      uni.redirectTo({
        url: "/pages/parents/homepage/homepage",
      });
    },
    goVolunter() {
      uni.redirectTo({
        url: "/pages/volunteer/volunteerhome/volunteerhome",
      });
    },
    /* goHome() {
      uni.switchTab({
        url: "/pages/childs/home/home",
      });
    }, */
  },
};
</script>

<style lang="scss" scoped>
.container{
	background-color: #CBFFB5;
	height: 100vh;
}
.bg-img {
  /* position: absolute;
  z-index: -1;
  left: 0;
  right: 0;
  bottom: 0;
  right: 0; */
  width: 100%;
  height: 100%;
  border-radius: 10px;
}
.textInline {
  margin-top: 4vh;
  margin-left: 48vw;
}
.textBottom {
  font-size: 18px;
  color: #fff;
  text-shadow: 0 0 5px #fff;
  /* text-shadow: 0 -1px 0 #ffffff, 0 1px 0 #2e2e2e, 0 2px 0 #2c2c2c, 0 3px 0 #2a2a2a, 0 4px 0 #282828, 0 5px 0 #262626, 0 6px 0 #242424, 0 7px 0 #222222, 0 8px 0 #202020, 0 9px 0 #1e1e1e, 0 10px 0 #1c1c1c, 0 11px 0 #1a1a1a, 0 12px 0 #181818, 0 13px 0 #161616, 0 14px 0 #141414, 0 15px 0 #121212); */
}
.textTop {
	padding-top: 2vh;
  font-size: 20px;
  font-weight: bold;
  color: #00841F;
  margin-left: 10vw;
  margin-bottom: 4vh;
}
// #card1 {
  
//   background: linear-gradient(#fbcdbb, #f9a7aa) !important;
// }
// #card2 {
//   background: linear-gradient(#55caf3, #3c82df) !important;
// }
// #card3 {
//   background: linear-gradient(#d9c0fa, #abc1f9) !important;
// }
.card {
  height: 20vh;
  width: 80vw;
  border-radius: 8px;
  margin-bottom: 3vh;
}
.box {
  display: flex;
  align-items: center;
  justify-content: center;
}

::v-deep .uni-card {
  height: 20vh;
  padding-left: 50vw;
  /* background: linear-gradient(blue, pink)!important; */
  /* background-color: aqua !important; */
}
::v-deep .uni-card .uni-card__content {
  margin-left: 55vw;
}
</style>
