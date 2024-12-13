import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import SeparateURL from "./components/SeparateURL";
import { AuthProvider } from "./components/AuthContext";
function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<SeparateURL />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={<ProtectedRoute Component={Dashboard} />}
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
