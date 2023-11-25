import { Avatar, Box, ListItemIcon, ListItemText, Menu, MenuItem, useTheme, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { ColorModeContext, tokens } from "../../styles/theme";
import { AuthContext } from "../../utils/authenticationUtil";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import PersonIcon from '@mui/icons-material/Person';

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const { authenticated, user, logout, loading } = useContext(AuthContext);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    if (anchorEl == null) {
      setAnchorEl(event.currentTarget);
    } else {
      setAnchorEl(null);
    }
  };

  const goToProfile = (event) => {
    window.location.href = "/profile";
  };

  return (
    <>
      {!loading && authenticated && <Box display="flex" justifyContent="space-between" p={2}>
        <Box
          display="flex"
          backgroundColor={colors.primary[400]}
          borderRadius="3px"
        ></Box>

        <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }} onClick={handleClick}>
          <Avatar sx={{ width: 32, height: 32 }}>{user.name.charAt(0).toUpperCase()}</Avatar>
          <Typography variant="h4" ml={2}>{user.name}</Typography>
        </Box >

        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClick={handleClick}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
        >
          <MenuItem onClick={goToProfile}>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText>Meu Perfil</ListItemText>
          </MenuItem>

          <MenuItem
            onClick={colorMode.toggleColorMode}
          >
            <ListItemIcon>
              {theme.palette.mode === "dark" ? (
                <DarkModeOutlinedIcon fontSize="small" />
              ) : (
                <LightModeOutlinedIcon fontSize="small" />
              )}
            </ListItemIcon>
            <ListItemText>Alterar Tema</ListItemText>
          </MenuItem>

          <MenuItem onClick={logout}>
            <ListItemIcon>
              <LogoutOutlinedIcon fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </Box >}
    </>
  );
};

export default Topbar;