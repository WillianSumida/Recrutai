import * as React from 'react';
import { useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
//import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
//import Modal from '@mui/material/Modal';
import FormAdicionarVaga from './FormAdicionarVaga';
import { Modal, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

export default function AdicionarVagaCard() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth:'80%',
    maxWidth:'100%',
    maxHeight:'80%',
    overflow:'scroll',
    bgcolor: 'background.paper',
    border: '1px solid #8D40C9',
    boxShadow: 24,
    mx: "auto" ,
    p: 4,
    borderRadius: 2,
    mt:3
  };

  return (  
    <>
    <Grid item xs={12} sm={6} md={4}>
        <Card minWidth="50%" style={{ height: '100%', backgroundColor:"#E3C9F8" }} align={"center"}>
          <CardHeader
            title="Adicionar uma vaga"/>
          <IconButton aria-label="Adicionar vaga">
              <AddCircleOutlineIcon onClick={handleShow} sx={{ fontSize: 150 }} style={{color:"#8D40C9", opacity:0.2}}  />
          </IconButton>
        </Card>
    </Grid>

      <Modal centered={true} show={show} size={'xl'} scrollable={true} onHide={handleClose}>
        <FormAdicionarVaga/>
      </Modal>
    </>
  );
}
