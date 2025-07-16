import Modal from "./UI/Modal";
import { CartContext } from "../store/CartContext";
import { useContext } from "react";
import { currencyFormat } from "../util/formating";
import Input from "./UI/Input";
import Button from "./UI/Button";
import { UserProgressContext } from "../store/UserProgressContext";

export default function Checkout(){
    const cartCtx= useContext(CartContext);
    const userProgressCtx=useContext(UserProgressContext);
    const cartTotal = cartCtx.items.reduce((totalPrice, item) => {
     return totalPrice + item.quantity * item.price;
   }, 0);

  
    function handleClose(){
        userProgressCtx.hideCheckout();
    }
   

  return (
     <Modal open={userProgressCtx.progress==='checkout'} onClose={handleClose}>
        <form>
            <h2>Checkout</h2>
            <p>Total Amount: {currencyFormat.format(cartTotal)}</p>
            <Input label="Full Name" Id="full-name"  type="text" />
            <Input label="E-mail" Id="email"  type="email" />
            <Input label="Street" Id="street"  type="text" />
            <div className="control-row">
                <Input label="Postal code" Id="postal-code"  type="text" />
                <Input label="City" Id="city"  type="text" />
            </div>
            <p className="modal-actions">
                <Button type="button" textOnly onClick={handleClose}>Close</Button>
                <Button>Submit Order</Button>
            </p>
        </form>
     </Modal>
  );    
}