import { useState } from "react";
import Button from "./ui/Button";
import { Input } from "./ui/Input";
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter } from "./ui/Drawer";
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
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleThumbnailChange = (file) => {
    setThumbnail(file);
  };

  const handleContentFileChange = (e) => {
    setContentFile(e.target.files[0]);
  };

  const handleUploadClick = () => {
    if (!address) {
      alert("Please connect your wallet to upload content.");
      return;
    }

    if (!thumbnail || !title.trim() || !description.trim() || (isPaid && (!price || isNaN(price) || parseFloat(price) < 0.0005))) {
      alert("Please fill in all required fields and ensure the price is at least 0.0005 ETH.");
      return;
    }

    setIsDrawerOpen(true);
  };

  const handleSubmit = () => {
    const newContent = {
      id: Date.now(),
      imageUrl: URL.createObjectURL(thumbnail),
      title,
      description,
      price: isPaid ? `${price} ETH` : "Free",
      creator: address,
    };
  
    // Store in localStorage or a global state
    const storedContents = JSON.parse(localStorage.getItem("uploadedContents")) || [];
    localStorage.setItem("uploadedContents", JSON.stringify([...storedContents, newContent]));
    
    setIsDrawerOpen(false);
    navigate("/dashboard");
  };

  return (
    <div className="p-8">
      <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
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
                  onChange={() => {
                    setIsPaid(!isPaid);
                    if (!isPaid) setPrice(""); // Reset price if unchecked
                  }}
                  className="border-2 border-black rounded"
                />
                <span className="text-sm font-base text-gray-500">Make this content paid</span>
              </div>
              {isPaid ? (
                <>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => {
                      const val = e.target.value;
                      setPrice(val);
                    }}
                    placeholder="Price in ETH"
                    className="w-full border-2 border-black rounded-lg p-2 bg-white shadow-light mt-2"
                    min="0.0005"
                    step="0.0001"
                  />
                  <p className="text-sm text-gray-600 mt-1">Price: {price ? `${price} ETH` : "Not set"}</p>
                </>
              ) : (
                <p className="text-sm text-gray-600 mt-1">Free</p>
              )}
            </div>

            <div className="flex justify-end">
              <Button 
                onClick={handleUploadClick}
                disabled={!thumbnail || !title.trim() || !description.trim() || (isPaid && (!price || isNaN(price) || parseFloat(price) < 0.0005))}
              >
                Upload Content
              </Button>
            </div>
          </div>
        </div>
      </form>

      {/* Drawer for Minting Confirmation */}
      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Do you want to mint your content?</DrawerTitle>
            <DrawerDescription>
              Your content can be minted as an NFT. If you choose not to mint it now, you can mint it later or not at all.
              You can still upload your content without minting it.
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button onClick={handleSubmit}>Yes</Button>
            <Button onClick={(handleSubmit)}>No</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
