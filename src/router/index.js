import {
  createWebHistory,
  createRouter
} from "vue-router";
import EventsList from "@/views/Events.vue";
import LoginPage from "@/views/Login.vue";
import CreateEvent from "@/views/CreateEvent.vue";
import EventDetails from "@/views/EventDetails.vue";

const routes = [{
    path: "/",
    name: "Home",
    component: EventsList,
  },
  {
    path: "/login",
    name: "Login",
    component: LoginPage,
    beforeEnter: (to, from, next) => {
      const session = localStorage.getItem('token')
      if (session) {
         router.go(-1)
      } else {
        next()
   
      }
    },
    meta: {
      hideNav: true
    },

  },
  {
    path: "/create",
    name: "Create Event",
    component: CreateEvent
  },
  {
    path: "/events/:id",
    name: "Event Details",
    component: EventDetails
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router