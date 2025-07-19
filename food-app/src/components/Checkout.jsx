import Modal from "./UI/Modal";
import { CartContext } from "../store/CartContext";
import { useContext } from "react";
import { currencyFormat } from "../util/formating";
import Input from "./UI/Input";
import Button from "./UI/Button";
import { UserProgressContext } from "../store/UserProgressContext";
import useHttp from "./hooks/useHttp";
import Error from "./Error";

const reqConfig = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }
};
export default function Checkout() {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);
    const cartTotal = cartCtx.items.reduce((totalPrice, item) => {
        return totalPrice + item.quantity * item.price;
    }, 0);

    const { data, isLoading, error, sendRequest } = useHttp(
        'http://localhost:3000/orders',
        reqConfig,
    );

    function handleClose() {
        userProgressCtx.hideCheckout();
    }

    function handleFinish() {
        userProgressCtx.hideCheckout();
        cartCtx.clearCart();
    }


    function handleSubmit(event) {
        event.preventDefault();
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
        sendRequest(JSON.stringify({
            order: {
                items: cartCtx.items,
                customer: formData
            }
        }));
    }

    let actions = (
        <>
            <Button type="button" textOnly onClick={handleFinish}>Close</Button>
            <Button>Submit Order</Button>
        </>
    )

    if (isLoading) {
        actions = <span className="center">Sending order data...</span>;
    }

    if (data && !error) {
        return (
            <Modal open={userProgressCtx.progress === 'checkout'} onClose={handleFinish}>
                <p className="center">Order successfully sent!</p>
                <p className="modal-actions">
                    <Button onClick={handleClose}>Okey</Button>
                </p>

            </Modal>

        );
    }

    return (
        <Modal open={userProgressCtx.progress === 'checkout'} onClose={handleClose}>
            <form onSubmit={handleSubmit}>
                <h2>Checkout</h2>
                <p>Total Amount: {currencyFormat.format(cartTotal)}</p>
                <Input label="Name" Id="name" type="text" />
                <Input label="E-mail" Id="email" type="email" />
                <Input label="Street" Id="street" type="text" />
                <div className="control-row">
                    <Input label="Postal code" Id="postal-code" type="text" />
                    <Input label="City" Id="city" type="text" />
                </div>

                {error && <Error title="Unable to send order data" message={error} />}
                <p className="modal-actions">
                    {actions}
                </p>
            </form>
        </Modal>
    );
}