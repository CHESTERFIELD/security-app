import Vue from "vue";
import VueRouter from "vue-router";
import store from '../store'

Vue.use(VueRouter);

const routes = [
  {
    path: "/recognitation-objects",
    name: "RecognitationObjects",
    component: () =>
      import("../views/RecognitationObjects.vue"),
  },
  {
    path: "/users",
    name: "Users",
    component: () =>
      import("../views/Users.vue"),
  },
  {
    path: "/user/:id",
    name: "User",
    component: () =>
      import("../views/User.vue"),
  },
  {
    path: "/user/:id/edit",
    name: "Edit",
    component: () =>
      import("../views/Edit.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import("../views/Login.vue")
  },
  {
    path: "/logout",
    name: "Logout",
    component: () =>
      import("../views/Logout.vue")
  },
  {
    path: "/register",
    name: "Register",
    component: () =>
      import("../views/Register.vue")
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !store.getters.loggedIn) next({ name: 'Login' })
  else next()
})

export default router;
