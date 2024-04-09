import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Lists from "../components";
import Wrapper from "../components/Wrapper.vue";

Vue.use(VueRouter);

const componentObject = Object.entries(Lists).map(([key, value]) => {
	return {
		path: `/${key}`,
		name: key,
		component: value,
	};
});

const routes = [
	{
		path: "/",
		name: "Home",
		component: Home,
	},
	{
		path: "/projects/:name?",
		name: "projects",
		component: Wrapper,
	},
	// ...componentObject,
];

const router = new VueRouter({
	routes,
});

export default router;
