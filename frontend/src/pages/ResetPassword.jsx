import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const { token } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`/api/auth/reset-password/${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      const result = await response.json();
      if (result.success) {
        setPassword("");
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
                <h4>Reset Password</h4>
                <p>Welcome to {import.meta.env.VITE_TITLE}</p>
              </div>
              <form
                onSubmit={handleSubmit}
                className="bg-white p-4 rounded shadow-sm"
              >
                <div className="mb-3">
                  <label htmlFor="password" className="mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <button type="submit" className="btn btn-primary w-100">
                    Update Password
                  </button>
                </div>
                <div className="text-center">
                  <Link to="/login">Back to Login</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
