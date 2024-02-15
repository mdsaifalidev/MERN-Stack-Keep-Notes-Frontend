import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    try {
      const response = await fetch("/api/notes", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();
      if (result.success) {
        setNotes(result.note);
        setLoading(false);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const deleteNote = async (id) => {
    try {
      const response = await fetch(`/api/notes/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();
      if (result.success) {
        setNotes(notes.filter((note) => note._id !== id));
        setLoading(false);
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);
  return (
    <>
      <Navbar />
      {loading ? (
        <Spinner />
      ) : (
        <div className="container mt-3">
          <div className="card border-primary">
            <div className="card-header bg-primary d-flex align-items-center justify-content-between">
              <h4 className="mb-0 text-white">All Notes</h4>
              <Link to="/dashboard/notes/new" className="btn btn-light">
                Add New Note
              </Link>
            </div>
            <div className="card-body">
              <table class="table table-striped mb-0">
                {notes.length === 0 ? (
                  <p className="mb-0">{import.meta.env.VITE_DESC}</p>
                ) : (
                  <>
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Title</th>
                        <th scope="col">Description</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {notes.map((note, index) => (
                        <tr key={note._id}>
                          <th scope="row">{index + 1}</th>
                          <td>{note.title}</td>
                          <td>{note.description}</td>
                          <td>
                            <Link
                              to={`/dashboard/notes/edit/${note._id}`}
                              className="btn btn-success btn-sm me-2"
                            >
                              Edit
                            </Link>
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => deleteNote(note._id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </>
                )}
              </table>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default Dashboard;
