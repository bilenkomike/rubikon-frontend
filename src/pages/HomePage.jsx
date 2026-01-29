import { Box, Container, Stack, Typography } from "@mui/material";
import PromoSlider from "../components/Home/PromoSlider";
import ProductGrid from "../components/Home/ProductGrid";
import HomeSidebar from "../components/Home/HomeSideBar";

const HomePage = () => {
  return (
    <Container
      maxWidth={false}
      sx={{
        maxWidth: "1600px",
        mt: 3,
      }}
    >
      <Box sx={{ flex: 1 }}>
        <PromoSlider />

        <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
          Найкращі пропозиції для вас
        </Typography>

        <Box
          sx={{
            display: "grid",
            alignItems: "flex-start",
            gap: "1rem",
            gridTemplateColumns: "1fr 3fr",
          }}
        >
          <HomeSidebar />
          <ProductGrid />
        </Box>
      </Box>
    </Container>
  );
};

export default HomePage;
