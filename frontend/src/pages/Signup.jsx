import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";

const Signup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
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
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const result = await response.json();
      if (result.success) {
        setUser({
          name: "",
          email: "",
          phone: "",
          password: "",
        });
        setLoading(false);
        toast.success(result.message);
        navigate("/login");
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
                <h4>Create Account</h4>
                <p>Welcome to {import.meta.env.VITE_TITLE}</p>
              </div>
              <form
                onSubmit={handleSubmit}
                className="bg-white p-4 rounded shadow-sm"
              >
                <div className="mb-3">
                  <label htmlFor="name" className="mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    value={user.name}
                    onChange={handleInput}
                    required
                  />
                </div>
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
                  <label htmlFor="phone" className="mb-2">
                    Phone
                  </label>
                  <input
                    type="text"
                    name="phone"
                    className="form-control"
                    value={user.phone}
                    onChange={handleInput}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="mb-2">
                    Password
                  </label>
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
                    Signup
                  </button>
                </div>
                <div className="text-center">
                  <p className="mb-0">
                    Already have an account?
                    <Link to="/login" className="ms-1">
                      Login
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

export default Signup;
