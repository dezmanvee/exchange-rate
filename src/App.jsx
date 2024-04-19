import Navbar from "./components/Navbar";
import ProtectedRoutes from "./components/ProtectedRoutes";
import CssBaseline from "@emotion/styled";
import { SignUp, Login, Home, Update } from "./pages";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {


  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <ToastContainer />
        <CssBaseline />
        <Routes>
          <Route path="/register" element={<SignUp />} />
          <Route path="/login" element={<Login />} />

          {/* protects user's profile route */}
          <Route path="" element={<ProtectedRoutes />}>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Update />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
