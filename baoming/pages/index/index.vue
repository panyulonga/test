<template>
	<view class="content">
		<view class="status_bar" :style="top_height">
		</view>
		<view class="top" :style="top_style">
			<view class="top-text" @click="indexJump('sign')">齐风杯</view>
		</view>
		<!-- 顶部搜索板块 -->
		<view :style="top_style_margin" class="top-search">
			<span>
				<image src="../../static/assets/icon_search.png" mode=""></image>
			</span>
			<input type="text" placeholder="搜索关键字" />
		</view>
		<view class="banner-title">
			<text @click="switchStyle(0)" :class="left_active[0]">{{titleVideo.name}}</text>
			<text @click="switchStyle(1)" :class="left_active[1]">发现</text>
			<text @click="indexJump('sign_up')" :class="left_active[2]">报名</text>
		</view>
		<view class="border-main">
			<view :style="'right:' + qiehuan + '%'" class="border-main-wid">
				<view class="border-plate">
					<view style="width: 200rpx;margin: 0 auto;position: absolute;top: 6em;left: 10em;">
						<image style="width: 100%;" src="../../static/assets/pink_box.png" mode="widthFix"></image>
					</view>
				</view>
				<view class="border-plate">
					<!-- banner广告板块 -->
					<view class="plate-banner">
						<view class="banner-img">
							<view class="home">
								<swiper indicator-dots circular indicator-color="rgba(255,255,255,1)"
									indicator-active-color="rgba(255,63,129,1)" autoplay interval=3000>

									<swiper-item v-for="(item,index) in slides" :key="index" @click="carousel(item)">
										<!-- <navigator :url="item.jump_url"> -->
											<image id="service" :src="item.banner_img" mode=""></image>
										<!-- </navigator> -->
									</swiper-item>
								</swiper>
							</view>
						</view>
					</view>

					<!-- 赛区板块 -->
					<view class="icon-btn">
						<view class="list-icon" @click="indexJump('sign_up',0)">
							<image src="../../static/assets/area1.png" mode="widthFix"></image>
							<text>图文赛区</text>
						</view>
						<view class="list-icon" @click="indexJump('sign_up',1)">
							<image src="../../static/assets/area2.png" mode="widthFix"></image>
							<text>视频赛区</text>
						</view>
						<view class="list-icon" @click="indexJump('sign_up',2)">
							<image src="../../static/assets/area3.png" mode="widthFix"></image>
							<text>小程序赛区</text>
						</view>
						<view class="list-icon">
							<image src="../../static/assets/area4.png" mode="widthFix"></image>
							<text>音频赛区</text>
						</view>
					</view>

					<!-- 活动公告板块 -->
					<view class="notice">
						<image src="../../static/assets/notice_text_img.png" mode="widthFix"></image>
						<swiper autoplay interval=2500 vertical="true" circular="true" class="notice-text">
							<swiper-item v-for="(item,index) in notices" @click="toExecute(item)" :key="index">
								<!-- navigator :url="item.url" -->
									<view class="notice-text">
										<view>{{item.notice_title}}</view>
									</view>
								<!-- </navigator> -->
							</swiper-item>
						</swiper>
						<!-- <view class="notice-text" v-for="(item,index) in " :key="index">{{item.notice_content}}</view> --> 
						<view class="notice-icon">
							<image src="../../static/assets/right_icon.png" mode="widthFix"></image>
						</view>
					</view>
					<view v-if="articlesList.length != 0">
						<!-- 热点文章板块标题 -->
						<view class="article-title">
							<view class="aricle-text">
								<text>{{articleTitle}}</text>
								<text class="aricle-bc"></text>
							</view>
							<view class="article-icon" @click="more(0,10)">
								更多
								<image src="../../static/assets/right_icon.png" mode="widthFix"></image>
							</view>
						</view>
						<!-- 热点文章板块内容 -->
						<view class="article-main">
							<view class="article-list" v-for="(item,index) in articlesList" :key="index"
								@click="articlesTap(item.id)">
								<view class="article-list-left">
									<view class="article-list-left-title">{{item.title}}</view>
									<view class="article-list-left-info2">
										<view class="article-list-left-info1">
											<text>{{item.author.nickname}}</text> |
											{{item.create_time.slice(0,10)}}
										</view>
										<view class="article-list-left-info3">
											<image src="../../static/assets/browse.png" mode="widthFix"></image>
											{{item.views}}
										</view>
									</view>
								</view>
								<view class="article-list-right">
									<image :src="item.cover"></image>
								</view>
							</view>
						</view>
					</view>

					<view v-if="videoTitle.length != 0">
						<!-- 热点视频板块标题 -->
						<view class="article-title">
							<view class="aricle-text">
								<text>{{videoTitle}}</text>
								<text class="aricle-bc"></text>
							</view>
							<view class="article-icon" @click="more(1,10)">
								更多
								<image src="../../static/assets/right_icon.png" mode="widthFix"></image>
							</view>
						</view>
						<!-- 热点视频板块内容 -->
						<view class="video-main">
							<view class="video-main-list" v-for="(item,index) in videoTitles" :key="index"
								@click="articlesTap(item.id)">
								<view class="video-main-list-img">
									<image :src="item.cover"></image>
									<view class="video-info">
										<view class="video-info-left">
											<view class="video-headImg">
												<!-- {{item.author.avatar}} -->
												<image :src="item.author.avatar" mode=""></image>
											</view>
											<view class="video-name">{{item.author.nickname}}</view>
										</view>
										<view class="video-info-right">
											<image src="../../static/assets/browse_white.png" mode="widthFix"></image>
											{{item.views}}
										</view>
									</view>
									<view class="state">
										<image src="../../static/assets/video_icon.png" mode="widthFix"></image>
									</view>
								</view>
								<view class="video-main-list-text">
									<view class="video-main-list-text-title">
										{{item.title}}
									</view>
									<view class="video-main-list-text-time">
										<image src="../../static/assets/time.png" mode="widthFix"></image>
										{{item.create_time.slice(0,10)}}
									</view> 
								</view>
							</view>
						</view>
					</view>
					
 
					
					<!-- 火热报名板块标题 -->
					<!-- <view class="article-title">
						<view class="aricle-text fiery">
							<view>
								<image src="../../static/assets/fiery_icon.png" mode="widthFix"></image>{{fieryTitle}}
							</view>
							<text class="aricle-bc"></text>
						</view>
						<view class="article-icon" @click="indexJump('sign_up')" v-if="fieryTitles.length >= 3">
							更多
							<image src="../../static/assets/right_icon.png" mode="widthFix"></image>
						</view>
					</view>
 -->

					<!-- 火热报名板块内容 -->
					<!-- <view class="article-main">
						<view class="article-list article-list2" v-for="(item,index) in fieryTitles" :key="index" @click="articlesTap(item.id)"> 
							<view style="margin-left: 0;margin-right: 4%;" class="article-list-right">
								<image src="../../static/assets/imginfo1.png"></image>
								<view class="card-list-info">
									<image src="../../static/assets/add-account.png" mode="widthFix"></image>
									{{item.views}}人报名
								</view>
							</view>
							<view class="article-list-left">
								<view class="article-list-left-title">{{item.title}}</view>

								<view class="article-list-left-info2">
									<view style="font-size: 22rpx">
										<text style="color: #555;">截至报名时间：</text>
										{{item.update_time.slice(0,10)}}
									</view>
									<view @click="indexJump('sign_info')" class="sign-up">报名</view>
								</view>
							</view>
						</view>
					</view> -->
				</view>
				<view class="border-plate"></view>
			</view>
		</view>
		<u-popup v-model="shows" mode="center" width="80%" closeable="true" :border-radius="20" :mask-close-able="false">
			<view style="padding: 50rpx">
				<view class="noticeTitle">{{noticeTitle}}</view>
				<view class="noticeContent">{{noticeContent}}</view>
			</view>
			
		</u-popup>
		<view class="btm-content">
			<view>版权所有</view>
			<image src="../../static/assets/copyright.png" mode="widthFix"></image>
		</view>
	</view>
</template>

<script>
	import common from '../../common/info.js'
	export default {
		data() {
			return {
				curRoutes:'',
				infoList:'',
				noticeContent:'',
				noticeTitle:'',
				shows:false,
				slides: '',
				titleVideo:'',
				notices: '',
				articleTitle: '',
				articlesList: '',
				articlesLists:"",
				videoTitle: '',
				videoTitles: '',
				videoTitlese:'',
				fieryTitle: '',
				fieryTitles: '',
				fieryTitlese:'',
				title: 'Hello',
				qiehuan: 100,
				left_active: [
					"", "active", ""
				],
				top_style: "",
				top_height: "",
				top_style_margin:""
			}
		},
		created() {
			//获取胶囊按钮的数据
			console.log(uni.getMenuButtonBoundingClientRect());
			let topInfo = uni.getMenuButtonBoundingClientRect();
			let iMheight = (topInfo.height - 40) / 2;
			this.top_style_margin = "margin-top:" + (topInfo.top + 45) + "px";
			this.top_height = "height:" + (topInfo.top + iMheight) + "px";
			this.top_style = "top:" + (topInfo.top + iMheight) + "px";
			console.log()
		},
		onLoad() {
			this.broadcast();
			this.articlelist();
			this.notice();
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
			uni.request({
				url: common.WEBSITE_URL + '/api/news/getCategoryList?display_location=' + '视频',
				success: (res) => {
						console.log(res.data)
					if (res.data.code == 0) {
						console.log(res.data)
					}
				}
			});
		},
		onShareAppMessage(res) {
			return{
				title:this.infoList.share_title,
				path:this.curRoutes,
				imageUrl:this.infoList.share_cover,
			}
		},
		onShareTimeline(res) {
			return{
				title:this.infoList.share_title,
				path:this.curRoutes,
				imageUrl:this.infoList.share_cover,
			}
		},
		onPullDownRefresh() {
			setTimeout(()=>{
				uni.reLaunch({
					url:'../index/index'
				})
			},1000);
		},
		methods: {
			carousel(option) {
				if (option.sort == 0) {
					uni.navigateTo({     //内部链接
						url: '../../' + option.jump_url
					})
				} else if (option.sort == 2) {   //外部链接
					uni.navigateTo({
						url:  '/pages/information/information?url='+ option.jump_url
					})
				} else if (option.sort == 100) {
					uni.navigateTo({    //文章
						url: '../image_text/image_text?index=' + option.article_id
					})
				}
			},
			more(index,num) {
				if (index == 0) {
					this.articlesList = this.articlesLists.slice(0,num)
				}
				else if (index == 1) {
					if(this.videoTitlese.length <= num) {
					this.videoTitles = this.videoTitlese;
					}
				}
				else if (index == 2) {
					this.fieryTitles = this.fieryTitlese.split(0,num)
				}
			},
			broadcast(){
					uni.request({
							url: common.WEBSITE_URL + '/api/news/getCategoryList?display_location=' + '直播',
							success: (res) =>{
									if (res.data.code == 0){
											if(res.data.code == 0){
													this.titleVideo = res.data.data[0];
													console.log(this.titleVideo)
											}
									}
							}
					})
			},
			articlelist() {
				uni.request({
					url: common.WEBSITE_URL + '/api/news/getCategoryList?display_location=' + '首页',
					success: (res) => {
						if (res.data.code == 0) {
							// console.log(res.data.data);
							res.data.data.forEach(item => {
								// console.log(item);
								// this.articleTitle = item.name;

								if (item.id == 7) {
									// console.log(item);
									this.articleTitle = item.name;
									uni.request({
										url: common.WEBSITE_URL + '/api/news/getNewsList?category_id=' +
											item.id,
										success: (res1) => {
											if (res1.data.code == 0) {
												this.articlesList = res1.data.data.slice(0,10);
												this.articlesLists = res1.data.data;
												console.log(this.articlesList);
											}
										}
									})
								}
								if (item.id == 8) {
									this.videoTitle = item.name;
									uni.request({
										url: common.WEBSITE_URL + '/api/news/getNewsList?category_id=' +
											item.id,
										success: (res1) => {
											if (res1.data.code == 0) {
												this.videoTitles = res1.data.data.slice(0,10);
												this.videoTitlese = res1.data.data;
												// console.log(res1.data.data);
											}
										}
									})
								}
								if (item.id == 9) {
									this.fieryTitle = item.name;
									uni.request({
										url: common.WEBSITE_URL + '/api/news/getNewsList?category_id=' +
											item.id,
										success: (res1) => {
											if (res1.data.code == 0) {
												this.fieryTitles = res1.data.data.slice(0,10);
												this.fieryTitlese = res1.data.data;
												console.log(res1.data.data);
											}
										}
									})
								}
							})
						}
					}
				})
			},
			notice() {
				uni.request({
					url: common.WEBSITE_URL + '/api/news/getIndex',
					success: (res) => {
						if (res.data.code == 0) {
							this.slides = res.data.data.slide; //轮播图
							this.notices = res.data.data.notice; //活动公告
							console.log(this.notices)
						}
					}
				})
			},
			articlesTap(index) {
				uni.navigateTo({
					url: '../image_text/image_text?index=' + index
				})
			},
			switchStyle(num) {
				this.qiehuan = num * 100;
				this.left_active = ["", "", ""];
				this.left_active[num] = "active";
			},
			indexJump(name, option) {
				uni.navigateTo({
					url: `/pages/${name}/${name}?url=${option}`
				})
			},
			toExecute(optionss){
				if (optionss.type == 'int_link') {
					uni.navigateTo({   //内部链接
						url: '../../' + optionss.url
					})
				}else if(optionss.type == 'popup'){  //弹窗
					this.shows = true;
					this.noticeContent = optionss.notice_content;
					this.noticeTitle = optionss.notice_title;
				}else if(optionss.type == 'news'){   //文章
					uni.navigateTo({ 
						url: '../image_text/image_text?index=' + optionss.article_id
					})
				}else if(optionss.type == 'ext_link'){   //外部链接 
					uni.navigateTo({
						url: '/pages/information/information?url='+ optionss.url
					})
				}
			}
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
		width: 100%;
		position: fixed;
		z-index: 99;
		top: 0px;
		background-color: #fff;
	}
	.top {
		height: 40px;
		background: none;
		width: 100%;
		position: fixed;
		z-index: 99;
		top: 0rpx;
		background-color: #fff;
		transition: 0.3s ease all;
	}

	.top-icon {
		width: 30px;
		height: 30px;
		border-radius: 50%;
		text-align: center;
		border: 1px solid #E9E9E9;
		position: absolute;
		left: 24rpx;
		top: 5px;
		line-height: 74rpx;
	}

	.top-icon>image {
		position: relative;
		left: -1px;
		opacity: 0.8;
		width: 22px;
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

	.top-search {
		margin-top: 140rpx;
		width: 90%;
		height: 2.4em;
		background-color: #F3F4F5;
		border-radius: 1.5em;
		position: relative;
	}

	.top-search>input {
		padding-left: 3em;
		font-size: 1em;
		color: #777777;
		line-height: 2.4em;
		height: 2.4em;
		font-weight: 400;

	}

	.top-search>span {
		width: 1em;
		height: 1em;
		position: absolute;
		left: 1em;
		top: 0.5em;
	}

	.top-search>span>image {
		width: 1em;
		height: 1em;
	}

	.banner-title {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		margin-bottom: 0.8em;
	}

	.banner-title>text {
		display: inline-block;
		margin: 1.5em 1.5em 0em;
		color: rgba(35, 39, 55, 0.50);
		padding: 0em 0.2em 0.6em;
		font-size: 1.2em;
		border-bottom: #fff 2px solid;
		transition: all 0.3s ease;
		text-align: center;
	}

	.banner-title>.active {
		opacity: 0.9;
		color: #FF3F81;
		letter-spacing: 0;
		font-weight: 700;
		border-bottom: #FF3F81 2px solid;
	}

	.plate-banner {
		margin-bottom: 1em;
		width: 100%;
	}

	.home {
		width: 90%;
		margin-left: 5%;
		height: 13em;
		overflow: hidden;
		border-radius: 4px;
	}

	swiper {
		width: 100% !important;
		height: 13em;
	}

	.home image {
		height: 13em;
		width: 100%;
		overflow: hidden;
		overflow: hidden;
		border-radius: 4px;
	}

	.icon-btn {
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}

	.icon-btn>.list-icon>image {
		width: 50%;
	}

	.list-icon {
		width: 25%;
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		margin-top: 0.5em;
		margin-bottom: 2em;
	}

	.list-icon>text {
		margin-top: 10px;
		color: rgba(0, 0, 0, 0.65);
		font-weight: 400;
		width: 100%;
		font-size: 0.9em;
	}

	.notice {
		width: 90%;
		margin-left: 5%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.notice>image {
		width: 20%;
		position: relative;
		top: 0.1em;
	}

	.notice>.notice-text {
		width: 68% !important;
		margin-left: 10rpx;
		height: 60rpx;
		color: #333333;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.notice-icon {
		width: 2%;
		opacity: 0.3;
		position: relative;
		top: 1px;
	}

	.notice-icon>image {
		width: 0.5em;
	}

	.article-title {
		margin-top: 2em;
		margin-left: 5%;
		width: 90%;
		position: relative;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}

	.aricle-text>text,
	.aricle-text>view {
		position: relative;
		z-index: 2;
		font-weight: 700;
		color: #333;
		font-size: 1.5em;
	}

	.aricle-text>view>image {
		width: 1.2em;
		position: absolute;
		left: 0em;
	}

	.fiery>view {
		padding-left: 1.5em;
	}

	.fiery>.aricle-bc {
		width: 5.5em !important;
	}

	.aricle-text>.aricle-bc {
		height: 0.5em;
		width: 4em;
		display: block;
		background-color: #FFD1E1;
		position: absolute;
		bottom: 0;
		z-index: 1;
		border-radius: 5px;
	}

	.article-icon {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		width: 12%;
		text-align: right;
		color: #777;
	}

	.article-icon>image {
		width: 0.5em;
	}

	.article-main {
		width: 90%;
		margin-left: 5%;
	}

	.article-list {
		margin-top: 1.4em;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.article-list>.article-list-left {
		width: 68%;
		display: flex;
		justify-content: space-between;
		flex-direction: column;
		height: 5.4em;
	}

	.article-list-left-title {
		display: -webkit-box;
		overflow: hidden;
		text-overflow: ellipsis;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		font-weight: 700;
	}

	.article-list-left-info1 {
		font-size: 0.9em;
		color: #777;
	}


	.article-list-left-info3 {
		width: 5.2em;
		text-align-last: right;
		display: flex;
		justify-content: start;
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

		color: rgba(119, 119, 119, 0.5);
		display: flex;
		justify-content: space-between;
		flex-direction: row;
	}

	.article-list-right {
		width: 28%;
		/* margin-left: 4%; */
		height: 5.4em;
		border-radius: 6px;
		overflow: hidden;
		position: relative;
	}

	.article-list-right>image {
		width: 100%;
		height: 5.4em;
	}

	.video-main {
		margin-left: 5%;
		width: 90%;
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
		height: 3em;
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
		width: 60%;
		display: flex;
		justify-content: left;
		flex-direction: row;
		align-items: center;
	}

	.video-info-right {
		width: 3.6em;
		font-size: 26rpx;

		position: relative;
		top: 0.1em;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: right;
	}

	.video-info-right>image { 
		width: 1em;
		position: relative;
		top: 1px;
		right: 0.2em;
	}

	.video-headImg { 
		width: 2em; 
		height: 2em;
		border-radius: 50%;
		overflow: hidden;
		margin-right: 0.5em;
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

		color: rgba(119, 119, 119, 0.5);
	}

	.article-list2 .article-list-left-title {
		-webkit-line-clamp: 2;
		
	}

	.article-list2 .article-list-left-info2 {
		position: relative;
		bottom: 0.2em;
	}

	.article-list-left-info3 {
		width: 5.2em;
		text-align: left;
	}

	.sign-up {
		position: absolute;
		right: 0.2em;
		bottom: -0.2em;
		padding: 0.5em 1.2em;
		background-image: linear-gradient(rgba(255, 104, 152, 1), rgba(255, 65, 129, 1));
		color: #fff;
		border-radius: 1.2em;
	}

	.btm-content {
		margin: 2em 0em 1.5em;
		width: 40%;
		color: #999;
		font-size: 26rpx;

		text-align: center;
	}

	.btm-content>image {
		width: 80%;
	}

	.card-list-info {
		position: absolute;
		bottom: 0em;
		box-sizing: 99;
		line-height: 2em;
		width: 100%;
		background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.7));
		display: flex;
		justify-content: center;
		flex-direction: row;
		font-size: 20rpx;
		align-items: center;
		color: #fff;
	}

	.card-list-info>image {
		width: 1.4em;
		margin-right: 0.1em;
	}

	.border-main {
		width: 100%;
		overflow: hidden;
	}

	.border-main-wid {
		width: 300%;
		right: 100%;
		position: relative;
		transition: right ease 0.3s;
	}

	.border-plate {
		display: inline-block;
		width: 33.3%;
	}

	.plate {
		position: absolute;
		top: 2em;
		width: 33%;
		text-align: center;
	}
	.noticeTitle{
		font-weight: bold;
		font-size: 32rpx;
		padding: 30rpx 0;
		text-align: center;
	}
	.noticeContent{
		/* text-align: center; */
	}
</style>

