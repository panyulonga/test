<template>
	<view class="content">
		<view class="status_bar" :style="top_height">
		</view>
		<view class="top" :style="top_style">
			<view class="top-text">消息</view>
		</view>
		<!-- 顶部搜索板块 -->
		<view class="main-topbtn">
			<view class="topbtn-content" @click="news">
				<image src="../../static/assets/Collection_icon.png" mode="widthFix"></image>
				<text>赞和收藏</text>
			</view>
			<view class="topbtn-content" @click="news">
				<image src="../../static/assets/comment_icon.png" mode="widthFix"></image>
				<text>评论和@</text>
			</view>
		</view>

		<view class="chat-main">
			<view class="chat-list" @click="news">
				<view class="chat-list-left">
					<image src="../../static/assets/voice.png" mode="widthFix"></image>
				</view>
				<view class="chat-list-right">

					<view class="chat-text">
						<view class="chat-title">大赛消息</view>
						<view class="chat-content">暂无内容</view>
					</view>
					<view v-if="bl" class="time">
						2021.05.01 12:54
					</view>
				</view>
			</view>
			<view class="chat-list" @click="news">
				<view class="chat-list-left">
					<image src="../../static/assets/notice.png" mode="widthFix"></image>
				</view>
				<view class="chat-list-right">

					<view class="chat-text">
						<view class="chat-title">官方通知</view>
						<view class="chat-content">暂无内容</view>
					</view>
					<view v-if="bl" class="time">
						2021.05.01 12:54
					</view>
				</view>
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
				bl: false,
				curRoutes:'',
				infoList:'',
				top_style: "",
				top_height: "",
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
		onLoad() {
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
					url:'../chat/chat'
				})
			},1000);
		},
		methods: {
			news(){
				uni.navigateTo({
					url:'../official_news/official_news?id='+0
				})
			},
			indexJump(name) {
				uni.navigateTo({
					url: `/pages/${name}/${name}`
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
		width: 100%;
		z-index: 99;
		top: 0px;
		background-color: #fff;
	}
	.top {
		height: 40px;
		background: none;
		width: 100%;
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
	
	.main-topbtn {
		display: flex;
		justify-content: space-between;
		flex-direction: row;
	}

	.topbtn-content {
		padding: 2em 0;
		width: 30%;
		text-align: center;
		color: #777;
	}

	.topbtn-content>image {
		width: 3.6em;
	}

	.chat-main {
		width: 100%;
		border-top: 0.5em solid #eee;
	}

	.chat-list {
		height: 4.6em;
		width: 94%;
		margin-left: 3%;
		display: flex;
		padding: 1em 0em 0em;
		flex-direction: row;
	}

	.chat-list-left {
		width: 15%;
		display: flex;
		flex-direction: row;
		align-items: center;
		height: 3em;
	}

	.chat-list-left>image {
		width: 3em;
	}

	.chat-text {
		height: 0em;
		line-height: 1.6em;
		display: flex;
		justify-content: space-between;
		padding-left: 0.8em;
		flex-direction: column;
	}

	.chat-text>.chat-title {
		font-weight: 700;
		color: #333;
	}

	.chat-text>.chat-content {
		color: #777;
		font-size: 0.9em;
	}

	.chat-list-right {
		width: 85%;
		height: 4em;
		color: rgba(119, 119, 119, 0.50);
		border-bottom: 1px solid #eee;
	}

	.time {
		font-size: 0.8em;
		float: right;
	}
</style>
