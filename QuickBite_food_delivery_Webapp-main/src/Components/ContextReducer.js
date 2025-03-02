import React, { useReducer, useContext, createContext } from 'react';

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case "ADD":
            return [...state, { id: action.payload.id, name: action.payload.name, qty: action.payload.qty, size: action.payload.size, price: action.payload.price, img: action.payload.img }];
        case "REMOVE":
            return state.filter((item, index) => index !== action.index);
        case "UPDATE":
            return state.map((food) => 
                food.id === action.payload.id && food.size === action.payload.size
                    ? { ...food, qty: parseInt(action.payload.qty) + food.qty, price: action.payload.price + food.price }
                    : food
            );
        case "DROP":
            return []; 
        default:
            console.log("Error in Reducer");
            return state;
    }
};

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, []);

    return (
        <CartDispatchContext.Provider value={dispatch}>
            <CartStateContext.Provider value={state}>
                {children}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>
    );
};

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);
