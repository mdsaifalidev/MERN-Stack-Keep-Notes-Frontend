import { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import { Outlet, Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../Spinner";

const Protected = () => {
  const [loading, setLoading] = useState(true);
  const { auth, setAuth } = useAuth();

  const checkAuth = async () => {
    try {
      const response = await fetch("/api/auth/check", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();
      if (result.success) {
        setAuth({ user: result.user, isLoggedIn: true });
        setLoading(false);
        toast.success(result.message);
      } else {
        setAuth({ user: null, isLoggedIn: false });
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  if (loading) {
    return <Spinner />;
  }
  // console.log("context:", auth);
  return auth.user ? <Outlet /> : <Navigate to="/login" replace="true" />;
};

export default Protected;
