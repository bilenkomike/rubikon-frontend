// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   Box,
//   Button,
//   IconButton,
//   Container,
//   CardMedia,
//   SvgIcon,
// } from "@mui/material";
// import ShoppingCartOutlined from "@mui/icons-material/ShoppingCartOutlined";
// import MenuIcon from "@mui/icons-material/Menu";
// import SearchBar from "./SearchBar";
// import { useUI } from "../stores/ui.store";
// import Logo from "../../public/rubikon.svg?react";
// import { useNavigate } from "react-router-dom";
// import { useI18n } from "../translations/i18nProvider";

// const Header = () => {
//   const { setCatalogOpen, setOrdersOpen, setMenuOpen } = useUI();
//   const navigate = useNavigate();
//   const { lang, t } = useI18n();

//   const navigateWithLang = (path) => {
//     setMenuOpen(false);
//     navigate(`/${lang}${path}`);
//   };

//   return (
//     <AppBar position="sticky" color="primary">
//       <Container
//         maxWidth={false}
//         sx={{
//           maxWidth: "1600px",
//         }}
//       >
//         <Toolbar sx={{ gap: 2 }}>
//           <IconButton
//             color="inherit"
//             edge="start"
//             aria-label="open menu"
//             onClick={() => setMenuOpen(true)}
//             sx={{
//               mr: 1,
//             }}
//           >
//             <MenuIcon />
//           </IconButton>
//           <IconButton
//             color="inherit"
//             edge="start"
//             aria-label="open menu"
//             onClick={() => navigateWithLang("")}
//             sx={{
//               mr: 1,
//             }}
//           >
//             <Typography
//               variant="h6"
//               sx={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: 1,
//                 fontWeight: 700,
//                 "& > svg": {
//                   width: "36px",
//                   height: "36px",
//                 },
//               }}
//             >
//               <Logo />
//               Rubikon
//             </Typography>
//           </IconButton>

//           <Button
//             variant="contained"
//             color="secondary"
//             onClick={() => setCatalogOpen(true)}
//           >
//             Catalog
//           </Button>

//           <SearchBar />

//           <Box sx={{ ml: "auto" }}>
//             <IconButton color="inherit" onClick={() => setOrdersOpen(true)}>
//               <ShoppingCartOutlined />
//             </IconButton>
//           </Box>
//         </Toolbar>
//       </Container>
//     </AppBar>
//   );
// };

// export default Header;

import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
  Container,
  Dialog,
  Slide,
  useMediaQuery,
} from "@mui/material";
import ShoppingCartOutlined from "@mui/icons-material/ShoppingCartOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import SearchBar from "./SearchBar";
import { useUI } from "../stores/ui.store";
import Logo from "../../public/rubikon.svg?react";
import { useNavigate } from "react-router-dom";
import { useI18n } from "../translations/i18nProvider";
import { useTheme } from "@mui/material/styles";
import { forwardRef, useState } from "react";

/* ---------- Mobile dialog transition ---------- */
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const Header = () => {
  const { setCatalogOpen, setOrdersOpen, setMenuOpen } = useUI();
  const navigate = useNavigate();
  const { lang, t } = useI18n();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [searchOpen, setSearchOpen] = useState(false);

  const navigateWithLang = (path = "") => {
    setMenuOpen(false);
    navigate(`/${lang}${path}`);
  };

  return (
    <>
      {/* ================= HEADER ================= */}
      <AppBar position="sticky" color="primary">
        <Container maxWidth={false} sx={{ maxWidth: "1600px" }}>
          <Toolbar
            sx={{
              gap: 1.5,
              px: { xs: 1, sm: 2 },
            }}
          >
            {/* Burger menu */}
            <IconButton
              color="inherit"
              edge="start"
              aria-label={t.common.open_menu}
              onClick={() => setMenuOpen(true)}
            >
              <MenuIcon />
            </IconButton>

            {/* Logo */}
            <IconButton
              color="inherit"
              edge="start"
              aria-label={t.common.go_home}
              onClick={() => navigateWithLang("")}
              sx={{ mr: 1 }}
            >
              <Typography
                variant="h6"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  fontWeight: 700,
                  "& > svg": {
                    width: 36,
                    height: 36,
                  },
                }}
              >
                <Logo />
                {!isMobile && "Rubikon"}
              </Typography>
            </IconButton>

            {/* Catalog */}
            {isMobile ? (
              <IconButton
                color="secondary"
                aria-label={t.common.catalog}
                onClick={() => setCatalogOpen(true)}
              >
                <CategoryOutlinedIcon />
              </IconButton>
            ) : (
              <Button
                variant="contained"
                color="secondary"
                onClick={() => setCatalogOpen(true)}
              >
                {t.common.catalog}
              </Button>
            )}

            {/* Search */}
            {isMobile ? (
              <IconButton
                color="inherit"
                aria-label={t.common.search}
                onClick={() => setSearchOpen(true)}
              >
                <SearchIcon />
              </IconButton>
            ) : (
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <SearchBar />
              </Box>
            )}

            {/* Cart */}
            <IconButton
              color="inherit"
              aria-label={t.common.cart}
              onClick={() => setOrdersOpen(true)}
            >
              <ShoppingCartOutlined />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      {/* ================= MOBILE SEARCH POPUP ================= */}
      {isMobile && (
        <Dialog
          fullScreen
          open={searchOpen}
          onClose={() => setSearchOpen(false)}
          TransitionComponent={Transition}
        >
          <AppBar position="sticky" color="default">
            <Toolbar>
              <Box sx={{ flex: 1 }}>
                <SearchBar autoFocus />
              </Box>

              <IconButton
                edge="end"
                aria-label={t.common.close}
                onClick={() => setSearchOpen(false)}
              >
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
        </Dialog>
      )}
    </>
  );
};

export default Header;
