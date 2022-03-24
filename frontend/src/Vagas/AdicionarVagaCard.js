import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import IconButton from '@mui/material/IconButton';

export default function AdicionarVagaCard() {
  return (  
    <>
    <Grid item xs={12} sm={6} md={4}>
        <Card minWidth="50%" style={{ height: '100%', backgroundColor:"#E3C9F8" }} align={"center"}>
          <CardHeader
            title="Adicionar uma vaga"/>
          <IconButton aria-label="Editar vaga">
              <AddCircleOutlineIcon sx={{ fontSize: 150 }} style={{color:"#8D40C9", opacity:0.2}}  />
          </IconButton>
        </Card>
    </Grid>
    </>
  );
}
