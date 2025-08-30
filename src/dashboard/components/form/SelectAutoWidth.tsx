import { Box, type SxProps, type Theme } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { type SelectChangeEvent } from '@mui/material/Select';

interface Item {
  value?: string | number | readonly string[];
  name: string;
}

interface Props {
  label: string;
  items: Item[];
  name?: string;
  autoWidth?: boolean;
  sx?: SxProps<Theme>;
  size?: 'small' | 'medium';
  value?: string;
  handleChange?: (event: SelectChangeEvent) => void;
}

export default function SelectAutoWidth({
  label,
  items,
  name,
  autoWidth = false,
  sx,
  size,
  value,
  handleChange,
}: Props) {
  return (
    <Box sx={sx}>
      <FormControl sx={{ m: 1, minWidth: 80, width: '100%' }} size={size}>
        <InputLabel id={name}>{label}</InputLabel>
        <Select
          labelId={`select-${name}`}
          id={name}
          value={value}
          onChange={handleChange}
          label={label}
          autoWidth={autoWidth}
        >
          <MenuItem value=''>
            <em>None</em>
          </MenuItem>
          {items.map(({ value, name }) => (
            <MenuItem key={name} value={value}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
