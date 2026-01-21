import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./auth/login.jsx";
import Register from "./auth/register.jsx";
import Dashboard from "./pages/dashboard.jsx";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
