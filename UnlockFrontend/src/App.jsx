import { Toaster } from "react-hot-toast";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import LandingPage from "./components/LandingPage";
import Dashboard from "./components/Dashboard";
import MyAccount from "./components/MyAccount";
import MyPurchase from "./components/MyPurchase";
import CreateContent from "./components/CreateContent";
import ContentPage from "./components/ContentPage";

function App() {
  return (
    <BrowserRouter>
      {/* Tambahkan Toaster di sini */}
      <Toaster position="top-right" />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/my-account" element={<MyAccount />} />
          <Route path="/my-purchase" element={<MyPurchase />} />
          <Route path="/create-content" element={<CreateContent />} />
          <Route path="/content/:id" element={<ContentPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;