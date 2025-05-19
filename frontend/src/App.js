import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { user, logout } = useContext(AuthContext);

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-100">
        <nav className="bg-white shadow-md py-4">
          <div className="container mx-auto flex justify-center space-x-10">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-700 font-medium">
                  Hoş Geldin, {user.email}
                </span>
                <button
                  onClick={logout}
                  className="bg-red-500 text-white px-4 py-1"
                >
                  Çıkış Yap
                </button>
              </div>
            ) : (
              <div>
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
            )}
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
