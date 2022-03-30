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
          headers: {"content-Type": "application/json", 'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MTYsIm5vbWUiOiJKdWJpbGV1IiwiaWF0IjoxNjQ4NTE1NjEyLCJleHAiOjExODY5MzEyNDA2NDAwfQ.dKgjLPdb2noXxneRKtsVkxJHnafr1PJnKc9Nu7xfL4s'}
      }).then(res=> {
        return res.json();
      }).then(data=>{
        setLista(data);
      })
  }, []);  

  return (  
    <>
        <Container sx={{ py: 8 }}>
            <Grid container spacing={4}>
                <AddVaga></AddVaga>
                {lista.map((vagaObjeto) => (
                  <Card vaga={vagaObjeto}/>
                ))}
            </Grid>
        </Container>
    </>
  );
}
