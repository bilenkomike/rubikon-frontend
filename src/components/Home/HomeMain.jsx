import { Box, Typography } from "@mui/material";
import PromoSlider from "./PromoSlider";
import ProductGrid from "./ProductGrid";

const HomeMain = () => {
  return (
    <Box sx={{ flex: 1 }}>
      <PromoSlider />

      <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
        Найкращі пропозиції для вас
      </Typography>

      <ProductGrid />
    </Box>
  );
};

export default HomeMain;
