import React, { useState } from "react";
import Parse from "parse";
import "../utils/parseConfig";

import "../styles/CreateMenuItem.css";

export default function CreateMenuItem() {
  const [uploadButtonText, setUploadButtonText] = useState("Upload Image");
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const [menuItem, setMenuItem] = useState({
    itemName: "",
    category: "",
    description: "",
    isAvailable: true,
    multipleSizes: false,
    defaultPrice: null,
    sizes: {
      small: { price: null },
      medium: { price: null },
      large: { price: null },
    },
    dietaryInformation: {
      isVegan: false,
      isVegetarian: false,
      isGlutenFree: false,
      isDairyFree: false,
      isHalal: false,
      isKosher: false,
      isBeefFree: false,
    },
    imageUrl: "",
  });

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    if (type === "checkbox") {
      setMenuItem((prev) => ({
        ...prev,
        dietaryInformation: {
          ...prev.dietaryInformation,
          [name]: checked,
        },
        // Toggle multipleSizes
        ...(name === "multipleSizes" && { multipleSizes: checked }),
      }));
    } else if (name in menuItem.sizes) {
      setMenuItem((prev) => ({
        ...prev,
        sizes: {
          ...prev.sizes,
          [name]: { price: value },
        },
      }));
    } else {
      setMenuItem((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleUploadImage = async () => {
    if (!image) {
      alert("Please select an image");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const parseFile = new Parse.File(image.name, image);
      await parseFile.save();
      const fileUrl = parseFile.url();
      setMenuItem((prev) => ({ ...prev, imageUrl: fileUrl }));
      setUploadStatus("Uploaded successfully");
      setUploadButtonText("Upload Successfully");
      setButtonDisabled(true);
    } catch (err) {
      console.error("Error uploading image:", err);
      setError("Failed to upload image");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
    setUploadStatus("");
    setUploadButtonText("Upload Image");
    setButtonDisabled(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!menuItem.imageUrl) {
      alert("Please upload an image before submitting.");
      return;
    }

    try {
      const currentJwt = localStorage.getItem("jwt");
      const response = await fetch(
        `${import.meta.env.VITE_DATABASE_URL}/menu/item`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentJwt}`,
          },
          body: JSON.stringify(menuItem),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create menu item");
      }

      const data = await response.json();
      alert("Menu item created successfully!");
      console.log(data);
      setMenuItem({
        itemName: "",
        category: "",
        description: "",
        isAvailable: true,
        multipleSizes: false,
        defaultPrice: null,
        sizes: {
          small: { price: null },
          medium: { price: null },
          large: { price: null },
        },
        dietaryInformation: {
          isVegan: false,
          isVegetarian: false,
          isGlutenFree: false,
          isDairyFree: false,
          isHalal: false,
          isKosher: false,
          isBeefFree: false,
        },
        imageUrl: "",
      });
      setImage(null);
      setUploadStatus("");
    } catch (err) {
      console.error("Error creating menu item:", err);
      setError("Failed to create menu item.");
    }
  };

  return (
    <div className="create-menu-item-container">
      <h1>Create Menu Item</h1>
      {error && <p className="error-message">{error}</p>}
      <form className="create-menu-item-form" onSubmit={handleSubmit}>
        <input
          className="menuitem-input"
          type="text"
          name="itemName"
          placeholder="Item Name"
          value={menuItem.itemName}
          onChange={handleChange}
          required
        />
        <input
          className="menuitem-input"
          type="text"
          name="category"
          placeholder="Category"
          value={menuItem.category}
          onChange={handleChange}
          required
        />
        <textarea
          className="menuitem-input"
          name="description"
          placeholder="Description"
          value={menuItem.description}
          onChange={handleChange}
          required
        />
        <label className="availability-checkbox">
          Available
          <input
            type="checkbox"
            name="isAvailable"
            checked={menuItem.isAvailable}
            onChange={(e) =>
              setMenuItem((prev) => ({
                ...prev,
                isAvailable: e.target.checked,
              }))
            }
          />
        </label>

        <label className="multiple-sizes-checkbox">
          Multiple Sizes
          <input
            type="checkbox"
            name="multipleSizes"
            checked={menuItem.multipleSizes}
            onChange={handleChange}
          />
        </label>

        {!menuItem.multipleSizes && (
          <input
            className="menuitem-input"
            type="number"
            name="defaultPrice"
            placeholder="Default Price"
            value={menuItem.defaultPrice || ""}
            onChange={handleChange}
          />
        )}

        {menuItem.multipleSizes && (
          <>
            {Object.keys(menuItem.sizes).map((size) => (
              <input
                key={size}
                className="size-price-input menuitem-input"
                type="number"
                name={size}
                placeholder={`${size} size price`}
                value={menuItem.sizes[size].price || ""}
                onChange={handleChange}
              />
            ))}
          </>
        )}
        <div className="checkbox-grid">
          {Object.keys(menuItem.dietaryInformation).map((info) => (
            <div key={info} className="dietary-info-checkbox">
              <label htmlFor={info}>{info}</label>
              <input
                type="checkbox"
                id={info}
                name={info}
                checked={menuItem.dietaryInformation[info]}
                onChange={handleChange}
              />
            </div>
          ))}
        </div>

        <div className="file-upload-section">
          <input type="file" onChange={handleImageChange} />
          <button
            type="button"
            onClick={handleUploadImage}
            disabled={buttonDisabled}
          >
            {uploadButtonText}
          </button>
        </div>

        <button type="submit">Create Menu Item</button>
      </form>
    </div>
  );
}
