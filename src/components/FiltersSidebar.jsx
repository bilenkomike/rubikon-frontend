import {
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
  Slider,
  Stack,
  Divider,
} from "@mui/material";

const FiltersSidebar = ({ filters, value, onChange }) => {
  const toggleValue = (key, item) => {
    const current = value[key];
    const updated = current.includes(item)
      ? current.filter((i) => i !== item)
      : [...current, item];

    onChange({ ...value, [key]: updated });
  };

  return (
    <Box sx={{ width: 260, paddingRight: 4, borderRight: "1px solid #D3D3D3" }}>
      {/* BRAND */}
      <Typography fontWeight={700}>Brand</Typography>
      <Stack>
        {filters.brands.map((brand) => (
          <FormControlLabel
            key={brand}
            control={
              <Checkbox
                checked={value.brands.includes(brand)}
                onChange={() => toggleValue("brands", brand)}
              />
            }
            label={brand}
          />
        ))}
      </Stack>
      <Divider sx={{ my: 2 }} />

      {/* PRICE */}
      <Typography fontWeight={700}>Price</Typography>
      <Slider
        value={value.price}
        onChange={(_, newValue) => onChange({ ...value, price: newValue })}
        valueLabelDisplay="auto"
        min={filters.price.min}
        max={filters.price.max}
      />

      <Divider sx={{ my: 2 }} />

      {/* SIZE */}
      <Typography fontWeight={700}>Size</Typography>
      <Stack>
        {filters.sizes.map((size) => (
          <FormControlLabel
            key={size}
            control={
              <Checkbox
                checked={value.sizes.includes(size)}
                onChange={() => toggleValue("sizes", size)}
              />
            }
            label={size}
          />
        ))}
      </Stack>

      <Divider sx={{ my: 2 }} />

      {/* MATERIAL */}
      <Typography fontWeight={700}>Material</Typography>
      <Stack>
        {filters.materials.map((material) => (
          <FormControlLabel
            key={material}
            control={
              <Checkbox
                checked={value.materials.includes(material)}
                onChange={() => toggleValue("materials", material)}
              />
            }
            label={material}
          />
        ))}
      </Stack>

      <Divider sx={{ my: 2 }} />

      {/* COLOR */}
      <Typography fontWeight={700}>Color</Typography>
      <Stack>
        {filters.colors.map((color) => (
          <FormControlLabel
            key={color}
            control={
              <Checkbox
                checked={value.colors.includes(color)}
                onChange={() => toggleValue("colors", color)}
              />
            }
            label={color}
          />
        ))}
      </Stack>
    </Box>
  );
};

export default FiltersSidebar;
