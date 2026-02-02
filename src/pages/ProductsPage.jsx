import { Container, Grid, Typography, Box, Pagination } from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import FiltersSidebar from "../components/FiltersSidebar";
import ProductCard from "../components/ProductCard";
import api from "../api/axios";

const PAGE_SIZE = 48;

const ProductsPage = () => {
  const { lang } = useParams();
  const { subcategory } = useParams();
  const [subcategoryData, setSubcategoryData] = useState(null);

  const [filtersConfig, setFiltersConfig] = useState(null);
  const [filters, setFilters] = useState({});
  const [products, setProducts] = useState([]);

  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);

  /* ---------------- FETCH FILTERS ---------------- */

  useEffect(() => {
    fetchFilters();
    fetchSubcategory();
  }, [subcategory]);

  const fetchSubcategory = async () => {
    try {
      const { data } = await api.get(
        `/products/categories/subcategories/${subcategory}/`,
      );
      setSubcategoryData(data);
    } catch (err) {
      console.error("Failed to load subcategory", err);
    }
  };

  const fetchFilters = async () => {
    try {
      const { data } = await api.get(
        `/products/filters/?subcategory=${subcategory}`,
      );

      const normalizedConfig = {
        price: [data.min_price, data.max_price],
        items: data.filters
          .filter((filter) => filter.name !== "Price")
          .map((filter) => ({
            ...filter,
            key: `filter_${filter.id}`,
          })),
      };

      const initialFilters = {
        price: [data.min_price, data.max_price],
      };

      normalizedConfig.items.forEach((f) => {
        initialFilters[f.key] = [];
      });

      setFiltersConfig(normalizedConfig);
      setFilters(initialFilters);
      setPage(1);
    } catch (err) {
      console.error("Failed to load filters", err);
    }
  };

  /* ---------------- RESET PAGE ON FILTER CHANGE ---------------- */

  useEffect(() => {
    if (!filtersConfig) return;
    setPage(1);
  }, [filters]);

  /* ---------------- FETCH PRODUCTS ---------------- */

  useEffect(() => {
    if (!filtersConfig) return;
    fetchProducts();
  }, [filters, page, filtersConfig]);

  const fetchProducts = async () => {
    try {
      const params = buildQueryParams(filters, page);
      const { data } = await api.get(`/products/?${params}`);

      setProducts(data.results || []);
      setCount(data.count || 0);
    } catch (err) {
      console.error("Failed to load products", err);
    }
  };

  /* ---------------- QUERY BUILDER ---------------- */

  const buildQueryParams = (filters, page) => {
    const params = new URLSearchParams();

    params.append("subcategory", subcategory);
    params.append("page", page);

    params.append("price_min", filters.price[0]);
    params.append("price_max", filters.price[1]);

    const selectedFilterIds = [];

    Object.entries(filters).forEach(([key, values]) => {
      if (key === "price") return;
      if (!values.length) return;

      selectedFilterIds.push(...values);
    });

    if (selectedFilterIds.length) {
      params.append("filters", selectedFilterIds.join(","));
    }

    return params.toString();
  };

  const totalPages = Math.ceil(count / PAGE_SIZE);

  if (!filtersConfig) return null;

  return (
    <Container maxWidth={false} sx={{ maxWidth: "1600px", mt: 3, mb: 8 }}>
      <Typography variant="h4" fontWeight={700} sx={{ mb: 6 }}>
        {subcategoryData
          ? lang === "ru"
            ? subcategoryData.name_ru
            : subcategoryData.name
          : ""}
      </Typography>
      {/* <Typography variant="h4" fontWeight={700} sx={{ mb: 6 }}> */}
      {/* replace this one with the real one request from the image, and place here translated data */}
      {/* {subcategory} */}
      {/* </Typography> */}

      <Box sx={{ display: "flex", gap: 16 }}>
        {/* FILTERS */}
        <Box sx={{ position: "sticky", top: 96 }}>
          <FiltersSidebar
            config={filtersConfig}
            value={filters}
            onChange={setFilters}
          />
        </Box>

        {/* PRODUCTS */}
        <Box flex={1}>
          <Grid container spacing={2}>
            {products.map((product) => (
              <Grid item xs={6} sm={4} md={3} key={product.id}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>

          {/* PAGINATION */}
          {totalPages > 1 && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                mt: 6,
              }}
            >
              <Pagination
                count={totalPages}
                page={page}
                onChange={(_, value) => setPage(value)}
                color="primary"
              />
            </Box>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default ProductsPage;
