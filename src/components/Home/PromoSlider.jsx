import { Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const promos = [
  {
    id: 1,
    image: "https://picsum.photos/1200/320?1",
    title: "Winter Sale",
  },
  {
    id: 2,
    image: "https://picsum.photos/1200/320?2",
    title: "Up to -55%",
  },
  {
    id: 3,
    image: "https://picsum.photos/1200/320?3",
    title: "Smart Deals",
  },
];

const PromoSlider = () => {
  return (
    <Box sx={{ borderRadius: 2, overflow: "hidden" }}>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        slidesPerView={1}
        loop
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        navigation
        pagination={{ clickable: true }}
        style={{ height: 280 }}
      >
        {promos.map((promo) => (
          <SwiperSlide key={promo.id}>
            <Box
              sx={{
                height: 280,
                backgroundImage: `url(${promo.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default PromoSlider;
