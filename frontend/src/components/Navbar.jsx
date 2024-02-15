import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/auth";

const Navbar = () => {
  const navigate = useNavigate();
  const { auth } = useAuth();

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();
      if (result.success) {
        toast.success(result.message);
        navigate("/login");
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Something went wrong.");
    }
  };
  return (
    <header className="navbar navbar-expand-lg bg-white shadow-sm">
      <div className="container">
        <Link to="/dashboard">
          <h4 className="mb-0">{import.meta.env.VITE_TITLE}</h4>
        </Link>
        <div className="btn-group">
          <button
            type="button"
            className="btn btn-primary dropdown-toggle text-capitalize"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Welcome,{auth.user.name}
          </button>
          <ul className="dropdown-menu">
            <li>
              <Link to="/dashboard/profile" className="dropdown-item">
                Profile
              </Link>
            </li>
            <li>
              <Link to="/dashboard/change-password" className="dropdown-item">
                Change Password
              </Link>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <Link onClick={handleLogout} className="dropdown-item">
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
