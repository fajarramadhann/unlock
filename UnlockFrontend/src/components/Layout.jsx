import { useState, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Button from "./ui/Button";
import { LayoutDashboard, ShoppingBag, PlusCircle, User } from "lucide-react"; // Import Lucide icons

export default function Layout() {
  const [activeMenu, setActiveMenu] = useState("Explore");
  const { isConnected } = useAccount();
  const navigate = useNavigate();

  // Redirect to LandingPage if wallet is disconnected
  useEffect(() => {
    if (!isConnected) {
      navigate("/");
    }
  }, [isConnected, navigate]);

  return (
    <div className="flex min-h-screen bg-bg text-[#333]">
      {/* Sidebar */}
      <aside className="w-64 p-6 bg-[#ffffff] border-r-4 border-black fixed h-full">
        <h1 className="text-2xl font-bold mb-6">🔓 Unlock</h1>
        <nav className="flex flex-col gap-4">
          <Link to="/dashboard">
            <Button
              className={`w-full p-3 border-2 flex items-center gap-2 ${
                activeMenu === "Explore" ? "text-black" : "bg-white"
              }`}
              onClick={() => setActiveMenu("Explore")}
            >
              <LayoutDashboard size={20} /> Explore
            </Button>
          </Link>
          <Link to="/my-purchase">
            <Button
              className={`w-full p-3 border-2 flex items-center gap-2 ${
                activeMenu === "My Purchase" ? "text-black" : "bg-white"
              }`}
              onClick={() => setActiveMenu("My Purchase")}
            >
              <ShoppingBag size={20} /> My Purchase
            </Button>
          </Link>
          <Link to="/create-content">
            <Button
              className={`w-full p-3 border-2 flex items-center gap-2 ${
                activeMenu === "Create Content" ? "text-black" : "bg-white"
              }`}
              onClick={() => setActiveMenu("Create Content")}
            >
              <PlusCircle size={20} /> Create Content
            </Button>
          </Link>
          <Link to="/my-account">
            <Button
              className={`w-full p-3 border-2 flex items-center gap-2 ${
                activeMenu === "My Account" ? "text-black" : "bg-white"
              }`}
              onClick={() => setActiveMenu("My Account")}
            >
              <User size={20} /> My Account
            </Button>
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 ml-64 overflow-y-auto">
        <div className="flex justify-between items-center mb-4 border-b-4 border-black pb-4">
          <h2 className="text-3xl font-bold">{activeMenu}</h2>
          <ConnectButton />
        </div>
        <Outlet />
      </main>
    </div>
  );
}