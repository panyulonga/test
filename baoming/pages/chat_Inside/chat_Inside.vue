<template>
	<view class="content">
		<view class="status_bar">
		</view>
		<view class="top">
			<view class="top-icon" @click="imreturn()">
				<image src="../../static/assets/arrow-left-bold.png" mode="widthFix"></image>
			</view>
			<view class="top-text">消息</view>
		</view>
		
		<view class="chat-main">
			<view class="chat-list">
				<view class="time">
					2021.05.01 12:54
				</view>
				<view class="list-content" @click="indexJump('image_text')">
					<view class="list-title">
						最少女心的小车车 | 我也开始养猫
					</view>
					<view class="list-text">
						前段时间为了出行方便，决定入手一辆纯电动的小车车，作为颜控的我，一眼就看上了欧拉的黑猫啦！
					</view>
					<view class="list-info">
						<image src="../../static/assets/voice.png" mode="widthFix"></image>
						<text>大赛消息</text>
					</view>
				</view>
			</view>
			
			
				<view class="chat-list">
					<view class="time">
						2021.05.01 12:54
					</view>
					<view class="list-content" @click="indexJump('image_text')">
						<view class="list-image">
							<image src="../../static/assets/video_img1.png" mode=""></image>
						</view>
						<view class="list-text">
							前段时间为了出行方便，决定入手一辆纯电动的小车车，作为颜控的我，一眼就看上了欧拉的黑猫啦！
						</view>
						<view class="list-info">
							<image src="../../static/assets/notice.png" mode="widthFix"></image>
							<text>大赛消息</text>
						</view>
					</view>
				</view>
			<view class="chat-list">
				<view class="time">
					2021.05.01 12:54
				</view>
				<view class="list-content" @click="indexJump('image_text')">
					<view class="list-title">
						最少女心的小车车 | 我也开始养猫
					</view>
					<view class="list-text">
						<text>您的作品被张三丰评论</text><text>“前段时间为了出行方便，决定入手一辆纯电动的小车车，作为颜控的我，一眼就看上了欧拉的黑猫啦！”</text>
					</view>
					<view class="list-info">
						<image src="../../static/assets/comment_icon.png" mode="widthFix"></image>
						<text>大赛消息</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {
			imreturn() {
				uni.navigateBack();
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
		background-color: #f9f9f9;
		color: #333;
		padding-bottom: 2em;
	}


	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
		position: fixed;
		z-index: 99;
		top: 0px;
		background-color: #fff;
	}
	.top {
		margin-top: var(--status-bar-height);
		background-color: #fff;
		height: 100rpx;
		width: 100%;
		position: fixed;
		z-index: 99;
		top: 0rpx;
	}

	.top-icon {
		width: 60rpx;
		height: 60rpx;
		border-radius: 50%;
		text-align: center;
		border: 1px solid #E9E9E9;
		position: absolute;
		left: 24rpx;
		top: 20rpx;
		line-height: 74rpx;
	}

	.top-icon>image {
		position: relative;
		left: -1px;
		opacity: 0.8;
		width: 40rpx;
	}

	.top-text {
		text-align: center;
		font-weight: 700;
		line-height: 100rpx;
	}
	
	.chat-main {
		margin-top: var(--status-bar-height);
		padding-top: 100rpx;
		width: 90%;
	}
	.time {
		font-size: 0.8em;
		text-align: center;
		color: rgba(119,119,119,0.50);
		margin: 1.5em 0em;
	}
	.list-content {
		background-color: #fff;
		font-size: 1em;
		border-radius: 8px;
		overflow: hidden;
		padding: 1em 1.5em;
	}
	.list-title {
		font-weight: 700;
		padding: 0.3em 0em 0.8em;
	}
	.list-text {
		line-height: 1.6em;
		padding-bottom: 1em;
		border-bottom: 1px solid #f9f9f9;
	}
	.list-info{
		padding-top: 1em;
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	.list-info>image {
		width: 2em;
		height: 2em;
		border-radius: 50%;
		overflow: hidden;
		margin-right: 1em;
	}
	.list-info>text {
		color: #777;
		font-weight: 700;
	}
	.list-image {
		padding: 0.3em 0em 0.8em;
		border-radius: 8px;
		overflow: hidden;
	}
	.list-image>image {
		width: 100%;
		border-radius: 1x;
	}
	.list-text>text:first-child {
		font-weight: 700;
	}
	.list-text>text:last-child {
		color: #777;
	}
</style>
