import { Grid } from "@mui/material";
import ProductCard from "../ProductCard";
import { products } from "../../data/products.mock";

const ProductGrid = () => {
  return (
    <Grid container spacing={1.5}>
      {products.slice(0, 48).map((product) => (
        <Grid item xs={4} sm={4} md={4} lg={4} key={product.id}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductGrid;
