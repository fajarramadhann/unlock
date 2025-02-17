// CreateContent.jsx
import { useState } from 'react';
import Button from './ui/Button';
import { useAccount } from 'wagmi';
import { useNavigate } from 'react-router-dom';

export default function CreateContent() {
  const { address } = useAccount();
  const navigate = useNavigate();

  const [thumbnail, setThumbnail] = useState(null);
  const [contentFile, setContentFile] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isPaid, setIsPaid] = useState(false);
  const [price, setPrice] = useState('0.0');

  const handleThumbnailChange = (e) => {
    setThumbnail(e.target.files[0]);
  };

  const handleContentFileChange = (e) => {
    setContentFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!address) {
      alert('Please connect your wallet to upload content.');
      return;
    }

    if (!thumbnail || !contentFile || !title || !description) {
      alert('Please fill in all required fields.');
      return;
    }

    // Here you would typically upload the files to a server or IPFS
    // and save the metadata to your backend or blockchain.
    // For now, we'll just log the data.

    console.log('Thumbnail:', thumbnail);
    console.log('Content File:', contentFile);
    console.log('Title:', title);
    console.log('Description:', description);
    console.log('Price:', isPaid ? `${price} ETH` : 'Free');

    // Redirect to dashboard or another page after successful upload
    navigate('/dashboard');
  };

  return (
    <div className="p-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Thumbnail</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleThumbnailChange}
            className="mt-1 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Content File</label>
          <input
            type="file"
            onChange={handleContentFileChange}
            className="mt-1 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Price</label>
          <div className="mt-1">
            <input
              type="checkbox"
              checked={isPaid}
              onChange={() => setIsPaid(!isPaid)}
              className="mr-2"
            />
            <span className="text-sm text-gray-500">Make this content paid</span>
          </div>
          {isPaid && (
            <input
              type="number"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price in ETH"
              className="mt-1 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          )}
        </div>
        <div className='flex items-center justify-center'>
          <Button type="submit">Upload Content</Button>
        </div>
      </form>
    </div>
  );
}