// import { Grid } from "@mui/material";
// import ProductCard from "../ProductCard";
// import { products } from "../../data/products.mock";

// const ProductGrid = () => {
//   return (
//     <Grid container spacing={1.5}>
//       {products.slice(0, 48).map((product) => (
//         <Grid item xs={4} sm={4} md={4} lg={4} key={product.id}>
//           <ProductCard product={product} />
//         </Grid>
//       ))}
//     </Grid>
//   );
// };

// export default ProductGrid;

import { Grid, CircularProgress, Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ProductCard from "../ProductCard";
import api from "../../api/axios"; // IMPORTANT: public API

const ProductGrid = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("products/?home=true")
      .then((res) => {
        setProducts(res.data.results || []);
      })
      .catch((err) => {
        console.error("Failed to load products", err);
      })
      .finally(() => setLoading(false));
  }, []);

  /* ---------------- STATES ---------------- */

  if (loading) {
    return (
      <Box sx={{ py: 6, textAlign: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!products.length) {
    return (
      <Typography color="text.secondary">No products available</Typography>
    );
  }

  /* ---------------- RENDER ---------------- */

  return (
    <Grid container spacing={1.5}>
      {products.slice(0, 48).map((product) => (
        <Grid item xs={6} sm={4} md={3} lg={2} key={product.id}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductGrid;
