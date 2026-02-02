import {
  Box,
  Typography,
  Paper,
  Stack,
  Button,
  Avatar,
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

const MyOrdersPage = () => {
  const { t } = useI18n();
  const { lang } = useParams();
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ---------- fetch ---------- */

  useEffect(() => {
    api
      .get("orders/", { withAuth: true })
      .then((res) => setOrders(res.data))
      .finally(() => setLoading(false));
  }, []);

  /* ---------- loading ---------- */

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  /* ---------- empty ---------- */

  if (orders.length === 0) {
    return <Typography color="text.secondary">{t.orders.empty}</Typography>;
  }

  /* ---------- list ---------- */

  return (
    <Box>
      <Typography variant="h5" fontWeight={700} mb={3}>
        {t.orders.title}
      </Typography>

      <Stack spacing={2}>
        {orders.map((order) => (
          <Paper key={order.id} sx={{ p: 2 }}>
            <Stack spacing={1.5}>
              {/* HEADER */}
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                flexWrap="wrap"
                gap={1}
              >
                <Typography fontWeight={700}>
                  {t.orders.order} #{order.id}
                </Typography>

                <Chip
                  label={t.orders.statuses[order.status]}
                  color={statusColor(order.status)}
                  size="small"
                />
              </Stack>

              {/* META */}
              <Typography variant="caption" color="text.secondary">
                {t.orders.created}:{" "}
                {new Date(order.created_at).toLocaleDateString()}
              </Typography>

              {/* ITEMS PREVIEW */}
              <Stack spacing={1} sx={{ width: "500px" }}>
                {order.items.slice(0, 2).map((item) => (
                  <Stack
                    key={item.id}
                    direction="row"
                    spacing={1.5}
                    alignItems="center"
                  >
                    <Avatar
                      variant="rounded"
                      src={`${import.meta.env.VITE_MEDIA_BASE_URL}/${item.product.image}`}
                      sx={{ width: 40, height: 40 }}
                    />

                    <Typography variant="body2" noWrap>
                      {lang === "en" ? item.product.name : item.product.name_ru}{" "}
                      × {item.quantity}
                    </Typography>
                  </Stack>
                ))}

                {order.items.length > 2 && (
                  <Typography variant="caption" color="text.secondary">
                    +{order.items.length - 2} {t.orders.items}
                  </Typography>
                )}
              </Stack>

              {/* FOOTER */}
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography fontWeight={700}>
                  {t.orders.total}: ₽{order.total}
                </Typography>

                <Button
                  size="small"
                  variant="outlined"
                  onClick={() =>
                    navigate(`/${lang}/profile/my-orders/${order.id}`)
                  }
                >
                  {t.orders.open}
                </Button>
              </Stack>
            </Stack>
          </Paper>
        ))}
      </Stack>
    </Box>
  );
};

export default MyOrdersPage;
