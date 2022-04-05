import * as React from 'react';
import { useState, useEffect } from 'react';
import Card from "./Card.js";
import AddVaga from "./AdicionarVagaCard";
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

export default function Cards(){
  const [lista, setLista] = useState([]);
  
  useEffect(()=>{
    console.log('entrou');
    fetch("http://localhost:8080/listarVagas", {
          method: "GET",
          headers: {"content-Type": "application/json", 'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6Miwibm9tZSI6InJlY3J1dGFkb3IiLCJpYXQiOjE2NDkxMTEzMTQsImV4cCI6MTE4NzM2MDE0NjA4MDB9.JmIy-uYFEP9kxNHgphTTG4X-CHhXFPGQSdOIfcASM74'}
      }).then(res=> {
        return res.json();
      }).then(data=>{
        setLista(data);
      })
  }, []);  

  return (  
    <>
        <Container sx={{ py: 8 }} >
            <Grid container sx={{mx:'1rem'}}>
                <AddVaga></AddVaga>
                {lista.map((vagaObjeto) => (
                  <Grid item xs={12} sm={6} md={4} sx={{mb:'2rem'}} >
                    <Card vaga={vagaObjeto}/>
                  </Grid>
                ))}
            </Grid>
        </Container>
    </>
  );
}
