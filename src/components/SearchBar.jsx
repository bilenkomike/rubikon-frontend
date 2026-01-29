import { InputBase, Paper } from "@mui/material";

const SearchBar = () => {
  return (
    <Paper
      component="form"
      sx={{
        flex: 1,
        px: 2,
        py: 0.5,
        display: "flex",
        alignItems: "center",
      }}
    >
      <InputBase placeholder="Search products..." fullWidth />
    </Paper>
  );
};

export default SearchBar;
