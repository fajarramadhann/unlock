import { useState, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Button from "./ui/Button";

export default function Layout() {
  const [activeMenu, setActiveMenu] = useState("Explore");
  const { isConnected } = useAccount();
  const navigate = useNavigate();

  // Redirect ke LandingPage jika wallet disconnect
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
              className={`w-full p-3 border-2 ${
                activeMenu === "Explore" ? "text-black" : "bg-white"
              }`}
              onClick={() => setActiveMenu("Explore")}
            >
              Explore
            </Button>
          </Link>
          <Link to="/my-purchase">
            <Button
              className={`w-full p-3 border-2 ${
                activeMenu === "My Purchase" ? "text-black" : "bg-white"
              }`}
              onClick={() => setActiveMenu("My Purchase")}
            >
              My Purchase
            </Button>
          </Link>
          <Link to="/create-content">
            <Button
              className={`w-full p-3 border-2 ${
                activeMenu === "Create Content" ? "text-black" : "bg-white"
              }`}
              onClick={() => setActiveMenu("Create Content")}
            >
              Create Content
            </Button>
          </Link>
          <Link to="/my-account">
            <Button
              className={`w-full p-3 border-2 ${
                activeMenu === "My Account" ? "text-black" : "bg-white"
              }`}
              onClick={() => setActiveMenu("My Account")}
            >
              My Account
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
