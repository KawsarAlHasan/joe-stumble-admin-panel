import { Navigate, useLocation } from "react-router-dom";
import { useAdminProfile } from "../api/api";
import Loading from "../components/Loading";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  const { adminProfile, isLoading, isError, error, refetch } =
    useAdminProfile();

  const location = useLocation();

  if (isLoading) {
    return <Loading />;
  }

  if (isError || error || !adminProfile) {
    localStorage.removeItem("token");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
