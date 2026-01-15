import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import HomeLayout from "../Layout/HomeLayout";
import AuthLayout from "../Layout/AuthLayout";
import Register from "../Pages/Auth/Register";
import Login from "../Pages/Auth/Login";
import Home from "../Pages/Home";
import Hero from "../Components/Hero";
import PrivateRoutes from "./PrivateRoutes";
import SkillDetails from "../Pages/Courses";
import MyProfile from "../Pages/DashboardLayout";
import Loading from "../Components/Loading";
import ForgotPassword from "../Pages/Auth/ForgotPassword";
import Dashboard from "../Pages/DashboardLayout";
import Courses from "../Pages/Courses";
import DashboardLayout from "../Pages/DashboardLayout";
import EnrolledCourses from "../Components/EnrolledCourses";
import AddCourse from "../Components/AddCourse";
import MyCourses from "../Components/MyCourses";
import Analytics from "../Components/Analytics";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout></HomeLayout>,
    children: [
      {
        index: true,
        
        Component: Home,
      },
      {
        path:"courses",
        
        Component:Courses,
      },
     {
  path: "/dashboard",
  element:<PrivateRoutes><DashboardLayout></DashboardLayout></PrivateRoutes>,
  children: [
    { path: "enrolled-courses", element: <EnrolledCourses></EnrolledCourses> },
    { path: "add-course", element: <AddCourse></AddCourse> },
    { path: "my-courses", element: <MyCourses /> },
    { path: "analytics", element: <Analytics  /> },
  ],
}
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout></AuthLayout>,
    children: [
      {
        path: "/auth/register",
        Component: Register,
      },
      {
        path: "/auth/login",
        Component: Login,
      },
      {
        path: "/auth/forgot-password",
        element:<ForgotPassword></ForgotPassword>,
      },
    ],
  },
  
]);
export default router;
