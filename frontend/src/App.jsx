import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Protected from "./components/Routes/Protected";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import CreateNote from "./pages/notes/CreateNote";
import EditNote from "./pages/notes/EditNote";
import Profile from "./pages/Profile";
import ChangePassword from "./pages/ChangePassword";
import PageNotFound from "./pages/PageNotFound";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/" element={<Protected />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="dashboard/notes/new" element={<CreateNote />} />
            <Route path="dashboard/notes/edit/:id" element={<EditNote />} />
            <Route path="dashboard/profile" element={<Profile />} />
            <Route
              path="dashboard/change-password"
              element={<ChangePassword />}
            />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
