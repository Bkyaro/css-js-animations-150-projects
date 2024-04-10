import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import FontFaceObserver from "fontfaceobserver";

Vue.config.productionTip = false;

// 创建一个 FontFaceObserver 实例，监控 Anton 字体
const antonObserver = new FontFaceObserver("Anton", {});

// 当字体加载成功或失败时，执行回调函数
antonObserver
	.load()
	.then(() => {
		// 字体加载成功，可以隐藏加载遮罩
		document.dispatchEvent(new Event("fontLoaded"));
	})
	.catch(() => {
		// 字体加载失败，可以提示用户或采取其他措施
		console.warn("Anton font loading failed");
	});

new Vue({
	router,
	render: (h) => h(App),
}).$mount("#app");
