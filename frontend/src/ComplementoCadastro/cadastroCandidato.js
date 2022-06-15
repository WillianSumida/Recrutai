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
import 'react-toastify/dist/ReactToastify.min.css';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { style } from '@mui/system';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

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

export default function CadastroCandidato() {
  const [filtro, setFiltro] = useState('');
  const [userGitHub, setUserGitHub] = useState('');
  const navigate = useNavigate();

  const handleSubmitGitHub = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    (async () => {
      setUserGitHub(data.get('portfolio'));
      fetch("http://localhost:8080/listarInfoGit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ portfolio: data.get('portfolio') })
      }).then(function (response) { return response.json(); }).then(function (data) {
        setFiltro({ location: data.location, tag1: data.tag1, tag2: data.tag2, tag3: data.tag3 });
      });
    })();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const Candidato = {
      portfolio: userGitHub,
      localizacao: data.get('localizacao'),
      telefone: data.get('telefone'),
      grau_formacao: data.get('formacao'),
      instituicao_ensino: data.get('instituicao'),
      tag1: data.get('tag1'),
      tag2: data.get('tag2'),
      tag3: data.get('tag3'),
      data: data.get('data'),
      usuario_id: sessionStorage.getItem('usuario'),
    };

    (async () => {
      console.log(Candidato)
      const resposta = await fetch("http://localhost:8080/adicionarCandidato", {
        method: "POST",
        headers: { "content-Type": "application/json", 'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6Miwibm9tZSI6InJlY3J1dGFkb3IiLCJpYXQiOjE2NDkxMTEzMTQsImV4cCI6MTE4NzM2MDE0NjA4MDB9.JmIy-uYFEP9kxNHgphTTG4X-CHhXFPGQSdOIfcASM74' },
        body: JSON.stringify(Candidato)
      });

      var respostaJson = await resposta.json();
      console.log(respostaJson)

      toast.success('Seu cadastro está completo!');
      navigate('/vagasCandidato');
    })();
  }


  return (
    <Grid sx={{ px: 2 }}>
      <ToastContainer></ToastContainer>
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
        <Box onSubmit={handleSubmitGitHub} component="form">
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
        <Box onSubmit={handleSubmit} component="form">
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
            <small>Recomendamos inserir a localização no formato <i>'Cidade - ES'</i></small>
          </Grid>
          <Grid item xs={12} className="mb-3">
            <CssTextField
              name="telefone"
              fullWidth
              required
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
              required
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
              type="date"
              label="Data de Nascimento"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>

          <Box xs={8} textAlign="center">
            <ColorButton fullWidth type='submit' size="large">Salvar</ColorButton>
          </Box>
        </Box>
      </Container >
      <br />
    </Grid>
  );
}