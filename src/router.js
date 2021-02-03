import Vue from "vue";

import VueRouter from "vue-router";

Vue.use(VueRouter);

export const router = new VueRouter({
  routes: [
    { path: '/', name:'login', component: () => import("./components/auth/Login") },
    { path: '/home',  name:'home',component: () => import("./components/Home")},
    { path: '/document', name:'document',component: () => import("./components/Document") },
    { path: '/account', name:'account',component: () => import("./components/Account") },
    { path: '/settings', name:'settings',component: () => import("./components/Settings") },
    { path: '/applicants', name:'applicants',component: () => import("./components/Applicants") },
    { path: '/applicant/:id', name:'applicant',component: () => import("./components/Applicant") },
    { path: '/notifications', name:'notifications',component: () => import("./components/Notification") },
    
     {  path: '*',  name:'allhome', component: () => import("./components/Home") },
   
        ],
 
});