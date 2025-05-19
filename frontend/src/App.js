import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-100">
        {/* Navbar */}
        <nav className="bg-white shadow-md py-4">
          <div className="container mx-auto flex justify-center space-x-10">
            <Link
              to="/login"
              className="text-blue-600 font-semibold hover:text-blue-800 transition"
            >
              Giriş
            </Link>
            <Link
              to="/register"
              className="text-blue-600 font-semibold hover:text-blue-800 transition"
            >
              Kayıt Ol
            </Link>
          </div>
        </nav>

        <main>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>

        <footer className="text-center text-sm py-4 text-gray-500">
          © {new Date().getFullYear()} BookNook
        </footer>
      </div>
    </Router>
  );
}

export default App;
