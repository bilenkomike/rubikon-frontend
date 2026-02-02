// import { createContext, useContext, useEffect, useState } from "react";
// import api from "../api/axios";
// import { useAuth } from "./auth.store";

// const CartContext = createContext(null);

// export const CartProvider = ({ children }) => {
//   const { isAuthenticated } = useAuth();

//   const [items, setItems] = useState([]);
//   const [total, setTotal] = useState(0);
//   const [loading, setLoading] = useState(false);

//   /* ---------- helpers ---------- */

//   const recalcTotal = (items) =>
//     items.reduce((sum, item) => sum + item.total, 0);

//   /* ---------- fetch cart ---------- */

//   const fetchCart = async () => {
//     setLoading(true);
//     try {
//       const res = await api.get("orders/cart/", { withAuth: true });
//       const _items = res.data;

//       setItems(res.data);
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ---------- auth effect ---------- */

//   useEffect(() => {
//     if (!isAuthenticated) {
//       setItems([]);
//       setTotal(0);
//       return;
//     }

//     fetchCart();
//   }, [isAuthenticated]);

//   /* ---------- actions ---------- */

//   const addToCart = async ({
//     product_id,
//     quantity = 1,
//     filter_values = [],
//   }) => {
//     await api.post(
//       "orders/cart/add/",
//       { product: product_id, quantity, filter_values },
//       { withAuth: true },
//     );
//     fetchCart();
//   };

//   const updateQuantity = async (cartItemId, quantity) => {
//     await api.patch(
//       `orders/cart/${cartItemId}/`,
//       { quantity },
//       { withAuth: true },
//     );
//     fetchCart();
//   };

//   const removeItem = async (cartItemId) => {
//     await api.delete(`orders/cart/${cartItemId}/`, {
//       withAuth: true,
//     });
//     fetchCart();
//   };

//   const clearCart = async () => {
//     await api.delete("orders/cart/clear/", { withAuth: true });
//     setItems([]);
//     setTotal(0);
//   };

//   return (
//     <CartContext.Provider
//       value={{
//         items,
//         total,
//         loading,
//         fetchCart,
//         addToCart,
//         updateQuantity,
//         removeItem,
//         clearCart,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => useContext(CartContext);
import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "./auth.store";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();

  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  /* ---------- helpers ---------- */

  const calcItemTotal = (item) => {
    const product = item?.product;
    if (!product) return 0;

    const price = Number(product.price || 0);
    const sale = Number(product.sale || 0);
    const quantity = Number(item.quantity || 0);

    const finalPrice = sale > 0 ? price - (price * sale) / 100 : price;

    return finalPrice * quantity;
  };

  const recalcCart = (items) => {
    const nextItems = items.map((item) => ({
      ...item,
      total: calcItemTotal(item),
    }));

    const nextTotal = nextItems.reduce((sum, item) => sum + item.total, 0);

    setItems(nextItems);
    setTotal(nextTotal);
  };

  /* ---------- fetch cart ---------- */

  const fetchCart = async () => {
    setLoading(true);
    try {
      const res = await api.get("orders/cart/", { withAuth: true });
      const data = Array.isArray(res.data) ? res.data : [];
      recalcCart(data);
    } finally {
      setLoading(false);
    }
  };

  /* ---------- auth effect ---------- */

  useEffect(() => {
    if (!isAuthenticated) {
      setItems([]);
      setTotal(0);
      return;
    }

    fetchCart();
  }, [isAuthenticated]);

  /* ---------- actions ---------- */

  const addToCart = async ({
    product_id,
    quantity = 1,
    filter_values = [],
  }) => {
    await api.post(
      "orders/cart/add/",
      { product: product_id, quantity, filter_values },
      { withAuth: true },
    );
    fetchCart();
  };

  const updateQuantity = async (cartItemId, quantity) => {
    await api.patch(
      `orders/cart/${cartItemId}/`,
      { quantity },
      { withAuth: true },
    );
    fetchCart();
  };

  const removeItem = async (cartItemId) => {
    await api.delete(`orders/cart/${cartItemId}/remove/`, {
      withAuth: true,
    });
    fetchCart();
  };

  const clearCart = async () => {
    setItems([]);
    setTotal(0);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        total,
        loading,
        fetchCart,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
