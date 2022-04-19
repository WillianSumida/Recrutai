import * as React from 'react';
import { useState, useEffect } from 'react';
import Card from "./Card.js";
import AddVaga from "./AdicionarVagaCard";
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import { css } from '@emotion/react';

export default function Cards(){
  var listaVagas = useSelector(state => state.vagaRecrutador);
/*   const listaVagasFiltrada = listaVagas.flatMap(vaga => {
    return vaga.cargo != "aaaaa" [] : [vaga];
  });
  console.log(JSON.stringify(listaVagasFiltrada));*/
  const dispatch = useDispatch();
  const [filtro, setFiltro] = useState("");

  useEffect(()=>{
    fetch("http://localhost:8080/listarVagas", {
          method: "GET",
          headers: {"content-Type": "application/json", 'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6Miwibm9tZSI6InJlY3J1dGFkb3IiLCJpYXQiOjE2NDkxMTEzMTQsImV4cCI6MTE4NzM2MDE0NjA4MDB9.JmIy-uYFEP9kxNHgphTTG4X-CHhXFPGQSdOIfcASM74'}
      }).then(res=> {
        return res.json();
      }).then(data=>{
        data.map((vagaObjeto) => dispatch({type:'AddVagaRecrutador', vaga: vagaObjeto}));
      })
  }, []);  

  const onHandle = (event) => {
      console.log("aaaaaaaaaaaaaaaaaaaaa");
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      listaVagas = listaVagas.filter(vaga => vaga.cargo == "estagio4545");
      console.log(JSON.stringify(listaVagas));
  };

  return (  
    <>
        <Container sx={{ py: 8 }} >

          <form onSubmit={onHandle}>
            <input type="text" class="form-control" name="filtro"/>
            <div class="input-group-append">
              <button class="btn btn-outline-primary" type="submit">Buscar</button>
            </div>
          </form>

          <Grid container sx={{mx:'1rem'}}>
            <AddVaga></AddVaga>
            {listaVagas.map((vagaObjeto) => (
              <Grid item xs={12} sm={6} md={4} sx={{mb:'2rem'}} >
                <Card vaga={vagaObjeto}/>
              </Grid>
            ))}
          </Grid>

        </Container>
    </>
  );
}
