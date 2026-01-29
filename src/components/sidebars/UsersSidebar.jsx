import {
  Drawer,
  Box,
  Typography,
  Button,
  Divider,
  List,
  ListItemButton,
  ListItemText,
  Select,
  MenuItem,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { useUI } from "../../stores/ui.store";
import { useI18n } from "../../translations/i18nProvider";

const UsersSidebar = () => {
  const { menuOpen, setMenuOpen } = useUI();
  const { lang, t } = useI18n();

  const navigate = useNavigate();
  const location = useLocation();

  /* ---------- helpers ---------- */

  const navigateWithLang = (path) => {
    setMenuOpen(false);
    navigate(`/${lang}${path}`);
  };

  const handleLanguageChange = (e) => {
    const newLang = e.target.value;

    // replace /en/... or /ru/... with new language
    const segments = location.pathname.split("/");
    segments[1] = newLang;

    navigate(segments.join("/"));
  };

  /* ---------- render ---------- */

  return (
    <Drawer
      anchor="left"
      open={menuOpen}
      onClose={() => setMenuOpen(false)}
      PaperProps={{
        sx: {
          width: 360,
          maxWidth: "100%",
        },
      }}
    >
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* HEADER */}
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" fontWeight={700}>
            {t.userMenu.title}
          </Typography>

          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
            onClick={() => {
              setMenuOpen(false);
              // later → auth modal
            }}
          >
            {t.userMenu.login}
          </Button>
        </Box>

        <Divider />

        {/* SCROLLABLE CONTENT */}
        <Box sx={{ flex: 1, overflowY: "auto" }}>
          <List>
            <ListItemButton onClick={() => navigateWithLang("/orders")}>
              <ListItemText primary={t.userMenu.orders} />
            </ListItemButton>

            <ListItemButton>
              <ListItemText primary={t.userMenu.wishlist} />
            </ListItemButton>
          </List>

          <Divider sx={{ my: 2 }} />

          {/* LANGUAGE SWITCHER */}
          <Box sx={{ px: 2 }}>
            <Typography fontSize={14} fontWeight={600} sx={{ mb: 1 }}>
              {t.common.language}
            </Typography>

            <Select
              fullWidth
              size="small"
              value={lang}
              onChange={handleLanguageChange}
            >
              <MenuItem value="en">English</MenuItem>
              <MenuItem value="ru">Русский</MenuItem>
            </Select>
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* SERVICES */}
          <List>
            <ListItemButton onClick={() => navigateWithLang("/contact")}>
              <ListItemText primary={t.common.contacts} />
            </ListItemButton>

            <ListItemButton>
              <ListItemText primary={t.common.about} />
            </ListItemButton>
          </List>
        </Box>
      </Box>
    </Drawer>
  );
};

export default UsersSidebar;
