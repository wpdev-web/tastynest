import { createContext } from "react";
import { useState } from "react";

export const UserProgressContext = createContext({
  progress:'',
  showCart: () => {},
  hideCart: () => {},
  showCheckout: () => {},
  hideCheckout: () => {},
});

export const UserProgressContextProvider = ({ children }) => {
  const [userProgress, setUserProgress] = useState('');

  const showCart = () => {
    setUserProgress('cart');
  };

  const hideCart = () => {
    setUserProgress('');
  };

  const showCheckout = () => {
    setUserProgress('checkout');
  };

  const hideCheckout = () => {
    setUserProgress('');
  };

  const contextValue = {
    progress: userProgress,   
    showCart,
    hideCart,
    showCheckout,
    hideCheckout,
    };

  return (
    <UserProgressContext.Provider value={contextValue}>
      {children}
    </UserProgressContext.Provider>
  );
}