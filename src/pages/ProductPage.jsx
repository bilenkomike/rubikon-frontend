import {
  Container,
  Grid,
  Typography,
  Box,
  Button,
  Stack,
  Breadcrumbs,
  Link,
  Rating,
  Divider,
  Paper,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useI18n } from "../translations/i18nProvider";
import ReviewsSection from "../components/ReviewsSection";
import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const reviews = [
  {
    id: 1,
    author: "Олександр",
    rating: 5,
    date: "12.02.2025",
    text: "Чудова клавіатура, дуже приємні свічі та якісна підсвітка.",
  },
  {
    id: 2,
    author: "Марія",
    rating: 4,
    date: "08.02.2025",
    text: "Все супер, але хотілося б трохи тихіші клавіші.",
  },
];

const ProductPage = () => {
  const { productSlug } = useParams();
  const swiperRef = useRef(null);

  const navigate = useNavigate();
  const { lang } = useI18n();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedVariants, setSelectedVariants] = useState({
    color: "Black",
    size: "M",
  });

  /* ---------------- MOCK PRODUCT ---------------- */

  const product = {
    id: 1,
    title: "Ігрова клавіатура Razer BlackWidow V4",
    price: 7999,
    oldPrice: 8999,
    rating: 4.6,
    reviewsCount: 128,
    images: [
      "https://picsum.photos/1200/320?1",
      "https://picsum.photos/1200/320?2",
      "https://picsum.photos/1200/320?3",
    ],
    description:
      "Механічна ігрова клавіатура з RGB підсвіткою та програмованими клавішами.",
    characteristics: {
      Brand: "Razer",
      Type: "Mechanical",
      Switches: "Green",
      Backlight: "RGB",
      Connection: "USB",
    },
    variants: {
      color: ["Black", "White", "Red"],
      size: ["S", "M", "L"],
    },
  };

  /* ---------------- RENDER ---------------- */

  return (
    <Container maxWidth={false} sx={{ maxWidth: "1600px", mt: 3, mb: 6 }}>
      {/* BREADCRUMBS */}
      <Breadcrumbs sx={{ mb: 2 }}>
        <Link
          underline="hover"
          color="inherit"
          sx={{ cursor: "pointer" }}
          onClick={() => navigate(`/${lang}`)}
        >
          Головна
        </Link>
        <Link
          underline="hover"
          color="inherit"
          sx={{ cursor: "pointer" }}
          onClick={() => navigate(`/${lang}/category/gaming`)}
        >
          Товари для геймерів
        </Link>
        <Typography color="text.primary">{product.title}</Typography>
      </Breadcrumbs>

      {/* TITLE */}
      <Typography variant="h4" fontWeight={700} gutterBottom>
        {product.title}
      </Typography>

      {/* MAIN GRID */}
      <Grid container spacing={4}>
        {/* IMAGE GALLERY */}
        <Grid item size={8.5}>
          <Paper sx={{ p: 2 }}>
            {/* MAIN IMAGE */}

            <Swiper
              modules={[Navigation, Pagination]}
              slidesPerView={1}
              loop
              navigation
              pagination={{ clickable: true }}
              style={{ height: 280 }}
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              onSlideChange={(swiper) => {
                setActiveImageIndex(swiper.activeIndex);
                console.log(swiper.activeIndex);
              }}
            >
              {product.images.map((promo, index) => (
                <SwiperSlide key={index}>
                  <Box
                    sx={{
                      height: 280,
                      backgroundImage: `url(${promo})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
            {/* <Box
              component="img"
              src={product.images[activeImageIndex]}
              sx={{
                width: "100%",
                height: 420,
                objectFit: "contain",
              }}
            /> */}

            {/* THUMBNAILS */}
            <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
              {product.images.map((img, i) => (
                <Box
                  key={i}
                  component="img"
                  src={img}
                  onClick={() => {
                    setActiveImageIndex(i);
                    swiperRef.current?.slideTo(i);
                  }}
                  sx={{
                    width: 72,
                    height: 72,
                    objectFit: "contain",
                    border:
                      i === activeImageIndex ? "2px solid" : "1px solid #eee",
                    borderColor:
                      i === activeImageIndex ? "primary.main" : "#eee",
                    cursor: "pointer",
                    borderRadius: 1,
                  }}
                />
              ))}
            </Stack>
          </Paper>
        </Grid>
        {/* <Grid item xs={12} md={7} size={6}>
          <Paper sx={{ p: 2 }}>
            <Box
              component="img"
              src={product.images[0]}
              sx={{
                width: "100%",
                height: 420,
                objectFit: "contain",
              }}
            />

            <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
              {product.images.map((img, i) => (
                <Box
                  key={i}
                  component="img"
                  src={img}
                  sx={{
                    width: 72,
                    height: 72,
                    objectFit: "contain",
                    border: "1px solid #eee",
                    cursor: "pointer",
                  }}
                />
              ))}
            </Stack>
          </Paper>
        </Grid> */}

        {/* BUY BLOCK */}
        <Grid item xs={12} md={5} size={3}>
          <Box
            sx={{
              position: "sticky",
              top: 96,
            }}
          >
            <Paper sx={{ p: 3 }}>
              <Stack spacing={2}>
                {/* RATING */}
                <Stack direction="row" spacing={1} alignItems="center">
                  <Rating value={product.rating} precision={0.1} readOnly />
                  <Typography variant="body2">
                    {product.reviewsCount} відгуків
                  </Typography>
                </Stack>

                <Divider />

                {/* PRICE */}
                <Stack direction="row" spacing={2} alignItems="center">
                  <Typography variant="h4" color="error.main">
                    ₴{product.price}
                  </Typography>

                  <Typography
                    sx={{
                      textDecoration: "line-through",
                      color: "text.secondary",
                    }}
                  >
                    ₴{product.oldPrice}
                  </Typography>
                </Stack>
                <Divider />
                {/* VARIANTS */}
                <Stack spacing={2}>
                  {/* COLOR */}
                  <Box>
                    <Typography fontWeight={600} sx={{ mb: 0.5 }}>
                      Колір
                    </Typography>

                    <Stack direction="row" spacing={1}>
                      {product.variants.color.map((color) => (
                        <Button
                          key={color}
                          variant={
                            selectedVariants.color === color
                              ? "contained"
                              : "outlined"
                          }
                          size="small"
                          onClick={() =>
                            setSelectedVariants((prev) => ({
                              ...prev,
                              color,
                            }))
                          }
                        >
                          {color}
                        </Button>
                      ))}
                    </Stack>
                  </Box>

                  {/* SIZE */}
                  <Box>
                    <Typography fontWeight={600} sx={{ mb: 0.5 }}>
                      Розмір
                    </Typography>

                    <Stack direction="row" spacing={1}>
                      {product.variants.size.map((size) => (
                        <Button
                          key={size}
                          variant={
                            selectedVariants.size === size
                              ? "contained"
                              : "outlined"
                          }
                          size="small"
                          onClick={() =>
                            setSelectedVariants((prev) => ({
                              ...prev,
                              size,
                            }))
                          }
                        >
                          {size}
                        </Button>
                      ))}
                    </Stack>
                  </Box>
                </Stack>
                <Divider />

                <Button variant="contained" size="large" fullWidth>
                  Додати в кошик
                </Button>

                <Button variant="outlined" fullWidth>
                  Купити в 1 клік
                </Button>
              </Stack>
            </Paper>
          </Box>
        </Grid>
      </Grid>

      {/* DESCRIPTION */}
      <Box sx={{ mt: 6 }}>
        <Typography variant="h6" fontWeight={700} gutterBottom>
          Опис
        </Typography>
        <Typography>{product.description}</Typography>
      </Box>

      {/* CHARACTERISTICS */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" fontWeight={700} gutterBottom>
          Характеристики
        </Typography>

        <Paper>
          {Object.entries(product.characteristics).map(([key, value]) => (
            <Box
              key={key}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                px: 2,
                py: 1,
                borderBottom: "1px solid #eee",
              }}
            >
              <Typography color="text.secondary">{key}</Typography>
              <Typography>{value}</Typography>
            </Box>
          ))}
        </Paper>
      </Box>
      <ReviewsSection reviews={reviews} averageRating={product.rating} />
    </Container>
  );
};

export default ProductPage;
