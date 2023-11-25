import { useState, useContext } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, Tooltip, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import useMediaQuery from "@mui/material/useMediaQuery";
import { tokens } from "../../styles/theme";
import { AuthContext } from "../../utils/authenticationUtil";
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import InventoryIcon from '@mui/icons-material/Inventory';
import SettingsIcon from "@mui/icons-material/Settings";
import ForumIcon from '@mui/icons-material/Forum';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Item = ({ title, to, icon, selected, setSelected, collapsed }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Tooltip title={collapsed ? title : ""} placement="right">
      <MenuItem
        active={selected === title}
        style={{
          color: colors.grey[100],
        }}
        onClick={() => setSelected(title)}
        icon={icon}
      >
        <Typography>{title}</Typography>
        <Link to={to} />
      </MenuItem>
    </Tooltip>
  );
};

const Sidebar = () => {
  const { authenticated, loading } = useContext(AuthContext);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [isCollapsed, setIsCollapsed] = useState(!isNonMobile);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <>
      {!loading && authenticated && <Box
        sx={{
          "& .pro-sidebar-inner": {
            background: `${colors.primary[400]} !important`,
          },
          "& .pro-icon-wrapper": {
            backgroundColor: "transparent !important",
          },
          "& .pro-inner-item": {
            padding: "5px 35px 5px 20px !important",
          },
          "& .pro-inner-item:hover": {
            color: "#868dfb !important",
          },
          "& .pro-menu-item.active": {
            color: "#6870fa !important",
          },
        }}
      >
        <ProSidebar collapsed={isCollapsed}>
          <Menu iconShape="square">
            <MenuItem
              onClick={() => setIsCollapsed(!isCollapsed)}
              icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
              style={{
                margin: "10px 0 20px 0",
                color: colors.grey[100],
              }}
            >
              {!isCollapsed && (
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  ml="15px"
                >
                  <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                    <MenuOutlinedIcon />
                  </IconButton>
                </Box>
              )}
            </MenuItem>

            <Box paddingLeft={isCollapsed ? undefined : "10%"}>
              <Item
                title="Página Inicial"
                to="/"
                icon={<HomeIcon />}
                selected={selected}
                setSelected={setSelected}
                collapsed={isCollapsed}
              />

              {!isCollapsed && (
                <Typography
                  variant="h6"
                  color={colors.grey[300]}
                  sx={{ m: "15px 0 5px 20px" }}
                >
                  Cadastros
                </Typography>
              )}

              <Item
                title="Configurações"
                to="/config"
                icon={<SettingsIcon />}
                selected={selected}
                setSelected={setSelected}
                collapsed={isCollapsed}
              />

              <Item
                title="Produto"
                to="/product"
                icon={<InventoryIcon />}
                selected={selected}
                setSelected={setSelected}
                collapsed={isCollapsed}
              />

              <Item
                title="Cliente"
                to="/client"
                icon={<PeopleIcon />}
                selected={selected}
                setSelected={setSelected}
                collapsed={isCollapsed}
              />

              <Item
                title="Pedido"
                to="/purchase"
                icon={<ShoppingCartIcon />}
                selected={selected}
                setSelected={setSelected}
                collapsed={isCollapsed}
              />

              {!isCollapsed && (
                <Typography
                  variant="h6"
                  color={colors.grey[300]}
                  sx={{ m: "15px 0 5px 20px" }}
                >
                  Movimentos
                </Typography>
              )}

              <Item
                title="Conversas"
                to="/conversation"
                icon={<ForumIcon />}
                selected={selected}
                setSelected={setSelected}
                collapsed={isCollapsed}
              />
            </Box>
          </Menu>
        </ProSidebar>
      </Box>}
    </>
  );
};

export default Sidebar;
