import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import Features from "./components/Features";
import ProtectedRoute from "./components/ProtectedRoute";
import HomePage from "./components/Home";
import Dashboard2 from "./components/Dashboard2";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard2" element={<Dashboard2 />} />
        <Route path="/features" element={<Features />} />
        {/* <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        /> */}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
