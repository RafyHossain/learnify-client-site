import React from "react";
import Navbar from "../Components/Navbar";
import Hero from "../Components/Hero";
import HowWorks from "../Components/AddCourse";
import { useLoaderData } from "react-router";
import PopularSkills from "../Components/EnrolledCourses";
import TopRatedProviders from "../Components/TopInstructors";
import Testimonials from "../Components/Analytics";

const Home = () => {
  
  return (
    <div>
      <Hero></Hero>
     
    </div>
  );
};

export default Home;
