const filtersMock = {
  brands: ["ASUS", "Logitech", "Razer", "HyperX", "SteelSeries"],
  sizes: ["S", "M", "L", "XL"],
  materials: ["Plastic", "Metal", "Fabric", "Leather"],
  colors: ["Black", "White", "Red", "Blue", "Green"],
  price: {
    min: 0,
    max: 20000,
  },
};
import { Container, Grid, Typography, Box } from "@mui/material";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import FiltersSidebar from "../components/FiltersSidebar";
import ProductCard from "../components/ProductCard";

const ProductsPage = () => {
  const { categorySlug, subcategory } = useParams();

  const [filters, setFilters] = useState({
    brands: [],
    sizes: [],
    materials: [],
    colors: [],
    price: [0, 20000],
  });

  // MOCK PRODUCTS
  const products = Array.from({ length: 24 }).map((_, i) => ({
    id: i,
    title: `Product ${i + 1}`,
    price: 3000 + i * 100,
    image: "https://via.placeholder.com/300",
  }));

  // FUTURE: API CALL
  useEffect(() => {
    /**
     * Example API call:
     *
     * GET /api/products?
     * category=gaming
     * &subcategory=monitors
     * &brand=ASUS,Razer
     * &size=M,L
     * &material=Plastic
     * &color=Black,Red
     * &price_min=1000
     * &price_max=15000
     */
    console.log("Applied filters:", filters);
  }, [filters]);

  return (
    <Container maxWidth={false} sx={{ maxWidth: "1600px", mt: 3, mb: 8 }}>
      <Typography variant="h4" fontWeight={700} gutterBottom sx={{ mb: 6 }}>
        {subcategory}
      </Typography>

      <Box
        container
        spacing={3}
        sx={{
          display: "flex",
          alignItems: "flex-start",
          gap: 16,
        }}
      >
        {/* FILTERS */}
        <Box
          sx={{
            position: "sticky",
            top: 96, // height of header
            alignSelf: "flex-start",
          }}
        >
          <FiltersSidebar
            filters={filtersMock}
            value={filters}
            onChange={setFilters}
          />
        </Box>

        {/* PRODUCTS */}
        <Grid>
          <Grid item xs={12} md={9}>
            <Grid container spacing={2}>
              {/* {products.map((product) => (
                <Grid item xs={6} sm={4} md={3} key={product.id}>
                  <ProductCard product={product} />
                </Grid>
              ))} */}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default ProductsPage;
