import { createBrowserRouter } from "react-router-dom";

/* ========== Layouts ========== */
import HomeLayout from "../Layout/HomeLayout";
import AuthLayout from "../Layout/AuthLayout";
import DashboardLayout from "../Pages/DashboardLayout";

/* ========== Pages ========== */
import Home from "../Pages/Home";
import Courses from "../Pages/Courses";
import CourseDetails from "../Components/CourseDetails";

/* ========== Auth Pages ========== */
import Register from "../Pages/Auth/Register";
import Login from "../Pages/Auth/Login";
import ForgotPassword from "../Pages/Auth/ForgotPassword";

/* ========== Dashboard Pages ========== */
import EnrolledCourses from "../Components/EnrolledCourses";
import MyCourses from "../Components/MyCourses";
import Analytics from "../Components/Analytics";

/* ========== Routes ========== */
import PrivateRoutes from "./PrivateRoutes";
import ErrorPage from "../Components/ErrorPage";

const router = createBrowserRouter([
  /* ================= HOME ================= */
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "courses",
        element: <Courses />,
      },
      {
        path: "courses/:id", 
        element: (
          <PrivateRoutes>
            <CourseDetails />
          </PrivateRoutes>
        ),
      },
    ],
  },

  /* ================= DASHBOARD ================= */
  {
    path: "/dashboard",
    element: (
      <PrivateRoutes>
        <DashboardLayout />
      </PrivateRoutes>
    ),
    children: [
      {
        index: true, // DEFAULT PAGE
        element: <EnrolledCourses />,
      },
      {
        path: "enrolled-courses",
        element: <EnrolledCourses />,
      },
      {
        path: "my-courses",
        element: <MyCourses />,
      },
      {
        path: "analytics",
        element: <Analytics />,
      },
    ],
  },

  /* ================= AUTH ================= */
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
    ],
  },

  /* ================= 404 ================= */
  {
    path: "*",
    element: <ErrorPage></ErrorPage>,
  },
]);

export default router;
