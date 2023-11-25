import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./styles/theme";
import { AuthContext, AuthProvider } from "./utils/authenticationUtil";
import { ReactNotifications } from 'react-notifications-component'
import Topbar from "./views/main/global/Topbar";
import Sidebar from "./views/main/global/Sidebar";
import Index from "./views/main/index";
import Login from "./views/main/login";

function App() {
  const [theme, colorMode] = useMode();

  const Private = ({ children }) => {
    const { authenticated } = useContext(AuthContext);
    if (!authenticated) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  return (
    <AuthProvider>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="app">
            <Sidebar />
            <ReactNotifications />
            <main className="content">
              <Topbar />
              <Routes>
                <Route exact path="/" element={<Private><Index /></Private>} />
                <Route exact path="/login" element={<Login />} />
              </Routes>
            </main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider >
    </AuthProvider>
  );
}

export default App;