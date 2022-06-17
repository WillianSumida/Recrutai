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
import { Link } from "react-router-dom";
import logo from "../assets/logo1.png"
import background from "../assets/bg1.jpg"
import styled from "styled-components";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { Toast } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';

function Copyright() {
  return (
    <Typography variant="body2" color="text.primary" align="center" sx={{ mt: 5 }}>
      {'Copyright © '}
      <Link1 color="inherit" href="">
        Recruta+
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
  var userAutenticado = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    const Usuario = {
      login: data.get('email'),
      senha: data.get('senha'),
    };
    var resultado = '';

    (async () => {
      const resposta = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: { "content-Type": "application/json" },
        body: JSON.stringify(Usuario)
      }).then(res => {
        if (res.status == 200) {
          return res.json();
        }
        else{
          return {error: true}
        }
      }).then(response => {
        if(response.error != true){
          if(response.recrutador == 1){
            const Recrutador = {
              usuario_id: response.id,
              empresa: 'Empresa',
              cargo: 'Recrutador',
            };

            fetch("http://localhost:8080/adicionarRecrutador", {
              method: "POST",
              headers: {"content-Type": "application/json"},
              body: JSON.stringify(Recrutador)
            }).then(res => {
                return res.json();
            }).then(response => {
              if (!response.error) {
                sessionStorage.setItem('usuario', response.recrutador)
                navigate("/cards");
              }
              else toast.error('Login não realizado');
            })
          }
          else{ //Candidato
            sessionStorage.setItem('usuario', response.id);

            if(response.verificado == 0){
               navigate('/cadastrarCandidato');
            }
            else{
              fetch("http://localhost:8080/listarUmCandidato/" + sessionStorage.getItem('usuario'), {
                method: "GET",
                headers: {"content-Type": "application/json", 'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6Miwibm9tZSI6InJlY3J1dGFkb3IiLCJpYXQiOjE2NDkxMTEzMTQsImV4cCI6MTE4NzM2MDE0NjA4MDB9.JmIy-uYFEP9kxNHgphTTG4X-CHhXFPGQSdOIfcASM74'},
              }).then(res => {
                return res.json();
              }).then(response => {
                if (!response.error) {
                  sessionStorage.setItem('tags',(JSON.stringify([response.mensagem.tag1,response.mensagem.tag2, response.mensagem.tag3])))
                  sessionStorage.setItem('nivel', response.mensagem.nivel);
                  navigate('/vagasCandidato');
                }
                else toast.error('Login não realizado');
              })
            }
          }
        }
        else toast.error('Login nao realizado');

      });
    })();

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
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square sx={{ backgroundColor: '#F5F5F5' }}>
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
          <img src={logo} width='40%' height='40%' className='img' />

          <Typography component="h1" variant="h5" color='#8D40C9'>
            Acesse sua conta
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
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