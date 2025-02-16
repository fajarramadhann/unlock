import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import LandingPage from "./components/LandingPage";
import Dashboard from "./components/Dashboard";
import MyAccount from "./components/MyAccount";
import MyPurchase from "./components/MyPurchase";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/my-account" element={<MyAccount />} />
          <Route path="/my-purchase" element={<MyPurchase />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
