import React from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Stack,
  Breadcrumbs,
  Link,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useI18n } from "../translations/i18nProvider";
import PromoSlider from "../components/Home/PromoSlider";

const CategoriesPage = () => {
  const { category } = useParams();
  console.log(category);
  const navigate = useNavigate();
  const { lang } = useI18n();

  const categoryTitle = "Товари для геймерів";

  const popularCategories = [
    {
      title: "Ігрові приставки PlayStation",
      image: "https://via.placeholder.com/48",
    },
    {
      title: "Ігрові ноутбуки ASUS",
      image: "https://via.placeholder.com/48",
    },
    {
      title: "Ігрові монітори Samsung",
      image: "https://via.placeholder.com/48",
    },
    {
      title: "Ігрові навушники HyperX",
      image: "https://via.placeholder.com/48",
    },
  ];

  const subcategories = [
    {
      slug: "games",
      title: "Ігри",
      image: "https://via.placeholder.com/300x200",
    },
    {
      slug: "peripherals",
      title: "Ігрова периферія",
      image: "https://via.placeholder.com/300x200",
    },
    {
      slug: "monitors",
      title: "Ігрові монітори",
      image: "https://via.placeholder.com/300x200",
    },
    {
      slug: "chairs",
      title: "Крісла для геймерів",
      image: "https://via.placeholder.com/300x200",
    },
    {
      slug: "vr",
      title: "Окуляри і шоломи VR",
      image: "https://via.placeholder.com/300x200",
    },
    {
      slug: "merch",
      title: "Атрибутика і сувеніри",
      image: "https://via.placeholder.com/300x200",
    },
    {
      slug: "routers",
      title: "Ігрові маршрутизатори",
      image: "https://via.placeholder.com/300x200",
    },
    {
      slug: "tables",
      title: "Геймерські столи",
      image: "https://via.placeholder.com/300x200",
    },
  ];

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
          Головна
        </Link>
        <Typography color="text.primary">{categoryTitle}</Typography>
      </Breadcrumbs>

      {/* TITLE */}
      <Typography variant="h4" fontWeight={700} gutterBottom>
        {categoryTitle}
      </Typography>

      {/* PROMO + POPULAR */}
      <Box sx={{ mb: 4, display: "flex", alignItems: "flex-start", gap: 8 }}>
        {/* PROMO BANNER */}
        <Box sx={{ maxWidth: "60vw", width: "100%" }}>
          <PromoSlider />
        </Box>

        {/* POPULAR CATEGORIES */}
        <Box>
          <Typography fontWeight={700} sx={{ mb: 2 }}>
            Популярні категорії
          </Typography>

          <Stack spacing={2}>
            {popularCategories.map((item) => (
              <Stack
                key={item.title}
                direction="row"
                spacing={2}
                alignItems="center"
                sx={{
                  cursor: "pointer",
                  "&:hover": {
                    color: "primary.main",
                  },
                }}
              >
                <Box
                  component="img"
                  src={item.image}
                  sx={{ width: 40, height: 40 }}
                />
                <Typography>{item.title}</Typography>
              </Stack>
            ))}
          </Stack>
        </Box>
      </Box>

      {/* SUBCATEGORIES GRID */}
      <Typography fontWeight={700} fontSize={24} sx={{ mb: 2 }}>
        Категорії
      </Typography>
      <Grid
        container
        spacing={3}
        sx={{ gridTemplateColumns: "1fr 1fr 1fr 1fr" }}
      >
        {subcategories.map((sub) => (
          <Grid item xs={4} sm={4} md={3} key={sub.slug} size={2}>
            <Paper
              onClick={() =>
                navigate(`/${lang}/category/${category}/${sub.slug}`)
              }
              sx={{
                p: 2,
                cursor: "pointer",
                height: "100%",
                textAlign: "center",
                "&:hover": {
                  boxShadow: 3,
                },
              }}
            >
              <Box
                component="img"
                src={sub.image}
                sx={{
                  width: "100%",
                  height: 140,
                  objectFit: "contain",
                  mb: 1,
                }}
              />

              <Typography color="primary.main" fontWeight={500}>
                {sub.title}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CategoriesPage;
