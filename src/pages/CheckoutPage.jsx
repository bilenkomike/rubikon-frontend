// import {
//   Box,
//   Typography,
//   Button,
//   Stack,
//   TextField,
//   Paper,
// } from "@mui/material";
// import { useCart } from "../stores/cart.store";
// import { useNavigate } from "react-router-dom";
// import api from "../api/axios";
// import { useState } from "react";

// const CheckoutPage = () => {
//   const { items, total, clearCart } = useCart();
//   const navigate = useNavigate();
//   const [note, setNote] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleConfirm = async () => {
//     setLoading(true);
//     try {
//       const res = await api.post(
//         "orders/checkout/",
//         { note },
//         { withAuth: true },
//       );

//       clearCart();

//       // later → redirect to Telegram
//       navigate(`/order-success/${res.data.id}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!items || items.length === 0) {
//     return (
//       <Typography sx={{ mt: 4 }} align="center">
//         Cart is empty
//       </Typography>
//     );
//   }

//   return (
//     <Box maxWidth={600} mx="auto" mt={4}>
//       <Typography variant="h5" fontWeight={700} mb={2}>
//         Confirm order
//       </Typography>

//       <Paper sx={{ p: 2, mb: 3 }}>
//         <Stack spacing={1}>
//           {items.map((item) => (
//             <Stack key={item.id} direction="row" justifyContent="space-between">
//               <Typography>
//                 {item.product.name} × {item.quantity}
//               </Typography>
//               <Typography>₽{item.total}</Typography>
//             </Stack>
//           ))}

//           <Stack direction="row" justifyContent="space-between" mt={2}>
//             <Typography fontWeight={700}>Total</Typography>
//             <Typography fontWeight={700}>₽{total}</Typography>
//           </Stack>
//         </Stack>
//       </Paper>

//       <TextField
//         label="Order note (optional)"
//         multiline
//         rows={3}
//         fullWidth
//         value={note}
//         onChange={(e) => setNote(e.target.value)}
//         sx={{ mb: 2 }}
//       />

//       <Button
//         variant="contained"
//         fullWidth
//         disabled={loading}
//         onClick={handleConfirm}
//       >
//         Confirm order
//       </Button>
//     </Box>
//   );
// };

// export default CheckoutPage;
import {
  Box,
  Typography,
  Button,
  Stack,
  TextField,
  Paper,
  CircularProgress,
  Avatar,
} from "@mui/material";
import { useCart } from "../stores/cart.store";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";
import { useEffect, useState } from "react";
import { useI18n } from "../translations/i18nProvider";

const REDIRECT_DELAY = 30;

const CheckoutPage = () => {
  const { items, total, clearCart } = useCart();
  const navigate = useNavigate();
  const { lang } = useParams();
  const { t } = useI18n();

  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [secondsLeft, setSecondsLeft] = useState(REDIRECT_DELAY);

  /* ---------- confirm order ---------- */

  const handleConfirm = async () => {
    if (loading) return;

    setLoading(true);
    try {
      const res = await api.post(
        "orders/checkout/",
        { note },
        { withAuth: true },
      );

      clearCart();
      setOrderId(res.data.id);
      setSuccess(true);
    } finally {
      setLoading(false);
    }
  };

  /* ---------- redirect timer ---------- */

  useEffect(() => {
    if (!success || !orderId) return;
    navigate(`/profile/my-orders/${orderId}`);
  }, [success, orderId, navigate]);

  /* ---------- empty cart ---------- */

  if (!items || items.length === 0) {
    return (
      <Typography sx={{ mt: 4 }} align="center">
        {t.checkout.empty}
      </Typography>
    );
  }

  /* ---------- success ---------- */

  if (success) {
    return (
      <Box maxWidth={600} mx="auto" mt={6} textAlign="center">
        <Paper sx={{ p: 4 }}>
          <Stack spacing={2} alignItems="center">
            <Typography variant="h5" fontWeight={700}>
              ✅ {t.checkout.successTitle}
            </Typography>

            <Typography color="text.secondary">
              {t.checkout.successText.replace("{id}", orderId)}
            </Typography>

            <Typography color="text.secondary">
              {t.checkout.redirect.replace("{seconds}", secondsLeft)}
            </Typography>

            <Button
              variant="contained"
              onClick={() => navigate(`/profile/my-orders/${orderId}`)}
            >
              {t.checkout.goNow}
            </Button>
          </Stack>
        </Paper>
      </Box>
    );
  }

  /* ---------- checkout ---------- */

  return (
    <Box maxWidth={600} mx="auto" mt={4}>
      <Typography variant="h5" fontWeight={700} mb={2}>
        {t.checkout.title}
      </Typography>

      <Paper sx={{ p: 2, mb: 3 }}>
        <Stack spacing={1.5}>
          {items.map((item) => (
            <Stack
              key={item.id}
              direction="row"
              spacing={1.5}
              alignItems="center"
              justifyContent="space-between"
            >
              {/* IMAGE */}
              <Avatar
                variant="rounded"
                src={`${import.meta.env.VITE_MEDIA_BASE_URL}/${item.product.image}`}
                sx={{ width: 48, height: 48 }}
              />

              {/* NAME + QTY */}
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography variant="body2" noWrap>
                  {lang === "en" ? item.product.name : item.product.name_ru}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  × {item.quantity}
                </Typography>
              </Box>

              {/* PRICE */}
              <Typography fontWeight={600}>₽{item.total}</Typography>
            </Stack>
          ))}

          <Stack direction="row" justifyContent="space-between" mt={2}>
            <Typography fontWeight={700}>{t.checkout.total}</Typography>
            <Typography fontWeight={700}>₽{total}</Typography>
          </Stack>
        </Stack>
      </Paper>

      <TextField
        label={t.checkout.note}
        multiline
        rows={3}
        fullWidth
        value={note}
        onChange={(e) => setNote(e.target.value)}
        sx={{ mb: 2 }}
      />

      <Button
        variant="contained"
        fullWidth
        disabled={loading}
        onClick={handleConfirm}
        startIcon={loading ? <CircularProgress size={18} /> : null}
      >
        {t.checkout.confirm}
      </Button>
    </Box>
  );
};

export default CheckoutPage;
