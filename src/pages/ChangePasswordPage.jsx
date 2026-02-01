import {
  Box,
  Typography,
  Paper,
  Stack,
  TextField,
  Button,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useState } from "react";
import api from "../api/axios";
import { useI18n } from "../translations/i18nProvider";
import { useAuth } from "../stores/auth.store";

const ChangePasswordPage = () => {
  const { t } = useI18n();

  const [form, setForm] = useState({
    old_password: "",
    new_password: "",
    confirm_password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  /* ---------------- HANDLERS ---------------- */

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (form.new_password !== form.confirm_password) {
      setError(t.profile.passwords_not_match);
      return;
    }

    setLoading(true);

    try {
      await api.post("users/change-password/", {
        old_password: form.old_password,
        new_password: form.new_password,
        new_password_confirm: form.confirm_password,
      });

      setSuccess(true);
      setTimeout(() => {
        setForm({
          old_password: "",
          new_password: "",
          confirm_password: "",
        });
      }, 1500);
    } catch (err) {
      setError(err?.response?.data?.detail || t.profile.change_password_error);
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- RENDER ---------------- */

  return (
    <Box
      sx={{
        maxWidth: "650px",
        width: "650px",
        margin: "12px auto 24px",
      }}
    >
      <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
        {t.profile.change_password}
      </Typography>

      <Paper sx={{ p: 3, maxWidth: 480 }}>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label={t.profile.current_password}
              name="old_password"
              type="password"
              value={form.old_password}
              onChange={handleChange}
              required
              fullWidth
            />

            <TextField
              label={t.profile.new_password}
              name="new_password"
              type="password"
              value={form.new_password}
              onChange={handleChange}
              required
              fullWidth
            />

            <TextField
              label={t.profile.confirm_password}
              name="confirm_password"
              type="password"
              value={form.confirm_password}
              onChange={handleChange}
              required
              fullWidth
            />

            {error && <Alert severity="error">{error}</Alert>}
            {success && (
              <Alert severity="success">
                {t.profile.change_password_success}
              </Alert>
            )}

            <Button type="submit" variant="contained" disabled={loading}>
              {loading ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                t.profile.save
              )}
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
};

export default ChangePasswordPage;
