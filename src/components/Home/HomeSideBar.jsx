import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { useI18n } from "../../translations/i18nProvider";

const HomeSidebar = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const { lang, t } = useI18n();

  useEffect(() => {
    let mounted = true;

    api
      .get("products/categories/?home=true")
      .then((res) => {
        if (mounted) {
          setCategories(res.data);
        }
      })
      .catch((err) => {
        console.error("Failed to load categories", err);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <Box sx={{ width: 300 }}>
      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography fontWeight={700} sx={{ mb: 1 }}>
          {t.categories.categories}
        </Typography>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 2 }}>
            <CircularProgress size={24} />
          </Box>
        ) : (
          <List dense>
            {categories.map((category) => {
              const title = lang === "ru" ? category.name_ru : category.name;

              return (
                <ListItem
                  key={category.id}
                  onClick={() =>
                    navigate(`/${lang}/categories/${category.slug}`)
                  }
                  sx={{
                    cursor: "pointer",
                    borderRadius: 1,
                    "&:hover": {
                      backgroundColor: "action.hover",
                    },
                  }}
                >
                  <ListItemText primary={title} />
                </ListItem>
              );
            })}
          </List>
        )}
      </Paper>
    </Box>
  );
};

export default HomeSidebar;
