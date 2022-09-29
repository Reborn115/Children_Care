<template>
	<view class="container">
		<!-- <u-text :text='lastContent'>
			
		</u-text> -->
		<!-- {{lastContent}} -->
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
				contentId:'1',
				order:'1',
				lastContent:''
			};
		},
		onLoad(e){
			this.positionResult = JSON.parse(e.positionResult)
			console.log(e.positionResult)
			this.contentId=this.positionResult.contentId
			this.order=this.positionResult.order
			this.src=this.positionResult.coverPictureUrl
		    uni.request({
		        url: 'https://api.yuleng.top:38088/api/home-interface/story-detail', //仅为示例，并非真实接口地址。
		    	method:"POST",
		        data: {
		            contentId:this.contentId,
					
		        },
		        header: {
		            "content-type":"application/json",
		    		"token":uni.getStorageSync('token')
		        },
		        success: (res) => {
					/* this.mainText=this.phaseWrapList(res.data.data.mainText); */
					this.handleText(res.data.data.mainText)
					this.src=res.data.data.picUrl
		            console.log(res.data);
		            this.text = 'request success';
		    		
		        }
		    });
		},
		methods:{
			handleText(content){
				let arr = content.split(/[\n]/)
				for (let i = 0 ; i < arr.length;i++){
				    let addContent = '<p style="text-indent: 2em">' + arr[i] + '</p>'
				    this.lastContent= this.lastContent + addContent
				}
				
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
