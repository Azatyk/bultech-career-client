import Vue from "vue";
import VueRouter from "vue-router";
import Login from "@/views/login/login";
import Register from "@/views/register/register";
import AppLayout from "@/views/layouts/app-layout";
import AuthLayout from "@/views/layouts/auth-layout";
import store from "@/store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/auth",
    component: AuthLayout,
    meta: {
      noAuthOnly: true,
    },
    children: [
      {
        path: "login",
        component: Login,
        meta: {
          title: "Вход",
        },
      },
      {
        path: "register",
        component: Register,
        meta: {
          title: "Регистрация",
        },
      },
    ],
  },
  {
    path: "/login",
    component: Login,
    meta: {
      noAuthOnly: true,
      title: "Вход",
    },
  },
  {
    path: "/app",
    component: AppLayout,
    meta: {
      title: "Bultech Career",
      needAuth: true,
    },
    children: [],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0);
  document.title = to.meta.title;
  if (to.matched.some((record) => record.meta.needAuth)) {
    if (!store.getters.isLoggedIn) {
      next({
        path: "/auth/login",
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else {
    next();
  }

  if (to.matched.some((record) => record.meta.noAuthOnly)) {
    if (store.getters.isLoggedIn) {
      next({
        path: "/app",
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
