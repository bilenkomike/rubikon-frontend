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
} from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useMemo, useState } from "react";

const ReviewsSection = ({ reviews, averageRating }) => {
  const hasReviews = reviews.length > 0;

  const [open, setOpen] = useState(false);
  const [name, setName] = useState("Mike Bilenko");
  const [stars, setStars] = useState(5);
  const [text, setText] = useState("");

  const [errors, setErrors] = useState({
    name: "",
    text: "",
  });

  const avg = useMemo(() => {
    const v = Number(averageRating);
    return Number.isFinite(v) ? v : 0;
  }, [averageRating]);

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    setName("");
    setStars(5);
    setText("");
    setErrors({ name: "", text: "" });
  };

  const validate = () => {
    const next = { name: "", text: "" };

    if (!name.trim()) next.name = "Please enter your name";
    if (text.trim().length < 10)
      next.text = "Review must be at least 10 characters";

    setErrors(next);
    return !next.name && !next.text;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    const payload = {
      author: name.trim(),
      rating: stars,
      text: text.trim(),
    };

    if (typeof onSubmitReview === "function") {
      // onSubmitReview(payload);
    } else {
      console.log("submit review:", payload);
    }

    handleClose();
  };

  return (
    <Box sx={{ mt: 6 }}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ mb: 2 }}
      >
        <Typography variant="h6" fontWeight={700}>
          Reviews
        </Typography>

        <Button variant="outlined" onClick={handleOpen}>
          Leave a review
        </Button>
      </Stack>
      {/* <Typography variant="h6" fontWeight={700} gutterBottom>
        Відгуки
      </Typography> */}

      {/* SUMMARY */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Stack direction="row" spacing={3} alignItems="center">
          <Typography variant="h3" fontWeight={700}>
            {averageRating.toFixed(1)}
          </Typography>

          <Stack>
            <Rating value={averageRating} precision={0.1} readOnly />
            <Typography color="text.secondary">
              {reviews.length} відгуків
            </Typography>
          </Stack>
        </Stack>
      </Paper>

      {/* LIST */}
      {hasReviews ? (
        <Paper>
          {reviews.map((review, index) => (
            <Box key={review.id}>
              <Box sx={{ p: 3 }}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography fontWeight={600}>{review.author}</Typography>

                  <Typography variant="caption" color="text.secondary">
                    {review.date}
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
          <Typography color="text.secondary">Поки що немає відгуків</Typography>

          <Button sx={{ mt: 2 }} variant="outlined">
            Залишити відгук
          </Button>
        </Paper>
      )}

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography fontWeight={700}>Leave a review</Typography>

          <IconButton onClick={handleClose}>
            <CloseOutlinedIcon />
          </IconButton>
        </DialogTitle>

        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Stack spacing={2}>
              <TextField
                label="Your name"
                value={name}
                fullWidth
                contentEditable={false}
              />

              <Box>
                <Typography fontWeight={600} sx={{ mb: 0.5 }}>
                  Rating
                </Typography>
                <Rating value={stars} onChange={(_, v) => setStars(v ?? 5)} />
              </Box>

              <TextField
                label="Review"
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
              Cancel
            </Button>

            <Button type="submit" variant="contained">
              Submit review
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default ReviewsSection;
