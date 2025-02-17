// MyAccount.jsx
import { useState, useEffect } from 'react';
import { useAccount, useBalance } from 'wagmi';
import Button from './ui/Button';

export default function MyAccount() {
  const { address, isConnected } = useAccount();
  const { data: balance } = useBalance({ address });

  const [userContent, setUserContent] = useState([]);

  useEffect(() => {
    if (isConnected) {
      // Fetch user's uploaded content from your backend or blockchain
      // For now, we'll use a dummy array
      const dummyContent = [
        {
          imageUrl: './unlock.jpg',
          title: 'Mastering Trading Technical Analysis',
          price: '0.02 ETH',
          creator: address,
          tag: 'Featured',
        },
        // Add more dummy content if needed
      ];

      setUserContent(dummyContent);
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
      <div className="bg-white border-2 border-black p-4 rounded-lg shadow-lg">
        <h3 className="text-2xl font-bold mb-4">Wallet Information</h3>
        <div className="mb-4">
          <p className="font-bold">Wallet Address:</p>
          <p className="text-sm text-gray-500">{address}</p>
        </div>
        <div className="mb-4">
          <p className="font-bold">Balance:</p>
          <p className="text-sm text-gray-500">{balance?.formatted} ETH</p>
        </div>
      </div>

      <h3 className="text-2xl font-bold mt-8 mb-4">My Uploaded Content</h3>
      {userContent.length > 0 ? (
        <div className="grid grid-cols-3 gap-6">
          {userContent.map((content, index) => (
            <div key={index} className="bg-white border-2 border-black p-4 rounded-lg shadow-lg">
              <img
                src={content.imageUrl}
                alt={content.title}
                className="w-full h-44 object-cover mb-4"
              />
              <h4 className="text-lg font-bold">{content.title}</h4>
              <p className="text-sm text-gray-500">Price: {content.price}</p>
              <p className="text-sm text-gray-500">Tag: {content.tag}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">You haven't uploaded any content yet.</p>
      )}
    </div>
  );
}