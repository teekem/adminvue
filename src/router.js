import Vue from "vue";

import VueRouter from "vue-router";
import store from "./state/store";

Vue.use(VueRouter);


const requireAuth =(to, from, next)=>{
  // console.log(to)
  if(store.getters.isAuth){
    next();
    return
  }
  next("/");
    return;
}

const ifAuth = (to,from, next)=>{
  // console.log(to)
  if(store.getters.isAuth){
    next({name:'admin'});
    return
  }else{
    next()
    return 
  }
}


export const router = new VueRouter({
  // mode: "history",
  routes: [
    // { path: '/', name:'App', component: () => import("./App.vue") },
    {
      path: "/",
      name: "Login",
      component: () => import("./components/auth/Login"),
      beforeEnter:ifAuth,
    },
    {
      path: "/admin",
      name:"admin",
      component: () => import("./components/layout/master.layout.vue"),
      beforeEnter:requireAuth,
      children:[
        {path:'/', name:'overview', component:()=>import("./components/layout/adminOverview.vue")},
        { path: '/admin/applicants', name:'applicants',component: () => import("./components/application/Applicants") },
        {path:'/admin/pgcoord/list', name:'approvePgcoord', component:()=> import("./components/approve.pgcoord.vue")},
        {path: '/admin/Schedule', name:'Schedule' , component:()=>import("./components/payments/schedule.vue")},
        {path:"/admin/report", name:"report", component:()=> import("./components/payments/report.vue")},
        {path:"/admin/payment/admisson", name:"Admission", component:()=> import("./components/payments/admission.payment.vue")},
        {path:"/admin/payment/student" , name:"Student", component:()=>import("./components/payments/student.payment.vue")},
        {path:"/admin/course/curriculum", name:"curriculum", component:()=>import("./components/course/course.container.vue")},
      ]
    },
    {
      path: "/home",
      name: "home",
      component: () => import("./components/Home"),
    },
    {
      path: "/document",
      name: "document",
      component: () => import("./components/Document"),
    },
    {
      path: "/account",
      name: "account",
      component: () => import("./components/Account"),
    },
    {
      path: "/settings",
      name: "settings",
      component: () => import("./components/Settings"),
    },
    {
      path: "/getapplication",
      name: "getapplication",
      component: () => import("./components/application/GetApplications"),
      props: true,
    },

    {
      path: "/notifications",
      name: "notifications",
      component: () => import("./components/Notification"),
    },

    {
      path: "*",
      name: "allhome",
      component: () => import("./components/Home"),
    },
  ],
});

