import * as React from 'react';
import { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Button, Form, Row, Col, Modal} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { useDispatch, useSelector } from 'react-redux';


const theme = createTheme();

export default function AddVaga(props) {
  const listaVagas = useSelector(state => state.vagaRecrutador);
  const userAutenticado = useSelector(state => state.user);


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
    console.log(userAutenticado[0])
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
      nivel: data.get('nivel'),
      ativo: 0,
      recrutador_usuario_id: sessionStorage.getItem('usuario'),
    };

    if (props.title == 'Adicionar Vaga'){
      (async() => {
        console.log(Vaga)
        const resposta = await fetch("http://localhost:8080/adicionarVaga", {
          method: "POST",
          headers: {"content-Type": "application/json", 'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6Miwibm9tZSI6InJlY3J1dGFkb3IiLCJpYXQiOjE2NDkxMTEzMTQsImV4cCI6MTE4NzM2MDE0NjA4MDB9.JmIy-uYFEP9kxNHgphTTG4X-CHhXFPGQSdOIfcASM74'},
          body: JSON.stringify(Vaga)
        });
    
        var respostaJson = await resposta.json(); 
        console.log(respostaJson)
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
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Cargo</Form.Label>
            <Form.Control
              type="text"
              placeholder={vaga.cargo}
              name="cargo"
              minLength="2"
              maxLength="100"
              autoFocus
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Descrição da vaga</Form.Label>
            <Form.Control as="textarea" name="descricao" placeholder={vaga.descricao} maxLength="255" rows={3}/>
          </Form.Group>

          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Nível</Form.Label>
                <Form.Select name="nivel" >
                  <option value="estagio" selected>Estagio</option>
                  <option value="junior">Junior</option>
                  <option value="pleno">Pleno</option>
                  <option value="senior">Senior</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Tipo</Form.Label>
                <Form.Select name="tipo" defaultValue={vaga.tipo} >
                  <option value="presencial">Presencial</option>
                  <option value="remoto">Remoto</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </ Row>

          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Habilidade 1</Form.Label>
                <Form.Control type="text" name="tag1" placeholder={vaga.tag1}/>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Habilidade 2</Form.Label>
                <Form.Control type="text"  name="tag2" placeholder={vaga.tag2}/>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Habilidade 3</Form.Label>
                <Form.Control type="text" name="tag3" placeholder={vaga.tag3}/>
              </Form.Group>
            </Col>
          </ Row>

          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Estado</Form.Label>
                <Form.Select name="estado" defaultValue={vaga.estado}>
                {estados.map((estado) => (
                          <option value={estado.sigla}>{estado.nome}</option>
                ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Cidade</Form.Label>
                <Form.Control type="text" name="cidade" placeholder={vaga.cidade} required/>
              </Form.Group>
            </Col>
          </Row>
          
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Salário</Form.Label>
                <Form.Control type="number" step=".01" name="salario" placeholder={vaga.salario} required/>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Quantidade</Form.Label>
                <Form.Control type="number" name="quantidade" placeholder={vaga.quantidade} required/>
              </Form.Group>
            </Col>
          </Row>
          

          <Modal.Footer>
            <Button type='submit' style={{backgroundColor: '#8D40C9' }}>{props.title}</Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </>
  );
}
