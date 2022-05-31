import * as React from 'react';
import { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { Button, Row, Col, Modal} from 'react-bootstrap';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import DoneIcon from '@mui/icons-material/Done';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { useDispatch, useSelector } from 'react-redux';


const theme = createTheme();

export default function AddVaga(props) {
  const listaVagas = useSelector(state => state.vagaRecrutador);
  const dispatch = useDispatch();

  const estados = [
    {"nome": "Acre", "sigla": "AC"},
    {"nome": "Alagoas", "sigla": "AL"},
    {"nome": "Amapá", "sigla": "AP"},
    {"nome": "Amazonas", "sigla": "AM"},
    {"nome": "Bahia", "sigla": "BA"},
    {"nome": "Ceará", "sigla": "CE"},
    {"nome": "Distrito Federal", "sigla": "DF"},
    {"nome": "Espírito Santo", "sigla": "ES"},
    {"nome": "Goiás", "sigla": "GO"},
    {"nome": "Maranhão", "sigla": "MA"},
    {"nome": "Mato Grosso", "sigla": "MT"},
    {"nome": "Mato Grosso do Sul", "sigla": "MS"},
    {"nome": "Minas Gerais", "sigla": "MG"},
    {"nome": "Pará", "sigla": "PA"},
    {"nome": "Paraíba", "sigla": "PB"},
    {"nome": "Paraná", "sigla": "PR"},
    {"nome": "Pernambuco", "sigla": "PE"},
    {"nome": "Piauí", "sigla": "PI"},
    {"nome": "Rio de Janeiro", "sigla": "RJ"},
    {"nome": "Rio Grande do Norte", "sigla": "RN"},
    {"nome": "Rio Grande do Sul", "sigla": "RS"},
    {"nome": "Rondônia", "sigla": "RO"},
    {"nome": "Roraima", "sigla": "RR"},
    {"nome": "Santa Catarina", "sigla": "SC"},
    {"nome": "São Paulo", "sigla": "SP"},
    {"nome": "Sergipe", "sigla": "SE"},
    {"nome": "Tocantins", "sigla": "TO"}
  ];

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    const Vaga = {
      cargo: data.get('cargo'),
      descricao: data.get('descricao'),
      salario: data.get('salario'),
      tipo: data.get('tipo'),
      tag1: data.get('tag1'),
      tag2: data.get('tag2'),
      tag3: data.get('tag3'),
      cidade: data.get('cidade'),
      estado: data.get('estado'),
      quantidade: data.get('quantidade'),
      //nivel: data.get('nivel'),
      ativo: 0,
      recrutador_usuario_id: 16
    };

    if (props.title == 'Adicionar Vaga'){
      (async() => {
        const resposta = await fetch("http://localhost:8080/adicionarVaga", {
          method: "POST",
          headers: {"content-Type": "application/json", 'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6Miwibm9tZSI6InJlY3J1dGFkb3IiLCJpYXQiOjE2NDkxMTEzMTQsImV4cCI6MTE4NzM2MDE0NjA4MDB9.JmIy-uYFEP9kxNHgphTTG4X-CHhXFPGQSdOIfcASM74'},
          body: JSON.stringify(Vaga)
        });
    
        var respostaJson = await resposta.json(); 
        await dispatch({type:'AddVagaRecrutador', vaga: Vaga})
      
      })();
    }else{
        Vaga.id = props.vaga.id;
        console.log(Vaga.id);
        (async() => {
          const resposta = await fetch("http://localhost:8080/alterarVaga", {
            method: "PUT",
            headers: {"content-Type": "application/json", 'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6Miwibm9tZSI6InJlY3J1dGFkb3IiLCJpYXQiOjE2NDkxMTEzMTQsImV4cCI6MTE4NzM2MDE0NjA4MDB9.JmIy-uYFEP9kxNHgphTTG4X-CHhXFPGQSdOIfcASM74'},
            body: JSON.stringify(Vaga)
          });
          var respostaJson = await resposta.json(); 
          console.log(resposta);
          await dispatch({type:'UpdateVagaRecrutador', vaga: Vaga})
      })();
    }

  }

  const vaga ={};
  if (props.title === 'Adicionar Vaga'){
      vaga.cargo = 'cargo';
      //props.vaga.nivel = '';
      vaga.descricao = 'Essa vaga é ...';
      vaga.salario = '0,00';
      vaga.tipo = '';
      vaga.tag1 = 'Java';
      vaga.tag2 = 'C#';
      vaga.tag3 = 'PHP';
      vaga.cidade = 'São Carlos';
      vaga.estado = '';
      vaga.quantidade = '10';
  }else{
      vaga.cargo = props.vaga.cargo;
      //props.vaga.nivel = '';
      vaga.descricao = props.vaga.descricao;
      vaga.salario = props.vaga.salario;
      vaga.tipo = props.vaga.tipo;
      vaga.tag1 =props.vaga.tag1;
      vaga.tag2 = props.vaga.tag2;
      vaga.tag3 = props.vaga.tag3;
      vaga.cidade = props.vaga.cidade;
      vaga.estado = props.vaga.estado;
      vaga.quantidade = props.vaga.quantidade;
  }

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
              <Chip variant="outlined" icon={<DoneIcon />} label={props.vaga.tag1.toUpperCase()} clickable={true} style={{fontSize: 13, borderColor:"#9D73C1", fontWeight: "bold"}}/>
              <Chip variant="outlined"  icon={<DoneIcon />} label={props.vaga.tag2.toUpperCase()} clickable={true} style={{borderColor:"#8873C1", fontSize: 13, fontWeight: "bold"}}/>
              <Chip variant="outlined"  icon={<DoneIcon />} label={props.vaga.tag3.toUpperCase()} clickable={true} style={{borderColor:"#7378C1", fontSize: 13, fontWeight: "bold"}}/>
            </Stack>
        </Typography>
            </Col>
        </Row>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          13 de Março de 2027
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
                <Typography>
                <strong>Nível</strong>: {props.vaga.nivel}
                </Typography>
              </Col>
            </Row>

              <Typography paragraph><br/>
                <strong>Localização</strong>: {props.vaga.estado + " - " + props.vaga.cidade }
              </Typography>

              <Typography style={{ wordWrap: "break-word" }} paragraph><br/>
                <strong>Descrição</strong>: <br />
                 {props.vaga.descricao}
              </Typography>
      </Modal.Body>
    </>
  );
}
