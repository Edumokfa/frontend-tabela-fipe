import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from "../../utils/authenticationUtil";
import { TextField, Button, IconButton, Grid, Box, InputAdornment } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import LockOutlined from "@mui/icons-material/LockOutlined";
import Logo from '../../assets/images/logo.png';
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useContext(AuthContext);

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  useEffect(() => {
   localStorage.removeItem("access_token");
  }, []);

  const handleSubmit = (values) => {
    const { user, password } = values;
    login(user, password);
  };

  const initialValues = {
    user: "",
    password: "",
  };

  const checkoutSchema = yup.object().shape({
    password: yup.string().required("Obrigatório"),
    user: yup.string().required("Obrigatório"),
  });


  return (<>
    <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Box sx={{
          p: 3, boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)', borderRadius: '5px', '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.2)',
          },
          transition: 'all 0.3s ease',
        }}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <img src={Logo} alt="Logo" style={{ height: '25vh' }} />
          </Box>

          <br />

          <Formik
            onSubmit={handleSubmit}
            initialValues={initialValues}
            validationSchema={checkoutSchema}
          >
            {({
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              handleSubmit,
            }) => (
              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Usuário"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.user}
                  name="user"
                  error={!!touched.user && !!errors.user}
                  helperText={touched.user && errors.user}
                  sx={{ width: '100%' }}
                />

                <TextField
                  label="Senha"
                  variant="filled"
                  margin="normal"
                  fullWidth
                  type={showPassword ? "text" : "password"}
                  sx={{ width: '100%' }}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  name="password"
                  error={!!touched.password && !!errors.password}
                  helperText={touched.password && errors.password}
                  autoComplete="off"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt: 2, mb: 1, height: '50px' }}
                  startIcon={<LockOutlined />}
                >
                  Entrar
                </Button>
              </form>
            )}
          </Formik>
        </Box>
      </Grid>
    </Grid>
  </>
  );
};

export default Login;
