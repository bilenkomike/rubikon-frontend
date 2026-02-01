// import {
//   Drawer,
//   Box,
//   Typography,
//   Divider,
//   Button,
//   Stack,
//   Avatar,
//   IconButton,
// } from "@mui/material";
// import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
// import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
// import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
// import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
// import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
// import { useUI } from "../../stores/ui.store";
// import { cartItems as cartMock } from "../../data/orders.mock";

// /**
//  * CartSidebar
//  * Cart-like sidebar with empty state support
//  */
// const CartSidebar = () => {
//   const { ordersOpen, setOrdersOpen } = useUI();

//   // toggle to [] to test empty state
//   const cartItems = cartMock;

//   const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

//   return (
//     <Drawer
//       anchor="right"
//       open={ordersOpen}
//       onClose={() => setOrdersOpen(false)}
//       PaperProps={{
//         sx: {
//           width: "100%",
//           maxWidth: 380,
//         },
//       }}
//     >
//       <Box
//         sx={{
//           height: "100vh",
//           display: "flex",
//           flexDirection: "column",
//         }}
//       >
//         {/* HEADER */}
//         <Box
//           sx={{
//             p: 2,
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "space-between",
//             borderBottom: "1px solid #e0e0e0",
//           }}
//         >
//           <Typography variant="h6" fontWeight={700}>
//             Кошик
//           </Typography>

//           <IconButton onClick={() => setOrdersOpen(false)}>
//             <CloseOutlinedIcon />
//           </IconButton>
//         </Box>

//         {/* CONTENT */}
//         <Box sx={{ flex: 1, overflowY: "auto", p: 2 }}>
//           {cartItems.length === 0 ? (
//             /* EMPTY STATE */
//             <Stack
//               spacing={2}
//               alignItems="center"
//               justifyContent="center"
//               sx={{
//                 height: "100%",
//                 textAlign: "center",
//                 maxWidth: "350px",
//                 width: "100%",
//               }}
//             >
//               <ShoppingCartOutlinedIcon
//                 sx={{ fontSize: 64, color: "text.secondary" }}
//               />

//               <Typography fontWeight={600}>Кошик порожній</Typography>

//               <Typography variant="body2" color="text.secondary">
//                 Додайте товари, щоб продовжити покупки
//               </Typography>

//               <Button variant="contained" onClick={() => setOrdersOpen(false)}>
//                 Перейти до каталогу
//               </Button>
//             </Stack>
//           ) : (
//             /* CART ITEMS */
//             <Stack spacing={2}>
//               {cartItems.map((item) => (
//                 <Stack
//                   key={item.id}
//                   direction="row"
//                   spacing={1.5}
//                   alignItems="center"
//                   sx={{
//                     maxWidth: "350px",
//                     width: "100%",
//                   }}
//                 >
//                   {/* IMAGE */}
//                   <Avatar
//                     variant="rounded"
//                     src={item.image}
//                     sx={{ width: 56, height: 56 }}
//                   />

//                   {/* TITLE + PRICE */}
//                   <Box sx={{ flex: 1, minWidth: 0 }}>
//                     <Typography
//                       variant="body2"
//                       noWrap
//                       sx={{ maxWidth: "200px" }}
//                     >
//                       {item.title}
//                     </Typography>

//                     <Typography variant="caption" color="text.secondary">
//                       ₴{item.price}
//                     </Typography>

//                     {/* QTY CONTROLS */}
//                     <Stack
//                       direction="row"
//                       alignItems="center"
//                       spacing={0.5}
//                       sx={{ mt: 0.5 }}
//                     >
//                       <IconButton size="small">
//                         <RemoveOutlinedIcon fontSize="small" />
//                       </IconButton>

//                       <Typography fontSize={13} fontWeight={600}>
//                         {item.qty}
//                       </Typography>

//                       <IconButton size="small">
//                         <AddOutlinedIcon fontSize="small" />
//                       </IconButton>
//                     </Stack>
//                   </Box>

//                   {/* TOTAL + DELETE */}
//                   <Box
//                     sx={{
//                       display: "flex",
//                       flexDirection: "column",
//                       alignItems: "flex-end",
//                       gap: 0.5,
//                     }}
//                   >
//                     <Typography fontWeight={600}>
//                       ₴{item.price * item.qty}
//                     </Typography>

//                     <IconButton size="small" color="error">
//                       <DeleteOutlineOutlinedIcon fontSize="small" />
//                     </IconButton>
//                   </Box>
//                 </Stack>
//                 // <Stack
//                 //   key={item.id}
//                 //   direction="row"
//                 //   spacing={1.5}
//                 //   alignItems="center"
//                 //   sx={{
//                 //     maxWidth: "350px",
//                 //     width: "100%",
//                 //   }}
//                 // >
//                 //   <Avatar
//                 //     variant="rounded"
//                 //     src={item.image}
//                 //     sx={{ width: 56, height: 56 }}
//                 //   />

//                 //   <Box sx={{ flex: 1 }}>
//                 //     <Typography
//                 //       variant="body2"
//                 //       noWrap
//                 //       textOverflow="ellipsis"
//                 //       width="200px"
//                 //     >
//                 //       {item.title}
//                 //     </Typography>

//                 //     <Typography variant="caption" color="text.secondary">
//                 //       {item.qty} × ₴{item.price}
//                 //     </Typography>
//                 //   </Box>
//                 //   <Box sx={{ flex: 1 }}>
//                 //     <Typography fontWeight={600}>
//                 //       ₴{item.price * item.qty}
//                 //     </Typography>
//                 //     {/* add here a trash bin */}
//                 //   </Box>
//                 // </Stack>
//               ))}
//             </Stack>
//           )}
//         </Box>

//         {/* FOOTER */}
//         {cartItems.length > 0 && (
//           <Box
//             sx={{
//               p: 2,
//               borderTop: "1px solid #e0e0e0",
//             }}
//           >
//             <Stack spacing={1}>
//               <Stack direction="row" justifyContent="space-between">
//                 <Typography fontWeight={600}>Разом</Typography>
//                 <Typography fontWeight={700}>₴{total}</Typography>
//               </Stack>

//               <Button variant="contained" fullWidth>
//                 Оформити замовлення
//               </Button>
//             </Stack>
//           </Box>
//         )}
//       </Box>
//     </Drawer>
//   );
// };

// export default CartSidebar;
import {
  Drawer,
  Box,
  Typography,
  Divider,
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
import { useI18n } from "../../translations/i18nProvider";

// TEMP – replace with real API data
import { cartItems as cartMock } from "../../data/orders.mock";

/**
 * CartSidebar
 * - Auth aware
 * - Translation ready
 * - API ready
 */
const CartSidebar = () => {
  const { ordersOpen, setOrdersOpen, setAuthOpen } = useUI();
  const { isAuthenticated } = useAuth();
  const { t } = useI18n();

  // ⏳ later: replace with real API state
  const loading = false;
  const cartItems = isAuthenticated ? cartMock : [];

  const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <Drawer
      anchor="right"
      open={ordersOpen}
      onClose={() => setOrdersOpen(false)}
      PaperProps={{
        sx: {
          width: "100%",
          maxWidth: 380,
        },
      }}
    >
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
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
          ) : cartItems.length === 0 ? (
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
              {cartItems.map((item) => (
                <Stack
                  key={item.id}
                  direction="row"
                  spacing={1.5}
                  alignItems="center"
                  sx={{ maxWidth: "350px", width: "100%" }}
                >
                  {/* IMAGE */}
                  <Avatar
                    variant="rounded"
                    src={item.image}
                    sx={{ width: 56, height: 56 }}
                  />

                  {/* TITLE + PRICE + QTY */}
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography variant="body2" noWrap>
                      {item.title}
                    </Typography>

                    <Typography variant="caption" color="text.secondary">
                      ₴{item.price}
                    </Typography>

                    <Stack
                      direction="row"
                      alignItems="center"
                      spacing={0.5}
                      sx={{ mt: 0.5 }}
                    >
                      <IconButton size="small">
                        <RemoveOutlinedIcon fontSize="small" />
                      </IconButton>

                      <Typography fontSize={13} fontWeight={600}>
                        {item.qty}
                      </Typography>

                      <IconButton size="small">
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
                      ₴{item.price * item.qty}
                    </Typography>

                    <IconButton size="small" color="error">
                      <DeleteOutlineOutlinedIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Stack>
              ))}
            </Stack>
          )}
        </Box>

        {/* FOOTER */}
        {isAuthenticated && cartItems.length > 0 && (
          <Box
            sx={{
              p: 2,
              borderTop: "1px solid #e0e0e0",
            }}
          >
            <Stack spacing={1}>
              <Stack direction="row" justifyContent="space-between">
                <Typography fontWeight={600}>{t.cart.total}</Typography>
                <Typography fontWeight={700}>₴{total}</Typography>
              </Stack>

              <Button variant="contained" fullWidth>
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
