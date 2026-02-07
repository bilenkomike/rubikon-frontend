import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useMemo,
} from "react";
import api from "../api/axios";
import { useAuth } from "./auth.store";

const WishlistContext = createContext(null);

export const WishlistProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [wishlistIds, setWishlistIds] = useState([]); // Array
  const inFlight = useRef(new Set());

  const fetchWishlist = async () => {
    const res = await api.get("users/wishlist/", { withAuth: true });
    const ids = res.data.map((item) => item.product.id);
    setWishlistIds([...new Set(ids)]); // dedupe
  };

  useEffect(() => {
    if (!isAuthenticated) {
      setWishlistIds([]);
      return;
    }
    fetchWishlist();
  }, [isAuthenticated]);

  // 🔹 O(1) lookup without changing public API
  const wishlistSet = useMemo(() => new Set(wishlistIds), [wishlistIds]);
  const has = (productId) => wishlistSet.has(productId);

  const toggleWishlist = async (productId) => {
    if (inFlight.current.has(productId)) return;
    inFlight.current.add(productId);

    const exists = has(productId);
    const prev = [...wishlistIds];

    // optimistic update
    setWishlistIds((curr) => {
      if (exists) return curr.filter((id) => id !== productId);
      return curr.includes(productId) ? curr : [...curr, productId];
    });

    try {
      if (exists) {
        await api.delete(`users/wishlist/remove/${productId}/`, {
          withAuth: true,
        });
      } else {
        await api.post(
          "users/wishlist/add/",
          { product_id: productId },
          { withAuth: true },
        );
      }
    } catch (e) {
      console.error("Wishlist update failed", e);
      setWishlistIds(prev); // rollback
    } finally {
      inFlight.current.delete(productId);
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistIds,
        has, // ✅ stable API
        toggleWishlist,
        fetchWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
