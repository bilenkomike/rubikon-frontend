// import { InputBase, Paper } from "@mui/material";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useI18n } from "../translations/i18nProvider";
// import api from "../api/axios";

// const SearchBar = ({ autoFocus = false }) => {
//   const [value, setValue] = useState("");
//   const navigate = useNavigate();
//   const { lang } = useI18n();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!value.trim()) return;

//     getSearchSubCategory(encodeURIComponent(value));
//   };
//   const getSearchSubCategory = async (search) => {
//     const response = await api.get(`products/search/?search=${search}`);
//     const data = response.data;
//     if (data.name) {
//       navigate(`/${lang}/categories/${data.category.slug}/${data.slug}/`);
//     } else {
//       return;
//     }
//   };

//   return (
//     <Paper
//       component="form"
//       onSubmit={handleSubmit}
//       sx={{
//         flex: 1,
//         px: 2,
//         py: 0.5,
//         display: "flex",
//         alignItems: "center",
//       }}
//     >
//       <InputBase
//         placeholder="Search products..."
//         fullWidth
//         autoFocus={autoFocus}
//         value={value}
//         onChange={(e) => setValue(e.target.value)}
//       />
//     </Paper>
//   );
// };

// export default SearchBar;

import { InputBase, Paper, Snackbar, Alert } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useI18n } from "../translations/i18nProvider";
import api from "../api/axios";

const SearchBar = ({ autoFocus = false }) => {
  const [value, setValue] = useState("");
  const [noResultsOpen, setNoResultsOpen] = useState(false);

  const navigate = useNavigate();
  const { lang, t } = useI18n();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!value.trim()) return;

    try {
      const response = await api.get(`/products/search/`, {
        params: { search: value.trim() },
      });

      const data = response.data;

      if (data?.slug) {
        navigate(`/${lang}/categories/${data.category.slug}/${data.slug}/`);
      } else {
        setNoResultsOpen(true);
      }
    } catch (err) {
      console.error("Search failed:", err);
      setNoResultsOpen(true);
    }
  };

  return (
    <>
      <Paper
        component="form"
        onSubmit={handleSubmit}
        sx={{
          flex: 1,
          px: 2,
          py: 0.5,
          display: "flex",
          alignItems: "center",
        }}
      >
        <InputBase
          placeholder={t.search.placeholder}
          fullWidth
          autoFocus={autoFocus}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </Paper>

      <Snackbar
        open={noResultsOpen}
        autoHideDuration={2500}
        onClose={() => setNoResultsOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setNoResultsOpen(false)}
          severity="info"
          variant="filled"
        >
          {t.search.noResults}
        </Alert>
      </Snackbar>
    </>
  );
};

export default SearchBar;
