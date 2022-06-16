import * as React from 'react';
import { useState, useEffect } from 'react';
import Card from "./Card.js";
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { useDispatch, useSelector } from 'react-redux';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import styled from "styled-components";
import Navbar from "../Navbar/Navbar";
import MenuItem from '@mui/material/MenuItem';
import {Row, Col} from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import Footer from "../Footer/Footer";

export default function CardsCandidato(){
  const navigate = useNavigate()
  const [filtro, setFiltro] = useState("")
  const [tipoBusca, setTipoBusca] = useState("")
  const dispatch = useDispatch();
  var listaVagas = useSelector(state => state.vagaRecrutador)
  var user = useSelector(state => state.user)

  useEffect(()=>{
    fetch("http://localhost:8080/listarVagas", {
          method: "GET",
          headers: {"content-Type": "application/json", 'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6Miwibm9tZSI6InJlY3J1dGFkb3IiLCJpYXQiOjE2NDkxMTEzMTQsImV4cCI6MTE4NzM2MDE0NjA4MDB9.JmIy-uYFEP9kxNHgphTTG4X-CHhXFPGQSdOIfcASM74'}
      }).then(res=> {
        return res.json();
      }).then(data=>{
        console.log(data);
        data.mensagem.map((vagaObjeto) => dispatch({type:'AddVagaRecrutador', vaga: vagaObjeto}));
      })
  }, []);

  const onHandle = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setTipoBusca(data.get('tipo'))
    setFiltro(data.get('filtro').toUpperCase())
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

  function trataTipoBusca(){

    var a;

    if(tipoBusca === "Cargo"){ 
      a = listaVagas.filter(obj => obj.cargo.toUpperCase() === filtro);
      return a;
    }

    if(tipoBusca === "Habilidade") return listaVagas.filter(obj => obj.tag1.toUpperCase() === filtro || obj.tag2.toUpperCase() === filtro || obj.tag3.toUpperCase() === filtro)

    if(tipoBusca === "Nivel") return listaVagas.filter(obj => obj.nivel.toUpperCase() === filtro)
  }

  return (  
    <>
      <Navbar></Navbar>
        <ToastContainer></ToastContainer>
        <Container sx={{ py: 4 }}>
          <Box onSubmit={onHandle} component="form">
            <Row>
              <Col>
              <CssTextField
                select
                name="tipo"
                fullWidth
                label="Filtrar por"
                autoFocus
                defaultValue={"Cargo"}
              >

              <MenuItem key="Cargo" value="Cargo">
                Cargo
              </MenuItem>
              <MenuItem key="Habilidade" value="Habilidade">
                Habilidade
              </MenuItem>
              <MenuItem key="Nivel" value="Nivel">
                Nível
              </MenuItem>
              </CssTextField>
              </Col>
              <Col xs={9}>
              <CssTextField
                label="Filtrar Vagas"
                name="filtro"
                className='SearchBar'
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton type='submit' edge="end" style={{color:"#8D40C9"}}>
                        <SearchIcon/>
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              </Col>
            </Row>
          </Box>
          <br></br>

          <Grid container spacing={4}>
            {(filtro==="" || filtro===null && listaVagas  != null) ? 
              (listaVagas?.map((vagaObjeto) => (
                <Grid item xs={12} md={4} sm={6} key={vagaObjeto.id}>
                  <Card vaga={vagaObjeto}/>
                </Grid>
              ))) : 
              (
                (trataTipoBusca().map((vagaObjeto) => (
                  <Grid item xs={12} sm={6} md={4} key={vagaObjeto.id} >
                    <Card vaga={vagaObjeto}/>
                  </Grid>
                )))
              )
            }
          </Grid>
        </Container>
      <Footer></Footer>
    </>
  );
}
