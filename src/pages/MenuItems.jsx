import CreateMenuItem from "../components/CreateMenuItem";
import UploadImage from "../components/UploadImage";
import "../styles/MenuItems.css";

export default function MenuItems() {
  return (
    <div className="items-container">
      <p className="items-text">Menu Items</p>
      <CreateMenuItem />
    </div>
  );
}
