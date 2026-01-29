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
import ShoppingCartOutlined from "@mui/icons-material/ShoppingCartOutlined";
import StarIcon from "@mui/icons-material/Star";

const ProductCard = ({ product }) => {
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
      >
        <FavoriteBorderOutlined />
      </IconButton>

      {/* Image */}
      <CardMedia
        component="img"
        image={product.image}
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
            {product.title}
          </Typography>

          {/* Rating */}
          <Stack direction="row" spacing={0.5} alignItems="center">
            {[...Array(4)].map((_, i) => (
              <StarIcon key={i} sx={{ fontSize: 16, color: "#FFA900" }} />
            ))}
            <StarIcon sx={{ fontSize: 16, color: "#E0E0E0" }} />

            <Typography variant="caption" color="text.secondary">
              {product.reviews}
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
              {product.oldPrice && (
                <Typography
                  variant="caption"
                  sx={{
                    textDecoration: "line-through",
                    color: "text.secondary",
                  }}
                >
                  ₴{product.oldPrice}
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
                ₴{product.price}
              </Typography>
            </Box>

            <IconButton
              sx={{
                color: "primary.main",
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
