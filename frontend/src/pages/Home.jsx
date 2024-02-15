import { Link } from "react-router-dom";

const Home = () => {
  const { VITE_TITLE, VITE_DESC } = import.meta.env;
  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100">
      <div className="text-center">
        <h4>{VITE_TITLE}</h4>
        <p>{VITE_DESC}</p>
        <Link to="/login" className="btn btn-primary me-2">
          Login
        </Link>
        <Link to="/signup" className="btn btn-outline-primary">
          Signup
        </Link>
      </div>
    </div>
  );
};

export default Home;
