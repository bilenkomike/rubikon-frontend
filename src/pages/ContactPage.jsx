import {
  Container,
  Typography,
  TextField,
  Button,
  Stack,
  Paper,
  Box,
} from "@mui/material";
import TelegramIcon from "@mui/icons-material/Telegram";
import { useI18n } from "../translations/i18nProvider";
import PromoSlider from "../components/Home/PromoSlider";

const ContactPage = () => {
  const { t } = useI18n();

  const handleSubmit = (e) => {
    e.preventDefault();

    // later:
    // - validate
    // - send to backend / email / CRM
    console.log("submit contact form");
  };

  const handleTelegramRedirect = () => {
    window.open("https://t.me/your_telegram_username", "_blank");
  };

  return (
    <Container
      maxWidth={false}
      sx={{
        display: "flex",
        flexDirection: "column",
        maxWidth: "1200px",
        mt: 4,
        mb: 6,
        gap: 2,
      }}
    >
      <PromoSlider />
      <Paper sx={{ p: 4 }}>
        <Stack spacing={3}>
          {/* TITLE */}
          <Box>
            <Typography variant="h5" fontWeight={700}>
              {t.contact.title}
            </Typography>

            <Typography color="text.secondary" sx={{ mt: 0.5 }}>
              {t.contact.description}
            </Typography>
          </Box>

          {/* FORM */}
          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField
                label={t.contact.name}
                name="name"
                fullWidth
                required
              />

              <TextField
                label={t.contact.email}
                name="email"
                type="email"
                fullWidth
                required
              />

              <TextField
                label={t.contact.message}
                name="message"
                multiline
                rows={4}
                fullWidth
                required
              />

              <Button type="submit" variant="contained" size="large">
                {t.contact.send}
              </Button>
            </Stack>
          </form>

          {/* TELEGRAM CTA */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              mt: 2,
            }}
          >
            <Typography color="text.secondary">
              {t.contact.orTelegram}
            </Typography>

            <Button
              variant="outlined"
              startIcon={<TelegramIcon />}
              onClick={handleTelegramRedirect}
            >
              {t.contact.telegram}
            </Button>
          </Box>
        </Stack>
      </Paper>
    </Container>
  );
};

export default ContactPage;
