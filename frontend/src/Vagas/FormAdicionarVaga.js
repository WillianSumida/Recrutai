import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import styled from "styled-components";
import MenuItem from '@mui/material/MenuItem';


const theme = createTheme();

export default function AddVaga() {
  const estados = [
    { 'value': 'Acre' },
    { 'value': 'Alagoas' },
    { 'value': 'Amapá' },
    { 'value': 'Amazonas' },
    { 'value': 'Bahia' },
    { 'value': 'Ceará' },
    { 'value': 'Distrito Federal' },
    { 'value': 'Espírito Santo' },
    { 'value': 'Goías' },
    { 'value': 'Maranhão' },
    { 'value': 'Mato Grosso' },
    { 'value': 'Mato Grosso do Sul' },
    { 'value': 'Minas Gerais' },
    { 'value': 'Pará' },
    { 'value': 'Paraíba' },
    { 'value': 'Paraná' },
    { 'value': 'Pernambuco' },
    { 'value': 'Piauí' },
    { 'value': 'Rio de Janeiro' },
    { 'value': 'Rio Grande do Norte' },
    { 'value': 'Rio Grande do Sul' },
    { 'value': 'Rondônia' },
    { 'value': 'Roraíma' },
    { 'value': 'Santa Catarina' },
    { 'value': 'São Paulo' },
    { 'value': 'Sergipe' },
    { 'value': 'Tocantins' },
  ];
  






  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    const Usuario = {
      login: data.get('email'),
      nome: data.get('firstName'),
      senha: data.get('senha'),
      recrutador: data.get('tipo'),
    };
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

  return (
    <>
    <ThemeProvider theme={theme}>
      <Container component="main" >
        <Typography  sx={{marginBottom: 3 , color:"#8D40C9"}} id="modal-modal-title" variant="h6" component="h2">
            Adicionar Vaga
        </Typography>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 0,
            p: 'auto',
            m: 'auto',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <CssTextField
              name="cargo"
              required
              fullWidth
              id="cargo"
              label="Cargo"
            />
             <CssTextField
              name="descricao"
              required
              fullWidth
              id="descricao"
              label="Descricao"
              margin="normal"
            />
             <CssTextField
              type='number'
              required
              fullWidth
              id="salario"
              label="Salario"
              margin="normal"
            />
             <CssTextField
              name="tipo"
              required
              fullWidth
              id="tipo"
              label="Tipo"
              margin="normal"
            />

            
             <CssTextField
              name="tag1"
              required
              fullWidth
              id="tag1"
              label="Tag1"
              margin="normal"
            />
             <CssTextField
              name="tag2"
              required
              fullWidth
              id="tag2"
              label="Tag2"
              margin="normal"
            />
             <CssTextField
              name="tag3"
              required
              fullWidth
              id="tag3"
              label="Tag3"
              margin="normal"
            />
              <CssTextField
                  select
                  name="estado"
                  label="Estado *"
                  fullWidth
                  margin="normal"
                >
                {estados.map((estado) => (
                    <MenuItem key={estado.value} value={estado.value}>
                      {estado.value}
                    </MenuItem>
                  ))}
                </CssTextField>

             <CssTextField
              name="cidade"
              required
              fullWidth
              id="cidade"
              label="Cidade "
              margin="normal"
            />
             <CssTextField
              name="quantidade"
              required
              type='number'
              fullWidth
              id="quantidade"
              label="Qtde Vagas "
              margin="normal"
            />

            <ColorButton
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{ mt: 3, mb: 2 }}
            >
              Adicionar Vaga
            </ColorButton>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    </>
  );
}
