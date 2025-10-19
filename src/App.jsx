import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import CompanySetup from "./pages/CompanySetup";
import CustomerSetup from "./pages/CustomerSetup";
import ItemProductSetup from "./pages/ItemProductSetup";
import WarehouseSetup from "./pages/WarehouseSetup";
import PrincipalSetup from "./pages/PrincipalSetup";
import TradeOffersSetup from "./pages/TradeOffersSetup";
import InventoryManagement from "./pages/InventoryManagement";

import PrivateRoute from "./routes/PrivateRoute";
import PrivateLayout from "./layout/PrivateLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/*  PUBLIC ROUTES */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/*  PRIVATE ROUTES */}
        <Route element={<PrivateRoute />}>
          <Route element={<PrivateLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/company-setup" element={<CompanySetup />} />
            <Route path="/customer-setup" element={<CustomerSetup />} />
            <Route path="/ItemProductSetup" element={<ItemProductSetup />} />
            <Route path="/warehouse-setup" element={<WarehouseSetup />} />
            <Route path="/PrincipalSetup" element={<PrincipalSetup />} />
            <Route path="/TradeOffersSetup" element={<TradeOffersSetup />} />
            <Route path="/InventoryManagement" element={<InventoryManagement />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
