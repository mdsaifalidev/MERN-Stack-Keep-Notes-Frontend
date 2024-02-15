import { Link, useNavigate, Navigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const result = await response.json();
      if (result.success) {
        setUser({
          email: "",
          password: "",
        });
        setLoading(false);
        toast.success(result.message);
        navigate("/dashboard");
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {loading && <Spinner />}
      <div className="d-flex align-items-center justify-content-center min-vh-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 m-auto">
              <div className="text-center mb-3">
                <h4>Login</h4>
                <p>Welcome to {import.meta.env.VITE_TITLE}</p>
              </div>
              <form
                onSubmit={handleSubmit}
                className="bg-white p-4 rounded shadow-sm"
              >
                <div className="mb-3">
                  <label htmlFor="email" className="mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={user.email}
                    onChange={handleInput}
                    required
                  />
                </div>
                <div className="mb-3">
                  <div className="d-flex align-align-items-center justify-content-between">
                    <label htmlFor="password" className="mb-2">
                      Password
                    </label>
                    <Link to="/forgot-password">Forgot Password?</Link>
                  </div>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    value={user.password}
                    onChange={handleInput}
                    required
                  />
                </div>
                <div className="mb-3">
                  <button type="submit" className="btn btn-primary w-100">
                    Login
                  </button>
                </div>
                <div className="text-center">
                  <p className="mb-0">
                    Don't have an account?
                    <Link to="/signup" className="ms-1">
                      Create account
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
