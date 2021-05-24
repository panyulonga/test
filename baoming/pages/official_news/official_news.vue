<template>
	<view>
		<view class="status_bar" :style="top_height">
		</view>
		<view class="top" :style="top_style">
			<view class="top-icon" @click="returnHome()">
				<image src="../../static/assets/arrow-left-bold.png" mode="widthFix"></image>
			</view>
			<view class="top-text">齐风杯</view>
		</view>
		<view class="content" v-if="ids == 0">
			<view class="icon_xiaoxi">
				<image src="../../static/assets/pink_box.png" mode="widthFix"></image>
			</view>
			<!-- <view class="icon_text">暂无消息</view> -->
		</view>
		<view class="content" v-if="ids == 1">
			<view class="icon_xiaoxi">
				<image src="../../static/assets/pink_box.png" mode="widthFix"></image>
			</view>
			<!-- <view class="icon_text">暂时没有内容</view> -->
		</view>
	</view>
	
</template>

<script>
	import common from '../../common/info.js'
	export default {
		data() {
			return {
				ids:'',
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
		onLoad(options) {
			this.ids = options.id;
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
		methods: {
			imreturn() {
				uni.navigateBack();
			},
			indexJump(name, option) {
				uni.navigateTo({
					url: `/pages/${name}/${name}?type=${option}`
				})
			},
			returnHome() {
				uni.reLaunch({
					url:'../index/index'
				})
			}
		}
	}
</script>

<style lang="scss">
	.icon_xiaoxi{
		width: 200rpx;
		height: 200rpx;
		margin: 280rpx auto 0;
		image{
			width: 100%;
			height: 100%;
		}
	}
	.icon_text{
		text-align: center;
		margin-top: 30rpx;
		font-size: 28rpx;
		color: #000;
	}
	
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
</style>
