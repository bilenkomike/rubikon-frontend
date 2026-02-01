import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "./auth.store";

const WishlistContext = createContext(null);

export const WishlistProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [wishlistIds, setWishlistIds] = useState(new Set());

  useEffect(() => {
    if (!isAuthenticated) {
      setWishlistIds(new Set());
      return;
    }

    api.get("users/wishlist/", { withAuth: true }).then((res) => {
      setWishlistIds(new Set(res.data.map((item) => item.product.id)));
    });
  }, [isAuthenticated]);

  const toggleWishlist = async (productId) => {
    if (wishlistIds.has(productId)) {
      await api.delete(`users/wishlist/remove/${productId}/`, {
        withAuth: true,
      });
      setWishlistIds((prev) => {
        const next = new Set(prev);
        next.delete(productId);
        return next;
      });
    } else {
      await api.post(
        "users/wishlist/add/",
        { product_id: productId },
        { withAuth: true },
      );
      setWishlistIds((prev) => new Set(prev).add(productId));
    }
  };

  return (
    <WishlistContext.Provider value={{ wishlistIds, toggleWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
