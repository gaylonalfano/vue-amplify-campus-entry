import {
  createRouter,
  createWebHistory,
  RouteRecordRaw,
  RouteLocationNormalized,
  NavigationGuardNext
} from "vue-router";
import { Auth } from "aws-amplify";
// import Welcome from "@/views/Welcome.vue";
import Login from "@/views/Login.vue";
import Entrance from "@/views/Entrance.vue";
import StudentForm from "@/views/StudentForm.vue";
import EmployeeForm from "@/views/EmployeeForm.vue";
import ConsultantForm from "@/views/ConsultantForm.vue";
import VisitorForm from "@/views/ConsultantForm.vue";
import QrCode from "@/views/QrCode.vue";

// async function requireNoAuth(
//   to: RouteLocationNormalized,
//   from: RouteLocationNormalized,
//   next: NavigationGuardNext
// ) {
//   // Grab current user if logged in
//   const user = await Auth.currentUserInfo();
//   console.log("RouterGuard:requireNoAuth:user ", user);

//   if (user) {
//     // Redirect to Entrance route
//     next({ name: "Entrance" });
//   } else {
//     // Let them through/continue to Login/Root page
//     next();
//   }
// }

// Create a Route Guard (Auth Guard) function
// NOTE Going to use AWS Auth to grab currentUser (if available)
// NOTE Need to register this Auth Guard to Entrance route
// NOTE We add to, from, next because it aligns with beforeEnter method
// Q: How to add vue-router types so I don't have to use ts-ignore?
// A: Import from vue-router. Note difference btw expression vs. declaration syntax
async function requireAuth(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  // NOTE We don't use our getUser composable because we don't need to
  // listen to AuthState changes, etc.
  const user = await Auth.currentUserInfo();
  console.log("RouterGuard:requireAuth:user: ", user); // null. Expected behavior?

  if (!user) {
    // Unauthorized (user is null) so send back to Login page
    next({ name: "Login" });
  } else {
    // Need to invoke next() to move forward
    next();
  }
}

const routes: Array<RouteRecordRaw> = [
  // {
  //   path: "/",
  //   name: "Welcome",
  //   component: Welcome
  //   // beforeEnter: requireNoAuth
  // },
  {
    path: "/",
    name: "Entrance",
    component: Entrance,
    beforeEnter: requireAuth
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/student",
    name: "Student",
    component: StudentForm
    // beforeEnter: requireAuth
  },
  {
    path: "/employee",
    name: "Employee",
    component: EmployeeForm
    // beforeEnter: requireAuth
  },
  {
    path: "/consultant",
    name: "Consultant",
    component: ConsultantForm
    // beforeEnter: requireAuth
  },
  {
    path: "/visitor",
    name: "Visitor",
    component: VisitorForm
    // beforeEnter: requireAuth
  },
  {
    path: "/qrcode",
    name: "QrCode",
    component: QrCode
    // beforeEnter: requireAuth
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
