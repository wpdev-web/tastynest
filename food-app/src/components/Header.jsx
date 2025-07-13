import { useContext } from 'react';
import logoImg from '../assets/logo.jpg';
import Button from './UI/Button';
import { CartContext } from '../store/CartContext';
import { UserProgressContext } from '../store/UserProgressContext';
export default function Header() {

 const cartCtx= useContext(CartContext);
 const progressCtx= useContext(UserProgressContext);

  const totalItems = cartCtx.items.reduce((total, item) => {
    return total + item.quantity;
  }, 0);

  function handleShowCart() {
    progressCtx.showCart();  
  }
  return (
    <header id="main-header">
        <div id="title">
            <img src={logoImg} alt="Logo" />
            <h1>TastyNest</h1>
        </div>
        <nav>
            <Button textOnly onClick={handleShowCart}>
                Cart ({totalItems})
            </Button>
        </nav>
    </header>
  );
}