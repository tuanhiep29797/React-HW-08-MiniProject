import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./componentes/Login";
import Dashboard from "./componentes/Dashboard";
import UserManagement from "./pages/UserManagement";
import DetailUser from "./pages/UserManagement/components/DetailUser";
import ProductManagement from "./pages/ProductManagement";
import DetailProduct from "./pages/ProductManagement/components/DetailProduct";

function App() {
  
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/users" element={<UserManagement/>} />
      <Route path="/users/:id" element={<DetailUser />} />
      <Route path="/products" element={<ProductManagement />} />
      <Route path="/products/:id" element={<DetailProduct />} />
    </Routes>
  );
}

export default App;
