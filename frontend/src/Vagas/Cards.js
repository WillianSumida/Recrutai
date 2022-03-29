import * as React from 'react';
import { useState } from 'react';
import Card from "./Card.js";
import AddVaga from "./AdicionarVagaCard";
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

export default function Cards(){

  return (  
    <>
        <Container sx={{ py: 8 }}>
            <Grid container spacing={4}>
                <AddVaga></AddVaga>
                <Card></Card>
                <Card></Card>
                <Card></Card>
                <Card></Card>
                <Card></Card>
                <Card></Card>
                <Card></Card>
            </Grid>
        </Container>
    </>
  );
}
