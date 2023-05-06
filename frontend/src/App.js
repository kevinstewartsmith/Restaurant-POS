import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import Menu from "./pages/Menu";
import MenuItems from "./pages/MenuItems";
import Tables from "./pages/Tables";

function App() {
  return (
    <>
      <Router>
        <div className="bg-gray-900">
          <Header />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/items" element={<MenuItems />} />
            <Route path="/tables" element={<Tables />} />
          </Routes>
        </div>
        <ToastContainer />
      </Router>
    </>
  );
}

export default App;
