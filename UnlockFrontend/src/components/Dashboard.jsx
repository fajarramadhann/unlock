import { useEffect } from "react";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useNavigate } from "react-router-dom";
import ImageCard from "./ui/ImageCard";
import Button from "./ui/Button";

export default function Dashboard() {
  const { isConnected } = useAccount();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isConnected) {
      navigate("/");
    }
  }, [isConnected, navigate]);

  if (!isConnected) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center font-bold">
        <p className="text-xl">Redirecting to Landing Page...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#f5f5dc] text-[#333]">
      {/* Sidebar */}
      <aside className="w-64 p-6 bg-[#ffffff] border-r-4 border-black">
        <h1 className="text-2xl font-bold mb-6">🔓 Unlock</h1>
        <nav className="space-y-6">
          <Button className="w-full p-3 bg-[#ffcc00] text-black font-semibold">
            Explore
          </Button>
          <Button className="w-full p-3 bg-white text-black">
            My Account
          </Button>
          <Button className="w-full p-3 bg-white text-black">
            My Product
          </Button>
        </nav>
      </aside>

      {/* Main Content - Explore Section */}
      <main className="flex-1 p-8 overflow-y-auto">
        {/* Navbar */}
        <div className="flex justify-between items-center mb-6 border-b-4 border-black pb-4">
          <h2 className="text-3xl font-bold">Explore</h2>
          <ConnectButton />
        </div>

        {/* Search & Filters */}
        <div className="flex justify-between items-center mb-6">
          <Button className="w-full max-w-md flex justify-between items-center p-3 bg-white">
            <span>Search anything...</span>
            🔍
          </Button>
          <div className="space-x-2">
            <Button className="px-4 py-2 bg-gray-300 border-2 border-black rounded-lg shadow-neo">
              Coding
            </Button>
            <Button className="px-4 py-2 bg-gray-300 border-2 border-black rounded-lg shadow-neo">
              Design
            </Button>
            <Button className="px-4 py-2 bg-gray-300 border-2 border-black rounded-lg shadow-neo">
              Marketing
            </Button>
            <Button className="px-4 py-2 bg-gray-300 border-2 border-black rounded-lg shadow-neo">
              Accounting
            </Button>
          </div>
        </div>

        {/* List of Courses / Products */}
        <section>
          <h2 className="text-xl font-bold mb-4">Popular Classes</h2>
          <div className="grid grid-cols-3 gap-6">
            <Button className="p-0 border-2 border-black rounded-lg shadow-neo overflow-hidden">
              <ImageCard imageUrl="https://via.placeholder.com/250" caption="Lumacy Design Class" />
            </Button>
            <Button className="p-0 border-2 border-black rounded-lg shadow-neo overflow-hidden">
              <ImageCard imageUrl="https://via.placeholder.com/250" caption="Digital Art Pro" />
            </Button>
            <Button className="p-0 border-2 border-black rounded-lg shadow-neo overflow-hidden">
              <ImageCard imageUrl="https://via.placeholder.com/250" caption="Expressive Sketching" />
            </Button>
          </div>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-bold mb-4">Newest Class</h2>
          <div className="grid grid-cols-3 gap-6">
            <Button className="p-0 border-2 border-black rounded-lg shadow-neo overflow-hidden">
              <ImageCard imageUrl="https://via.placeholder.com/250" caption="Drawing Toward Illustration" />
            </Button>
            <Button className="p-0 border-2 border-black rounded-lg shadow-neo overflow-hidden">
              <ImageCard imageUrl="https://via.placeholder.com/250" caption="Color Theory for Illustration" />
            </Button>
            <Button className="p-0 border-2 border-black rounded-lg shadow-neo overflow-hidden">
              <ImageCard imageUrl="https://via.placeholder.com/250" caption="Illustrations to Life" />
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}
