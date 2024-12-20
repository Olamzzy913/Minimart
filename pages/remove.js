import { useState } from "react";

export default function Home() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(URL.createObjectURL(file)); // Create a preview URL for the file
      console.log("Selected file:", file);

      try {
        const bgRemovedBuffer = await removeBg(file);
        const bgRemovedBlob = new Blob([bgRemovedBuffer], {
          type: "image/png",
        });
        const bgRemovedURL = URL.createObjectURL(bgRemovedBlob);
        setProcessedImage(bgRemovedURL);
        console.log("Background removed image:", bgRemovedURL);
      } catch (error) {
        console.error("Failed to process the image:", error.message);
      }
    }
  };

  return (
    <div>
      <h1>Remove Background Demo</h1>
      <input type="file" onChange={handleFileChange} />
      {selectedFile && (
        <div>
          <h2>Original Image</h2>
          <img
            src={selectedFile}
            alt="Selected file"
            style={{ maxWidth: "100%" }}
          />
        </div>
      )}
      {processedImage && (
        <div>
          <h2>Processed Image (Background Removed)</h2>
          <img
            src={processedImage}
            alt="Processed file"
            style={{ maxWidth: "100%" }}
          />
        </div>
      )}
    </div>
  );
}
