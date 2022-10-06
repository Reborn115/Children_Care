<template>
	<view class="container">
		<u-sticky offset-top="0" bgColor="white">
			<view class="botton">
				<view class="tips" @click="last">
					<u-icon name="arrow-left-double" color="#2979ff" size="28"></u-icon>
					<text>上一章节</text>
				</view>
				<view class="tips" @click="next">
					
					<text>下一章节</text>
					<u-icon name="arrow-right-double" color="#2979ff" size="28"></u-icon>
				</view>
			</view>
		</u-sticky>
		<!-- <u-text :text='lastContent'>
			
		</u-text> -->
		<!-- {{lastContent}} -->
		<view class="headName">
			<text>
				{{headName}}
			</text>
		</view>
		<view class="u-page__image-item">
			<u--image
				radius="50"
			    :src="src"
			    width="300px"
			    height="300px"
				mode="widthFit"
			>
				<template v-slot:loading>
					<u-loading-icon color="red"></u-loading-icon>
				</template>
			</u--image>
		</view>
		 <p v-html='lastContent'></p>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				src:'',
				contentId:'',
				order:'',
				lastContent:'',
				total:'',
				headName:'',
			};
		},
		onLoad(e){
			this.positionResult = JSON.parse(e.positionResult)
			console.log(e.positionResult)
			this.contentId=this.positionResult.contentId
			this.order=this.positionResult.order
			this.src=this.positionResult.src
			this.total=this.positionResult.total
			this.headName=this.positionResult.headName
		    uni.request({
		        url: 'https://api.yuleng.top:38088/api/home-interface/text', //仅为示例，并非真实接口地址。
		    	method:"POST",
		        data: {
		            contentId:this.contentId,
					order:this.order
		        },
		        header: {
		            "content-type":"application/json",
		    		"token":uni.getStorageSync('token')
		        },
		        success: (res) => {
					/* this.mainText=this.phaseWrapList(res.data.data.mainText); */
					if(this.contentId==1){
						this.lastContent=this.handleText1(res.data.data.mainText)
					} else if(this.contentId==2) {
						this.lastContent=this.handleText2(res.data.data.mainText)
					} else if(this.contentId==3) {
						this.lastContent=this.handleText3(res.data.data.mainText)
					} else if(this.contentId==4) {
						this.lastContent=this.handleText2(res.data.data.mainText)
					} else if(this.contentId==5) {
						this.lastContent=this.handleText2(res.data.data.mainText)
					} else if(this.contentId==6) {
						this.lastContent=this.handleText2(res.data.data.mainText)
					}
					/* this.handleText(res.data.data.mainText) */
					this.src=res.data.data.picUrl
		            console.log(res.data);
		            this.text = 'request success';
		    		
		        }
		    });
		},
		methods:{
			last(){
				
				if(this.order==1){
					uni.showToast({
						title:"此章节不存在",
						icon:'error'
					});
				} else {
					this.order=this.order-1
					this.getText()
				}
				
			},
			next(){
				if(this.order==this.total){
					uni.showToast({
						title:"此章节不存在",
						icon:'error'
					});
				} else {
					this.order=this.order+1
					this.getText()
				}
			},
			getText(){
				this.lastContent=''
				uni.request({
				    url: 'https://api.yuleng.top:38088/api/home-interface/text', //仅为示例，并非真实接口地址。
					method:"POST",
				    data: {
				        contentId:this.contentId,
						order:this.order
				    },
				    header: {
				        "content-type":"application/json",
						"token":uni.getStorageSync('token')
				    },
				    success: (res) => {
						if(this.contentId==1){
							this.lastContent=this.handleText1(res.data.data.mainText)
						} else if(this.contentId==2) {
							this.lastContent=this.handleText2(res.data.data.mainText)
						} else if(this.contentId==3) {
							this.lastContent=this.handleText3(res.data.data.mainText)
						} else if(this.contentId==4) {
							this.lastContent=this.handleText2(res.data.data.mainText)
						} else if(this.contentId==5) {
							this.lastContent=this.handleText2(res.data.data.mainText)
						} else if(this.contentId==6) {
							this.lastContent=this.handleText2(res.data.data.mainText)
						}
							
							
							
						
							this.headName=res.data.data.title
							this.src=res.data.data.picUrl
							console.log(res.data);
							this.text = 'request success';
						
						/* this.mainText=this.phaseWrapList(res.data.data.mainText); */
						
						
				    }
				});
			},
			handleText1(content){
				
				content=content.slice(18)　
				let arr = content.split(/[\n]/)
				for (let i = 0 ; i < arr.length;i++){
				    let addContent = '<p style="text-indent: 2em">' + arr[i] + '</p>'
				    this.lastContent= this.lastContent + addContent
					
				}
				return this.lastContent
				
			},
			handleText2(content){
				/* <p></p><p>16K小说网 更新时间:2008-4-12 23:18:24 本章字数:6930</p>↵ */
				content=content.slice(14)　
				let arr = content.split(/[\n]/)
				for (let i = 0 ; i < arr.length;i++){
				    let addContent = '<p style="text-indent: 2em">' + arr[i] + '</p>'
				    this.lastContent= this.lastContent + addContent
					
				}
				return this.lastContent
				
			},
			handleText3(content){
				
				content=content.slice(55)　
				let arr = content.split(/[\n]/)
				for (let i = 0 ; i < arr.length;i++){
				    let addContent = '<p style="text-indent: 2em">' + arr[i] + '</p>'
				    this.lastContent= this.lastContent + addContent
					
				}
				return this.lastContent
				
			},
			phaseWrapList(str, length, style) {
			  let phaseList = []
			  let strLenth = str.length
			  for (let i = 0, j = 0; i < strLenth; i++) {
			    if (str[i] === '\n' || str[i] === '\r' || i === strLenth - 1) {
			      phaseList.push(str.substr(j, i))
			      j = i
			    }
			  }
			  return phaseList
			},
			replaceBreakWithPTag(str, style) {
			  if (!str) {
			    return ''
			  } else {
			    style = style || 'style="text-indent: 2em; margin: 10px 0;"'
			    str = `<p ${style}>` + str
			    return str.replace(/\n|\r/g, `</p><p ${style}>`)
			  }
			}
		}
	}
</script>

<style lang="scss" scoped>
.headName{
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: 20rpx;
	margin-bottom: 20rpx;
}
.tips{
	display:flex;
	justify-content: center;
	align-items: center;
}
.botton{
	height: 100rpx;
	justify-content: space-between;
	display:flex;
	
}
p{
	margin: 50rpx;
}
.u-page__image-item{
	display: flex;
	align-items: center;
	justify-content: center;
}
.container{
	white-space: pre-line;
}
</style>
