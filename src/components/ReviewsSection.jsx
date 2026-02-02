import {
  Box,
  Typography,
  Rating,
  Stack,
  Divider,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  CircularProgress,
} from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useEffect, useMemo, useState } from "react";
import api from "../api/axios";
import { useI18n } from "../translations/i18nProvider";

const ReviewsSection = ({ product, averageRating, statistics }) => {
  const { t } = useI18n();

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [stars, setStars] = useState(5);
  const [text, setText] = useState("");

  const [errors, setErrors] = useState({
    name: "",
    text: "",
  });

  /* ---------------- FETCH REVIEWS ---------------- */

  useEffect(() => {
    if (!product) return;

    setLoading(true);

    api
      .get(`/products/${product}/reviews/`)
      .then((res) => setReviews(res.data))
      .catch((err) => {
        console.error("Reviews load error:", err);
      })
      .finally(() => setLoading(false));
  }, [product]);

  /* ---------------- DERIVED ---------------- */

  const hasReviews = reviews.length > 0;

  const avg = useMemo(() => {
    const v = Number(averageRating);
    return Number.isFinite(v) ? v : 0;
  }, [averageRating]);

  /* ---------------- DIALOG ---------------- */

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    setName("");
    setStars(5);
    setText("");
    setErrors({ name: "", text: "" });
  };

  /* ---------------- VALIDATION ---------------- */

  const validate = () => {
    const next = { name: "", text: "" };

    if (!name.trim()) next.name = t.reviews.errors.name;
    if (text.trim().length < 10) next.text = t.reviews.errors.text;

    setErrors(next);
    return !next.name && !next.text;
  };

  /* ---------------- SUBMIT ---------------- */

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const payload = {
        name: name.trim(),
        rating: stars,
        text: text.trim(),
      };

      const res = await api.post(
        `/products/${product}/reviews/create/`,
        payload,
      );

      // optimistic append
      setReviews((prev) => [res.data, ...prev]);
      handleClose();
    } catch (err) {
      console.error("Review submit error:", err);
    }
  };

  /* ---------------- RENDER ---------------- */

  return (
    <Box sx={{ mt: 6 }}>
      {/* HEADER */}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ mb: 2 }}
      >
        <Typography variant="h6" fontWeight={700}>
          {t.reviews.title}
        </Typography>

        <Button variant="outlined" onClick={handleOpen}>
          {t.reviews.leave}
        </Button>
      </Stack>

      {/* SUMMARY */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Stack direction="row" spacing={3} alignItems="center">
          <Typography variant="h3" fontWeight={700}>
            {avg.toFixed(1)}
          </Typography>

          <Stack>
            <Rating value={avg} precision={0.1} readOnly />
            <Typography color="text.secondary">
              {statistics?.reviews_count ?? reviews.length} {t.reviews.count}
            </Typography>
          </Stack>
        </Stack>
      </Paper>

      {/* LIST */}
      {loading ? (
        <Box sx={{ py: 4, display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      ) : hasReviews ? (
        <Paper>
          {reviews.map((review, index) => (
            <Box key={review.id}>
              <Box sx={{ p: 3 }}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography fontWeight={600}>{review.name}</Typography>

                  <Typography variant="caption" color="text.secondary">
                    {new Date(review.created_at).toLocaleDateString()}
                  </Typography>
                </Stack>

                <Rating
                  value={review.rating}
                  readOnly
                  size="small"
                  sx={{ mt: 0.5 }}
                />

                <Typography sx={{ mt: 1 }}>{review.text}</Typography>
              </Box>

              {index < reviews.length - 1 && <Divider />}
            </Box>
          ))}
        </Paper>
      ) : (
        <Paper sx={{ p: 4, textAlign: "center" }}>
          <Typography color="text.secondary">{t.reviews.empty}</Typography>

          <Button sx={{ mt: 2 }} variant="outlined" onClick={handleOpen}>
            {t.reviews.leave}
          </Button>
        </Paper>
      )}

      {/* CREATE REVIEW */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography fontWeight={700}>{t.reviews.leave}</Typography>

          <IconButton onClick={handleClose}>
            <CloseOutlinedIcon />
          </IconButton>
        </DialogTitle>

        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Stack spacing={2}>
              <TextField
                label={t.reviews.form.name}
                value={name}
                onChange={(e) => setName(e.target.value)}
                error={Boolean(errors.name)}
                helperText={errors.name}
                fullWidth
              />

              <Box>
                <Typography fontWeight={600} sx={{ mb: 0.5 }}>
                  {t.reviews.form.rating}
                </Typography>
                <Rating value={stars} onChange={(_, v) => setStars(v ?? 5)} />
              </Box>

              <TextField
                label={t.reviews.form.text}
                value={text}
                onChange={(e) => setText(e.target.value)}
                error={Boolean(errors.text)}
                helperText={errors.text}
                multiline
                rows={4}
                fullWidth
              />
            </Stack>
          </DialogContent>

          <DialogActions sx={{ p: 2 }}>
            <Button onClick={handleClose} variant="outlined">
              {t.common.cancel}
            </Button>

            <Button type="submit" variant="contained">
              {t.reviews.submit}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default ReviewsSection;
