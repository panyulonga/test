<template>
	<web-view :src="url" ></web-view>
</template>
 
<script>
	export default {
		data() {
			return {
				url: ''
			}
		},
		onLoad(options) {
			console.log(options)
			this.url = options.url;
		}
	}
</script>
 
<style>
 
</style>