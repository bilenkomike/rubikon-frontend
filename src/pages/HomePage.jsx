// import { Box, Container, Stack, Typography } from "@mui/material";
// import PromoSlider from "../components/Home/PromoSlider";
// import ProductGrid from "../components/Home/ProductGrid";
// import HomeSidebar from "../components/Home/HomeSideBar";

// const HomePage = () => {
//   return (
//     <Container
//       maxWidth={false}
//       sx={{
//         maxWidth: "1600px",
//         mt: 3,
//       }}
//     >
//       <Box sx={{ flex: 1 }}>
//         <PromoSlider />

//         <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
//           Найкращі пропозиції для вас
//         </Typography>

//         <Box
//           sx={{
//             display: "grid",
//             alignItems: "flex-start",
//             gap: "1rem",
//             gridTemplateColumns: "1fr 3fr",
//           }}
//         >
//           <HomeSidebar />
//           <ProductGrid />
//         </Box>
//       </Box>
//     </Container>
//   );
// };

// export default HomePage;

import { Box, Container, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import PromoSlider from "../components/Home/PromoSlider";
import ProductGrid from "../components/Home/ProductGrid";
import HomeSidebar from "../components/Home/HomeSideBar";
import { useI18n } from "../translations/i18nProvider";

const HomePage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { t } = useI18n();

  return (
    <Container
      maxWidth={false}
      sx={{
        maxWidth: "1600px",
        mt: 3,
        px: { xs: 1, sm: 2 },
      }}
    >
      {/* PROMO SLIDER */}
      <PromoSlider />

      {/* TITLE */}
      <Typography
        variant="h6"
        sx={{
          mt: 4,
          mb: 2,
          fontWeight: 700,
          textAlign: { xs: "center", md: "left" },
        }}
      >
        {t.home.best_offers}
      </Typography>

      {/* CONTENT */}
      <Box
        sx={
          isMobile
            ? {
                display: "flex",
                flexDirection: "column",
                gap: 2,
                alignItems: "center", // 👈 center on mobile
              }
            : {
                display: "grid",
                alignItems: "flex-start",
                gap: 2,
                gridTemplateColumns: "280px 1fr",
              }
        }
      >
        {/* SIDEBAR */}
        <Box sx={{ width: "100%", maxWidth: 360 }}>
          <HomeSidebar />
        </Box>

        {/* PRODUCTS */}
        <Box sx={{ width: "100%" }}>
          <ProductGrid />
        </Box>
      </Box>
    </Container>
  );
};

export default HomePage;
