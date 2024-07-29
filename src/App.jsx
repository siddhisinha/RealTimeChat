import "./App.css";
import Room from "./pages/Room";
import Loginpage from "./pages/Loginpage";
import PrivateRoutes from "./context/Private";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
function App() {
  return (
    <Router>
      <AuthProvider>
      <Routes>
        <Route path="/login" element={<Loginpage />} />
        <Route path="/register" element={<Register />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Room />} />
        </Route>
      </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
