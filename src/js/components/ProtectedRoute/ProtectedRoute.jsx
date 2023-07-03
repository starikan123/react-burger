import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRouteElement = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    // If the user is not authenticated and trying to access a protected route
    if (!isAuthenticated && isProtectedRoute(location.pathname)) {
      // Redirect to the login page
      navigate("/login", { replace: true, state: { from: location } });
    }
  }, [isAuthenticated, navigate, location]);

  const isProtectedRoute = (pathname) => {
    // Check if the provided pathname belongs to a protected route
    const protectedRoutes = ["/profile", "/profile/*"];
    return protectedRoutes.some((route) =>
      pathname.startsWith(route.replace("*", ""))
    );
  };

  return isAuthenticated ? children : null;
};

export default ProtectedRouteElement;
