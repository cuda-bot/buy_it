import { createContext, useContext, useEffect, useState } from "react";

// Step 1
const CartContext = createContext();

//Step 2
const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    let existingCartItem = localStorage.getItem("cart");
    if (existingCartItem) {
      setCart(JSON.parse(existingCartItem));
    }
  }, []);
  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
};

//Step 3-custom hook
const useCartContext = () => useContext(CartContext);

//Step 4
export { useCartContext, CartProvider };
