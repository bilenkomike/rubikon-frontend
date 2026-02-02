import {
  Box,
  Typography,
  Paper,
  Stack,
  Avatar,
  Divider,
  Button,
  Chip,
  CircularProgress,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";
import { useI18n } from "../translations/i18nProvider";

const statusColor = (status) => {
  switch (status) {
    case "placed":
      return "primary";
    case "confirmed":
      return "info";
    case "completed":
      return "success";
    case "cancelled":
      return "error";
    default:
      return "default";
  }
};

const OrderDetailPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { t } = useI18n();
  const { lang } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ---------- fetch ---------- */

  useEffect(() => {
    api
      .get(`orders/${orderId}/`, { withAuth: true })
      .then((res) => setOrder(res.data))
      .finally(() => setLoading(false));
  }, [orderId]);

  /* ---------- loading ---------- */

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  const getTotal = (item) => {
    let total = item.price;
    if (item.sale) {
      const sale = (total * item.sale) / 100;
      total = total - sale;
    }
    return total;
  };

  if (!order) return null;

  /* ---------- render ---------- */

  return (
    <Box>
      <Button
        size="small"
        onClick={() => navigate(`/${lang}/profile/my-orders`)}
        sx={{ mb: 2 }}
      >
        ← {t.orderDetail.back}
      </Button>

      <Typography variant="h5" fontWeight={700} mb={2}>
        {t.orderDetail.order} #{order.id}
      </Typography>

      <Paper sx={{ p: 3 }}>
        <Stack spacing={2}>
          {/* META */}
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            flexWrap="wrap"
            gap={1}
          >
            <Chip
              label={t.orders.statuses[order.status]}
              color={statusColor(order.status)}
            />

            <Typography variant="caption" color="text.secondary">
              {t.orderDetail.created}:{" "}
              {new Date(order.created_at).toLocaleString()}
            </Typography>
          </Stack>

          {/* ITEMS */}
          <Typography fontWeight={700}>{t.orderDetail.items}</Typography>

          <Stack spacing={2}>
            {order.items.map((item) => (
              <Stack
                key={item.id}
                direction="row"
                spacing={2}
                alignItems="center"
              >
                <Avatar
                  variant="rounded"
                  src={`${import.meta.env.VITE_MEDIA_BASE_URL}/${item.product.image}`}
                  sx={{ width: 56, height: 56 }}
                />

                <Box sx={{ flex: 1 }}>
                  <Typography fontWeight={600}>
                    {lang === "ru" ? item.product.name_ru : item.product.name}
                  </Typography>

                  <Typography variant="caption" color="text.secondary">
                    {t.orderDetail.quantity}: {item.quantity}
                  </Typography>
                </Box>

                <Typography fontWeight={600}>₽{getTotal(item)}</Typography>
              </Stack>
            ))}
          </Stack>

          <Divider />

          {/* NOTE */}
          {order.note && (
            <>
              <Typography fontWeight={700}>{t.orderDetail.note}</Typography>

              <Typography color="text.secondary">{order.note}</Typography>

              <Divider />
            </>
          )}

          {/* TOTAL */}
          <Stack direction="row" justifyContent="space-between">
            <Typography fontWeight={700}>{t.orderDetail.total}</Typography>
            <Typography fontWeight={700}>₽{order.total}</Typography>
          </Stack>

          {/* TELEGRAM CTA (future-proof) */}
          {order.status === "placed" && (
            <Button
              variant="contained"
              fullWidth
              onClick={() =>
                window.open(
                  `https://t.me/RubikonStore?start=order_${order.id}`,
                  "_blank",
                )
              }
            >
              {t.orderDetail.confirmTelegram}
            </Button>
          )}
        </Stack>
      </Paper>
    </Box>
  );
};

export default OrderDetailPage;
