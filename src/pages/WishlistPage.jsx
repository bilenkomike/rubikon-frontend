import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Button,
  CircularProgress,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useEffect, useState } from "react";
import api from "../api/axios";
import { useI18n } from "../translations/i18nProvider";
import { useNavigate, useParams } from "react-router-dom";

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

          return (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Card sx={{ height: "100%", position: "relative" }}>
                <IconButton
                  onClick={() => removeItem(product.id)}
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    zIndex: 2,
                  }}
                >
                  <DeleteOutlineIcon />
                </IconButton>

                <CardMedia
                  component="img"
                  height="160"
                  image={product.image}
                  sx={{ cursor: "pointer" }}
                  onClick={() => navigate(`/${lang}/product/${product.slug}`)}
                />

                <CardContent>
                  <Typography
                    fontSize={14}
                    sx={{
                      cursor: "pointer",
                      "&:hover": { color: "primary.main" },
                    }}
                    onClick={() => navigate(`/${lang}/product/${product.slug}`)}
                  >
                    {product.title}
                  </Typography>

                  <Typography fontWeight={700} sx={{ mt: 1 }}>
                    ₴{product.price}
                  </Typography>

                  <Button
                    variant="outlined"
                    size="small"
                    fullWidth
                    sx={{ mt: 1 }}
                  >
                    {t.common.add_to_cart}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default WishlistPage;
