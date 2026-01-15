import { useEffect, useState } from "react";
import axiosPublic from "./useAxiosPublic";

const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosPublic.get("/categories").then((res) => {
      setCategories(res.data);
      setLoading(false);
    });
  }, []);

  return { categories, loading };
};

export default useCategories;
