import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link1 from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Link} from "react-router-dom";
import logo from "../assets/logo1.png"
import background from "../assets/bg1.jpg"
import styled from "styled-components";

function Copyright() {
  return (
    <Typography variant="body2" color="text.primary" align="center" sx={{ mt: 5 }}>
      {'Copyright © '}
      <Link1 color="inherit" href="">
        Recrutai
      </Link1>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: '#8D40C9',
  },
  '& .MuiInput-underline:after': {
    color: '#8D40C9',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#8D40C9',
    },
    '&:hover fieldset': {
      borderColor: '#8D40C9',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#8D40C9',
    },
  },
});

const ColorButton = styled(Button)(({ theme }) => ({
  color: "white",
  backgroundColor: "#8D40C9",
  '&:hover': {
    backgroundColor: "#8D40C9",
  },
}));




export default function SignInSide() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    const Usuario = {
      login: data.get('email'),
      senha: data.get('senha'),
    };

    (async() => {
      const resposta = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {"content-Type": "application/json"},
        body: JSON.stringify(Usuario)
      });
  
      var respostaJson = await resposta.json();
      console.log(respostaJson)
    })();
  };

  return (
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${background})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square sx={{backgroundColor: '#F5F5F5'}}>
          <Box
            sx={{
              my: 6,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: '#F5F5F5',
            }}
          >
            <img src={logo} width='40%' height='40%' className='img'/>

            <Typography component="h1" variant="h5" color='#8D40C9'>
              Acesse sua conta
            </Typography>
            <Box component="form" onSubmit={handleSubmit}  sx={{ mt: 1 }}>
              <CssTextField
                margin="normal"
                required
                fullWidth
                id="login"
                type="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <CssTextField
                margin="normal"
                required
                fullWidth
                name="senha"
                label="Senha"
                type="password"
                id="senha"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Lembre-me"
              />
              <ColorButton
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                sx={{ mt: 3, mb: 2 }}
              >
                Acessar
              </ColorButton>
              <Grid container>
                <Grid item>
                  <Link1 href="/newcadastro" variant="body2">
                    {"Não possui uma conta? Cadastre-se"}
                  </Link1>
                </Grid>
              </Grid>
              <Copyright />
            </Box>
          </Box>
        </Grid>
      </Grid>
  );
}