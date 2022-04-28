import * as React from 'react';
import { useState, useEffect } from 'react';
import Card from "./Card.js";
import AddVaga from "./AdicionarVagaCard";
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



export default function Cards(){
  var listaVagas = useSelector(state => state.vagaRecrutador);
/*   const listaVagasFiltrada = listaVagas.flatMap(vaga => {
    return vaga.cargo != "aaaaa" [] : [vaga];
  });
  console.log(JSON.stringify(listaVagasFiltrada));*/
  const [filtro, setFiltro] = useState("")
  const dispatch = useDispatch();

/*   useEffect(()=>{
    fetch("http://localhost:8080/listarVagas", {
          method: "GET",
          headers: {"content-Type": "application/json", 'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6Miwibm9tZSI6InJlY3J1dGFkb3IiLCJpYXQiOjE2NDkxMTEzMTQsImV4cCI6MTE4NzM2MDE0NjA4MDB9.JmIy-uYFEP9kxNHgphTTG4X-CHhXFPGQSdOIfcASM74'}
      }).then(res=> {
        return res.json();
      }).then(data=>{
        data.mensagem.map((vagaObjeto) => dispatch({type:'AddVagaRecrutador', vaga: vagaObjeto}));
      })
  }, []);   */

/*   const onHandle = (event) => {
    event.preventDefault();
    console.log(event.currentTarget);
    const data = new FormData(event.currentTarget);
    setFiltro(data.get('filtro'))

    //dispatch({type:'FiltrarVagaRecrutador', cargo: data.get('filtro')});      
  } */

  listaVagas = [
    { id:1 , cargo: 'cargoasdasd12345678901234567890123456' , descricao:'asdsagdasyudgsauygdasugdsaiuhdasuihdasigdasgdahgdsagdjghash' , salario:1100 , tipo: 'remoto', tag1: 'java', tag2: 'kotlin', tag3: 'php', cidade:'sao carlos' , estado: 'sp', ativo: true, quantidade: 1, recrutador_usuario_id: 1},
    { id:2 , cargo: 'cargo2' , descricao:'descricao1' , salario:1100 , tipo: 'remoto', tag1: 'java', tag2: 'kotlin', tag3: 'php', cidade:'sao carlos' , estado: 'sp', ativo: true, quantidade: 1, recrutador_usuario_id: 1},
    { id:3 , cargo: 'cargo3' , descricao:'descricao2' , salario:1100 , tipo: 'remoto', tag1: 'java', tag2: 'kotlin', tag3: 'php', cidade:'sao carlos' , estado: 'sp', ativo: true, quantidade: 1, recrutador_usuario_id: 1},
  ]

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
  
  return (  
    <>
      <Navbar></Navbar>
        <Container sx={{ py: 4 }}>
          <Box onSubmit={''} component="form">
            <CssTextField
              label="TextField"
              fullWidth
              name="filtro"
              className='SearchBar'
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
          </Box>
          <br></br>

          <Grid container spacing={4}>
            <Grid item xs={12} md={4} sm={6}>
              <AddVaga></AddVaga>
            </Grid>
            {(filtro==="" || filtro===null) ? 
              (listaVagas.map((vagaObjeto) => (
                <Grid item xs={12} md={4} sm={6} key={vagaObjeto.cargo}>
                  <Card vaga={vagaObjeto}/>
                </Grid>
              ))) : 
              (
                (listaVagas.filter(obj => obj.cargo === filtro).map((vagaObjeto) => (
                  <Grid item xs={12} sm={6} md={4} sx={{mb:'2rem'}} >
                    <Card vaga={vagaObjeto}/>
                  </Grid>
                )))
              )
            }
          </Grid>
        </Container>
        <Navbar></Navbar>
    </>
  );
}
