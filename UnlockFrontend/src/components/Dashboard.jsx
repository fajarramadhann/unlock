import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./ui/Button";
import { Search } from "lucide-react";

export default function Dashboard() {
  const [search, setSearch] = useState("");
  const [uploadedContents, setUploadedContents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedContents = JSON.parse(localStorage.getItem("uploadedContents")) || [];
    setUploadedContents(storedContents);
  }, []);

  return (
    <>
      <section className="mb-6 p-2">
        <div className="flex items-center gap-2 w-full px-4 py-2 bg-white border-2 border-black rounded-full border-border font-base shadow-light">
          <Search className="text-gray-500" size={20} />
          <input
            type="text"
            placeholder="Search anything"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full outline-none bg-transparent"
          />
        </div>
      </section>

      {/* Uploaded Content */}
      <section>
        <h2 className="text-xl font-bold mb-4">Uploaded Content</h2>
        <div className="grid grid-cols-3 gap-6">
          {uploadedContents.length > 0 ? (
            uploadedContents.map((content, index) => (
              <Button
                key={index}
                className="p-0 rounded-lg overflow-hidden bg-white flex flex-col"
                onClick={() => navigate(`/content/${content.id}`)} // Navigate to content page
              >
                <div className="relative w-full h-44">
                  <img src={content.imageUrl} alt={content.title} className="w-full h-full object-cover border-b-2 border-black" />
                </div>
                <div className="p-3 flex flex-col gap-1">
                  <h3 className="font-semibold text-lg">{content.title}</h3>
                  <p className="text-sm text-gray-500">by {content.creator}</p>
                  <div className="mt-1 font-bold text-lg">{content.price}</div>
                </div>
              </Button>
            ))
          ) : (
            <p className="text-gray-500">No content uploaded yet.</p>
          )}
        </div>
      </section>
    </>
  );
}
