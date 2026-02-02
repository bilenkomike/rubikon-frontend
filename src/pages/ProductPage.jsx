// import {
//   Container,
//   Grid,
//   Typography,
//   Box,
//   Button,
//   Stack,
//   Breadcrumbs,
//   Link,
//   Rating,
//   Divider,
//   Paper,
// } from "@mui/material";
// import { useNavigate, useParams } from "react-router-dom";
// import { useI18n } from "../translations/i18nProvider";
// import ReviewsSection from "../components/ReviewsSection";
// import { useRef, useState } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination, Autoplay } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";

// const reviews = [
//   {
//     id: 1,
//     author: "Олександр",
//     rating: 5,
//     date: "12.02.2025",
//     text: "Чудова клавіатура, дуже приємні свічі та якісна підсвітка.",
//   },
//   {
//     id: 2,
//     author: "Марія",
//     rating: 4,
//     date: "08.02.2025",
//     text: "Все супер, але хотілося б трохи тихіші клавіші.",
//   },
// ];

// const ProductPage = () => {
//   const { productSlug } = useParams();
//   const swiperRef = useRef(null);

//   const navigate = useNavigate();
//   const { lang } = useI18n();
//   const [activeImageIndex, setActiveImageIndex] = useState(0);
//   const [selectedVariants, setSelectedVariants] = useState({
//     color: "Black",
//     size: "M",
//   });

//   /* ---------------- MOCK PRODUCT ---------------- */

//   const product = {
//     id: 1,
//     title: "Ігрова клавіатура Razer BlackWidow V4",
//     price: 7999,
//     oldPrice: 8999,
//     rating: 4.6,
//     reviewsCount: 128,
//     images: [
//       "https://picsum.photos/1200/320?1",
//       "https://picsum.photos/1200/320?2",
//       "https://picsum.photos/1200/320?3",
//     ],
//     description:
//       "Механічна ігрова клавіатура з RGB підсвіткою та програмованими клавішами.",
//     characteristics: {
//       Brand: "Razer",
//       Type: "Mechanical",
//       Switches: "Green",
//       Backlight: "RGB",
//       Connection: "USB",
//     },
//     variants: {
//       color: ["Black", "White", "Red"],
//       size: ["S", "M", "L"],
//     },
//   };

//   /* ---------------- RENDER ---------------- */

//   return (
//     <Container maxWidth={false} sx={{ maxWidth: "1600px", mt: 3, mb: 6 }}>
//       {/* BREADCRUMBS */}
//       <Breadcrumbs sx={{ mb: 2 }}>
//         <Link
//           underline="hover"
//           color="inherit"
//           sx={{ cursor: "pointer" }}
//           onClick={() => navigate(`/${lang}`)}
//         >
//           Головна
//         </Link>
//         <Link
//           underline="hover"
//           color="inherit"
//           sx={{ cursor: "pointer" }}
//           onClick={() => navigate(`/${lang}/category/gaming`)}
//         >
//           Товари для геймерів
//         </Link>
//         <Typography color="text.primary">{product.title}</Typography>
//       </Breadcrumbs>

//       {/* TITLE */}
//       <Typography variant="h4" fontWeight={700} gutterBottom>
//         {product.title}
//       </Typography>

//       {/* MAIN GRID */}
//       <Grid container spacing={4}>
//         {/* IMAGE GALLERY */}
//         <Grid item size={8.5}>
//           <Paper sx={{ p: 2 }}>
//             {/* MAIN IMAGE */}

//             <Swiper
//               modules={[Navigation, Pagination]}
//               slidesPerView={1}
//               loop
//               navigation
//               pagination={{ clickable: true }}
//               style={{ height: 280 }}
//               onSwiper={(swiper) => (swiperRef.current = swiper)}
//               onSlideChange={(swiper) => {
//                 setActiveImageIndex(swiper.activeIndex);
//                 console.log(swiper.activeIndex);
//               }}
//             >
//               {product.images.map((promo, index) => (
//                 <SwiperSlide key={index}>
//                   <Box
//                     sx={{
//                       height: 280,
//                       backgroundImage: `url(${promo})`,
//                       backgroundSize: "cover",
//                       backgroundPosition: "center",
//                     }}
//                   />
//                 </SwiperSlide>
//               ))}
//             </Swiper>
//             {/* <Box
//               component="img"
//               src={product.images[activeImageIndex]}
//               sx={{
//                 width: "100%",
//                 height: 420,
//                 objectFit: "contain",
//               }}
//             /> */}

//             {/* THUMBNAILS */}
//             <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
//               {product.images.map((img, i) => (
//                 <Box
//                   key={i}
//                   component="img"
//                   src={img}
//                   onClick={() => {
//                     setActiveImageIndex(i);
//                     swiperRef.current?.slideTo(i);
//                   }}
//                   sx={{
//                     width: 72,
//                     height: 72,
//                     objectFit: "contain",
//                     border:
//                       i === activeImageIndex ? "2px solid" : "1px solid #eee",
//                     borderColor:
//                       i === activeImageIndex ? "primary.main" : "#eee",
//                     cursor: "pointer",
//                     borderRadius: 1,
//                   }}
//                 />
//               ))}
//             </Stack>
//           </Paper>
//         </Grid>

//         {/* BUY BLOCK */}
//         <Grid item xs={12} md={5} size={3}>
//           <Box
//             sx={{
//               position: "sticky",
//               top: 96,
//             }}
//           >
//             <Paper sx={{ p: 3 }}>
//               <Stack spacing={2}>
//                 {/* RATING */}
//                 <Stack direction="row" spacing={1} alignItems="center">
//                   <Rating value={product.rating} precision={0.1} readOnly />
//                   <Typography variant="body2">
//                     {product.reviewsCount} відгуків
//                   </Typography>
//                 </Stack>

//                 <Divider />

//                 {/* PRICE */}
//                 <Stack direction="row" spacing={2} alignItems="center">
//                   <Typography variant="h4" color="error.main">
//                     ₴{product.price}
//                   </Typography>

//                   <Typography
//                     sx={{
//                       textDecoration: "line-through",
//                       color: "text.secondary",
//                     }}
//                   >
//                     ₴{product.oldPrice}
//                   </Typography>
//                 </Stack>
//                 <Divider />
//                 {/* VARIANTS */}
//                 <Stack spacing={2}>
//                   {/* COLOR */}
//                   <Box>
//                     <Typography fontWeight={600} sx={{ mb: 0.5 }}>
//                       Колір
//                     </Typography>

//                     <Stack direction="row" spacing={1}>
//                       {product.variants.color.map((color) => (
//                         <Button
//                           key={color}
//                           variant={
//                             selectedVariants.color === color
//                               ? "contained"
//                               : "outlined"
//                           }
//                           size="small"
//                           onClick={() =>
//                             setSelectedVariants((prev) => ({
//                               ...prev,
//                               color,
//                             }))
//                           }
//                         >
//                           {color}
//                         </Button>
//                       ))}
//                     </Stack>
//                   </Box>

//                   {/* SIZE */}
//                   <Box>
//                     <Typography fontWeight={600} sx={{ mb: 0.5 }}>
//                       Розмір
//                     </Typography>

//                     <Stack direction="row" spacing={1}>
//                       {product.variants.size.map((size) => (
//                         <Button
//                           key={size}
//                           variant={
//                             selectedVariants.size === size
//                               ? "contained"
//                               : "outlined"
//                           }
//                           size="small"
//                           onClick={() =>
//                             setSelectedVariants((prev) => ({
//                               ...prev,
//                               size,
//                             }))
//                           }
//                         >
//                           {size}
//                         </Button>
//                       ))}
//                     </Stack>
//                   </Box>
//                 </Stack>
//                 <Divider />

//                 <Button variant="contained" size="large" fullWidth>
//                   Додати в кошик
//                 </Button>

//                 <Button variant="outlined" fullWidth>
//                   Купити в 1 клік
//                 </Button>
//               </Stack>
//             </Paper>
//           </Box>
//         </Grid>
//       </Grid>

//       {/* DESCRIPTION */}
//       <Box sx={{ mt: 6 }}>
//         <Typography variant="h6" fontWeight={700} gutterBottom>
//           Опис
//         </Typography>
//         <Typography>{product.description}</Typography>
//       </Box>

//       {/* CHARACTERISTICS */}
//       <Box sx={{ mt: 4 }}>
//         <Typography variant="h6" fontWeight={700} gutterBottom>
//           Характеристики
//         </Typography>

//         <Paper>
//           {Object.entries(product.characteristics).map(([key, value]) => (
//             <Box
//               key={key}
//               sx={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 px: 2,
//                 py: 1,
//                 borderBottom: "1px solid #eee",
//               }}
//             >
//               <Typography color="text.secondary">{key}</Typography>
//               <Typography>{value}</Typography>
//             </Box>
//           ))}
//         </Paper>
//       </Box>
//       <ReviewsSection reviews={reviews} averageRating={product.rating} />
//     </Container>
//   );
// };

// export default ProductPage;

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
  useMediaQuery,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useI18n } from "../translations/i18nProvider";
import { useEffect, useRef, useState } from "react";
import api from "../api/axios";
import ReviewsSection from "../components/ReviewsSection";
import { useAuth } from "../stores/auth.store";
import { useCart } from "../stores/cart.store";
import { useUI } from "../stores/ui.store";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const ProductPage = () => {
  const { product: productSlug } = useParams();
  const { lang, t } = useI18n();
  const navigate = useNavigate();
  const swiperRef = useRef(null);
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();
  const { setAuthOpen, setOrdersOpen } = useUI();
  const quantity = 1;
  const filterValues = []; // later → selected filters

  const isMobile = useMediaQuery("(max-width:900px)");

  const [product, setProduct] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  /* ---------------- FETCH PRODUCT ---------------- */

  useEffect(() => {
    fetchProduct();
  }, [productSlug]);

  const fetchProduct = async () => {
    try {
      const { data } = await api.get(`/products/${productSlug}/`);
      setProduct(data);
    } catch (err) {
      console.error("Failed to load product", err);
    }
  };

  if (!product) return null;

  /* ---------------- TRANSLATIONS ---------------- */

  const title = lang === "ru" ? product.name_ru : product.name;

  const description =
    lang === "ru" ? product.description_ru : product.description_en;

  const categoryTitle =
    lang === "ru"
      ? product.category.category.name_ru
      : product.category.category.name;

  const subcategoryTitle =
    lang === "ru" ? product.category.name_ru : product.category.name;

  /* ---------------- PRICES ---------------- */

  const price = Number(product.price);
  const hasSale = product.sale > 0;
  const oldPrice = hasSale
    ? Math.round(price / (1 - product.sale / 100))
    : null;

  const newPrice = product.sale
    ? product.price - (product.price * product.sale) / 100
    : product.price;

  const formatPrice = (value) =>
    new Intl.NumberFormat(lang === "ru" ? "ru-RU" : "en-US", {
      style: "currency",
      currency: "RUB",
      maximumFractionDigits: 0,
    }).format(value);

  /* ---------------- DATA ---------------- */

  const images = product.images.map((i) => i.image);
  const rating = Number(product.statistics.rating);
  const reviewsCount = product.statistics.reviews_count;

  /* ---------------- RENDER ---------------- */

  return (
    <Container maxWidth={false} sx={{ maxWidth: "1600px", mt: 3, mb: 6 }}>
      {/* BREADCRUMBS */}
      <Breadcrumbs sx={{ mb: 2 }}>
        <Link
          underline="hover"
          sx={{ cursor: "pointer" }}
          onClick={() => navigate(`/${lang}`)}
        >
          {t.common.home}
        </Link>

        <Link
          underline="hover"
          sx={{ cursor: "pointer" }}
          onClick={() =>
            navigate(`/${lang}/categories/${product.category.category.slug}`)
          }
        >
          {categoryTitle}
        </Link>

        <Link
          underline="hover"
          sx={{ cursor: "pointer" }}
          onClick={() =>
            navigate(
              `/${lang}/categories/${product.category.category.slug}/${product.category.slug}`,
            )
          }
        >
          {subcategoryTitle}
        </Link>

        <Typography color="text.primary">{title}</Typography>
      </Breadcrumbs>

      {/* TITLE */}
      <Typography variant="h4" fontWeight={700} gutterBottom>
        {title}
      </Typography>

      {/* MAIN GRID */}
      <Grid container spacing={4}>
        {/* IMAGES */}
        <Grid item xs={12} md={8} sx={{ width: "620px" }}>
          <Paper sx={{ p: 2, height: isMobile ? "260px" : "620px" }}>
            <Swiper
              modules={[Navigation, Pagination]}
              slidesPerView={1}
              loop
              navigation={!isMobile}
              pagination={{ clickable: true }}
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              onSlideChange={(swiper) => setActiveImageIndex(swiper.realIndex)}
              style={{ height: "80%" }}
            >
              {product.images.map((img, index) => (
                <SwiperSlide key={index}>
                  <Box
                    sx={{
                      height: "100%",
                      backgroundImage: `url(${img.image})`,
                      backgroundSize: "contain",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                      width: "100%",
                    }}
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* THUMBNAILS (desktop only) */}
            {!isMobile && (
              <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                {images.map((img, i) => (
                  <Box
                    key={i}
                    component="img"
                    src={img}
                    onClick={() => {
                      setActiveImageIndex(i);
                      swiperRef.current?.slideToLoop(i);
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
            )}
          </Paper>
        </Grid>

        {/* BUY BLOCK */}
        <Grid item xs={12} md={4}>
          <Box sx={{ position: "sticky", top: 96 }}>
            <Paper sx={{ p: 3 }}>
              <Stack direction="row" spacing={2} alignItems="center">
                # {product.vendor_code_public}
              </Stack>
              <Stack spacing={2}>
                {/* RATING */}
                <Stack direction="row" spacing={1} alignItems="center">
                  <Rating value={rating} precision={0.1} readOnly />
                  <Typography variant="body2">
                    {reviewsCount} {t.product.reviews}
                  </Typography>
                </Stack>

                <Divider />

                {/* PRICE */}
                <Stack direction="row" spacing={2} alignItems="center">
                  <Typography variant="h4" color="error.main">
                    {/* {formatPrice(price)} */}
                    {formatPrice(newPrice)}
                  </Typography>

                  {product.sale && (
                    <Typography
                      sx={{
                        textDecoration: "line-through",
                        color: "text.secondary",
                      }}
                    >
                      {product.price}
                    </Typography>
                  )}
                </Stack>

                <Divider />
                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  onClick={async () => {
                    if (!isAuthenticated) {
                      setAuthOpen(true);
                      return;
                    }

                    await addToCart({
                      product_id: product.id,
                      quantity,
                      filter_values: filterValues,
                    });

                    setOrdersOpen(true); // open cart sidebar
                  }}
                >
                  {t.product.add_to_cart}
                </Button>

                <Button
                  variant="outlined"
                  fullWidth
                  onClick={async () => {
                    if (!isAuthenticated) {
                      setAuthOpen(true);
                      return;
                    }

                    await addToCart({
                      product_id: product.id,
                      quantity,
                      filter_values: filterValues,
                    });

                    navigate(`/${lang}/checkout`);
                  }}
                >
                  {t.product.buy_one_click}
                </Button>
              </Stack>
            </Paper>
          </Box>
        </Grid>
      </Grid>

      {/* DESCRIPTION */}
      <Box sx={{ mt: 6 }}>
        <Typography variant="h6" fontWeight={700} gutterBottom>
          {t.product.description}
        </Typography>
        <Typography sx={{ whiteSpace: "pre-line" }}>{description}</Typography>
      </Box>

      {/* CHARACTERISTICS */}
      {product.properties.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" fontWeight={700} gutterBottom>
            {t.product.characteristics}
          </Typography>

          <Paper>
            {product.properties.map((prop) => (
              <Box
                key={prop.id}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  px: 2,
                  py: 1,
                  borderBottom: "1px solid #eee",
                }}
              >
                <Typography color="text.secondary">
                  {lang === "ru" ? prop.name_ru : prop.name}
                </Typography>
                <Typography>
                  {lang === "ru" ? prop.value_ru : prop.value}
                </Typography>
              </Box>
            ))}
          </Paper>
        </Box>
      )}

      {/* REVIEWS */}
      <ReviewsSection
        product={product.slug}
        statisctics={product.statistics}
        averageRating={rating}
      />
    </Container>
  );
};

export default ProductPage;
