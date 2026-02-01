import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Stack,
  IconButton,
} from "@mui/material";
import FavoriteBorderOutlined from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";

import ShoppingCartOutlined from "@mui/icons-material/ShoppingCartOutlined";
import StarIcon from "@mui/icons-material/Star";
import { useAuth } from "../stores/auth.store";
import { useUI } from "../stores/ui.store";
import { useParams } from "react-router-dom";
import { useWishlist } from "../stores/wishlist.store";

const renderStars = (rating) => {
  const fullStars = Math.floor(rating);
  const emptyStars = 5 - fullStars;

  return (
    <>
      {[...Array(fullStars)].map((_, i) => (
        <StarIcon key={`full-${i}`} sx={{ fontSize: 16, color: "#FFA900" }} />
      ))}

      {[...Array(emptyStars)].map((_, i) => (
        <StarIcon key={`empty-${i}`} sx={{ fontSize: 16, color: "#E0E0E0" }} />
      ))}
    </>
  );
};

const ProductCard = ({ product }) => {
  const { isAuthenticated } = useAuth();
  const { setAuthOpen } = useUI();
  const { lang } = useParams();
  const { wishlistIds, toggleWishlist } = useWishlist();

  const inWishlist = wishlistIds.has(product.id);

  return (
    <Card
      sx={{
        width: "250px",
        height: "100%",
        position: "relative",
        borderRadius: 2,
      }}
    >
      {/* Wishlist */}
      <IconButton
        size="small"
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          zIndex: 2,
          color: "#FFA900",
        }}
        onClick={() => {
          if (!isAuthenticated) {
            setAuthOpen(true);
            return;
          }
          toggleWishlist(product.id);
        }}
      >
        {inWishlist ? <FavoriteIcon /> : <FavoriteBorderOutlinedIcon />}
      </IconButton>

      {/* Image */}
      <CardMedia
        component="img"
        image={`${import.meta.env.VITE_MEDIA_BASE_URL}/${product.image}`}
        alt={product.title}
        sx={{
          height: 180,
          objectFit: "contain",
          p: 1,
        }}
      />

      <CardContent sx={{ p: 1.5 }}>
        <Stack spacing={1}>
          {/* Title */}
          <Typography
            variant="body2"
            sx={{
              color: "text.primary",
              cursor: "pointer",
              lineHeight: 1.3,
              transition: "color 0.15s ease",
              "&:hover": {
                color: "#ff0000",
                textDecoration: "underline",
              },
            }}
          >
            {lang === "en" ? product.name : product.name_ru}
          </Typography>

          {/* Rating */}
          <Stack direction="row" spacing={0.5} alignItems="center">
            {/* also finish here the logic behind the render of the stars use product.statistics.rating */}
            {renderStars(product.statistics.rating)}
            <Typography variant="caption" color="text.secondary">
              {product.statistics.rating}
            </Typography>
          </Stack>

          {/* Prices + Cart */}
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
            }}
          >
            <Box>
              {product.sale && (
                <Typography
                  variant="caption"
                  sx={{
                    textDecoration: "line-through",
                    color: "text.secondary",
                  }}
                >
                  ₽{product.price}
                </Typography>
              )}

              <Typography
                sx={{
                  fontSize: 20,
                  fontWeight: 700,
                  color: "#ff3b3b",
                  lineHeight: 1,
                }}
              >
                ₽
                {product.sale
                  ? product.price - (product.price * product.sale) / 100
                  : product.price}
              </Typography>
            </Box>

            <IconButton
              sx={{
                color: "primary.main",
              }}
              onClick={() => {
                if (!isAuthenticated) {
                  setAuthOpen(true);
                  return;
                }
              }}
            >
              <ShoppingCartOutlined />
            </IconButton>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
