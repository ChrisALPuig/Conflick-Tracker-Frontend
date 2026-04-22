import { createRouter, createWebHistory } from "vue-router"

import HomeView from "../views/HomeView.vue"
import ConflictDetailView from "../views/ConflictDetailView.vue"
import CreateConflictView from "../views/CreateConflictView.vue"

const routes = [
  { path: "/", component: HomeView },
  { path: "/create", component: CreateConflictView },
  { path: "/conflicts/:id", component: ConflictDetailView }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})


export default router