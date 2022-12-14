import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/movie/:id",
    name: "Movie Detail",
    component: () => import("../views/Detail.vue"),
  },
  {
    path: "/search/:q",
    name: "Search Movies",
    component: () => import("../views/Search.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
