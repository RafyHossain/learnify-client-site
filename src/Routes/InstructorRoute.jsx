import { Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthProvider";
import useUserRole from "../hooks/useUserRole";
import Loading from "../Components/Loading";

const InstructorRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const { role, loading: roleLoading } = useUserRole(user?.email);
  const location = useLocation();

  if (loading || roleLoading) {
    return <Loading />;
  }

  if (user && role === "instructor") {
    return children;
  }

  return (
    <Navigate to="/dashboard" state={location.pathname} replace />
  );
};

export default InstructorRoute;
