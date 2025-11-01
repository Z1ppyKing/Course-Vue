import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import BlogsView from "@/views/BlogsView.vue";
import PostDetail from "@/components/PostDetail.vue";
import ContactsView from "@/views/ContactsView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  { path: "/blogs", name: "blogs", component: BlogsView },
  { path: "/post/:id", component: PostDetail },
  { path: "/contacts", name: "contacts", component: ContactsView },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
