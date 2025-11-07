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
import ItemMasterSetup from "./pages/ItemMasterSetup";
import Vendors from "./pages/Forms/VendorsForm";
// import AssignUserToVendorForm from "./pages/Forms/AssignUserToVendorForm"; // Fixed typo: ssign → Assign
import CreateVendorForm from "./pages/Forms/CreateVendorForm";
import CreateItemForm from "./pages/Forms/CreateItemForm";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import CompanyListing from "./pages/CompanyListing";

// Forms
import TenantUserForm from "./pages/Forms/TenantUserForm";
import CreateCompanyForm from "./pages/Forms/CreateCompanyForm";

// Layout & Routing
import PrivateRoute from "./routes/PrivateRoute";
import PrivateLayout from "./layout/PrivateLayout";
import AssignUserToVendorForm from "./pages/Forms/AssignUserToVendorForm";
import VendorListing from './pages/VendorListing';
import UserListing from './pages/UserListing';
import ItemListing from "./pages/ItemListing";  
import PurchaseOrderForm from "./pages/Forms/PurchaseOrderForm ";
import PurchaseCycle from "./pages/PurchaseCycle";

// Base URL
export const BaseUrl = "http://192.168.100.18:3000";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* PRIVATE ROUTES */}
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
            <Route path="/ItemMasterSetup" element={<ItemMasterSetup />} />
            <Route path="/TenantUserForm" element={<TenantUserForm />} />
            <Route path="/VendorsForm" element={<Vendors />} />
            <Route path="/CreateCompanyForm" element={<CreateCompanyForm />} />
            <Route path="/VendorListing" element={<VendorListing />} />
            <Route path="/CompanyListing" element={<CompanyListing />} />
            <Route path="/UserListing" element={<UserListing />} />
            <Route path="/ItemListing" element={<ItemListing />} />
            <Route path="/PurchaseOrderForm" element={<PurchaseOrderForm />} /> 
              <Route path="/PurchaseCycle" element={<PurchaseCycle />} />


            <Route path="/AssignUserToVendorForm" element={<AssignUserToVendorForm />} />



            <Route path="/CreateVendorForm" element={<CreateVendorForm />} />
            <Route path="/CreateItemForm" element={<CreateItemForm />} />

            {/* Header pages */}
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
