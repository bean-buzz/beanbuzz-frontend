import React, { useState } from "react";

import Parse from "parse";

import "../utils/parseConfig";

export default function UploadImage() {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!image) {
      alert("Please select an image");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Create a new Parse file
      const parseFile = new Parse.File(image.name, image);

      // Save the file to Back4App
      await parseFile.save();

      // Get the URL of the uploaded file
      const fileUrl = parseFile.url();
      console.log("File URL:", fileUrl);

      // Create a new Parse object (MenuItemImage)
      const MenuItemImage = Parse.Object.extend("menuitem_image_db");
      const menuItemImage = new MenuItemImage();

      // Set the image file in the object
      menuItemImage.set("image", parseFile);

      // Save the object to Back4App
      await menuItemImage.save();

      alert("Image uploaded successfully! File URL: " + fileUrl);
    } catch (err) {
      console.error("Error uploading image:", err);
      setError("Failed to upload image");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Upload Image to Back4App</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <input type="file" onChange={handleImageChange} />
      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Uploading..." : "Upload Image"}
      </button>
    </div>
  );
}
