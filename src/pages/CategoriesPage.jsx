import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Stack,
  Breadcrumbs,
  Link,
  CircularProgress,
  useMediaQuery,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useI18n } from "../translations/i18nProvider";
import { useEffect, useState } from "react";
import PromoSlider from "../components/Home/PromoSlider";
import api from "../api/axios";
import { useTheme } from "@mui/material/styles";

const CategoriesPage = () => {
  const { category: slug } = useParams();
  const navigate = useNavigate();
  const { lang, t } = useI18n();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [trending, setTrending] = useState([]);
  const [category, setCategory] = useState(null);
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    setLoading(true);

    Promise.all([
      api.get("products/categories/?home=true"),
      api.get(`products/categories/${slug}/`),
      api.get(`products/categories/${slug}/subcategories/`),
    ])
      .then(([trendingRes, categoryRes, subRes]) => {
        setTrending(trendingRes.data.slice(0, 4));
        setCategory(categoryRes.data);
        setSubcategories(subRes.data);
      })
      .catch((err) => {
        console.error("Category load error:", err);
      })
      .finally(() => setLoading(false));
  }, [slug]);

  const categoryTitle = lang === "ru" ? category?.name_ru : category?.name;

  if (loading || !category) {
    return (
      <Box sx={{ py: 6, display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth={false} sx={{ maxWidth: "1600px", mt: 3, mb: 6 }}>
      {/* BREADCRUMBS */}
      <Breadcrumbs sx={{ mb: 2 }}>
        <Link
          underline="hover"
          color="inherit"
          onClick={() => navigate(`/${lang}`)}
          sx={{ cursor: "pointer" }}
        >
          {t.categories.home}
        </Link>
        <Typography color="text.primary">{categoryTitle}</Typography>
      </Breadcrumbs>

      {/* TITLE */}
      <Typography variant="h4" fontWeight={700} gutterBottom>
        {categoryTitle}
      </Typography>

      {/* PROMO + TRENDING */}
      <Box
        sx={{
          mb: 4,
          display: "flex",
          gap: 4,
          flexDirection: isMobile ? "column" : "row",
        }}
      >
        {/* PROMO */}
        <Box
          sx={{
            maxWidth: "70vw",
            width: "100%",
            xs: { width: "100%", maxWidth: "unset" },
          }}
        >
          <PromoSlider />
        </Box>

        {/* TRENDING */}
        <Box
          sx={{
            minWidth: isMobile ? "100%" : 280,
            // margin: isMobile ? "auto" : "",
          }}
        >
          <Typography fontWeight={700} sx={{ mb: 2 }}>
            {t.categories.trending}
          </Typography>

          <Stack
            spacing={2}
            direction={isMobile ? "row" : "column"}
            sx={{
              overflowX: isMobile ? "auto" : "visible",
              pb: isMobile ? 1 : 0,
              alignItems: isMobile ? "center" : "",
            }}
          >
            {trending.map((item) => {
              const title = lang === "ru" ? item.name_ru : item.name;

              return (
                <Stack
                  key={item.id}
                  direction="row"
                  spacing={2}
                  alignItems="center"
                  onClick={() => navigate(`/${lang}/categories/${item.slug}`)}
                  sx={{
                    cursor: "pointer",
                    minWidth: isMobile ? 200 : "auto",

                    "&:hover": { color: "primary.main" },
                  }}
                >
                  <Box
                    component="img"
                    src={item.image}
                    sx={{
                      width: 40,
                      height: 40,
                      objectFit: "contain",
                    }}
                  />
                  <Typography>{title}</Typography>
                </Stack>
              );
            })}
          </Stack>
        </Box>
      </Box>

      {/* SUBCATEGORIES */}
      <Typography fontWeight={700} fontSize={24} sx={{ mb: 2 }}>
        {t.categories.all}
      </Typography>

      <Grid
        container
        spacing={2}
        sx={{
          sx: {
            alignItems: "center",
            margin: "auto",
          },
        }}
      >
        {subcategories.map((sub) => {
          const title = lang === "ru" ? sub.name_ru : sub.name;

          return (
            <Grid item xs={12} sm={6} md={4} lg={3} key={sub.id}>
              <Paper
                onClick={() =>
                  navigate(`/${lang}/categories/${slug}/${sub.slug}`)
                }
                sx={{
                  p: 2,
                  cursor: "pointer",
                  height: 260,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "space-between",
                  textAlign: "center",
                  "&:hover": { boxShadow: 4 },
                }}
              >
                {/* IMAGE */}
                <Box
                  sx={{
                    height: 240,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 240,
                    overflow: "hidden",
                  }}
                >
                  <Box
                    component="img"
                    src={sub.image}
                    sx={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>

                {/* TITLE */}
                <Typography
                  fontWeight={500}
                  color="primary.main"
                  sx={{ mt: 1 }}
                >
                  {title}
                </Typography>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

export default CategoriesPage;
