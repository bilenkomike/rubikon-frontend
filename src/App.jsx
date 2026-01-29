import { Container, Typography, Button, Stack, Box } from "@mui/material";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import CatalogSidebar from "./components/sidebars/Catalog";
import UsersSideBar from "./components/sidebars/UsersSidebar";
import OrdersSidebar from "./components/sidebars/OrdersSidebar";
import { Navigate, Route, Routes } from "react-router-dom";
import ContactPage from "./pages/ContactPage";
import AuthModal from "./components/modals/AuthModal";
import CategoriesPage from "./pages/CategoriesPage";
import ProductsPage from "./pages/ProductsPage";
import ProductPage from "./pages/ProductPage";

function App() {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f5f5f5" }}>
      <Header />
      <Routes>
        {/* redirect root */}
        <Route path="/" element={<Navigate to="/en" replace />} />

        <Route
          path="/:lang/*"
          element={
            <Routes>
              <Route index element={<HomePage />} />
              <Route
                path="categories/:category/"
                element={<CategoriesPage />}
              />
              <Route
                path="categories/:category/:subcategory/"
                element={<ProductsPage />}
              />
              <Route path="product/:product/" element={<ProductPage />} />
              <Route path="contact" element={<ContactPage />} />
            </Routes>
          }
        />

        <Route path="*" element={<Navigate to="/en" replace />} />
      </Routes>

      {/* <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes> */}
      <AuthModal />
      <CatalogSidebar />
      <UsersSideBar />
      <OrdersSidebar />
    </Box>
  );
}

export default App;
