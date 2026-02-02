// import { Box } from "@mui/material";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination, Autoplay } from "swiper/modules";

// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";

// const promos = [
//   {
//     id: 1,
//     image: "/banner_1.jpg",
//     title: "Winter Sale",
//   },
//   {
//     id: 2,
//     image: "banner_2.jpg",
//     title: "Up to -55%",
//   },
//   {
//     id: 3,
//     image: "https://picsum.photos/1200/320?3",
//     title: "Smart Deals",
//   },
// ];

// const PromoSlider = () => {
//   return (
//     <Box sx={{ borderRadius: 2, overflow: "hidden" }}>
//       <Swiper
//         modules={[Navigation, Pagination, Autoplay]}
//         slidesPerView={1}
//         loop
//         autoplay={{
//           delay: 5000,
//           disableOnInteraction: false,
//         }}
//         navigation
//         pagination={{ clickable: true }}
//         style={{ height: 280 }}
//       >
//         {promos.map((promo) => (
//           <SwiperSlide key={promo.id}>
//             <Box
//               sx={{
//                 height: 280,
//                 backgroundImage: `url(${promo.image})`,
//                 backgroundSize: "contain",
//                 backgroundRepeat: "no-repeat",
//                 backgroundPosition: "center",
//               }}
//             />
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </Box>
//   );
// };

// export default PromoSlider;
import { Box, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const BANNERS_API = "https://rubikon.live/backend/api/products/banners/";

const PromoSlider = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const { lang } = useParams();

  const [banners, setBanners] = useState([]);

  useEffect(() => {
    fetch(BANNERS_API)
      .then((res) => res.json())
      .then(setBanners)
      .catch(console.error);
  }, []);

  if (!banners.length) return null;

  return (
    <Box
      sx={{
        borderRadius: 2,
        overflow: "hidden",
      }}
    >
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        slidesPerView={1}
        loop
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        navigation={!isMobile}
        pagination={{ clickable: true }}
        style={{
          height: isMobile ? 180 : 320,
        }}
      >
        {banners.map((banner) => {
          const imageSrc =
            isMobile && banner.image_mobile
              ? banner.image_mobile
              : banner.image;

          return (
            <SwiperSlide key={banner.id}>
              <Box
                onClick={() =>
                  navigate(`/${lang}/categories/${banner.category.slug}`)
                }
                sx={{
                  height: "100%",
                  cursor: "pointer",
                }}
              >
                <img
                  src={imageSrc}
                  alt={banner.alt || banner.category.name}
                  loading="lazy"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </Box>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Box>
  );
};

export default PromoSlider;
