import { useEffect, useState } from "react";
import axiosPublic from "./useAxiosPublic";

const useUserRole = (email) => {
  const [state, setState] = useState({
    role: null,
    exists: false,
    loading: true,
  });

  useEffect(() => {
    if (!email) return;

    let isMounted = true; // 

    axiosPublic
      .get(`/users/${email}`)
      .then((res) => {
        if (isMounted) {
          setState({
            exists: res.data.exists,
            role: res.data.role || null,
            loading: false,
          });
        }
      })
      .catch(() => {
        if (isMounted) {
          setState({
            exists: false,
            role: null,
            loading: false,
          });
        }
      });

    return () => {
      isMounted = false; // cleanup
    };
  }, [email]);

  return state; // { role, exists, loading }
};

export default useUserRole;
