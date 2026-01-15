import React from "react";
import Navbar from "../Components/Navbar";
import Hero from "../Components/Hero";
import HowWorks from "../Components/AddCourse";
import { useLoaderData } from "react-router";
import PopularSkills from "../Components/EnrolledCourses";
import TopRatedProviders from "../Components/TopInstructors";
import Testimonials from "../Components/Analytics";
import PopularCourses from "../Components/PopularCourses";

const Home = () => {
  
  return (
    <div>
      <Hero></Hero>
      <PopularCourses></PopularCourses>
     
    </div>
  );
};

export default Home;
