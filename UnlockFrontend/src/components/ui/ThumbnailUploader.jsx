import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";

const ThumbnailUploader = ({ onThumbnailChange }) => {
  const [thumbnail, setThumbnail] = useState(null);

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file && (file.type === "image/jpeg" || file.type === "image/png" || file.type === "image/jpg")) {
        setThumbnail(file);
        onThumbnailChange(file); // Kirim file ke parent component
      } else {
        alert("Hanya file JPG, JPEG, atau PNG yang diizinkan.");
      }
    },
    [onThumbnailChange]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpeg", ".jpg"],
      "image/png": [".png"],
    },
    maxFiles: 1,
  });

  return (
    <div className="border-2 border-dashed border-gray-400 rounded-lg p-6 text-center bg-gray-50">
      {thumbnail ? (
        // Preview Thumbnail
        <div className="relative">
          <img
            src={URL.createObjectURL(thumbnail)}
            alt="Thumbnail Preview"
            className="w-full h-48 object-cover rounded-lg"
          />
          <button
            onClick={() => setThumbnail(null)}
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
          >
            ✕
          </button>
        </div>
      ) : (
        // Drag and Drop Area
        <div {...getRootProps()} className="cursor-pointer">
          <input {...getInputProps()} />
          <p className="text-gray-500">
            Drag & drop a JPG, JPEG, or PNG file here, or click to select a file.
          </p>
          <p className="text-sm text-gray-400 mt-2">Recommended size: 400x200</p>
        </div>
      )}
    </div>
  );
};

export default ThumbnailUploader;