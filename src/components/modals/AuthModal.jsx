// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   Button,
//   Stack,
//   Typography,
//   IconButton,
// } from "@mui/material";
// import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
// import { useUI } from "../../stores/ui.store";
// import { useI18n } from "../../translations/i18nProvider";

// const AuthModal = () => {
//   const { authOpen, setAuthOpen } = useUI();
//   const { t } = useI18n();

//   const handleClose = () => {
//     setAuthOpen(false);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // later:
//     // - call backend
//     // - handle errors
//     // - store token
//     console.log("login submit");

//     setAuthOpen(false);
//   };

//   return (
//     <Dialog open={authOpen} onClose={handleClose} maxWidth="xs" fullWidth>
//       <DialogTitle
//         sx={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//         }}
//       >
//         <Typography fontWeight={700}>{t.auth.title}</Typography>

//         <IconButton onClick={handleClose}>
//           <CloseOutlinedIcon />
//         </IconButton>
//       </DialogTitle>

//       <form onSubmit={handleSubmit}>
//         <DialogContent>
//           <Stack spacing={2}>
//             <TextField label={t.auth.email} type="email" required fullWidth />

//             <TextField
//               label={t.auth.password}
//               type="password"
//               required
//               fullWidth
//             />
//           </Stack>
//         </DialogContent>

//         <DialogActions sx={{ p: 2 }}>
//           <Button variant="contained" fullWidth type="submit">
//             {t.auth.login}
//           </Button>
//         </DialogActions>
//       </form>
//     </Dialog>
//   );
// };

// export default AuthModal;

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
  CircularProgress,
} from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useState } from "react";
import { useUI } from "../../stores/ui.store";
import { useAuth } from "../../stores/auth.store";
import { useI18n } from "../../translations/i18nProvider";
import api from "../../api/axios";

const AuthModal = () => {
  const { authOpen, setAuthOpen } = useUI();
  const { login } = useAuth();
  const { t } = useI18n();

  const [mode, setMode] = useState("login"); // login | register
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* ---------------- HANDLERS ---------------- */

  const handleClose = () => {
    setAuthOpen(false);
    setError("");
    setMode("login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const form = new FormData(e.currentTarget);

    try {
      const payload =
        mode === "login"
          ? {
              username: form.get("email"),
              password: form.get("password"),
            }
          : {
              username: form.get("email"),
              first_name: form.get("first_name"),
              last_name: form.get("last_name"),
              email: form.get("email"),
              password: form.get("password"),
              password_confirm: form.get("password"),
            };

      const endpoint = mode === "login" ? "users/login/" : "users/register/";

      const { data } = await api.post(endpoint, payload);
      if (mode !== "login") {
        const { data } = await api.post("users/login/", {
          username: payload.email,
          password: payload.password,
        });
        login(data);
      } else {
        login(data);
      }

      // SimpleJWT expects: { access, refresh }

      setAuthOpen(false);
    } catch (err) {
      setError(
        err?.response?.data?.detail ||
          err?.response?.data?.error ||
          t.auth.error,
      );
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- RENDER ---------------- */

  return (
    <Dialog open={authOpen} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography fontWeight={700}>
          {mode === "login" ? t.auth.loginTitle : t.auth.registerTitle}
        </Typography>

        <IconButton onClick={handleClose}>
          <CloseOutlinedIcon />
        </IconButton>
      </DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Stack spacing={2}>
            {/* NAME (REGISTER ONLY) */}
            {mode === "register" && (
              <>
                <TextField
                  name="first_name"
                  label={t.auth.first_name}
                  required
                  fullWidth
                />
                <TextField
                  name="last_name"
                  label={t.auth.last_name}
                  required
                  fullWidth
                />
              </>
            )}

            {/* EMAIL */}
            <TextField
              name="email"
              label={t.auth.email}
              type="email"
              required
              fullWidth
            />

            {/* PASSWORD */}
            <TextField
              name="password"
              label={t.auth.password}
              type="password"
              required
              fullWidth
            />

            {/* ERROR */}
            {error && (
              <Typography color="error" fontSize={14}>
                {error}
              </Typography>
            )}

            {/* SWITCH MODE */}
            <Typography
              fontSize={14}
              sx={{
                cursor: "pointer",
                color: "primary.main",
                textAlign: "center",
              }}
              onClick={() => setMode(mode === "login" ? "register" : "login")}
            >
              {mode === "login"
                ? t.auth.switchToRegister
                : t.auth.switchToLogin}
            </Typography>
          </Stack>
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <Button
            variant="contained"
            fullWidth
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={20} color="inherit" />
            ) : mode === "login" ? (
              t.auth.login
            ) : (
              t.auth.register
            )}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AuthModal;
