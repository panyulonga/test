<template>
	<view class="content">
		<view class="status_bar" :style="top_height">
		</view>
		<view class="top" :style="top_style">
			<view class="top-icon" @click="imreturn()">
				<image src="../../static/assets/arrow-left-bold.png" mode="widthFix"></image>
			</view>
			<view class="top-text">登录</view>
		</view>
		<!-- 顶部搜索板块 -->
		<view class="main-topbtn">
			<view>
				<image src="../../static/assets/login_icon.png" mode="widthFix"></image>
			</view>
			<view class="btm-info">
				<button v-if="platforms == 'windows' ||platforms == 'linux' ||  platforms=='mac'" class="btm-btn"
					open-type="getUserInfo" @getuserinfo="appLoginWx">立即登录</button>
				<button v-else class="btm-btn" @click="getUserInfos">立即登录</button>
			</view>
		</view>

	</view>
</template>

<script>
	import common from '../../common/info.js'
	export default {
		data() {
			return {
				title: 'Hello',
				top_style: "",
				top_height: "",
				platforms: '',
				jump_info: '',
			}
		},
		onLoad(options) {
			this.platforms = uni.getSystemInfoSync().platform;
			//获取胶囊按钮的数据
			console.log(uni.getMenuButtonBoundingClientRect());
			let topInfo = uni.getMenuButtonBoundingClientRect();
			let iMheight = (topInfo.height - 40) / 2;
			this.top_height = "height:" + (topInfo.top + iMheight) + "px";
			this.top_style = "top:" + (topInfo.top + iMheight) + "px";
			console.log(options)
			this.jump_info = options.jump;
			console.log(this.jump_info)
		},
		methods: {
			imreturn() {
				uni.navigateBack();
			},
			appLoginWx() {
				var that = this;
				uni.getProvider({
					service: 'oauth',
					success: function(res) {
						if (~res.provider.indexOf('weixin')) {
							uni.getUserInfo({
								provider: 'weixin',
								success: (info) => {
									uni.setStorage({
										key: 'userInfoes',
										data: info.userInfo,
									});
									var avatarUrls = info.userInfo.avatarUrl;
									var nickNames = info.userInfo.nickName;
									uni.login({
										provider: 'weixin',
										success: function(loginRes) {
											var codes = loginRes.code;
											uni.request({
												url: common.WEBSITE_URL +
													'/api/member/unifyLogin/platform/' +
													common
													.CHANNEL + '?',
												data: {
													code: codes,
												},
												success: (res1) => {
													if (res1.data.code ==
														0) {
														var tokens = res1
															.data.data
															.token;
														uni.setStorage({
															key: 'names',
															data: res1
																.data
																.data,
														});
														uni.request({
															url: common
																.WEBSITE_URL +
																'/api/member/updateUserInfo/platform/' +
																common
																.CHANNEL +
																'?token=' +
																tokens,
															header: {
																'Content-Type': 'application/x-www-form-urlencoded'
															},
															method: 'POST',
															data: {
																nickname: nickNames,
																avatar: avatarUrls,
															},
															success: (
																res3
															) => {
																if (res3.data.code ==0) {
																	uni
																		.hideLoading();
																	uni.showToast({
																		title: '登录成功',
																		icon: 'none'
																	})
																	uni.setStorage({
																		key: 'type',
																		data: '',
																	});
																	if (that.jump_info) {
																		uni.request({
																			method: 'POST',
																			url: common.WEBSITE_URL + '/api/competition/getRegistration?token=' +
																				tokens + '&channel=' + common.CHANNEL,
																			success: (res) => {
																				console.log(res.data,Object.keys(res.data.data).length);
																		
																				if (res.data.code == 0 && (res.data.data.length>0 || Object.keys(res.data.data).length>0)) {
																					uni.showToast({
																						icon: 'none',
																						title: '已报名，正在前往作品界面'
																					});
																					uni.request({
																						url: common.WEBSITE_URL + '/api/competition/getAllSubmission?token='+tokens+'&channel='+ common.CHANNEL,
																						success: (res) =>{
																							if(res.data.code == 0){
																								if(res.data.data.article.length>0) {
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
																				else {
																					setTimeout
																						(
																							function() {
																								uni
																									.navigateBack();
																							},
																							1000
																						);
																				}
																			}
																		})
																	} else {
																		setTimeout
																			(
																				function() {
																					uni
																						.navigateBack();
																				},
																				1000
																			);
																	}

																} else {
																	uni.showToast({
																		title: res
																			.data
																			.msg,
																		icon: 'none'
																	})
																}
															}
														})
													}
												}
											})
										}
									})
								}
							})
						}
					}
				})
			},
			getUserInfos() {
				var that = this
				uni.getUserProfile({
					desc: '展示用户信息',
					success: res => {
						uni.showLoading({
							title: '正在登录'
						})
						uni.setStorage({
							key: 'userInfoes',
							data: res.userInfo,
						});
						var avatarUrls = res.userInfo.avatarUrl;
						var nickNames = res.userInfo.nickName;
						uni.login({
							provider: 'weixin',
							success: function(loginRes) {
								var codes = loginRes.code;
								uni.request({
									url: common.WEBSITE_URL +
										'/api/member/unifyLogin/platform/' + common
										.CHANNEL + '?',
									data: {
										code: codes,
									},
									success: (res1) => {
										if (res1.data.code == 0) {
											var tokens = res1.data.data.token;
											uni.setStorage({
												key: 'names',
												data: res1.data.data,
											});
											uni.request({
												url: common.WEBSITE_URL +
													'/api/member/updateUserInfo/platform/' +
													common.CHANNEL +
													'?token=' + tokens,
												header: {
													'Content-Type': 'application/x-www-form-urlencoded'
												},
												method: 'POST',
												data: {
													nickname: nickNames,
													avatar: avatarUrls,
												},
												success: (res3) => {
													if (res3.data.code ==
														0) {
														uni.hideLoading();
														uni.showToast({
															title: '登录成功',
															icon: 'none'
														})
														uni.setStorage({
															key: 'type',
															data: '',
														});
														if (res3.data.code ==0) {
															uni
																.hideLoading();
															uni.showToast({
																title: '登录成功',
																icon: 'none'
															})
															uni.setStorage({
																key: 'type',
																data: '',
															});
															if (that.jump_info) {
																uni.request({
																	method: 'POST',
																	url: common.WEBSITE_URL + '/api/competition/getRegistration?token=' +
																		tokens + '&channel=' + common.CHANNEL,
																	success: (res) => {
																		console.log(res.data,Object.keys(res.data.data).length);
																
																		if (res.data.code == 0 && (res.data.data.length>0 || Object.keys(res.data.data).length>0)) {
																			uni.showToast({
																				icon: 'none',
																				title: '已报名，正在前往作品界面'
																			});
																			uni.request({
																				url: common.WEBSITE_URL + '/api/competition/getAllSubmission?token='+tokens+'&channel='+ common.CHANNEL,
																				success: (res) =>{
																					if(res.data.code == 0){
																						if(res.data.data.article.length>0) {
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
																		else {
																			setTimeout
																				(
																					function() {
																						uni
																							.navigateBack();
																					},
																					1000
																				);
																		}
																	}
																})
															} else {
																setTimeout
																	(
																		function() {
																			uni
																				.navigateBack();
																		},
																		1000
																	);
															}
														
														} else {
															uni.showToast({
																title: res
																	.data
																	.msg,
																icon: 'none'
															})
														}

													} else {
														uni.showToast({
															title: res
																.data
																.msg,
															icon: 'none'
														})
													}
												}
											})
										}
									}
								})
							}
						})

					},
					fail: res => {
						uni.showToast({
							title: "用户拒绝",
							icon: "none"
						});
					}
				})
			},
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		font-family: PingFangSC-Regular;
		background-color: #fff;
		color: #333;
	}

	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
		position: fixed;
		z-index: 99;
		background-color: #fff;
		top: 0px;
	}

	.top {
		height: 40px;
		background-color: #fff;
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


	.main-topbtn {
		width: 90%;
		margin-top: var(--status-bar-height);
		padding-top: 100rpx;
	}

	.main-topbtn>view {
		width: 80%;
		margin-left: 10%;
		text-align: center;
	}

	.main-topbtn>view {
		margin-top: 5em;
	}

	.main-topbtn>view>image {
		width: 6em;
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
