import { Container, Typography, Button, Stack, Box } from "@mui/material";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import CatalogSidebar from "./components/sidebars/Catalog";
import UsersSideBar from "./components/sidebars/UsersSidebar";
import OrdersSidebar from "./components/sidebars/OrdersSidebar";
import { Navigate, Route, Routes, useParams } from "react-router-dom";
import ContactPage from "./pages/ContactPage";
import AuthModal from "./components/modals/AuthModal";
import CategoriesPage from "./pages/CategoriesPage";
import ProductsPage from "./pages/ProductsPage";
import ProductPage from "./pages/ProductPage";
import ProfilePage from "./pages/ProfilePage";
import { useAuth } from "./stores/auth.store";
import ProfileLayout from "./components/layouts/ProfileLayout/ProfileLayout";
import WishlistPage from "./pages/WishlistPage";
import ChangePasswordPage from "./pages/ChangePasswordPage";

const RequireAuth = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const { lang } = useParams();

  if (!isAuthenticated) {
    return <Navigate to={`/${lang}`} replace />;
  }

  return children;
};

function App() {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f5f5f5", marginBottom: "64px" }}>
      <Header />
      <Routes>
        {/* redirect root */}
        <Route path="/" element={<Navigate to="/ru" replace />} />

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
              <Route
                path="/profile"
                element={
                  <RequireAuth>
                    <ProfileLayout />
                  </RequireAuth>
                }
              >
                <Route index element={<ProfilePage />} />
                <Route path="wishlist" element={<WishlistPage />} />
                <Route path="password" element={<ChangePasswordPage />} />
                {/* <Route path="orders" element={<MyOrdersPage />} />
                
                 */}
              </Route>
            </Routes>
          }
        />

        <Route path="*" element={<Navigate to="/en" replace />} />
      </Routes>
      <AuthModal />
      <CatalogSidebar />
      <UsersSideBar />
      <OrdersSidebar />
    </Box>
  );
}

export default App;
