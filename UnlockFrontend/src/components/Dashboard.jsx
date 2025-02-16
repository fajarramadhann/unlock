import Button from "./ui/Button";
import { useState } from "react";
import { Search } from "lucide-react";

export default function Dashboard() {
  const [search, setSearch] = useState("");

  // Data dummy untuk konten populer
  const popularContents = [
    {
      imageUrl: "./unlock.jpg",
      title: "Mastering Trading Technical Analysis",
      price: "0.02 ETH",
      creator: "0xC2…100b",
      tag: "Featured",
    },
    {
      imageUrl: "./unlock.jpg",
      title: "The Power of Procreate",
      price: "0.01 ETH",
      creator: "0xC2…100b",
      tag: "New",
    },
    {
      imageUrl: "./unlock.jpg",
      title: "Expressive Sketching",
      price: "0.2 ETH",
      creator: "0xC2…100b",
      tag: "",
    },
    {
      imageUrl: "./unlock.jpg",
      title: "Expressive Sketching",
      price: "0.2 ETH",
      creator: "0xC2…100b",
      tag: "",
    },
    {
      imageUrl: "./unlock.jpg",
      title: "Expressive Sketching",
      price: "0.2 ETH",
      creator: "0xC2…100b",
      tag: "",
    },
    {
      imageUrl: "./unlock.jpg",
      title: "Expressive Sketching",
      price: "0.2 ETH",
      creator: "0xC2…100b",
      tag: "",
    },
    {
      imageUrl: "./unlock.jpg",
      title: "Expressive Sketching",
      price: "0.2 ETH",
      creator: "0xC2…100b",
      tag: "",
    },

  ];

  return (
    <>
      {/* Search Bar & Category */}
      <section className="mb-6 p-2">
        <Button className="flex items-center gap-2 w-full px-4 py-2 bg-white border-2 border-black rounded-full">
          <Search className="text-gray-500" size={20} />
          <input
            type="text"
            placeholder="Search anything"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full outline-none bg-transparent"
          />
        </Button>

        {/* Categories */}
        <div className="flex gap-3 mt-4">
          {["Coding", "Blockchain", "Community", "Crypto"].map((category, index) => (
            <Button key={index} className="flex items-center gap-2 border-2 border-border px-3 py-2 rounded-full bg-white">
              <span className="w-5 h-5 rounded-full bg-gray-300 flex items-center justify-center">
                🔵
              </span>
              {category}
            </Button>
          ))}
        </div>
      </section>

      {/* Popular Content */}
      <section>
        <h2 className="text-xl font-bold mb-4">Popular Content</h2>
        <div className="grid grid-cols-3 gap-6">
          {popularContents.map((content, index) => (
            <Button key={index} className="p-0 rounded-lg overflow-hidden bg-white flex flex-col">
              {/* Image Section */}
              <div className="relative w-full h-44">
                <img 
                  src={content.imageUrl} 
                  alt={content.title} 
                  className="w-full h-full object-cover border-b-2 border-black"
                />
                {content.tag && (
                  <span className="absolute top-2 left-2 bg-pink-500 text-white px-2 py-1 text-xs rounded-full shadow-lg">
                    {content.tag}
                  </span>
                )}
              </div>

              {/* Content Details (Title, Creator, Price) */}
              <div className="p-3 flex flex-col gap-1">
                <h3 className="font-semibold text-lg">{content.title}</h3>
                <p className="text-sm text-gray-500">by {content.creator}</p>
                <div className="mt-1 font-bold text-lg">{content.price}</div>
              </div>
            </Button>
          ))}
        </div>
      </section>
    </>
  );
}
