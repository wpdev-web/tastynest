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


   function handleSubmit(event){
        event.preventDefault();
        // Here you would typically handle the form submission, e.g., send data to a server
        const fd = new FormData(event.target);
        const formData = {
            name: fd.get("name"),
            email: fd.get("email"),
            street: fd.get("street"),
            postalCode: fd.get("postal-code"),
            city: fd.get("city"),
            totalAmount: cartTotal
        };
        console.log(formData);
        fetch("http://localhost:3000/orders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
               order:{
                items:cartCtx.items,
                customer: formData
               }
             }),
            
        });
        userProgressCtx.hideCheckout();
    }
   

  return (
     <Modal open={userProgressCtx.progress==='checkout'} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
            <h2>Checkout</h2>
            <p>Total Amount: {currencyFormat.format(cartTotal)}</p>
            <Input label="Name" Id="name"  type="text" />
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