import { createRouter, createWebHistory } from "vue-router";
import List from "@/components/List.vue";
import Detail from "@/components/Detail.vue";
import ChartView from "@/components/ChartView.vue";
const routes = [
  {
    path: "/",
    name: "List",
    component: List
  },
  {
    path: "/user/:id",
    name: "Detail",
    component: Detail,
    props: true
  },
  {
    path:"/chart",
    name:"ChartView",
    component:ChartView
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
