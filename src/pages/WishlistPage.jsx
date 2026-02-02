import { Box, Typography, Grid, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import api from "../api/axios";
import { useI18n } from "../translations/i18nProvider";
import { useNavigate, useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const WishlistPage = () => {
  const { t } = useI18n();
  const { lang } = useParams();
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ---------------- LOAD WISHLIST ---------------- */

  useEffect(() => {
    api
      .get("users/wishlist/")
      .then((res) => {
        setItems(res.data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  /* ---------------- REMOVE ---------------- */

  const removeItem = async (productId) => {
    await api.delete(`users/wishlist/remove/${productId}/`);
    setItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  /* ---------------- STATES ---------------- */

  if (loading) {
    return <CircularProgress />;
  }

  if (!items.length) {
    return (
      <Typography color="text.secondary">{t.profile.wishlist_empty}</Typography>
    );
  }

  /* ---------------- RENDER ---------------- */

  return (
    <Box>
      <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
        {t.profile.wishlist}
      </Typography>

      <Grid container spacing={3}>
        {items.map((item) => {
          const product = item.product;

          return <ProductCard product={product} />;
        })}
      </Grid>
    </Box>
  );
};

export default WishlistPage;
