<template>
	<view class="content" :style="mask ? 'height: 100vh;position: fixed;top: 0;' : ''">
		<view class="status_bar" :style="top_background+top_height">
		</view>
		<view class="top" :style="top_background+top_style">
			<view class="top-icon" @click="returnHome()">
				<image :src="top_background_imgurl" mode="widthFix"></image>
			</view>
			<view class="top-text">{{info_list.short_name}}</view>
		</view>
		<view class="top-title">
			{{info_list.name}}
		</view>
		<view class="top-time">
			<image src="../../static/assets/time1.png" mode=""></image>
			<text>大赛时间：{{info_list.time}}</text>
		</view>

		<view class="stage">
			<view :class="info_list.time_period.reg.status?'stage-list active':'stage-list'">
				<view class="stage-list-time">{{info_list.time_period.reg.time}}</view>
				<view class="stage-list-icon">
					<image
						:src="info_list.time_period.reg.status?'../../static/assets/location.png':'../../static/assets/audition.png'"
						mode="widthFix"></image>
				</view>
				<view class="stage-list-info">{{info_list.time_period.reg.name}}</view>
			</view>

			<view :class="info_list.time_period.general.status?'stage-list active':'stage-list'">
				<view class="stage-list-time">{{info_list.time_period.general.time}}</view>
				<view class="stage-list-icon">
					<image
						:src="info_list.time_period.general.status?'../../static/assets/location.png':'../../static/assets/audition.png'"
						mode="widthFix"></image>
				</view>
				<view class="stage-list-info">{{info_list.time_period.general.name}}</view>
			</view>

			<view :class="info_list.time_period.final.status?'stage-list active':'stage-list'">
				<view class="stage-list-time">{{info_list.time_period.final.time}}</view>
				<view class="stage-list-icon">
					<image
						:src="info_list.time_period.final.status?'../../static/assets/location.png':'../../static/assets/audition.png'"
						mode="widthFix"></image>
				</view>
				<view class="stage-list-info">{{info_list.time_period.final.name}}</view>
			</view>

			<view class="time-line"></view>
		</view>

		<!-- 视频播放 -->
		<view class="video-info2">
			<video object-fit="fill" :src="info_list.video_url" controls></video>
		</view>

		<!-- banner广告板块 -->
		<view class="plate-banner">
			<view class="banner-title">
				<text @click="switchStyle(0)" :class="left_active[0]">图文赛区</text>
				<text @click="switchStyle(1)" :class="left_active[1]">视频赛区</text>
				<text @click="switchStyle(2)" :class="left_active[2]">小程序赛区</text>
				<view :style="'left:' + qiehuan + '%;'" class="banner-line"></view>
			</view>
		</view>

		<!-- 热点文章板块内容 -->
		<view class="main-border">
			<view class="main-content" :style="'left:' + (-qiehuan2*100) + '%;'">
				<view class="article-main">
					<view @click="toExecute(item.url)" v-for="(item,index) in com_content.article" :key="index"
						class="article-list">
						<view class="article-list-left">
							<view class="article-list-left-title">{{item.name}}</view>

							<view class="article-list-left-info2">
								<view class="article-list-left-info1">
									<text>{{item.author.nickname}}</text> |

									{{item.create_time.split(" ")[0]}}
								</view>
								<view>
									<image src="../../static/assets/browse_white.png" mode="widthFix"></image>
									0
								</view>
							</view>
						</view>
						<view class="article-list-right">
							<image :src="item.cover"></image>
						</view>
					</view>
					<view @click="getSubmission(1,'article')" class="more">
						<image v-if="com_content.article.length==0" src="../../static/assets/blue_box.png"
							mode="widthFix">
						</image>
						<view>{{com_content.article.length!=0?"加载更多":"作品正在审核"}}</view>
					</view>
				</view>
				<view class="article-main">

					<!-- 热点视频板块内容 -->
					<view class="video-main">
						<view v-for="(item,index) in com_content.video" class="video-main-list">
							<view @click="showQiehuan(2,3,item.video)" class="video-main-list-img">
								<image :src="item.cover"></image>
								<view class="video-info">
									<view class="video-info-left">
										<view class="video-headImg">
											<image :src="item.author.avatar" mode=""></image>
										</view>
										<view class="video-name">{{item.author.nickname}}</view>
									</view>
									<view class="video-info-right">
										<image src="../../static/assets/browse_white.png" mode="widthFix"></image>
										0
									</view>
								</view>
								<view class="state">
									<image src="../../static/assets/video_icon.png" mode="widthFix"></image>
								</view>
							</view>
							<view class="video-main-list-text">
								<view class="video-main-list-text-title">
									{{item.description}}
								</view>
								<view class="video-main-list-text-time">
									<image src="../../static/assets/time1.png" mode="widthFix"></image>
									{{item.create_time}}
								</view>
							</view>
						</view>

					</view>
					<view @click="getSubmission(2,'video')" class="more">
						<image v-if="com_content.video.length==0" src="../../static/assets/blue_box.png"
							mode="widthFix">
						</image>
						<view>{{com_content.video.length!=0?"加载更多":"作品正在审核"}}</view>
					</view>


					<!-- <view v-show="" class="videoIm">
						
					</view> -->
				</view>
				<view class="article-main">

					<!-- 热点视频板块内容 -->
					<view class="video-main">


						<view class="card-main">
							<view :style="(index+1)%3==0?'margin-right:0':''"
								v-for="(item,index) in com_content.miniapp" class="card-main-list">
								<view @click="getIntoMiniapp(item)" class="card-main-border">
									<image :src="item.cover" mode=""></image>
									<view class="card-list-info">
										<image src="../../static/assets/browse_white.png" mode="widthFix"></image>
										0
									</view>
								</view>
								<view class="card-main-list-text">{{item.name}}</view>
							</view>
						</view>
					</view>
					<view @click="getSubmission(3,'miniapp')" class="more">
						<image v-if="com_content.miniapp.length==0" src="../../static/assets/blue_box.png"
							mode="widthFix">
						</image>
						<view>{{com_content.miniapp.length!=0?"加载更多":"作品正在审核"}}</view>
					</view>
				</view>
			</view>
			<view class="btm-info" catchtouchmove='true'>
				<view class="btm-btn" @click="jump_sign()">{{activeBtmText?activeBtmText:btmtext}}</view>
			</view>
		</view>





		<view class="right-text">
			<view @click="showQiehuan(0,1)">活动规则</view>
			<view @click="showQiehuan(1,1)">大赛简介</view>
		</view>
		<view v-show="mask" class="Mask" catchtouchmove='true'></view>
		<view v-show="maskVideo" class="Mask" catchtouchmove='true'></view>
		<u-mask :show="showes" @touchmove.stop.prevent>
			<view class="warp">
				<view class="rect">
					<scroll-view scroll-y="true" style="width: 100%;height: 100%;">
						<view class="rule-title" style="font-size: 30rpx;text-align: center;padding-bottom: 20rpx;">
							{{info_list.intro_title}}
						</view>
						<view class="rule-text">
							<rich-text :nodes="info_list.intro"></rich-text>
						</view>
					</scroll-view>
					<view @click="showQiehuan(0,0)" class="close">
						<image src="../../static/assets/del_icon.png" style="width: 50rpx;" mode="widthFix"></image>
					</view>
				</view>
			</view>
		</u-mask>
		<u-mask :show="shows">
			<view class="warp">
				<view class="rect">
					<scroll-view scroll-y="true" style="width: 100%;height: 100%;">
						<view class="rule-title" style="font-size: 30rpx;text-align: center;padding-bottom: 20rpx;">
							{{info_list.terms_title}}
						</view>
						<view class="rule-text">
							<rich-text :nodes="info_list.terms"></rich-text>
						</view>
					</scroll-view>
					<view @click="showQiehuan(0,0)" class="close">
						<image src="../../static/assets/del_icon.png" style="width: 50rpx;" mode="widthFix"></image>
					</view>
				</view>
			</view>
		</u-mask>


		<u-mask :show="playVideo.play">
			<view class="warp">
				<view style="width: 90%;height: 300rpx;margin: 0 auto; position: relative;">
					<video autoplay :src="playVideo.url" controls style="width: 100%;"></video>
					<view style="right: -0.8em;" @click="showQiehuan(2,0)" class="close">
						<image style="width: 2em;" src="../../static/assets/del_icon.png" mode="widthFix"></image>
					</view>
				</view>
			</view>
		</u-mask>

	</view>
</template>

<script>
	import common from '../../common/info.js'
	export default {
		data() {
			return {
				shows: false,
				showes: false,
				infoList: '',
				qiehuan: 2,
				qiehuan2: 0,
				left_active: [
					"active", "", "", ""
				],
				top_background: "background:none;color:#fff;",
				top_background_imgurl: "../../static/assets/arrow-left-bold1.png",
				top_style: "",
				top_height: "",

				info_list: {
					name: '首届职业院校融媒体技术应用技能大赛', //大赛名称
					short_name: '', //大赛简称
					time: '', //大赛事件
					time_period: '', //时间段
					terms_title: '', //活动规则标题
					intro_title: '', //大赛简介标题
					video_url: '', //开幕视频
					terms: '', //活动规则
					intro: '', //大赛简介
					share_title: '',
					share_cover: '',
				},
				guize: false,
				jianjie: false,
				mask: false,
				maskVideo:false,
				personInfo: {
					openid: '',
					method: 'create',
					type: '',
					token: ""
				},
				com_content: {
					article: [],
					miniapp: [],
					video: [],
				},
				playVideo: {
					play: false,
					url: ""
				},
				contentNumber: {
					numstr: 0,
					numend: 10,
				},
				btmtext: '我要报名',
				activeBtmText: '',
				topScroll: 0
			}
		},

		onLoad(option) {
			//获取胶囊按钮的数据
			console.log(uni.getMenuButtonBoundingClientRect());
			let topInfo = uni.getMenuButtonBoundingClientRect();
			let iMheight = (topInfo.height - 40) / 2;
			this.top_height = "height:" + (topInfo.top + iMheight) + "px";
			this.top_style = "top:" + (topInfo.top + iMheight) + "px";

			//获取缓存数据
			this.personInfo.token = uni.getStorageSync('names', 'data').token;
			this.switchStyle(option.url)
			uni.request({
				url: common.WEBSITE_URL + '/api/competition/getConfig',
				success: (res) => {
					if (res.data.code == 0) {
						this.info_list.name = res.data.data.name;
						this.info_list.short_name = res.data.data.short_name;
						this.info_list.time = res.data.data.time;
						this.info_list.time_period = res.data.data.time_period;
						this.info_list.terms_title = res.data.data.terms_title;
						this.info_list.intro_title = res.data.data.intro_title;
						this.info_list.video_url = res.data.data.video_url;
						this.info_list.terms = res.data.data.terms;
						this.info_list.intro = res.data.data.intro;
						this.info_list.share_title = res.data.data.share_title;
						this.info_list.share_cover = res.data.data.share_cover;
					}
				}
			});
			this.getSubmission(0);

		},
		onShow() {
			uni.request({
				method: 'POST',
				url: common.WEBSITE_URL + '/api/competition/getRegistration?token=' + this.personInfo.token +
					'&channel=' + common.CHANNEL,
				success: (res) => {
					if (res.data.code == 0 && (res.data.data.length > 0 || Object.keys(res.data.data).length >
							0)) {
						this.btmtext = '作品提交'

						uni.request({
							url: common.WEBSITE_URL + '/api/competition/getAllSubmission?token=' + this
								.personInfo.token +
								'&channel=' + common.CHANNEL + '&type=' + uni.getStorageSync('type',
									'data'),
							success: (res) => {
								console.log(res.data)
								console.log(res.data.data[uni.getStorageSync('type', 'data')][0])
								if (res.data.data[uni.getStorageSync('type', 'data')][0]) {
									this.btmText = '修改作品';
									this.activeBtmText = '修改作品'
									console.log(this.btmText)
									this.$forceUpdate();
									this.personInfo.method = 'update';
								}
							},
						})
					}
				}
			})
		},
		//分享好友
		onShareAppMessage(res) {
			return {
				title: this.info_list.share_title,
				path: this.curRoutes,
				imageUrl: this.info_list.share_cover,
			}
		},
		//分享朋友圈
		onShareTimeline(res) {
			return {
				title: this.info_list.share_title,
				path: this.curRoutes,
				imageUrl: this.info_list.share_cover,
			}
		},
		methods: {
			getSubmission(num, state = 1) {
				if (num != 0 && this.com_content[state].length < this.contentNumber.numstr) {
					uni.showToast({
						icon: 'none',
						title: '没有更多了噢~',
					})
				} else {
					if (num != 0) {
						this.contentNumber.numend = this.contentNumber.numend + 10;
					}
					uni.request({
						url: common.WEBSITE_URL + '/api/activity/getSubmissions?limit=0&offset=' + this
							.contentNumber.numend,
						success: (res) => {
							console.log(res.data)
							if (res.data.code == 0) {
								let datas = res.data.data;
								if (state == 1) {
									for (let val in datas.article) {
										this.com_content.article.push(datas.article[val]);
									}
									for (let val in datas.miniapp) {
										this.com_content.miniapp.push(datas.miniapp[val]);
									}
									for (let val in datas.video) {
										this.com_content.video.push(datas.video[val]);
									}
								} else {
									console.log(datas[state].length, this.com_content[state].length)
									if (datas[state].length <= this.com_content[state].length) {
										uni.showToast({
											icon: 'none',
											title: '没有更多了~',
										})
									} else {
										this.com_content[state] = datas[state];
										uni.showToast({
											icon: 'none',
											title: '加载成功',
										})
									}

								}

							} else {
								uni.showToast({
									icon: 'none',
									title: res.data.msg,
								})
							}
						}
					});
				}


			},
			showQiehuan(num, state, url) {
				if (state == 0) {
					this.shows = false;
					this.showes = false;
					// this.guize = false;
					// this.jianjie = false;
					this.playVideo.play = false;
					this.maskVideo = false;
					// this.mask = false;
					this.mask = false;
				} else if (num == 0) {
					this.shows = true;
					this.mask = true;
				} else if (num == 1) {
					this.showes = true;
					this.mask = true;
				} else if (num == 2) {
					console.log(url)
					this.playVideo.play = true;
					this.maskVideo = true;
					this.playVideo.url = url;
				}
			},


			imreturn() {
				uni.navigateBack();
			},
			switchStyle(num) {
				this.qiehuan2 = num;
				this.left_active = ["", "", "", ];
				this.left_active[num] = "active";
				if (num == 0) {
					this.qiehuan = 4;
				} else if (num == 1) {
					this.qiehuan = 42;
				} else if (num == 2) {
					this.qiehuan = 83;
				}
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
			jump_sign() {
				if (this.personInfo.token == '') {
					uni.navigateTo({
						url: '../login/login'
					})
				} else {
					uni.request({
						method: 'POST',
						url: common.WEBSITE_URL + '/api/competition/getRegistration?token=' + this.personInfo
							.token + '&channel=' + common.CHANNEL,
						success: (res) => {
							console.log(res.data);

							if (res.data.code == 0 && (res.data.data.length > 0 || Object.keys(res.data.data)
									.length > 0)) {
								uni.navigateTo({
									url: `/pages/sign_info/sign_info?type=${uni.getStorageSync('type', 'data')}`
								})
							} else {
								uni.navigateTo({
									url: `/pages/sign/sign`
								})
							}
						}
					})
				}
			},
			indexJump(name) {
				console.log('进来了')
				uni.switchTab({
					url: `/pages/${name}/${name}`
				})
			},
			toExecute(imurl) {
				uni.navigateTo({
					url: '/pages/information/information?url=' + imurl
				})
			},
			getIntoMiniapp(item) {
				wx.navigateToMiniProgram({
					appId: item.appid, //appid
					path: item.path, //path
					extraData: { //参数

					},
					envVersion: 'release', //开发版develop 开发版 trial   体验版 release 正式版 
					success(res) {
						console.log('成功')
						// 打开成功
					},
				})
			},
			returnHome() {
				uni.reLaunch({
					url: '../index/index'
				})
			}

		}
	}
</script>

<style>
	.content {
		overflow: hidden !important;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: start;
		font-family: PingFangSC-Regular;
		background-color: #fff;
		color: #fff;
		background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAu4AAAQdCAMAAAA2FT11AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo3NTk3N0JBM0FFNDIxMUVCQkYwRDk4RjIxQzVGODg1MCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo3NTk3N0JBNEFFNDIxMUVCQkYwRDk4RjIxQzVGODg1MCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjc1OTc3QkExQUU0MjExRUJCRjBEOThGMjFDNUY4ODUwIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjc1OTc3QkEyQUU0MjExRUJCRjBEOThGMjFDNUY4ODUwIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+uJlX0QAAAMBQTFRFABCKAAhVAAF2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);
		background-size: 100%;
		background-position: 0 0;
		background-repeat: no-repeat;
		background-color: rgba(2, 6, 132, 1);
		min-height: 80em;
	}


	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
		position: fixed;
		z-index: 99;
		top: 0px;
		background: none;
		transition: 0.3s ease all;
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


	.top-title {
		width: 75%;
		margin-top: 5.5em;
		font-weight: 700;
		text-align: center;
		font-size: 1.75em;
		line-height: 1.5em;
		display: -webkit-box;
		overflow: hidden;
		text-overflow: ellipsis;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	.top-time {
		margin: 1em 0em;
		width: 74%;
		background-image: url(../../static/assets/sign_bc1.png);
		background-size: 100%;
		background-repeat: no-repeat;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		height: 2em;
	}

	.top-time>text {
		font-size: 1em;
	}

	.top-time>image {
		width: 1em;
		height: 1em;
		margin-right: 0.2em;
		position: relative;
		top: 0.1em;
	}

	.stage {
		width: 78%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		text-align: center;

	}

	.stage>.active {
		color: rgba(255, 63, 129, 1);
	}

	.stage>view {
		color: rgba(255, 255, 255, 0.4);
	}

	.stage-list {
		width: 28%;
		position: relative;
		z-index: 10;
	}

	.stage-list-icon>image {
		margin: 0.5em 0;
		width: 1em;
	}

	.stage-list-info {
		font-size: 26rpx;

	}

	.time-line {
		height: 1px;
		position: absolute;
		width: 41%;
		background-color: #f9f9f9;
		opacity: 0.2;
		z-index: 1;
	}

	.video-info2 {
		width: 90%;
		height: 15em;
		border-radius: 10px;
		overflow: hidden;
		border: 3px solid rgba(255, 63, 129, 1);
		margin: 2em 0em;
	}

	.video-info2>video {
		width: 100%;
		height: 15em;
	}

	.plate-banner {
		position: relative;
		width: 90%;
	}

	.banner-title {
		display: flex;
		padding-bottom: 0.8em;
		justify-content: space-between;
	}

	.banner-title>text {
		opacity: 0.6;
	}

	.banner-title>.active {
		opacity: 1;
		font-size: 1.2em;
		color: #FF3F81;
		font-weight: 700;
		position: relative;
		top: -0.1em;
	}

	.banner-line {
		position: absolute;
		width: 3em;
		height: 4px;
		background-color: #FF3F81;
		bottom: 0;
		left: 4%;
		transition: left 0.3s ease;
	}


	.article-list {
		margin-top: 1em;
		display: flex;
		flex-direction: row;
	}

	.article-list>.article-list-left {
		width: 65%;
		display: flex;
		justify-content: space-between;
		flex-direction: column;
		height: 4.6em;
		overflow: hidden;
		text-overflow: ellipsis;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	.article-list-left-title {
		display: -webkit-box;
		font-weight: 700;
		overflow: hidden;
		text-overflow: ellipsis;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	.article-list-left-info1 {
		font-size: 26rpx;

		opacity: 0.8;
		color: #fff;
	}

	.article-list-left-info1>text:first-child {
		padding-right: 0.5em;
	}


	.article-list-left-info2 image {
		width: 1.1em;
		position: relative;
		top: 2px;
		margin-right: 0.4em;
	}

	.article-list-left-info2 {
		width: 100%;
		font-size: 26rpx;

		opacity: 0.5;
		color: #fff;
		display: flex;
		justify-content: space-between;
		flex-direction: row;
	}

	.article-list-right {
		width: 28%;
		margin-left: 7%;
		height: 4.6em;
		border-radius: 6px;
		overflow: hidden;
	}

	.article-list-right>image {
		width: 100%;
		height: 5em;
	}

	.video-main {
		width: 100%;
		display: flex;
		justify-content: space-between;
		flex-direction: row;
		flex-wrap: wrap;
	}

	.video-main-list {
		margin-top: 1.4em;
		width: 48%;
		position: relative;
	}

	.video-main-list-img {
		position: relative;
		width: 100%;
		height: 8.6em;
		border-radius: 6px;
		overflow: hidden;
	}

	.video-main-list-img>image {
		width: 100%;
		height: 8.6em;
	}


	.video-info {
		width: 100%;
		font-size: 26rpx;

		display: flex;
		justify-content: space-between;
		flex-direction: row;
		align-items: center;
		position: absolute;
		bottom: 0em;
		padding: 4%;
		color: #fff;
		background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.7));
	}

	.video-info-left {
		width: 66%;
		display: flex;
		justify-content: left;
		flex-direction: row;
		align-items: center;
	}

	.video-info-right {
		width: 34%;
		font-size: 26rpx;

		position: relative;
		top: 0.1em;
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.video-info-right>image {
		width: 28%;
		position: relative;
		padding-right: 0.2em;
	}

	.video-headImg {
		width: 2em;
		height: 2em;
		border-radius: 50%;
		overflow: hidden;
		padding-right: 0.5em;
	}

	.video-headImg>image {
		width: 2em;
		height: 2em;
	}

	.state {
		position: absolute;
		left: 50%;
		margin-left: -0.8em;
		top: 50%;
		margin-top: -0.8em;
	}

	.state>image {
		width: 1.6em;
		z-index: 5;
	}

	.video-main-list-text {
		margin-top: 0.5em;
	}

	.video-main-list-text-title {
		display: -webkit-box;
		font-weight: 700;
		overflow: hidden;
		text-overflow: ellipsis;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	.video-main-list-text-time image {
		width: 1.1em;
		position: relative;
		top: 2px;
		margin-right: 0.4em;
	}

	.video-main-list-text-time {
		margin-top: 0.5em;
		width: 100%;
		font-size: 26rpx;

		color: rgba(255, 255, 255, 0.5);
	}

	.card-main {
		width: 100%;
		display: flex;
		justify-content: start;
		flex-direction: row;
		margin-top: 1em;

	}

	.card-main>.card-main-list {
		width: 31%;
		margin-right: 4%;
		position: relative;
	}

	.card-main-border {
		height: 10em;
		overflow: hidden;
		border-radius: 6px;
		width: 100%;
		position: relative;
	}

	.card-main-list image {
		width: 100%;
		height: 10em;
		overflow: hidden;
	}

	.card-main-list-text {
		font-weight: 700;
		margin-top: 0.5em;
		display: -webkit-box;
		overflow: hidden;
		text-overflow: ellipsis;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	.card-list-info {
		position: absolute;
		bottom: 0em;
		box-sizing: 99;
		line-height: 2em;
		width: 100%;
		background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.7));
		display: flex;
		justify-content: start;
		flex-direction: row;
		font-size: 26rpx;
		padding-left: 35rpx;

	}

	.card-list-info>image {
		width: 1.2em;

		position: relative;
		top: 0.4em;
		margin-right: 0.4em;
	}

	.btm-info {
		margin: 2em 10%;
		width: 80%;
		position: fixed;
		bottom: -1.5em;
		text-align: center;
		z-index: 999;
	}

	.more {
		text-align: center;
		padding: 2em 0 4em;
		color: #fff;
	}

	.more>image {
		width: 200rpx;
		margin: 1em 0 2em;
		padding: 20rpx 30rpx;
	}

	.btm-info>view:first-child {
		margin-bottom: 1em;
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
	}

	.main-border {
		width: 100%;
		overflow: hidden;
		margin-bottom: 1em;
	}

	.main-content {
		width: 300%;
		display: flex;
		justify-content: space-around;
		flex-direction: row;
		position: relative;
		left: 0%;
		transition: 0.3s ease left;
	}

	.article-main {
		width: 30%;
		margin: 1em 0;
	}

	.right-text {
		position: absolute;
		right: 0px;
		top: 18.2em;
		z-index: 2;
	}

	.right-text>view {
		padding: 0.5em 0.8em;
		background: #001592;
		border-radius: 8px 0 0 8px;
		opacity: 0.8;
		font-family: PingFangSC-Regular;
		color: #FFFFFF;
		text-align: center;
		font-weight: 400;
		font-size: 26rpx;

		margin-bottom: 0.5em;
	}

	.show-rule {
		width: 80%;
		height: 35em;
		position: fixed;
		top: 15%;
		left: 10%;
		background-color: #fff;
		border-radius: 8px;
		z-index: 999;
		display: flex;
		align-items: center;
		color: #333;
		flex-direction: column;

	}

	.show-rule>.rule-title {
		width: 90%;
		text-align: center;
		font-size: 1.1em;
		display: -webkit-box;
		overflow: hidden;
		text-overflow: ellipsis;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		padding: 1em 0;
	}

	.Mask {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		right: 0;
		background-color: #000;
		opacity: 0.7;
		z-index: 88;
	}

	.show-rule>.rule-text {
		text-align: center;
		width: 90%;
		height: 35em;
		font-size: 0.8em;
		overflow: scroll;
	}

	::-webkit-scrollbar {
		height: 0;
		width: 0;
		color: transparent;
	}

	.close {
		position: absolute;
		top: -16rpx;
		right: -14rpx;
	}

	.close>image {
		width: 30rpx;
		height: 30rpx;
	}

	.video-name {
		padding-left: 1em;
		display: -webkit-box;
		overflow: hidden;
		text-overflow: ellipsis;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
	}

	.videoIm {
		position: fixed;
		top: 35%;
		width: 90%;
		border-radius: 8px;
		text-align: center;
		z-index: 99;
		padding-top: 3px;
	}

	.videoIm>video {
		width: 100%;
		border-radius: 8px;
	}

	.warp {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;

	}

	.rect {
		width: 84%;
		height: 70%;
		background-color: #fff;
		opacity: 1;
		color: #555;
		padding: 20rpx;
		font-size: ;
		border-radius: 20rpx;
		position: relative;
		font-size: 24rpx;
	}
</style>
