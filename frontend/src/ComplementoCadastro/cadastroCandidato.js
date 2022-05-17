import * as React from 'react';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import styled from "styled-components";
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import Avatar from '@mui/material/Avatar';
import { Form, Row, Col, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import Typography from '@mui/material/Typography';
import 'react-toastify/dist/ReactToastify.min.css';
import { toast, ToastContainer } from 'react-toastify';
import { style } from '@mui/system';

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

//B530B5

const ColorButton = styled(Button)(({ theme }) => ({
  color: "white",
  backgroundColor: "#8D40C9",
  '&:hover': {
    backgroundColor: "#8D40C9",
  },
}));

export default function CadastroCandidato() {
  //let user = {location: ''};
  const [filtro, setFiltro] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget); 

      (async () => {
        fetch("http://localhost:8080/listarInfoGit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({portfolio: data.get('portfolio')})
        }).then(function (response) { return response.json(); }).then(function (data) {
          //user = {location: data.location};
          //console.log(user);
          alert(JSON.stringify(data));

          setFiltro({ location: data.location, tag1: data.tag1, tag2: data.tag2, tag3: data.tag3 });
        });
      })();
  };

  return (
    <Grid sx={{ px: 2 }}>
      <br />
      <Container sx={{ py: 4, border: 1, borderColor: "#8D40C9", borderRadius: '2%' }} style={{ backgroundColor: "#F9EAF9" }}>
        <Box sx={{ mb: 3 }}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Avatar sx={{ width: 100, height: 100, border: 2, borderColor: "white" }} />
        </Box>
        <h2 align="center">Cadastrar Candidato</h2>
        <br></br>

        <Box onSubmit={handleSubmit} component="form">
          <Grid item xs={12} className="mb-3">
            <CssTextField
              name="portfolio"
              fullWidth
              id="portfolio"
              label="Username GitHub"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton type='submit' edge="end" style={{ color: "#8D40C9" }}>
                      <SendIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Box>
        <Grid item xs={12} className="mb-3">
          <CssTextField
            name="localizacao"
            required
            fullWidth
            value={filtro.location}
            id="localizacao"
            label="Localização"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12} className="mb-3">
          <CssTextField
            name="telefone"
            fullWidth
            id="telefone"
            label="Telefone"
          />
        </Grid>
        <Grid item xs={12} className="mb-3">
          <CssTextField
            select
            name="formacao"
            label="Grau de Formação"
            fullWidth
            required
            autoFocus
            defaultValue={"Fundamental Completo"}
          >
            <MenuItem key="FC" value={"Fundamental Completo"}>
              Fundamental Completo
            </MenuItem>
            <MenuItem key="FI" value={"Fundamental Incompleto"}>
              Fundamental Incompleto
            </MenuItem>
            <MenuItem key="MC" value={"Médio Completo"}>
              Médio Completo
            </MenuItem>
            <MenuItem key="MI" value={"Médio Incompleto"}>
              Médio Incompleto
            </MenuItem>
            <MenuItem key="SC" value={"Superior Completo"}>
              Superior Completo
            </MenuItem>
            <MenuItem key="SI" value={"Superior Incompleto"}>
              Superior Incompleto
            </MenuItem>
            <MenuItem key="PC" value={"Pós-Graduação Completa"}>
              Pós-Graduação Completa
            </MenuItem>
            <MenuItem key="PI" value={"Pós-Graduação Incompleta"}>
              Pós-Graduação Incompleta
            </MenuItem>

          </CssTextField>
        </Grid>
        <Grid item xs={12} className="mb-3">
          <CssTextField
            name="instituicao"
            fullWidth
            id="instituicao"
            label="Última Instituição de Ensino"
          />
        </Grid>
        <Row>
          <Col>
            <Grid item xs={12} className="mb-3">
              <CssTextField
                name="tag1"
                fullWidth
                value={filtro.tag1}
                id="tag1"
                label="Habilidade 1"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
          </Col>
          <Col>
            <Grid item xs={12} className="mb-3">
              <CssTextField
                name="tag2"
                fullWidth
                value={filtro.tag2}
                id="tag2"
                label="Habilidade 2"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
          </Col>
          <Col>
            <Grid item xs={12} className="mb-3">
              <CssTextField
                name="tag3"
                fullWidth
                value={filtro.tag3}
                id="tag3"
                label="Habilidade 3"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
          </Col>
        </Row>
        <Grid item xs={12} className="mb-3">
          <CssTextField
            name="data"
            required
            fullWidth
            id="data"
            label="Data de Nascimento"
          />
        </Grid>

        <Box xs={8} textAlign="center">
          <ColorButton fullWidth type='submit' size="large">Salvar</ColorButton>
        </Box>
      </Container >
      <br />
    </Grid>
  );
}