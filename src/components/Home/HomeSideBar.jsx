import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

const categories = [
  "Ноутбуки та компʼютери",
  "Смартфони, ТВ і електроніка",
  "Товари для геймерів",
  "Побутова техніка",
  "Товари для дому",
  "Авто і мото",
  "Інструменти та обладнання",
  "Сантехніка та ремонт",
  "Дача, сад і город",
  "Одяг, взуття та прикраси",
  "Краса та здоровʼя",
];

const HomeSidebar = () => {
  return (
    <Box sx={{ width: 300 }}>
      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography fontWeight={700}>Categories</Typography>
        <List dense>
          {categories.map((item) => (
            <ListItem key={item} button sx={{ cursor: "pointer" }}>
              <ListItemText primary={item} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default HomeSidebar;
