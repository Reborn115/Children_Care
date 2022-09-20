// 封装一个发送请求
export const myRequest=(options)=>{
	return new Promise((resolve,reject)=>{
		uni.request({
			url:'https://api.yuleng.top:38088/api'+options.url,
			method:options.method||'GET',
			data:options.data||{},
			success:(res)=>{
				if(res.data.meta.status!==200){
					return uni.showToast({
						title:'获取数据失败',
						icon:"none",
						duration:2000
					})
				}
				resolve(res);
			},
			fail: (err) => {
				uni.showToast({
					title:'请求失败',
					icon:"none"
				})
				reject(err);
			}
		})
	})
}
//用法说明
// async getgoods(callback){
// 				const res=await this.$myRequest({
// 					url:'/goods/search',
// 					method:'GET',
// 					data:{
// 						pagenum:this.pagenum,
// 					}
// 				})
// 				// console.log(res)
// 				callback&&callback();
// 				this.goods=[...this.goods,...res.data.message.goods];
// 				this.total=res.data.message.total;
// 			},