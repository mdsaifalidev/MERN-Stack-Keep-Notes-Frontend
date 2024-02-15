import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import Spinner from "../../components/Spinner";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const CreateNote = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [note, setNote] = useState({
    title: "",
    description: "",
  });

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setNote({ ...note, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(note),
      });

      const result = await response.json();
      if (result.success) {
        setNote({
          title: "",
          description: "",
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
      <Navbar />
      <div className="container mt-3">
        <div className="row">
          <div className="col-lg-4 m-auto">
            <div className="mb-3 text-center">
              <h4>Create Note</h4>
              <p className="mb-0">Welcome to {import.meta.env.VITE_TITLE}</p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="bg-white p-4 rounded shadow-sm"
            >
              <div className="mb-3">
                <label htmlFor="title" className="mb-2">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  className="form-control"
                  value={note.title}
                  onChange={handleInput}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  rows="5"
                  className="form-control"
                  value={note.description}
                  onChange={handleInput}
                  required
                ></textarea>
              </div>
              <div className="mb-3">
                <button type="submit" className="btn btn-primary w-100">
                  Create Now
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

export default CreateNote;
