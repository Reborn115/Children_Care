<template class="body">
  <view class="container">
    <image :src="img" alt="" ref="normalImage" class="bg-img"></image>
    <uni-forms
      :modelValue="formData"
      :rules="rules"
      ref="formData"
      class="formNormal"
    >
      <uni-forms-item name="account" class="inputNormal">
        <uni-easyinput
          prefixIcon="person"
          type="text"
          v-model="formData.account"
          placeholder="请输入账号"
          placeholderStyle="color:#EEDFC9;font-size:15px"
          @focus="changeImg(2)"
          @blur="recoverImg()"
        />
      </uni-forms-item>
      <uni-forms-item name="password" class="inputNormal">
        <uni-easyinput
          prefixIcon="locked"
          type="password"
          v-model="formData.password"
          placeholder="请输入密码"
          placeholderStyle="color:#EEDFC9;font-size:15px"
          @focus="changeImg(3)"
          @blur="recoverImg()"
        />
      </uni-forms-item>
      <button type="primary" @click="submit('formData')" class="bottonNormal">
        登录
      </button>
      <view class="privacy">
        <uni-data-checkbox
          multiple
          :localdata="range"
          @change="change"
          class="checkbotton"
        ></uni-data-checkbox>
        <text>已阅读并同意</text>
        <uni-link
          href="https://www.yuleng.top/app-huimao-yszc/"
          text="护苗隐私协议"
          color="#CF6A1B"
          font-weight="bold"
          showUnderLine="false"
        ></uni-link>
      </view>
      <!-- <button type="primary" @click="goHome()" class="bottonNormal">登录</button> -->
      <view class="password_account">
        <text @click="goRegister" class="textNormal">注册账号</text>
        <text @click="goForget" class="textNormal">忘记密码？</text>
      </view>
    </uni-forms>
  </view>
</template>

<script>
import aes from "../../../util/aes.js";

export default {
  data() {
    return {
      isPrivacy: 0,
      permission: "",
      img: "../../../static/green.png",
      formData: {
        account: "",
        password: "",
      },
      range: [{ value: 1, text: "" }],
      rules: {
        account: {
          //账号检验
          rules: [
            {
              required: true,
              errorMessage: "请填写账号",
            },
            {
              minLength: 1,
              maxLength: 12,
              errorMessage: "{label}长度在{minLength}到{maxLength}个字符",
            },
          ],
          label: "账号",
          validateTrigger: "submit",
        },
        password: {
          //密码检验
          rules: [
            {
              required: true,
              errorMessage: "请填写密码",
            },
            {
              minLength: 6,
              maxLength: 12,
              errorMessage: "{label}长度在{minLength}到{maxLength}个字符",
            },
          ],
          label: "密码",
          validateTrigger: "submit",
        },
      },
    };
  },
  onLoad() {
    let token = uni.getStorageSync("token");
    let permission = uni.getStorageSync("permission");
    console.log(token);
    console.log(permission);
    if (token) {
      if (permission == 1) {
        uni.switchTab({
          url: "/pages/childs/home/home",
        });
      } else if (permission == 2) {
        uni.reLaunch({
          url: "/pages/parents/homepage/homepage",
        });
      } else if (permission == 3) {
        uni.reLaunch({
          url: "/pages/volunteer/volunteerhome/volunteerhome",
        });
      }
    }
  },
  methods: {
    
    change(e) {
      this.isPrivacy = !this.isPrivacy;
    },
    recoverImg() {
      this.img = "../../../static/green.png";
    },
    changeImg(num) {
      /* if(num==2){
					this.img='../../static/account.png';
					
					this.$refs.normalImage.style.width="130px";
					this.$refs.normalImage.style.height="110px";
				} */
      if (num == 3) {
        this.img = "../../../static/greenpassword.png";
      }
    },
    goForget() {
      uni.navigateTo({
        url: "/pages/users/forget/forget",
      });
    },
    goRegister() {
      uni.navigateTo({
        url: "/pages/users/register/register",
      });
    },
    goHome() {
      console.log("555");
      uni.navigateTo({
        url: "/pages/childs/home/home",
      });
    },
    submit(ref) {
      this.$refs[ref]
        .validate()
        .then((res) => {
          if (!this.isPrivacy) {
            uni.showToast({
              title: "请同意隐私政策",
              icon: "error",
            });
          } else {
			  /* this.$axios({
			  	method:'POST',
			  	url:'/api/login/c',
			  	headers: {
			  		"content-type": "application/json", 
			  	},
				data: {
				    userName:this.formData.account,
					password:this.formData.password
				},
			  }).then(res =>{
				  console.log(res)
			  	
			  }).catch(err =>{
			  	console.log(err)
			  }) */
			  
            let data = aes.encrypt(
              JSON.stringify({
                userName: this.formData.account,
                password: this.formData.password,
              }),
              "zzr@backEnd!@#$%"
            );
            console.log("data", data);
            uni.request({
              url: "https://api.yuleng.top:38088/api/login/c-new",
              method: "POST",
              data: data,
              header: {
                "content-type": "application/json",
              },
              success: (res) => {
                if (res.data.code == "00000") {
                  uni.showToast({
                    title: "登录成功",
                    icon: "success",
                  });
                  this.permission = res.data.data.permission;

                  console.log(res.data);
                  console.log(res.data.code);
                  uni.setStorage({
                    key: "token",
                    data: res.data.data.token,
                  });
                  uni.setStorage({
                    key: "permission",
                    data: res.data.data.permission,
                  });
                  uni.setStorage({
                    key: "isCertification",
                    data: res.data.data.isCertification,
                  });
                  uni.setStorage({
                    key: "userId",
                    data: res.data.data.id,
                  });
                  if (!res.data.data.isSetIdentity) {
                    uni.navigateTo({
                      url:
                        "/pages/users/actor/actor?positionResult=" +
                        JSON.stringify(res.data.data),
                    });
                  } else if (
                    !res.data.data.isCertification &&
                    this.permission == 1
                  ) {
                    uni.navigateTo({
                      url: "/pages/users/editChild/editChild",
                    });
                  } else if (
                    !res.data.data.isCertification &&
                    this.permission == 2
                  ) {
                    uni.navigateTo({
                      url: "/pages/users/editInfo/editInfo",
                    });
                  } else if (
                    !res.data.data.isCertification &&
                    this.permission == 3
                  ) {
                    uni.navigateTo({
                      url: "/pages/volunteer/volunterMe/editVolun/editVolun",
                    });
                  } else if (this.permission == 1) {
                    uni.switchTab({
                      url: "/pages/childs/home/home",
                    });
                  } else if (this.permission == 2) {
                    uni.reLaunch({
                      url: "/pages/parents/homepage/homepage",
                    });
                  } else if (this.permission == 3) {
                    uni.reLaunch({
                      url: "/pages/volunteer/volunteerhome/volunteerhome",
                    });
                  }
                } else {
                  uni.showToast({
                    title: "账号密码错误",
                    icon: "error",
                  });
                }
              },
              fail() {},
            });
			
            /* uni.request({
							url: 'https://api.yuleng.top:38088/api/login/c',
							method:"POST",
							data: {
							    userName:this.formData.account,
								password:this.formData.password
							},
							header: {
							    "content-type":"application/json",
							},
							success: (res) => {
								if(res.data.code=='00000'){
									uni.showToast({
										title: '登录成功',
										icon:'success'
									});
									this.permission=res.data.data.permission
									
									console.log(res.data)
									console.log(res.data.code)
									uni.setStorage({
										key:"token",
										data:res.data.data.token
									})
									uni.setStorage({
										key:"permission",
										data:res.data.data.permission
									})
									uni.setStorage({
										key:"isCertification",
										data:res.data.data.isCertification
									})
									uni.setStorage({
										key:"userId",
										data:res.data.data.id
									})
									if(!res.data.data.isSetIdentity){
										uni.navigateTo({
										    url:"/pages/users/actor/actor?positionResult="+JSON.stringify(res.data.data)
										})
									} else if(!res.data.data.isCertification&&this.permission==1){
										uni.navigateTo({
										    url:"/pages/users/editChild/editChild"
										})
									} else if(!res.data.data.isCertification&&this.permission==2){
										uni.navigateTo({
										    url:"/pages/users/editInfo/editInfo"
										})
									} else if(!res.data.data.isCertification&&this.permission==3){
										uni.navigateTo({
										    url:"/pages/volunteer/volunterMe/editVolun/editVolun"
										})
										
									} else if(this.permission==1){
										uni.switchTab({
										  url: "/pages/childs/home/home",
										});
									}else if(this.permission==2){
										uni.reLaunch({
										  url: "/pages/parents/homepage/homepage",
										});
									}else if(this.permission==3){
										uni.reLaunch({
										  url: "/pages/volunteer/volunteerhome/volunteerhome",
										});
									}
								} else {
									uni.showToast({
										title: '账号密码错误',
										icon:'error'
									});
								}
								
								
							},
							fail() {
								
							}
						}); */
          }

          console.log("success", res);
        })
        .catch((err) => {
          console.log("err", err);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.privacy {
  margin-bottom: 80rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  text {
    font-size: 13.5px;
  }
}
::v-deep .uni-data-checklist {
  font-size: 0px;
}
::v-deep .uni-icons {
  color: #e48b47 !important;
}
::v-deep .uni-easyinput__content-input {
  height: 75rpx;
}
.bg-img {
  position: absolute;
  z-index: -1;
  left: 0;
  right: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
}
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.container input {
  outline: none;
  padding: 10px;
  width: 100%;
  border: solid 1px #ececec;
  border: radius 20px;
  margin-bottom: 10px;
  box-sizing: border-box;
  font-size: 16px;
  height: 80px;
}
/* .container image{
    position: absolute;
    width: 120px;
    height: 95px;
    top: 26%;
    left: 50%;
    transform: translate(-50%,0);
} */

::v-deep .uni-easyinput {
  width: 60vw !important;
  outline: none !important;

  border-style: none !important;
  /* border: radius 20px; */
  width: 100%;

  box-sizing: border-box;
  font-size: 16px;
}
::v-deep .uni-forms-item__label {
  display: none;
  visibility: hidden !important;
  padding: 0;
}

.bottonNormal {
  border-radius: 20px;
  background-color: #e48b47;
  align-items: center;
  justify-content: center;
  display: flex;
  width: 60vw;
  height: 80rpx;
  margin-top: 20rpx;
  margin-bottom: 40rpx;
}
.formNormal {
  align-items: center;
  justify-content: center;
  display: flex;
  width: 70vw;
}
::v-deep .uni-forms {
  margin-left: 5vw;
  padding-top: 260rpx;
  /* margin-top:26.7vh; */
  /* margin-left: 10vw; */
  width: 80vw;
  align-items: center;
  justify-content: center;
  display: flex;
}
::v-deep .uni-forms-item {
  margin-bottom: 80rpx;
}
.body {
  background-color: #e9ba84;
  position: relative;
  z-index: 0; // 支付宝小程序下背景不生效时，可以加上这个
}

.password_account {
  font-weight: bold;
  color: #95a834;
  align-items: center;
  justify-content: space-around;
  display: flex;
}
/* .textNormal{
	margin-left: 5vw;
} */
</style>
