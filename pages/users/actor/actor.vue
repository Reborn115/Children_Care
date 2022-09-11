<template>
  <view class="container">
    <view class="textTop">
      <text>选择身份</text>
    </view>
    <view class="box">
      <view class="card" id="card1" @click="goHome">
        <view class="textInline">
          <text class="textBottom">儿童模式</text>
        </view>
      </view>
    </view>
    <view class="box">
      <view class="card" id="card2">
        <view class="textInline">
          <text class="textBottom">父母模式</text>
        </view>
      </view>
    </view>
    <view class="box">
      <view class="card" id="card3">
        <view class="textInline">
          <text class="textBottom">志愿者模式</text>
        </view>
      </view>
    </view>
    <!-- <uni-card :is-shadow="true" class="child" id="child">
				<text class="uni-body">儿童模式</text>
			</uni-card>
			<uni-card :is-shadow="true" id='parent'>
				<text class="uni-body">父母模式</text>
			</uni-card>
			<uni-card :is-shadow="true" id='volunteer'>
				<text class="uni-body">志愿者模式</text>
			</uni-card> -->
  </view>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    goHome() {
      uni.switchTab({
        url: "/pages/childs/home/home",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
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
  font-size: 20px;
  font-weight: bold;
  margin-top: 2vh;
  margin-left: 10vw;
  margin-bottom: 4vh;
}
#card1 {
  /* background: linear-gradient(#F78FAD, #FDEB82)!important; */
  background: linear-gradient(#fbcdbb, #f9a7aa) !important;
}
#card2 {
  background: linear-gradient(#55caf3, #3c82df) !important;
}
#card3 {
  background: linear-gradient(#d9c0fa, #abc1f9) !important;
}
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
