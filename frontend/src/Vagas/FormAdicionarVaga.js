import * as React from 'react';
import { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Button, Form, Row, Col, Modal} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';


const theme = createTheme();

export default function AddVaga() {
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
      ativo: true,
      recrutador_usuario_id: 2
    };

    (async() => {
      const resposta = await fetch("http://localhost:8080/adicionarVaga", {
        method: "POST",
        headers: {"content-Type": "application/json", 'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6Miwibm9tZSI6InJlY3J1dGFkb3IiLCJpYXQiOjE2NDg3NjE5MzgsImV4cCI6MTE4NzEwODU5NTM2MDB9.AK-DuxJMfresK2rPYRAO9_zfhkUEVhHtYMa4KisL1lk'},
        body: JSON.stringify(Vaga)
      });
  
      var respostaJson = await resposta.json(); 
    
    })();

    
  }


  return (
    <>
      <Modal.Header closeButton>
          <Modal.Title>Adicionar Vaga</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Cargo</Form.Label>
            <Form.Control
              type="text"
              placeholder="Cargo"
              name="cargo"
              minLength="2"
              maxLength="100"
              autoFocus
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Descrição da vaga</Form.Label>
            <Form.Control as="textarea" name="descricao" placeholder='Essa vaga possui...' maxLength="255" rows={3}/>
          </Form.Group>

          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Salário</Form.Label>
                <Form.Control type="number" step=".01" name="salario" placeholder='0,00' required/>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Tipo</Form.Label>
                <Form.Select name="tipo" >
                  <option selected value="presencial">Presencial</option>
                  <option value="remoto">Remoto</option>
                </Form.Select>
              </Form.Group>
              </Col>
          </ Row>

          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Habilidade 1</Form.Label>
                <Form.Control type="text" name="tag1" placeholder='Java'/>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Habilidade 2</Form.Label>
                <Form.Control type="text" name="tag2" placeholder='C#'/>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Habilidade 3</Form.Label>
                <Form.Control type="text" name="tag3" placeholder='SQL'/>
              </Form.Group>
            </Col>
          </ Row>

          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Estado</Form.Label>
                <Form.Select name="estado" >
                {estados.map((estado) => (
                          <option value={estado.sigla}>{estado.nome}</option>
                ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Cidade</Form.Label>
                <Form.Control type="text" name="cidade" placeholder='São Carlos' required/>
              </Form.Group>
            </Col>
          </Row>
          
          <Form.Group className="mb-3">
            <Form.Label>Quantidade</Form.Label>
            <Form.Control type="number" name="quantidade" placeholder='10' required/>
          </Form.Group>

          <Modal.Footer>
            <Button type='submit' style={{backgroundColor: '#8D40C9' }}>Adicionar vaga!</Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </>
  );
}
