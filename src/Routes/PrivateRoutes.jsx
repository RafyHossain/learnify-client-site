import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Context/AuthProvider";

const PrivateRoutes = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return <p className="text-center mt-20">Loading...</p>;
  }

  if (!user) {
    return (
      <Navigate to="/auth/login" state={{ from: location }} replace />
    );
  }

  return children;
};

export default PrivateRoutes;
