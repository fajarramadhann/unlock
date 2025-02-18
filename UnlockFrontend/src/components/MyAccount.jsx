import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import Button from "./ui/Button";

export default function MyAccount() {
  const { address, isConnected } = useAccount();
  const [userContent, setUserContent] = useState([]);

  useEffect(() => {
    if (isConnected) {
      const storedContents = JSON.parse(localStorage.getItem("uploadedContents")) || [];
      setUserContent(storedContents.filter((content) => content.creator === address));
    }
  }, [isConnected, address]);

  if (!isConnected) {
    return (
      <div className="p-8">
        <h2 className="text-3xl font-bold mb-6">My Account</h2>
        <p className="text-gray-500">Please connect your wallet to view your account information.</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h3 className="text-2xl font-bold mt-8 mb-4">My Uploaded Content</h3>
      {userContent.length > 0 ? (
        <div className="grid grid-cols-3 gap-6">
          {userContent.map((content, index) => (
            <Button
              key={index}
              className="p-0 rounded-lg overflow-hidden bg-white flex flex-col"
              onClick={() => navigate(`/content/${content.id}`)}
            >
              <img src={content.imageUrl} alt={content.title} className="w-full h-44 object-cover border-b-2 border-black" />
              <h4 className="text-lg font-bold">{content.title}</h4>
              <p className="text-sm text-gray-500">Price: {content.price}</p>
            </Button>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">You haven't uploaded any content yet.</p>
      )}
    </div>
  );
}
