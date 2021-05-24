<template>
	<view class="content">
		<view class="status_bar" :style="top_background+top_height">
		</view>
		<view class="top" :style="top_background+top_style">
			<view class="top-icon" @click="returnHome()">
				<image :src="top_background_imgurl" mode="widthFix"></image>
			</view>
			<view class="top-text">齐风杯</view>
		</view>
		<view class="main">
			<view class="mian-list" :style="item.resource_type=='image'?'display:block':''"
				v-for="(item,index) in sign_info" :key="index">
				<view class="list-left">
					<text class="mandatory im-red">{{item.required?'*':' '}}</text>
					<text class="tips">{{item.name}}</text>
				</view>
				<input v-if="item.resource_type=='none'" type="text" :placeholder="'请填写您的' + item.name"
					v-model="info_list[index]" />
				<view class="evaluate-image" v-if="item.resource_type=='image'||item.resource_type=='video'">

					<view v-if="info_list[index].path==''&&item.resource_type=='image'" class="evaluate-icon"
						@click="uploadImg(item.key,index,item.module)">
						<image src="../../static/assets/camera.png" mode="widthFix"></image>
						<text style="font-size: 12px;">图片上传 不超过10M</text>
					</view>
					<view v-if="info_list[index].path!=''&&item.resource_type=='image'" :key="index" class="val_images">
						<image :src="info_list[index].path" mode=""></image>
						<view class="del_icon" @click="del_img(index)">
							<image src="../../static/assets/del_icon.png" mode="widthFix"></image>
						</view>
					</view>

					<view v-if="info_list[index].path==''&&item.resource_type=='video'" class="evaluate-icon"
						@click="addVideoFun(index,item.module)">
						<image src="../../static/assets/film.png" mode="widthFix"></image>
						<text style="font-size: 12px;">视频上传 不超过500M</text>
					</view>
					<view v-if="info_list[index].path!=''&&item.resource_type=='video'" class="val_images">
						<video :src="info_list[index].path" style="video"></video>
						<view class="del_icon" @click="del_img(index)">
							<image src="../../static/assets/del_icon.png" mode="widthFix"></image>
						</view>
					</view>
				</view>
			</view>


		</view>
		<view class="btm-info">
			<view class="btm-btn" @click="submitInfo()">提交报名</view>
		</view>
	</view>
</template>

<script>
	import common from '../../common/info.js'
	export default {
		data() {
			return {
				infoList: '',
				info_list: [

				],
				sign_info: [

				],
				list_img: {
					path: '',
					id: ''
				},
				personInfo: {
					openid: '',
					method: 'create',
					type: 'article',
					token: ''
				},
				info_data: {

				},
				bl: false,
				top_background: "background:none;color:#fff;",
				top_background_imgurl: "../../static/assets/arrow-left-bold1.png",
				top_style: "",
				top_height: "",
				optionData: '',
				jumpInfo:false,
			}
		},
		created() {
			//获取胶囊按钮的数据
			console.log(uni.getMenuButtonBoundingClientRect());
			let topInfo = uni.getMenuButtonBoundingClientRect();
			let iMheight = (topInfo.height - 40) / 2;
			this.top_height = "height:" + (topInfo.top + iMheight) + "px";
			this.top_style = "top:" + (topInfo.top + iMheight) + "px";
		},
		onLoad(options) {
			this.personInfo.token = uni.getStorageSync('names', 'data').token;
			let routes = getCurrentPages();
			let curRoute = routes[routes.length - 1].route;
			this.curRoutes = curRoute;
			uni.request({
				url: common.WEBSITE_URL + '/api/competition/getConfig',
				success: (res) => {
					if (res.data.code == 0) {
						this.infoList = res.data.data;
					}
				}
			});
			if (options.type = '') {
				this.optionData = '';
			} else {
				this.optionData = options.type;
			}
			this.articleDetails();
		},
		onShow() {
			this.personInfo.token = uni.getStorageSync('names', 'data').token;
			if(this.jumpInfo) {
				uni.request({
					method: 'POST',
					url: common.WEBSITE_URL + '/api/competition/getRegistration?token=' +
						this.personInfo.token + '&channel=' + common.CHANNEL,
					success: (res) => {
						console.log(res.data,Object.keys(res.data.data).length);
				
						if (res.data.code == 0 && (res.data.data.length>0 || Object.keys(res.data.data).length>0)) {
							let nums = 0;
							for (let key in res.data.data) {
								if (Object.prototype.toString.call(this.info_list[
										nums]) === '[object Object]') {
									this.info_list[nums].path = res.data.data[key];
								} else {
									this.info_list[nums] = res.data.data[key];
								}
								nums++;
							}
							console.log(this.info_list)
							uni.showToast({
								icon: 'none',
								title: '已报名，正在前往作品界面'
							});
							this.$forceUpdate();
							uni.request({
								url: common.WEBSITE_URL + '/api/competition/getAllSubmission?token='+this.personInfo.token+'&channel='+ common.CHANNEL,
								success: (res) =>{
									console.log('panyulong',res.data)
									if(res.data.code == 0){
										console.log(uni.getStorageSync('type', 'data'));
										if(res.data.data.article.length>0) {
											console.log(this.articles)
											uni.setStorageSync('type','article');
										}
										else if(res.data.data.miniapp.length>0) {
											uni.setStorageSync('type','miniapp');
										}
										else if(res.data.data.video.length>0) {
											uni.setStorageSync('type','video');
										}
										console.log(uni.getStorageSync('type', 'data'));
									}
									setTimeout(() => {
										uni.navigateTo({
											url: `/pages/sign_info/sign_info?type=${uni.getStorageSync('type', 'data')}`
										})
									}, 1000)
								}
							})
							
						}
					}
				})
			}
		},
		onShareAppMessage(res) {
			return {
				title: this.infoList.share_title,
				path: this.curRoutes,
				imageUrl: this.infoList.share_cover,
			}
		},
		onShareTimeline(res) {
			return {
				title: this.infoList.share_title,
				path: this.curRoutes,
				imageUrl: this.infoList.share_cover,
			}
		},
		methods: {
			submitInfo() {
				console.log(this.personInfo.token)
				if (!this.personInfo.token) {
					uni.showToast({
						title: '暂未登录',
						icon: 'none'
					})
					this.jumpInfo = true;
					setTimeout(() => {
						uni.navigateTo({
							url: `/pages/login/login?jump=sign`
						})
					}, 1500);

				} else {
					this.bl = false;
					for (let item in this.sign_info) {
						if (this.sign_info[item].resource_type == 'none') {
							this.info_data[this.sign_info[item].key] = this.info_list[item];
						} else {
							this.info_data[this.sign_info[item].key] = this.info_list[item].id;
						}
					}
					uni.request({
						method: 'POST',
						url: common.WEBSITE_URL + '/api/competition/register?token=' + this.personInfo
							.token + '&channel=' + common.CHANNEL,
						data: this.info_data,
						success: (res) => {
							console.log(res.data)
							if (res.data.code == 0) {

								uni.showToast({
									icon: 'none',
									title: '已报名，正在前往作品界面'
								})
								uni.requestSubscribeMessage({
									tmplIds: ['mykssE5OuoErGJWoKQYCHFy8wKY2TrSVVxC5rUX_mJQ'],
									success: (res) => {
										if (res.errMsg == 'requestSubscribeMessage:ok') {
											setTimeout(() => {
												uni.navigateTo({
													url: `/pages/sign_info/sign_info?type=${uni.getStorageSync('type', 'data')}`
												})
											}, 1000)
										}
									}
								});

							}
							else if(res.data.code == 2) {
								uni.showToast({
									icon: 'none',
									title: res.data.msg
								})
								setTimeout(()=>{
									uni.reLaunch({
										url:'../sign/sign'
									})
								},2000);
							}
							else {
								uni.showToast({
									icon: 'none',
									title: res.data.msg
								})
								
							}
						}
					})
				}
			},



			// 获取处理接口数据
			articleDetails() {
				// console.log(1535,this.personInfo.openid);

				uni.request({
					url: common.WEBSITE_URL + '/api/competition/getRegistrationForm',
					success: (res) => {
						if (res.data.code == 0) {

							this.sign_info = res.data.data;
							for (let i = 0; i < this.sign_info.length; i++) {
								if (this.sign_info[i].resource_type == 'image' || this.sign_info[i]
									.resource_type == 'video') {
									this.info_list[i] = {
										path: '',
										id: ''
									}
								} else {
									this.info_list[i] = '';
								}
							}
							console.log(this.sign_info);
							uni.request({
								method: 'POST',
								url: common.WEBSITE_URL + '/api/competition/getRegistration?token=' +
									this.personInfo.token + '&channel=' + common.CHANNEL,
								success: (res) => {
									console.log(res.data,Object.keys(res.data.data).length);

									if (res.data.code == 0 && (res.data.data.length>0 || Object.keys(res.data.data).length>0)) {
										let nums = 0;
										for (let key in res.data.data) {
											if (Object.prototype.toString.call(this.info_list[
													nums]) === '[object Object]') {
												this.info_list[nums].path = res.data.data[key];
											} else {
												this.info_list[nums] = res.data.data[key];
											}
											nums++;
										}
										console.log(this.info_list)
										uni.showToast({
											icon: 'none',
											title: '已报名，正在前往作品界面'
										});
										this.$forceUpdate();
										
										setTimeout(() => {
											uni.navigateTo({
												url: `/pages/sign_info/sign_info?type=${uni.getStorageSync('type', 'data')}`
											})
										}, 2000)
									}
								}
							})
						}
					}
				});

			},



			del_img(num) {
				this.info_list[num].path = '';
				this.info_list[num].id = '';
				this.$forceUpdate();
			},
			bindPickerChange(e) { //改变的事件名
				//console.log('picker发送选择改变，携带值为', e.target.value)   用于输出改变索引值
				this.index = e.target.value //将数组改变索引赋给定义的index变量
				this.jg = this.array[this.index] //将array【改变索引】的值赋给定义的jg变量
				//	console.log("籍贯为：",this.jg)		//输出获取的籍贯值，例如：中国
			},
			indexJump(name) {
				uni.navigateTo({
					url: `/pages/${name}/${name}`
				})
			},
			imreturn() {
				uni.navigateBack();
			},
			uploadImg(key, num, module) {

				var that = this;
				uni.chooseImage({
					count: 1,
					success: function(res) {
						uni.showLoading({
							title: '图片上传中'
						});
						if(res.size > common.MAXIMAGE) {
							uni.showModal({
								title: '错误',
								content: '上传失败,超过10M',
								showCancel: false,
							});
						}
						res.tempFilePaths.forEach(path => {
							uni.uploadFile({
								url: common.WEBSITE_URL + '/api/api/multimediaUpload?channel=' +
									common.CHANNEL + '&token=' + that.personInfo.token +
									'&key=' + key + '&module=' + module + '&type=image',
								filePath: path,
								name: key,
								success(res) {
									if (res.data) {
										try {
											console.log(res.data)
											var ret = JSON.parse(res.data);
											console.log(ret)
											// console.log(ret);
											if (ret.code != 0) {
												uni.showModal({
													title: '错误',
													content: '上传失败',
													showCancel: false,
												});
												uni.hideLoading();
												return;
											}
											uni.hideLoading();
											console.log(num, ret)
											that.info_list[num].path = ret.data.url
											that.info_list[num].id = ret.data.file_id;
											this.$forceUpdate();

										} catch (e) {
											console.log(2);
											uni.showModal({
												title: '错误',
												content: '上传失败',
												showCancel: false,
											});
											uni.hideLoading();
										}
									}
								}
							});

						})

					}
				});
			},

			addVideoFun(num, module) {
				var self = this;
				uni.chooseVideo({
					count: 1,
					success: function(res) {
						uni.showLoading({
							title: '视频上传中'
						});
						console.log(res)
						uni.uploadFile({
							url: common.WEBSITE_URL + '/api/api/multimediaUpload?channel=' + common
								.CHANNEL + '&token=' + self.personInfo.token + '&key=video&module=' +
								module + '&type=video', //接口地址
							filePath: res.tempFilePath,
							name: 'video',
							header: {
								Authorization: 'Bearer ' + uni.getStorageSync('access')
							},
							success: (uploadFileRes) => {
								uni.hideLoading();
								let bold = JSON.parse(uploadFileRes.data)
								console.log(bold)
								if (bold.code != 0) {
									uni.showModal({
										title: '错误',
										content: '上传失败',
										showCancel: false,
									});
									return;
								}
								uni.hideLoading();
								self.info_list[num].path = bold.data.url;
								self.info_list[num].id = bold.data.file_id;
								this.$forceUpdate();
							},

						});
					}
				});
			},

			returnHome() {
				uni.reLaunch({
					url: '../index/index'
				})
			},
			onPageScroll(res) {
				//获取距离顶部距离
				let scrollTop = res.scrollTop;
				if (scrollTop <= 10) {
					this.top_background = "background:none;color:#fff;";
					this.top_background_imgurl = "../../static/assets/arrow-left-bold1.png";

				} else {

					this.top_background = "background:rgba(255,255,255,1);color:#333;";
					this.top_background_imgurl = "../../static/assets/arrow-left-bold.png";
				}
			},
		},


	}
</script>

<style lang="scss">
	page {
		width: 100%;
		height: 100%;
		background-color: #010661;
		background-image: url(data:image/png;base64,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);
		background-repeat: no-repeat;
		background-color: 100% 100%;
		background-size: 100%;
	}

	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
		position: fixed;
		z-index: 99;
		top: 0px;
	}

	.top {
		height: 40px;
		background: none;
		width: 100%;
		position: fixed;
		z-index: 99;
		top: 0rpx;
		transition: 0.3s ease all;
	}

	.top-icon {
		width: 26px;
		height: 26px;
		border-radius: 50%;
		text-align: center;
		border: 1px solid #E9E9E9;
		position: absolute;
		left: 24rpx;
		top: 8px;
		line-height: 74rpx;
	}

	.top-icon>image {
		position: relative;
		top: -5px;
		left: 0.5px;
		width: 16px;
	}

	.top-icon>text {
		position: absolute;
		left: 28px;
		display: block;
		width: 30px;
		top: -7px;
	}

	.top-text {
		width: 48%;
		margin-left: 26%;
		text-align: center;
		font-weight: 700;
		font-size: 1.2em;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		line-height: 40px;
	}

	.main {
		margin-top: var(--status-bar-height);
		padding-top: 115rpx;
		width: 90%;
		color: #f9f9f9;
		margin-left: 5%;
	}

	.mian-list {
		display: flex;
		flex-wrap: wrap;
		padding: 1em 0em;
		border-bottom: 1px solid rgba(255, 63, 129, 0.2);
	}

	.list-left {
		width: 30%;
	}

	.im-red {
		display: inline-block;
		width: 1em;
		padding-right: 0.2em;
		color: #FF3F81;
	}

	.mian-list>input {
		width: 70%;
		color: #eee;
	}

	.mian-list>.choice {
		width: 70%;
		text-align: right;
		opacity: 0.9;
		justify-content: flex-end;
		display: flex;

	}

	.arrow {
		width: 2em;
		height: 2em;
		display: inline-block;
	}

	.arrow>image {
		padding-top: 0.2em;
		width: 1.2em;
	}

	.evaluate-image {
		padding: 1em 0;
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
		justify-content: space-between;
	}

	.evaluate-image>view {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 8em;
		width: 42%;
	}

	.evaluate-icon {
		border: 1px dashed rgba(255, 255, 255, 0.5);
		border-radius: 4px;
		display: flex;
		flex-direction: column;
		color: rgba(255, 255, 255, 0.5);
	}

	.evaluate-icon>image {
		width: 3.5em;
	}

	.val_images {
		position: relative;
		background-color: #fff;
	}

	.val_images>video,
	.val_images>image:first-child {
		width: 100%;
		max-height: 8em;
	}

	.del_icon>image {
		width: 2em;
		height: 2em;
		position: absolute;
		top: -0.6em;
		right: -0.6em;
	}

	textarea {
		line-height: 1.8em;
		width: 100%;
		color: #eee;
		opacity: 0.6;
		height: 1.8em;
	}

	.btm-info {
		margin: 2em 0;
		width: 80%;
		margin-left: 10%;
		text-align: center;
		padding-bottom: 5em;
	}


	.btm-btn {
		width: 100%;
		height: 2.4em;
		background-image: linear-gradient(168deg, #FF6898 0%, #FF4181 99%);
		box-shadow: 0px 5px 3px 0px rgba(255, 54, 122, 1);
		border-radius: 1.5em;
		font-size: 1.2em;
		line-height: 2.4em;
		font-weight: 700;
		color: #fff;
		z-index: 999;
	}
</style>
