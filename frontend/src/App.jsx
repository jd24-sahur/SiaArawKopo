import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./Login";
import Dashboard from "./Dashboard";
import AddMedicine from "./AddMedicine";
import AddInventory from "./AddInventory";
import Sales from "./Sales";
import Suppliers from "./Suppliers";
import Register from "./Register"
function App() {
  return (
    <Router>
      <Routes>
        {/* AUTH */}
        <Route path="/" element={<Login />} />
<Route path="/register" element={<Register />} />

        {/* MAIN */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/medicines" element={<AddMedicine />} />
        <Route path="/add-inventory" element={<AddInventory />} />
        <Route path="/sales" element={<Sales />} />
        <Route path="/suppliers" element={<Suppliers />} />
      </Routes>
    </Router>
  );
}

export default App;