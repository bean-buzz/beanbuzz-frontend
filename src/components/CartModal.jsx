import "../styles/CartModal.css";

export default function CartModal(props) {
  return (
    <div className="modal">
      <div className="overlay"></div>
      <div className="modal-content">
        <h2>Cart</h2>
        <p>
          Cart content here Cart content here Cart content here Cart content
          here Cart content here Cart content here Cart content here Cart
          content here Cart content here Cart content here Cart content here
          Cart content here Cart content here Cart content here Cart content
          here Cart content here Cart content here Cart content here Cart Cart
          content here Cart content here Cart content here Cart content here
          Cart content here Cart content here Cart content here Cart content
          here Cart content here Cart content here Cart content here Cart
          content here Cart content here Cart content here Cart content here
          content here
        </p>
        <button className="close-modal-button" onClick={props.toggleCartModal}>
          X
        </button>
      </div>
    </div>
  );
}
