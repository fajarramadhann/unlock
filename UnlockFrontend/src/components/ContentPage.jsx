import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ContentPage() {
  const { id } = useParams();
  const [content, setContent] = useState(null);

  useEffect(() => {
    const storedContents = JSON.parse(localStorage.getItem("uploadedContents")) || [];
    const foundContent = storedContents.find((item) => item.id === parseInt(id));
    setContent(foundContent);
  }, [id]);

  if (!content) return <p className="text-center mt-10 text-gray-500">Content not found.</p>;

  return (
    <div className="p-8">
      <img src={content.imageUrl} alt={content.title} className="w-full h-96 object-cover rounded-lg mb-4" />
      <h1 className="text-3xl font-bold mb-2">{content.title}</h1>
      <p className="text-lg text-gray-500">{content.description}</p>
      <div className="mt-4">
        <p className="font-semibold">Price: {content.price}</p>
        <p className="font-semibold">Creator: {content.creator}</p>
      </div>
    </div>
  );
}
