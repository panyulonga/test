<template>
	<view class="content">
		<view class="status_bar" :style="top_height">
		</view>
		<view class="top" :style="top_style">
			<view class="top-icon" @click="imreturn()">
				<image src="../../static/assets/arrow-left-bold.png" mode="widthFix"></image>
			</view>
			<view class="top-text">齐风杯</view>
		</view>
		<view class="main">
			<view class="main-person">
				<image :src="details.author.avatar"></image>
				<view>{{details.author.nickname}}</view>
			</view>
			<view style="width: 90%;margin: 0 auto;">
				<view style="font-size: 36rpx;line-height: 100rpx;">{{details.title}}</view>
				<u-parse :html="details.content"></u-parse>
			</view>
			<!-- <view class="banner-img">
				<view class="home">
					<swiper indicator-dots circular indicator-color="rgba(214,214,214,1)"
						indicator-active-color="rgba(255,63,129,1)" autoplay interval=3000>
						<swiper-item>
							<image id="service" src="../../static/assets/video_img1.png" mode=""></image>
						</swiper-item>
						<swiper-item>
							<image id="service" src="../../static/assets/video_img1.png" mode=""></image>
						</swiper-item>
						<swiper-item>
							<image id="service" src="../../static/assets/video_img1.png" mode=""></image>
						</swiper-item>
					</swiper>
				</view>
			</view> -->
			<view class="main-text">
				<view class="text-info-time">
					<image src="../../static/assets/time.png" mode="widthFix"></image>
					{{details.create_time}}
				</view>
				<view class="main-comment">
					<view class="comment-title">共{{details.comment.length}}条评论</view>
					<view class="conment-own">
						<image :src="yonghuwx" v-if="yonghuwx"></image>
						<image src="../../static/assets/touxiang.jpg" v-if="!yonghuwx"></image>
						<input type="text" :placeholder="placeholders" v-model="btns" @confirm="confirms"/>
					</view>
					
					<u-popup v-model="shows" mode="bottom" class="butto">
						<input type="text" :placeholder="placeholderes" @blur="falseFocus" :focus="focusbl" class="buttoinput" @confirm="queren">
					</u-popup>
						
					<view v-if="cebl"></view>
					<view v-for="(item,index) in comments" :key="index" class="conment-others-one">
						<view class="others-one-img">
							<image :src="item.avatar"></image>
						</view>
						<view class="others-one-main">
							<view @click="agains(item)">
								<view>{{item.nickname}}</view>
								<text>{{item.content}}<text class="others-one-time">{{item.create_time.slice(5,10)}}</text></text>
							</view>
				
							<view v-if='comments[index].show||(index2==0)' v-for="(item2,index2) in item.child" :key="index2" class="conment-others-two" @click="childagains(item2)">
								<view class="others-one-img">
									<image :src="item2.avatar"></image>
								</view>
								<view class="others-one-main">
									<view>{{item2.nickname}}</view>
									<text>{{item2.content}}<text class="others-one-time">{{item2.create_time.slice(5,10)}}</text></text>
								</view>
							</view>
							<view @click="showChat(index)" v-if="item.child.length > 1" class="tips">
								{{item.show?"收起":"展开"}}{{item.child.length-1}}条回复
							</view>
						
							
						</view>
						<!-- <view  class="others-one-zan">
							<u-icon name="heart" v-if="showUpImg == 0"  class="Collection_item_icon" @click="collection(item.id)"></u-icon>
							<u-icon name="heart-fill" v-if="showUpImg == 1"  class="Collection_item_icon" style="color: red;" @click="collection(item.id)"></u-icon>
							<text>{{item.likes}}</text>
						</view> -->
						
						
						<!-- <view class="others-one-zan" @click="dianzan(index)">
							<image :src="item.likes?'../../static/assets/zan2.png':'../../static/assets/zan1.png'"
								mode="widthFix"></image>
							<text class="num">
								{{item.likes}}
							</text>
						</view> -->
						
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
				cebl:true,
				shows:false,
				// likedetail:'',
				title: 'Hello',
				btns:'',
				inputs:0,
				placeholders:'喜欢就给个评论支持一下~',
				placeholderes:'',
				cids: '',
				details: '',
				createTime:'',
				comments:{},
				openId:'',
				categoryId:'',
				showUpImg: '',
				optins:'',
				focusbl:false,
				curRoutes:'',
				infoList:'',
				top_style: "",
				top_height: "",
				token:'',
				yonghuwx:'',			}
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
			this.cids = options.index;
			console.log(this.cids)
			this.articleDetails();
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
				title:this.details.title,
				path:this.curRoutes,
				imageUrl:this.details.cover,
			}
		},
		onShareTimeline(res) {
			return{
				title:this.details.title,
				path:this.curRoutes,
				imageUrl:this.details.cover,
			}
		},
		onShow() {
			this.token = uni.getStorageSync('names', 'data').token;
			this.yonghuwx = uni.getStorageSync('userInfoes', 'data').avatarUrl;
		},
		methods: {
			falseFocus(){
				this.focusbl = false;
			},
			agains(indexs){
				if(this.token == ''){
					uni.navigateTo({
						url:'../login/login'
					})
				}else{
					this.placeholderes = '回复 @ '+indexs.nickname;
					this.shows = true;
					this.optins = indexs;
					setTimeout(()=>{
						this.focusbl = true
					},100)
				}
			},
			queren(e){
				if(this.token == '' || this.token == null || this.token == undefined){
					uni.navigateTo({
						url:'../login/login'
					})
				}else{
					var conten = e.detail.value;
					uni.showLoading({
						title: '正在评论'
					})
					uni.request({
						url: common.WEBSITE_URL + '/api/news/leaveComment?token='+this.token+'&channel=' + common.CHANNEL + '&article_id='+this.cids+'&parent='+ this.optins.id,
						header: {
							'Content-Type': 'application/x-www-form-urlencoded'
						},
						data:{
							content:conten
						},
						method: 'POST',
						success: (res) =>{
							if(res.data.code == 0){
								setTimeout(() => {
									uni.hideLoading();
									this.articleDetails();
									this.shows = false;
								})
								uni.showToast({
									title: '评论成功',
									icon: 'none'
								})
							}else if(res.data.code == 1){
								uni.hideLoading();
								uni.showToast({
									title: res.data.msg,
									icon: 'none'
								})
							}else if(res.data.code == 3002){
								this.btns = '';
								uni.showToast({
									title: '请在'+res.data.data.cdtime+'s后再次进行该操作',
									icon: 'none'
								})
							}
						}
					})
				}
			},
			childagains(index){
				if(this.token == '' || this.token == null || this.token == undefined){
					uni.navigateTo({
						url:'../login/login'
					})
				}else{
					this.placeholderes = '回复 @ '+index.nickname;
					this.shows = true;
					this.optins = index;
					setTimeout(()=>{
						this.focusbl = true
					},100)
				}
			},
			confirms(e){ 
				if(this.token == '' || this.token == null || this.token == undefined){
					uni.navigateTo({
						url:'../login/login'
					})
				}else{
					var contents = e.detail.value;
					console.log(this.btns);
					uni.showLoading({
						title: '正在评论'
					})
					uni.request({
						url: common.WEBSITE_URL + '/api/news/leaveComment?token='+this.token+'&channel='+common.CHANNEL+'&article_id='+this.cids+'&parent='+ -1,
						header: {
							'Content-Type': 'application/x-www-form-urlencoded'
						},
						method: 'POST',
						data:{
							content:contents,
						},
						success: (res) => {
							if(res.data.code == 0){
								console.log(res);
								setTimeout(() => {
									uni.hideLoading();
									this.btns = '';
									this.articleDetails();
								})
								uni.showToast({
									title: '评论成功',
									icon: 'none'
								})
							}else if(res.data.code == 1){
								uni.hideLoading();
								this.btns = '';
								uni.showToast({
									title: res.data.msg,
									icon: 'none'
								})
							}else if(res.data.code == 3002){
								this.btns = '';
								uni.showToast({
									title: '请在'+res.data.data.cdtime+'s后再次进行该操作',
									icon: 'none'
								})
							}
						}
					})
				}
			},
			articleDetails() {
				uni.request({
					url: common.WEBSITE_URL + '/api/news/getNewsDetail?id=' + this.cids,
					success: (res) => {
						if (res.data.code == 0) {
							console.log(res.data.data)
							this.details = res.data.data;
							for (let val in res.data.data.comment) {
								res.data.data.comment[val].show = false;
								let name = 'num' + val;
								this.comments[name] = res.data.data.comment[val];
							}
							console.log(res.data.data.create_time)
							this.createTime = res.data.data.create_time;
							this.categoryId = res.data.data.category_id;
						}else{
							uni.showToast({
								title:res.data.msg,
								icon:'none'
							})
						}
					}
				})
				console.log(this.comments)
			},
			collection(index){
				console.log(index);
				if(this.token == ''){
					uni.navigateTo({
						url:'../login/login'
					})
				}else{
					this.showUpImg = !this.showUpImg;
					console.log(this.showUpImg);
					if(this.showUpImg == true){
						uni.request({
							url: common.WEBSITE_URL + '/api/news/likeComment?id='+index,
							success: (res) =>{
								if(res.data.code == 0){
									uni.showToast({
										title:'点赞',
										icon:'none'
									})
									// var showUpImgs = 1;
									uni.setStorage({
										key: 'thshowUpImg',
										data: 1,
									});
								}
							}
						})
					}else{
						uni.request({
							url: common.WEBSITE_URL + '/api/news/dislikeComment?id='+index,
							success: (res) =>{
								if(res.data.code == 0){
									uni.showToast({
										title:'取消点赞',
										icon:'none'
									})
								}
							}
						})
					}
										
				}
			},
			showChat(num) {
				this.cebl = !this.cebl;
				console.log(this.comments[num].show,this.comments[num])
				this.comments[num].show = !this.comments[num].show;
			},
			dianzan(num) {
				this.chat_list[num].zan = !this.chat_list[num].zan;
			},
			indexJump(name) {
				uni.navigateTo({
					url: `/pages/${name}/${name}`
				})
			},
			imreturn() {
				uni.navigateBack();
			},
		},
	}
</script>

<style lang="scss">
	video{
		width: 100% !important;
	}
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		font-family: PingFangSC-Regular;
		background-color: #fff;
		color: #333;
		padding-bottom: 2em;
	}
	.butto{
		background-color: #fff;
		z-index: 9999;
		
		.buttoinput{
			width: 80%;
			margin: 20rpx auto;
			color: #999;
			font-size: 0.9em;
			height: 2.4em;
			border-radius: 1.2em;
			background-color: #eee !important;
			padding-left: 4%;
		}
		
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
	.main {
		width: 100%;
		margin-top: var(--status-bar-height);
		padding-top: 100rpx;
	}

	.main-person {
		width: 100%;
		padding: 1em 5% 0.5em;
		display: flex;
		justify-content: start;
		align-items: center;
		font-size: 1.1em;
		border-bottom: 2px solid #f9f9f9;
		margin-bottom: 1em;
	}

	.main-person>image {
		width: 3em;
		height: 3em;
		border-radius: 50%;
		overflow: hidden;
		margin-right: 1em;
	}

	.home {
		width: 90%;
		margin-left: 5%;
		height: 16em;
		overflow: hidden;
		border-radius: 4px;
	}

	swiper {
		width: 100% !important;
		height: 16em;
	}

	.home image {
		height: 14em;
		width: 100%;
		overflow: hidden;
		overflow: hidden;
		border-radius: 4px;
	}

	.uni-swiper-dots {
		position: relative;
		top: 5em;
	}

	.main-text {
		width: 90%;
		margin-left: 5%;
	}

	.main-text-title {
		font-weight: 700;
		font-size: 1.1em;
	}

	.main-text-content {
		line-height: 1.5em;
	}

	.main-text-content>text {
		display: block;
		padding-top: 1em;
	}

	.text-info-time>image {
		width: 1.1em;
		position: relative;
		top: 3px;
		margin-right: 0.4em;
	}

	.text-info-time {
		width: 100%;
		font-size: 0.8em;
		color: rgba(119, 119, 119, 0.50);
		display: flex;
		justify-content: start;
		flex-direction: row;
		margin: 1em 0 2em;
	}

	.comment-title {
		font-size: 1.1em;
		margin-bottom: 0.5em;
	}

	.conment-own {
		display: flex;
		flex-direction: row;
		padding: 1em 0;
	}

	.conment-own>image {
		width: 3em;
		height: 3em;
		border-radius: 50%;
		overflow: hidden;
		margin-right: 1em;
		position: relative;
		top: -3px;
	}

	.conment-own>input {
		width: 80%;
		height: 2.4em;
		border-radius: 1.2em;
		padding-left: 6%;
		background-color: #eee;
		color: #999;
		font-size: 0.9em;
	}

	.conment-others-two,
	.conment-others-one {
		display: flex;
		padding: 0.5em 0 1em;

	}

	.others-one-img {
		width: 10%;
		margin-right: 4%;
	}

	.others-one-img>image {
		width: 2.4em;
		height: 2.4em;
		border-radius: 50%;
		overflow: hidden;
	}

	.others-one-main {
		width: 80%;
		padding-bottom: 1.5em;
		border-bottom: 1px solid #f4f4f4;
	}

	.others-one-main>view {
		color: #777777;
		padding-bottom: 0.5em;
	}

	.others-one-main>text {
		display: block;
		width: 96%;
		color: #333;
	}

	.conment-others-two .others-one-main>text {
		display: block;
		width: 100%;
		color: #333;
	}

	.others-one-time {
		display: inline-block;
		color: rgba(119, 119, 119, 0.50);
		font-size: 0.9em;
		padding-left: 0.5em;
	}

	.others-one-zan {
		border-bottom: 1px solid #f4f4f4;
		text-align: center;
		width: 6%;
		color: rgba(119, 119, 119, 0.50);
	}

	.others-one-zan>image {
		width: 100%;
	}

	.conment-others-two {
		margin-top: 0.5em;
	}

	.conment-others-two>.others-one-main {
		border-bottom: none;
		width: 84%;
		padding-bottom: 0;
	}

	.conment-others-two>.others-one-img {
		margin-right: 2%;
		width: 16%;
	}

	.tips {
		padding-left: 3em;
		color: #1999FB !important;
		position: relative;
		top: 0.5em;
	}
	.Collection_item_icon{
		font-size: 40rpx;
	}
</style>
