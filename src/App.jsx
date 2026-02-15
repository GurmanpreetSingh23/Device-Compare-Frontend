import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import LandingPage from "./pages/LandingPage";
import FilterResult from "./pages/FilterResult";
import SearchResult from "./pages/SearchResult";
import ProductDetails from "./pages/ProductDetails";
import CompareProducts from "./pages/CompareProducts";
import AdminDescription from "./pages/AdminDescription";
import AdminPanel from "./pages/AdminPanel";
import ProductUpdate from "./pages/ProductUpdate";
import RegisterProduct from "./pages/RegisterProduct";
import PageNotFound from "./components/PageNotFound";
import Account from "./components/Account";
import UpdateAccount from "./components/UpdateAccount";

function App() {
  return (
    <Router>
      <Routes>
        {/* Auth routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/device-compare/login" element={<LoginPage />} />
        <Route path="/device-compare/register" element={<RegisterPage />} />

        {/* User routes */}
          <Route path="/device-compare" element={<LandingPage />} />
          <Route path="/device-compare/user/account" element={<Account />} />
          <Route
            path="/device-compare/account/update"
            element={<UpdateAccount />}
          />
          <Route path="/device-compare/home" element={<Home />} />
          <Route
            path="/device-compare/filter/products/:deviceType"
            element={<FilterResult />}
          />
          <Route
            path="/device-compare/filter/products/search/:query"
            element={<SearchResult />}
          />
          <Route
            path="/device-compare/product/:id"
            element={<ProductDetails />}
          />
          <Route
            path="/device-compare/products/compare"
            element={<CompareProducts />}
          />
      

        {/* Admin routes */}
  
          <Route
            path="/device-compare/admin/dashboard"
            element={<AdminPanel />}
          />
          <Route
            path="/device-compare/admin/description"
            element={<AdminDescription />}
          />
          <Route
            path="/device-compare/admin/devices/update/:id"
            element={<ProductUpdate />}
          />
          <Route
            path="/device-compare/admin/devices/register"
            element={<RegisterProduct />}
          />
   

        {/* 404 – ALWAYS LAST */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
