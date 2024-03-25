import { createRouter, createWebHistory } from 'vue-router';
import LoginComponents from '../components/LoginComponents.vue';
import RegisterComponents from '../components/RegisterComponents.vue';
import DashboardComponents from '../components/DashboardComponents.vue';

const routes = [
    { path: '/', redirect: '/login' },
    { path: '/login', name: 'login', component: LoginComponents },
    { path: '/register', name: 'register', component: RegisterComponents },
    { path: '/dashboard', name: 'dashboard', component: DashboardComponents, meta: { requiresAuth: true } },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
