import { useState } from "react";
import Button from "./ui/Button";
import { Input } from "./ui/Input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/AlertButton';
import { Textarea } from "./ui/Textarea";
import { useAccount } from "wagmi";
import { useNavigate } from "react-router-dom";
import ThumbnailUploader from "./ui/ThumbnailUploader";

export default function CreateContent() {
  const { address } = useAccount();
  const navigate = useNavigate();

  const [thumbnail, setThumbnail] = useState(null);
  const [contentFile, setContentFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isPaid, setIsPaid] = useState(false);
  const [price, setPrice] = useState("");

  const handleThumbnailChange = (file) => {
    setThumbnail(file);
  };

  const handleContentFileChange = (e) => {
    setContentFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!address) {
      alert("Please connect your wallet to upload content.");
      return;
    }

    if (!thumbnail || !contentFile || !title || !description || (isPaid && (price === "" || parseFloat(price) <= 0))) {
      alert("Please fill in all required fields and ensure the price is greater than 0.");
      return;
    }

    console.log("Thumbnail:", thumbnail);
    console.log("Content File:", contentFile);
    console.log("Title:", title);
    console.log("Description:", description);
    console.log("Price:", isPaid ? `${price} ETH` : "Free");

    navigate("/dashboard");
  };

  return (
    <div className="p-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Side: Title, Description, and Content File */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <Input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-lg p-2 bg-white shadow-light"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full rounded-lg p-2 bg-white shadow-light"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Content File</label>
              <div className="border-2 border-black rounded-lg p-4 bg-white shadow-light">
                <input
                  type="file"
                  onChange={handleContentFileChange}
                  className="w-full font-base"
                />
              </div>
            </div>
          </div>

          {/* Right Side: Thumbnail, Price, and Upload Content Button */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Thumbnail</label>
              <ThumbnailUploader onThumbnailChange={handleThumbnailChange} />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={isPaid}
                  onChange={() => setIsPaid(!isPaid)}
                  className="border-2 border-black rounded"
                />
                <span className="text-sm font-base text-gray-500">Make this content paid</span>
              </div>
              {isPaid && (
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Price in ETH"
                  className="w-full border-2 border-black rounded-lg p-2 bg-white shadow-light mt-2"
                  min="0.01"
                />
              )}
            </div>

            <div className="flex justify-end">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button disabled={!thumbnail || !contentFile || !title || !description || (isPaid && (price === "" || parseFloat(price) <= 0))}>Upload Content</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Do you want to mint your content? </AlertDialogTitle>
                    <AlertDialogDescription>
                      Your content can be minted as an NFT. If you choose not to mint it now, you can mint it later or not at all.
                      You can still upload your content without minting it.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>No</AlertDialogCancel>
                    <AlertDialogAction>Yes</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
