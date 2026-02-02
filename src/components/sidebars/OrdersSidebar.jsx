import {
  Drawer,
  Box,
  Typography,
  Button,
  Stack,
  Avatar,
  IconButton,
  CircularProgress,
} from "@mui/material";

import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

import { useUI } from "../../stores/ui.store";
import { useAuth } from "../../stores/auth.store";
import { useCart } from "../../stores/cart.store";
import { useI18n } from "../../translations/i18nProvider";
import { useNavigate } from "react-router-dom";

const CartSidebar = () => {
  const navigate = useNavigate();
  const { ordersOpen, setOrdersOpen, setAuthOpen } = useUI();
  const { isAuthenticated } = useAuth();
  const { t, lang } = useI18n();

  const {
    items = [],
    total = 0,
    loading,
    updateQuantity,
    removeItem,
  } = useCart();

  return (
    <Drawer
      anchor="right"
      open={ordersOpen}
      onClose={() => setOrdersOpen(false)}
      PaperProps={{ sx: { width: "100%", maxWidth: 380 } }}
    >
      <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
        {/* HEADER */}
        <Box
          sx={{
            p: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid #e0e0e0",
          }}
        >
          <Typography variant="h6" fontWeight={700}>
            {t.cart.title}
          </Typography>

          <IconButton onClick={() => setOrdersOpen(false)}>
            <CloseOutlinedIcon />
          </IconButton>
        </Box>

        {/* CONTENT */}
        <Box sx={{ flex: 1, overflowY: "auto", p: 2 }}>
          {/* NOT AUTHENTICATED */}
          {!isAuthenticated ? (
            <Stack
              spacing={2}
              alignItems="center"
              justifyContent="center"
              sx={{ height: "100%", textAlign: "center" }}
            >
              <ShoppingCartOutlinedIcon
                sx={{ fontSize: 64, color: "text.secondary" }}
              />

              <Typography fontWeight={600}>{t.auth.loginRequired}</Typography>

              <Typography variant="body2" color="text.secondary">
                {t.auth.loginToUseCart}
              </Typography>

              <Button
                variant="contained"
                onClick={() => {
                  setOrdersOpen(false);
                  setAuthOpen(true);
                }}
              >
                {t.auth.login}
              </Button>
            </Stack>
          ) : loading ? (
            /* LOADING */
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
              <CircularProgress />
            </Box>
          ) : items.length === 0 ? (
            /* EMPTY CART */
            <Stack
              spacing={2}
              alignItems="center"
              justifyContent="center"
              sx={{ height: "100%", textAlign: "center" }}
            >
              <ShoppingCartOutlinedIcon
                sx={{ fontSize: 64, color: "text.secondary" }}
              />

              <Typography fontWeight={600}>{t.cart.empty}</Typography>

              <Typography variant="body2" color="text.secondary">
                {t.cart.emptyHint}
              </Typography>

              <Button variant="contained" onClick={() => setOrdersOpen(false)}>
                {t.cart.goToCatalog}
              </Button>
            </Stack>
          ) : (
            /* CART ITEMS */
            <Stack spacing={2}>
              {items.map((item) => {
                const product = item?.product;
                if (!product) return null;

                const price = Number(product.price || 0);
                const sale = Number(product.sale || 0);
                const finalPrice =
                  sale > 0 ? price - (price * sale) / 100 : price;

                return (
                  <Stack
                    key={item.id}
                    direction="row"
                    spacing={1.5}
                    alignItems="center"
                  >
                    {/* IMAGE */}
                    <Avatar
                      variant="rounded"
                      src={
                        product.image
                          ? `${import.meta.env.VITE_MEDIA_BASE_URL}/${product.image}`
                          : "/placeholder.png"
                      }
                      sx={{ width: 56, height: 56 }}
                    />

                    {/* TITLE + PRICE + QTY */}
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography variant="body2" noWrap>
                        {lang === "ru" ? product.name_ru : product.name}
                      </Typography>

                      <Typography variant="caption" color="text.secondary">
                        ₽{finalPrice.toFixed(0)}
                      </Typography>

                      <Stack direction="row" spacing={0.5} alignItems="center">
                        <IconButton
                          size="small"
                          disabled={item.quantity <= 1}
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                        >
                          <RemoveOutlinedIcon fontSize="small" />
                        </IconButton>

                        <Typography fontSize={13} fontWeight={600}>
                          {item.quantity}
                        </Typography>

                        <IconButton
                          size="small"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                        >
                          <AddOutlinedIcon fontSize="small" />
                        </IconButton>
                      </Stack>
                    </Box>

                    {/* TOTAL + DELETE */}
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-end",
                        gap: 0.5,
                      }}
                    >
                      <Typography fontWeight={600}>
                        ₽{Number(item.total).toFixed(0)}
                      </Typography>

                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => removeItem(item.id)}
                      >
                        <DeleteOutlineOutlinedIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Stack>
                );
              })}
            </Stack>
          )}
        </Box>

        {/* FOOTER */}
        {isAuthenticated && items.length > 0 && (
          <Box sx={{ p: 2, borderTop: "1px solid #e0e0e0" }}>
            <Stack spacing={1}>
              <Stack direction="row" justifyContent="space-between">
                <Typography fontWeight={600}>{t.cart.total}</Typography>
                <Typography fontWeight={700}>
                  ₽{Number(total).toFixed(0)}
                </Typography>
              </Stack>

              <Button
                variant="contained"
                fullWidth
                onClick={() => {
                  setOrdersOpen(false);
                  navigate(`${lang}/checkout/`);
                  // next → navigate to checkout
                }}
              >
                {t.cart.checkout}
              </Button>
            </Stack>
          </Box>
        )}
      </Box>
    </Drawer>
  );
};

export default CartSidebar;
