import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Lists from "../components";

Vue.use(VueRouter);

console.log("Lists", Lists);

const componentObject = Object.entries(Lists).map(([key, value]) => {
	return {
		path: `/${key}`,
		name: key,
		component: value,
	};
});

console.log("componentObject", componentObject);

const routes = [
	{
		path: "/",
		name: "Home",
		component: Home,
	},
	...componentObject,
];

const router = new VueRouter({
	routes,
});

export default router;
