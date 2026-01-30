import {
  Drawer,
  Box,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  Grid,
  Button,
  Divider,
  IconButton,
  useMediaQuery,
  CircularProgress,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUI } from "../../stores/ui.store";
import { useI18n } from "../../translations/i18nProvider";
import api from "../../api/axios";

const CatalogSidebar = () => {
  const { catalogOpen, setCatalogOpen } = useUI();
  const { lang } = useI18n();
  const navigate = useNavigate();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [subcategories, setSubcategories] = useState([]);
  const [loadingSubs, setLoadingSubs] = useState(false);
  const [mobileStep, setMobileStep] = useState("categories");

  /* ---------------- FETCH CATEGORIES ---------------- */

  useEffect(() => {
    if (!catalogOpen) return;

    api
      .get("products/categories/")
      .then((res) => {
        setCategories(res.data);
        setActiveCategory(res.data[0] || null);
      })
      .catch(console.error);
  }, [catalogOpen]);

  /* ---------------- FETCH SUBCATEGORIES ---------------- */

  useEffect(() => {
    if (!activeCategory) return;

    setLoadingSubs(true);
    setSubcategories([]);

    api
      .get(`products/categories/${activeCategory.slug}/subcategories/`)
      .then((res) => {
        setSubcategories(res.data || []);
      })
      .catch(console.error)
      .finally(() => setLoadingSubs(false));
  }, [activeCategory]);

  /* ---------------- HELPERS ---------------- */

  const tName = (obj) => (lang === "ru" ? obj.name_ru : obj.name);

  const goToCategory = (slug) => {
    setCatalogOpen(false);
    navigate(`/${lang}/categories/${slug}`);
  };

  /* ---------------- MOBILE ---------------- */

  const MobileView = () => (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      {mobileStep === "subcategories" && (
        <Box sx={{ p: 2, display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton onClick={() => setMobileStep("categories")}>
            <ArrowBackIcon />
          </IconButton>
          <Typography fontWeight={600}>{tName(activeCategory)}</Typography>
        </Box>
      )}

      <Divider />

      <Box sx={{ flex: 1, overflowY: "auto" }}>
        {mobileStep === "categories" ? (
          <List>
            {categories.map((cat) => (
              <ListItemButton
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat);
                  setMobileStep("subcategories");
                }}
              >
                <ListItemText primary={tName(cat)} />
              </ListItemButton>
            ))}
          </List>
        ) : (
          <Box sx={{ p: 2 }}>
            <Button
              variant="contained"
              fullWidth
              sx={{ mb: 2 }}
              onClick={() => goToCategory(activeCategory.slug)}
            >
              {lang === "ru" ? "Перейти в категорию" : "View category"}
            </Button>

            {loadingSubs && <CircularProgress size={20} />}

            {!loadingSubs && subcategories.length === 0 && null}

            {!loadingSubs &&
              subcategories.map((sub) => (
                <Typography
                  key={sub.id}
                  sx={{
                    py: 1,
                    cursor: "pointer",
                    "&:hover": { color: "primary.main" },
                  }}
                  onClick={() =>
                    navigate(
                      `/${lang}/categories/${activeCategory.slug}/${sub.slug}`,
                    )
                  }
                >
                  {tName(sub)}
                </Typography>
              ))}
          </Box>
        )}
      </Box>
    </Box>
  );

  /* ---------------- DESKTOP ---------------- */

  const DesktopView = () => (
    <Box sx={{ display: "flex", height: "100%" }}>
      {/* LEFT */}
      <Box
        sx={{
          width: 280,
          borderRight: "1px solid #e0e0e0",
          overflowY: "auto",
        }}
      >
        <List disablePadding>
          {categories.map((cat) => (
            <ListItemButton
              key={cat.id}
              selected={activeCategory?.id === cat.id}
              onMouseEnter={() => setActiveCategory(cat)}
              onClick={() => goToCategory(cat.slug)}
            >
              <ListItemText primary={tName(cat)} />
            </ListItemButton>
          ))}
        </List>
      </Box>

      {/* RIGHT */}
      <Box sx={{ flex: 1, p: 3 }}>
        {loadingSubs && <CircularProgress />}

        {!loadingSubs && subcategories.length === 0 && null}

        {!loadingSubs && subcategories.length > 0 && (
          <Box
            sx={{
              columnCount: 4, // number of columns
              columnGap: 4,
            }}
          >
            {subcategories.map((item) => (
              <Typography
                key={item.id}
                sx={{
                  breakInside: "avoid",
                  fontSize: 14,
                  mb: 1,
                  cursor: "pointer",
                  "&:hover": {
                    color: "primary.main",
                    textDecoration: "underline",
                  },
                }}
                onClick={() =>
                  navigate(
                    `/${lang}/categories/${activeCategory.slug}/${item.slug}`,
                  )
                }
              >
                {lang === "ru" ? item.name_ru : item.name}
              </Typography>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );

  /* ---------------- RENDER ---------------- */

  return (
    <Drawer
      anchor="left"
      open={catalogOpen}
      onClose={() => setCatalogOpen(false)}
      PaperProps={{
        sx: {
          width: {
            xs: "90vw", // mobile
            md: "100%", // desktop
          },
          maxWidth: {
            xs: "90vw",
            md: 1200,
          },
        },
      }}
    >
      {isMobile ? <MobileView /> : <DesktopView />}
    </Drawer>
  );
};

export default CatalogSidebar;
