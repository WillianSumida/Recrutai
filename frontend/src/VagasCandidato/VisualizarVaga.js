import * as React from 'react';
import { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { Button, Row, Col, Modal } from 'react-bootstrap';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { useDispatch, useSelector } from 'react-redux';
import { propTypes } from 'react-bootstrap/esm/Image';


const theme = createTheme();


export default function AddVaga(props) {
  const listaVagas = useSelector(state => state.vagaRecrutador);
  const dispatch = useDispatch();
  var nivel = sessionStorage.getItem('nivel');

  
  function verify(tag) {
    var tags = JSON.parse(sessionStorage.getItem('tags'));
    var verify = false;

    tags.forEach(el => {
      if (tag == el) verify = true
    })
    return verify
  }

  function Compatibilidade(props,propsNivel) {
    var tags = JSON.parse(sessionStorage.getItem('tags'));
    var nivel = (sessionStorage.getItem('nivel'));
    var percent = 0;
    props.forEach(element => {
      tags.forEach(el => {
        if (element == el) percent += 1
      })
    });

    if (propsNivel.toUpperCase() === nivel.toUpperCase() ) percent+=1
    
    return Math.round((percent/(props.length+1))*100)
  }

  var time = new Date(props.vaga.created_at);
  var outraData = time;
  outraData.setHours(time.getHours() - 3);
  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col>
            <Typography variant="h5" component="div" style={{ wordWrap: "break-word" }}>
              {props.vaga.cargo.toUpperCase()}
            </Typography>
          </Col>
          <Col>
            <Typography variant="body2" color="text.secondary">
              <Stack direction="row" spacing={1}>

                <Chip variant="outlined" icon={(verify(props.vaga.tag1)) ? <DoneIcon />: <CloseIcon />} color={verify(props.vaga.tag1)? 'success' : 'error'} label={props.vaga.tag1.toUpperCase()} clickable={true} style={{ fontSize: 13,  fontWeight: "bold" }} />
                <Chip variant="outlined" icon={(verify(props.vaga.tag2)) ? <DoneIcon /> : <CloseIcon />} color={verify(props.vaga.tag2)? 'success' : 'error'} label={props.vaga.tag2.toUpperCase()} clickable={true} style={{fontSize: 13, fontWeight: "bold" }} />
                <Chip variant="outlined" icon={(verify(props.vaga.tag3)) ? <DoneIcon /> : <CloseIcon />} color={verify(props.vaga.tag3)? 'success' : 'error'} label={props.vaga.tag3.toUpperCase()} clickable={true} style={{ fontSize: 13, fontWeight: "bold" }} />
              </Stack>
            </Typography>
          </Col>
        </Row>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {outraData.toISOString().slice(0,10).replace(/-/g,"-")}
        </Typography>
        <br />
        <Row>
          <Col>
            <Typography>
              <strong>Salario</strong>: {props.vaga.salario}
            </Typography>
          </Col>
          <Col>
            <Typography>
              <strong>Tipo</strong>: {props.vaga.tipo}
            </Typography>
          </Col>
        </Row>
        <Row>
          <Col>
            <Typography >
              <strong>Vagas</strong>: {props.vaga.quantidade}
            </Typography>
          </Col>
          <Col>
          {
            (nivel.toUpperCase() == props.vaga.nivel.toUpperCase())?
            <Typography>
            <strong>Nível</strong>: <Chip variant="outlined" size='small' color='success' icon={ <DoneIcon/>} label={props.vaga.nivel.toUpperCase()} style={{ fontSize: 13, fontWeight: "bold" }}/>
            </Typography>
            :
            <Typography>
            <strong>Nível</strong>: <Chip variant="outlined" size='small'color='error' icon={<CloseIcon/>} label={props.vaga.nivel.toUpperCase()} style={{ fontSize: 13, fontWeight: "bold" }}/>
          </Typography>
          }

          </Col>
        </Row>

        <Typography paragraph><br />
          <strong>Localização</strong>: {props.vaga.cidade + " - " + props.vaga.estado}
        </Typography>

        <Typography variant="body1" color="text.secondary">
          <Stack spacing={1}>
            <Chip variant='outlined' color='secondary' label={'Compatibilidade ' + Compatibilidade([props.vaga.tag1, props.vaga.tag2, props.vaga.tag3], props.vaga.nivel) + '%'} style={{borderColor: "#8873C1", fontSize: 14, fontWeight: "bold" }}/>
          </Stack>
        </Typography>

        <Typography style={{ wordWrap: "break-word" }} paragraph><br />
          <strong>Descrição</strong>: <br />
          {props.vaga.descricao}
        </Typography>
      </Modal.Body>
    </>
  );
}
