import { Box, Typography, Grid, CircularProgress, Button } from "@mui/material";
import { useEffect, useState } from "react";
import api from "../api/axios";
import { useI18n } from "../translations/i18nProvider";
import { useNavigate, useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useWishlist } from "../stores/wishlist.store";

const WishlistPage = () => {
  const { t } = useI18n();
  const { lang } = useParams();
  const navigate = useNavigate();

  const { wishlistIds, fetchWishlist } = useWishlist();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadWishlist = async () => {
    setLoading(true);
    const res = await api.get("users/wishlist/", { withAuth: true });
    setItems(res.data);
    setLoading(false);
  };

  useEffect(() => {
    loadWishlist();
  }, []);

  // 🔥 keep page in sync with context removals
  useEffect(() => {
    setItems((curr) =>
      curr.filter((item) => wishlistIds.includes(item.product.id)),
    );
  }, [wishlistIds]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" py={6}>
        <CircularProgress />
      </Box>
    );
  }

  if (!items.length) {
    return (
      <Typography color="text.secondary">{t.profile.wishlist_empty}</Typography>
    );
  }

  return (
    <Box>
      <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
        {t.profile.wishlist}
      </Typography>

      <Grid container spacing={3}>
        {items.map((item) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={item.product.id}>
            <ProductCard product={item.product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default WishlistPage;
