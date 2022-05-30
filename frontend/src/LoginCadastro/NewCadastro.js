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
import {Link, useNavigate} from "react-router-dom";
import logo from "../assets/logo1.png"
import background from '../assets/bg.jpg'
import styled from "styled-components";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import 'react-toastify/dist/ReactToastify.min.css';
import { toast, ToastContainer } from 'react-toastify';

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

export default function Cadastro() {
  const navigate = useNavigate()
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    const Usuario = {
      login: data.get('email'),
      nome: data.get('firstName') + ' ' + data.get('Sobrenome'),
      senha: data.get('senha'),
      recrutador: data.get('tipo'),
    };

    if(Usuario.senha == data.get("password") && Usuario.senha.length > 6){
      (async() => {
        const resposta = await fetch("http://localhost:8080/adicionarUsuario", {
          method: "POST",
          headers: {"content-Type": "application/json"},
          body: JSON.stringify(Usuario)
        });
    
        var respostaJson = await resposta.json();
        navigate("/");
      })();
    }
    else {
        toast.error('As senhas não coincidem ou o tamanho da senha está incorreto')
    }
  };

  return (

      <Grid container component="main" sx={{ height: '100vh' }}>
        <ToastContainer></ToastContainer>
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
              my: 4,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: '#F5F5F5',
            }}
          >
            
            <img src={logo} width='40%' height='40%' className='img'/>

          <Typography component="h1" variant="h5" color='#8D40C9'>
            Cadastre-se
          </Typography>
          <Box component="form" onSubmit={handleSubmit} item sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              
            <Grid item xs={12}>

                <CssTextField
                  select
                  name="tipo"
                  label="Eu sou"
                  fullWidth
                  autoFocus
                  defaultValue={0}
                >

                    <MenuItem key="Recrutador" value={1}>
                      Recrutador
                    </MenuItem>
                    <MenuItem key="Candidato" value={0}>
                      Candidato
                    </MenuItem>

                </CssTextField>
            </Grid>

              <Grid item xs={12} sm={6}>
                <CssTextField
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="Primeiro nome"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CssTextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="Sobrenome"
                />
              </Grid>
              <Grid item xs={12}>
                <CssTextField
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  type="email"
                />
              </Grid>
              <Grid item xs={12}>
                <CssTextField
                  required
                  fullWidth
                  name="senha"
                  label="Senha"
                  type="password"
                  id="senha"
                />
              </Grid>
              <Grid item xs={12}>
                <CssTextField
                  required
                  fullWidth
                  name="password"
                  label="Confirmar Senha"
                  type="password"
                  id="password"
                />
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="Eu aceito com os termos de uso"
                />
              </Grid>
            </Grid>
            <ColorButton
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{ mt: 3, mb: 2 }}
            >
              Cadastrar
            </ColorButton>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link1 href="/" variant="body2">
                  Já possui uma conta? Acesse
                </Link1>
              </Grid>
            </Grid>          
          </Box>
          </Box>
        </Grid>
      </Grid>

  );
}