// import {
//   Container,
//   Typography,
//   TextField,
//   Button,
//   Stack,
//   Paper,
//   Box,
// } from "@mui/material";
// import TelegramIcon from "@mui/icons-material/Telegram";
// import { useI18n } from "../translations/i18nProvider";
// import PromoSlider from "../components/Home/PromoSlider";

// const ContactPage = () => {
//   const { t } = useI18n();

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // later:
//     // - validate
//     // - send to backend / email / CRM
//     console.log("submit contact form");
//   };

//   const handleTelegramRedirect = () => {
//     window.open("https://t.me/your_telegram_username", "_blank");
//   };

//   return (
//     <Container
//       maxWidth={false}
//       sx={{
//         display: "flex",
//         flexDirection: "column",
//         maxWidth: "1200px",
//         mt: 4,
//         mb: 6,
//         gap: 2,
//       }}
//     >
//       <PromoSlider />
//       <Paper sx={{ p: 4 }}>
//         <Stack spacing={3}>
//           {/* TITLE */}
//           <Box>
//             <Typography variant="h5" fontWeight={700}>
//               {t.contact.title}
//             </Typography>

//             <Typography color="text.secondary" sx={{ mt: 0.5 }}>
//               {t.contact.description}
//             </Typography>
//           </Box>

//           {/* FORM */}
//           <form onSubmit={handleSubmit}>
//             <Stack spacing={2}>
//               <TextField
//                 label={t.contact.name}
//                 name="name"
//                 fullWidth
//                 required
//               />

//               <TextField
//                 label={t.contact.email}
//                 name="email"
//                 type="email"
//                 fullWidth
//                 required
//               />

//               <TextField
//                 label={t.contact.message}
//                 name="message"
//                 multiline
//                 rows={4}
//                 fullWidth
//                 required
//               />

//               <Button type="submit" variant="contained" size="large">
//                 {t.contact.send}
//               </Button>
//             </Stack>
//           </form>

//           {/* TELEGRAM CTA */}
//           <Box
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               gap: 2,
//               mt: 2,
//             }}
//           >
//             <Typography color="text.secondary">
//               {t.contact.orTelegram}
//             </Typography>

//             <Button
//               variant="outlined"
//               startIcon={<TelegramIcon />}
//               onClick={handleTelegramRedirect}
//             >
//               {t.contact.telegram}
//             </Button>
//           </Box>
//         </Stack>
//       </Paper>
//     </Container>
//   );
// };

// export default ContactPage;

import {
  Container,
  Typography,
  TextField,
  Button,
  Stack,
  Paper,
  Box,
  Alert,
  CircularProgress,
} from "@mui/material";
import TelegramIcon from "@mui/icons-material/Telegram";
import { useI18n } from "../translations/i18nProvider";
import PromoSlider from "../components/Home/PromoSlider";
import { useState } from "react";
import api from "../api/axios";

const ContactPage = () => {
  const { t } = useI18n();

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  /* ---------- handlers ---------- */

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

    setLoading(true);

    try {
      await api.post("contact/", form);
      setSuccess(true);
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setError(t.contact.error);
    } finally {
      setLoading(false);
    }
  };

  const handleTelegramRedirect = () => {
    window.open("https://t.me/RubikonStore", "_blank");
  };

  /* ---------- render ---------- */

  return (
    <Container
      maxWidth={false}
      sx={{
        maxWidth: "1200px",
        mt: 4,
        mb: 6,
        display: "flex",
        flexDirection: "column",
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
                value={form.name}
                onChange={handleChange}
                fullWidth
                required
              />

              <TextField
                label={t.contact.email}
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                fullWidth
                required
              />

              <TextField
                label={t.contact.message}
                name="message"
                value={form.message}
                onChange={handleChange}
                multiline
                rows={4}
                fullWidth
                required
              />

              {error && <Alert severity="error">{error}</Alert>}
              {success && <Alert severity="success">{t.contact.success}</Alert>}

              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={loading}
              >
                {loading ? (
                  <CircularProgress size={22} color="inherit" />
                ) : (
                  t.contact.send
                )}
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
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" fontWeight={700} sx={{ mb: 1 }}>
          {t.contact.companyDetails}
        </Typography>

        <Typography>ООО &quot;Рубикон&quot;</Typography>
        <Typography color="text.secondary">
          {t.contact.email}:{" "}
          <a target="_blank" href="mailto:Rubiconsupport1@protonmail.com">
            Rubiconsupport1@protonmail.com
          </a>
        </Typography>
        <Typography color="text.secondary">
          690012 улица Калинина, 180, Владивосток, Приморский край
        </Typography>
      </Box>
    </Container>
  );
};

export default ContactPage;
