import * as React from 'react';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FormatListBulletedIcon from '@mui/icons-material/Info';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import {Row, Col} from 'react-bootstrap';
import FormAdicionarVaga from './FormAdicionarVaga';
import VisualizarVaga from './VisualizarVaga';
import { Modal, Button} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import Participants from './Participants';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));


export default (props) => {
  const listaVagas = useSelector(state => state.vagaRecrutador);
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showInfo, setShowInfo] = useState(false);
  const handleCloseInfo = () => setShowInfo(false);
  const handleShowInfo = () => setShowInfo(true);

  const [showParticipants, setShowParticipants] = useState(false);
  const handleCloseParticipants = () => setShowParticipants(false);
  const handleShowParticipants = () => setShowParticipants(true);

  function deletarVaga(){
    (async() => {
      const resposta = await fetch("http://localhost:8080/excluirVaga/"+props.vaga.id, {
        method: "DELETE",
        headers: {"content-Type": "application/json", 'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6Miwibm9tZSI6InJlY3J1dGFkb3IiLCJpYXQiOjE2NDg2NzcyNzgsImV4cCI6MTE4NzA0NzY0MDE2MDB9.oo_v_YWaa-rLd3Ag7zqbE5sRWaxFq9Ru6u_uEl7SKgY'},
      });
      console.log('entre no delete');
      var respostaJson = await resposta.json(); 
      await dispatch({type:'DeleteVagaRecrutador', vaga: props.vaga})
    })();
  };

  return (  
    <>
    <Card sx={{ minWidth: 275, borderRadius: 3 , border: 1 }} style={{borderColor: '#8D40C9'}}>
      <CardContent>
        <Typography variant="h5" component="div" noWrap={true} style={{wordWrap: "break-word"}}>
          {props.vaga.cargo.toUpperCase()}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {new Date(props.vaga.created_at).toISOString().slice(0,10).replace(/-/g,"-")}
        </Typography>
        <Typography variant="body2" color="text.secondary">
            <Stack direction="row" spacing={1}>
              <Chip label={props.vaga.tag1.toUpperCase()}  />
              <Chip label={props.vaga.tag2.toUpperCase()}  />
              <Chip label={props.vaga.tag3.toUpperCase()}  />
            </Stack>
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
            </CardContent>
      <CardActions disableSpacing>
            <IconButton aria-label="Remover vaga" onClick={deletarVaga}>
              <DeleteIcon />
            </IconButton>
            <IconButton aria-label="Editar vaga" onClick={handleShow}>
              <EditIcon />
            </IconButton>
            <IconButton aria-label="Visualizar candidatos" onClick={handleShowParticipants}>
              <PersonSearchIcon />
            </IconButton>
            <ExpandMore aria-label="Visualizar vaga" onClick={handleShowInfo}>
              <FormatListBulletedIcon   />
            </ExpandMore>
          </CardActions>
    </Card>

      <Modal centered={true} show={show} size={'xl'} scrollable={true} onHide={handleClose}>
        <FormAdicionarVaga title='Alterar Vaga' vaga={props.vaga}/>
      </Modal>

      <Modal centered={true} show={showInfo} size={'md'} scrollable={true} onHide={handleCloseInfo}>
        <VisualizarVaga title='Visualizar' vaga={props.vaga}/>
      </Modal>

      <Modal centered={true} show={showParticipants} size={'xl'} scrollable={true} onHide={handleCloseParticipants}>
        <Participants title='Tabela'/>
      </Modal>

    </>
  );
}
