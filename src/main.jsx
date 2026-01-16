import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router'
import router from './Routes/Routes.jsx'
import AuthProvider from './Context/AuthProvider.jsx'
import AOS from "aos";
import "aos/dist/aos.css";
import { Toaster } from 'react-hot-toast'

AOS.init({
  duration: 800,
  easing: "ease-out-cubic",
  once: true,
});

const savedTheme = localStorage.getItem("theme") || "light";
document.documentElement.setAttribute("data-theme", savedTheme);



createRoot(document.getElementById('root')).render(
  <StrictMode>
   <AuthProvider>
    <RouterProvider router={router} />
     <Toaster position="top-right" reverseOrder={false} />
   </AuthProvider>
  </StrictMode>,
)
