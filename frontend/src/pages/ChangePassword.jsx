import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ChangePassword = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    oldPassword: "",
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
      const response = await fetch("/api/users/update-password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const result = await response.json();
      if (result.success) {
        setUser({
          oldPassword: "",
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
      <Navbar />
      {loading && <Spinner />}
      <div className="container mt-3">
        <div className="row">
          <div className="col-lg-4 m-auto">
            <div className="text-center mb-3">
              <h4>Change Password</h4>
              <p>Welcome to {import.meta.env.VITE_TITLE}</p>
            </div>
            <form
              onSubmit={handleSubmit}
              className="bg-white p-4 rounded shadow-sm"
            >
              <div className="mb-3">
                <label htmlFor="oldPassword" className="mb-2">
                  Old Password
                </label>
                <input
                  type="password"
                  name="oldPassword"
                  className="form-control"
                  value={user.oldPassword}
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
                  Update Now
                </button>
              </div>
              <div className="text-center">
                <Link to="/dashboard">Back to Dashboard</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ChangePassword;
