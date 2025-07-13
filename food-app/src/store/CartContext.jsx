import { useReducer } from "react";
import { createContext } from "react";

const CartContext = createContext({
    items: [], // Initial empty cart
    addItem: (item) => { }, // Function to add an item to the cart
    removeItem: (id) => { }, // Function to remove an item from the cart
});

function cartReducer(state, action) {
    if (action.type === 'ADD_ITEM') {
        const existingCartItemIndex = state.items.findIndex(item => item.id === action.item.id);

        const updatedItems = [...state.items];

        if (existingCartItemIndex >= 0) {
            const existingItem = state.items[existingCartItemIndex];
            const updatedItem = {
                ...existingItem,
                quantity: existingItem.quantity + 1
            };
            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
            updatedItems.push({ ...action.item, quantity: 1 });
        }
        return {
            ...state,
            items: updatedItems,
        };
    }


    if (action.type === 'REMOVE_ITEM') {
       const existingCartItemIndex = state.items.findIndex(item => item.id === action.id);
       const existingCartItem = state.items[existingCartItemIndex];
        const updatedItems = [...state.items];
       if (existingCartItem.quantity === 1) {
           
           updatedItems.splice(existingCartItemIndex, 1);
        
       }else{
        const updatedItem = {...existingCartItem, quantity: existingCartItem.quantity - 1};
        updatedItems[existingCartItemIndex] = updatedItem;
       }
         return {
              ...state,
              items: updatedItems,
         };
    }
    return state; // Return the current state if no action matches
}

// ...existing code...

function CartContextProvider({ children }) {
    const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] });

    const contextValue = {
        items: cart.items,
        addItem: (item) => {
            dispatchCartAction({ type: 'ADD_ITEM', item });
        },
        removeItem: (id) => {
            dispatchCartAction({ type: 'REMOVE_ITEM', id });
        },
    };

    console.log("CartContextProvider rendered with items:", contextValue.items);
    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    );
}

export { CartContext, CartContextProvider };