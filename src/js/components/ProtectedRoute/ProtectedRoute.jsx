import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRouteElement = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!isAuthenticated && isProtectedRoute(location.pathname)) {
      navigate("/login", { replace: true, state: { from: location } });
    }
  }, [isAuthenticated, navigate, location]);

  const isProtectedRoute = (pathname) => {
    const protectedRoutes = ["/profile", "/profile/*"];
    return protectedRoutes.some((route) =>
      pathname.startsWith(route.replace("*", ""))
    );
  };

  return isAuthenticated ? children : null;
};

export default ProtectedRouteElement;
