import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {path: '/', component: () => import('../components/Users.vue')},
    {path: '/repositories/:username', component: () => import('../components/Repositories.vue')},
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});
export default router;
