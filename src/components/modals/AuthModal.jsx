import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
  Typography,
  IconButton,
} from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useUI } from "../../stores/ui.store";
import { useI18n } from "../../translations/i18nProvider";

const AuthModal = () => {
  const { authOpen, setAuthOpen } = useUI();
  const { t } = useI18n();

  const handleClose = () => {
    setAuthOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // later:
    // - call backend
    // - handle errors
    // - store token
    console.log("login submit");

    setAuthOpen(false);
  };

  return (
    <Dialog open={authOpen} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography fontWeight={700}>{t.auth.title}</Typography>

        <IconButton onClick={handleClose}>
          <CloseOutlinedIcon />
        </IconButton>
      </DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Stack spacing={2}>
            <TextField label={t.auth.email} type="email" required fullWidth />

            <TextField
              label={t.auth.password}
              type="password"
              required
              fullWidth
            />
          </Stack>
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <Button variant="contained" fullWidth type="submit">
            {t.auth.login}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AuthModal;
