import {
  Drawer,
  Box,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  Grid,
} from "@mui/material";
import { useState, useEffect } from "react";
import { catalog } from "../../data/catalog.mock";
import { useUI } from "../../stores/ui.store";

const CatalogSidebar = () => {
  const { catalogOpen, setCatalogOpen } = useUI();

  // default active category
  const [activeCategory, setActiveCategory] = useState("");

  useEffect(() => {
    if (!activeCategory && catalog.length > 0) {
      setActiveCategory(catalog[0]);
    }
  }, [activeCategory]);

  if (!activeCategory) return null;

  return (
    <Drawer
      anchor="left"
      open={catalogOpen}
      onClose={() => setCatalogOpen(false)}
      PaperProps={{
        sx: {
          width: "100%",
          maxWidth: 1200,
        },
      }}
    >
      <Box sx={{ display: "flex", height: "100vh" }}>
        {/* LEFT COLUMN — MAIN CATEGORIES */}
        <Box
          sx={{
            width: 280,
            borderRight: "1px solid #e0e0e0",
            overflowY: "auto",
          }}
        >
          <List disablePadding>
            {catalog.map((cat) => {
              const isActive = activeCategory.id === cat.id;

              return (
                <ListItemButton
                  key={cat.id}
                  selected={isActive}
                  onMouseEnter={() => setActiveCategory(cat)}
                  sx={{
                    py: 1.25,
                    px: 2,
                    "&.Mui-selected": {
                      backgroundColor: "#f5f5f5",
                      fontWeight: 600,
                    },
                  }}
                >
                  <ListItemText
                    primary={cat.title}
                    sx={{
                      fontSize: 14,
                    }}
                  />
                </ListItemButton>
              );
            })}
          </List>
        </Box>

        {/* RIGHT PANEL — SUBCATEGORIES */}
        <Box
          sx={{
            flex: 1,
            p: 3,
            overflowY: "auto",
          }}
        >
          <Grid container spacing={4}>
            {activeCategory.sections.map((section) => (
              <Grid item xs={12} sm={6} md={4} key={section.title}>
                {/* Section title */}
                <Typography
                  sx={{
                    fontWeight: 600,
                    mb: 1,
                    color: "primary.main",
                  }}
                >
                  {section.title}
                </Typography>

                {/* Section items */}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 0.75,
                  }}
                >
                  {section.items.map((item) => (
                    <Typography
                      key={item}
                      sx={{
                        fontSize: 14,
                        cursor: "pointer",
                        color: "text.primary",
                        "&:hover": {
                          color: "primary.main",
                          textDecoration: "underline",
                        },
                      }}
                    >
                      {item}
                    </Typography>
                  ))}
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Drawer>
  );
};

export default CatalogSidebar;
