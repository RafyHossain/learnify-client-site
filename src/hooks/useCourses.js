import { useEffect, useState } from "react";
import axios from "axios";

const useCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("https://learnify-server-omega.vercel.app/courses").then(res => {
      setCourses(res.data);
      setLoading(false);
    });
  }, []);

  return { courses, loading };
};

export default useCourses;
