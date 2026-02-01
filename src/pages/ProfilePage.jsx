import {
  Container,
  Typography,
  Paper,
  Stack,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useI18n } from "../translations/i18nProvider";
import api from "../api/axios";

const ProfilePage = () => {
  const { t } = useI18n();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
  });

  /* ---------------- LOAD USER ---------------- */

  useEffect(() => {
    api
      .get("users/me/", {
        withAuth: true,
      })
      .then((res) => {
        setForm({
          username: res.data.email,
          first_name: res.data.first_name,
          last_name: res.data.last_name,
          phone_number: res.data.phone_number,
          email: res.data.email,
        });
      })
      .catch(() => {
        setError(t.common.loading);
      })
      .finally(() => setLoading(false));
  }, []);

  /* ---------------- HANDLERS ---------------- */

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      await api.patch("users/me/", form);
    } catch (err) {
      setError(err?.response?.data?.detail || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Container sx={{ py: 6, textAlign: "center" }}>
        <CircularProgress />
      </Container>
    );
  }

  /* ---------------- RENDER ---------------- */

  return (
    <Container
      sx={{
        maxWidth: "650px",
        width: "650px",
        margin: "12px auto 24px",
      }}
    >
      <Typography variant="h5" fontWeight={700} gutterBottom>
        {t.profile.title}
      </Typography>
      <Paper sx={{ p: 3, width: "650px" }}>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label={t.profile.first_name}
              name="first_name"
              value={form.first_name}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label={t.profile.last_name}
              name="last_name"
              value={form.last_name}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              label={t.profile.email}
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label={t.profile.phone_number}
              name="phone_number"
              type="text"
              value={form.phone_number}
              onChange={handleChange}
              fullWidth
            />

            {error && (
              <Typography color="error" fontSize={14}>
                {error}
              </Typography>
            )}

            <Button type="submit" variant="contained" disabled={saving}>
              {saving ? <CircularProgress size={20} /> : t.profile.save}
            </Button>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
};

export default ProfilePage;
