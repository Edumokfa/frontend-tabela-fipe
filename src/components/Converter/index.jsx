import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { Box } from "@mui/material";

const InputConverter = ({ idBtn, value, onClick, label }) => {
  return (
    <Box sx={{ gridColumn: "span 2" }}>
      <Paper sx={{ p: "2px 4px", display: "flex", alignItems: "center" }}>
        <IconButton id={idBtn} type="button" sx={{ p: "14px" }} aria-label="search" onClick={onClick}>
          <SearchIcon />
        </IconButton>

        <InputBase 
          disabled
          sx={{ ml: 1, flex: 1 }}
          placeholder={label}
          value={value}
        />
      </Paper>
    </Box>
  );
};

export default InputConverter;