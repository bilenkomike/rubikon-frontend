import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
  Container,
  CardMedia,
  SvgIcon,
} from "@mui/material";
import ShoppingCartOutlined from "@mui/icons-material/ShoppingCartOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import SearchBar from "./SearchBar";
import { useUI } from "../stores/ui.store";
import Logo from "../../public/logo.svg?react";
import { useNavigate } from "react-router-dom";
import { useI18n } from "../translations/i18nProvider";

const Header = () => {
  const { setCatalogOpen, setOrdersOpen, setMenuOpen } = useUI();
  const navigate = useNavigate();
  const { lang, t } = useI18n();

  const navigateWithLang = (path) => {
    setMenuOpen(false);
    navigate(`/${lang}${path}`);
  };

  return (
    <AppBar position="sticky" color="primary">
      <Container
        maxWidth={false}
        sx={{
          maxWidth: "1600px",
        }}
      >
        <Toolbar sx={{ gap: 2 }}>
          <IconButton
            color="inherit"
            edge="start"
            aria-label="open menu"
            onClick={() => setMenuOpen(true)}
            sx={{
              mr: 1,
            }}
          >
            <MenuIcon />
          </IconButton>
          <IconButton
            color="inherit"
            edge="start"
            aria-label="open menu"
            onClick={() => navigateWithLang("")}
            sx={{
              mr: 1,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                "& > svg": {
                  width: "20px",
                  height: "20px",
                },
              }}
            >
              <Logo />
              Rubikon
            </Typography>
          </IconButton>

          <Button
            variant="contained"
            color="secondary"
            onClick={() => setCatalogOpen(true)}
          >
            Catalog
          </Button>

          <SearchBar />

          <Box sx={{ ml: "auto" }}>
            <IconButton color="inherit" onClick={() => setOrdersOpen(true)}>
              <ShoppingCartOutlined />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
