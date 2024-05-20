import { createRouter, createWebHistory } from 'vue-router'; // createRouter와 createWebHistory 임포트
import Chart from '@/components/Chart/Chart.vue';

import InsertForm from '@/components/Board/InsertForm.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
      { 
        path: "/",
        name:"Chart",
        component: Chart
      },
      { 
        path: "/board",
        name:"InsertForm",
        component: InsertForm
      },
    ],
  });
  
  export default router;