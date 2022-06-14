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
import { Row, Col } from 'react-bootstrap';
import VisualizarVaga from './VisualizarVaga';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import DoneIcon from '@mui/icons-material/Done';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Badge from '@mui/material/Badge';

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

var comp
var sameNivel
function Compatibilidade(props) {
  var tags = JSON.parse(sessionStorage.getItem('tags'));
  var nivel = (sessionStorage.getItem('nivel'));
  var percent = 0;
  props.vaga.forEach(element => {
    tags.forEach(el => {
      if (element == el) percent += 1
    })
  });

  sameNivel = '';
  if (props.vaga.nivel === nivel) {
      percent+=1
      sameNivel = "O nivel está compativel"
    }else{
      sameNivel="Nivel nao compativel"
    }

  comp= Math.round((percent/(props.vaga.length+1))*100)
  //console.log(JSON.parse(tags).tag1)  
  return (
    <>
      <Typography variant="body1" color="text.secondary">
      <Stack spacing={1}>



          <Chip  color="secondary" label={'Compatibilidade ' + comp+ '%'} />
        </Stack>
      </Typography>
    </>
  );
}


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

  function deletarVaga() {
    (async () => {
      const resposta = await fetch("http://localhost:8080/excluirVaga/" + props.vaga.id, {
        method: "DELETE",
        headers: { "content-Type": "application/json", 'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6Miwibm9tZSI6InJlY3J1dGFkb3IiLCJpYXQiOjE2NDg2NzcyNzgsImV4cCI6MTE4NzA0NzY0MDE2MDB9.oo_v_YWaa-rLd3Ag7zqbE5sRWaxFq9Ru6u_uEl7SKgY' },
      });
      console.log('entre no delete');
      var respostaJson = await resposta.json();
      await dispatch({ type: 'DeleteVagaRecrutador', vaga: props.vaga })
    })();

  };

  return (
    <>
      <Card sx={{ minWidth: 275, borderRadius: 3, border: 1 }} style={{ borderColor: '#8D40C9' }}>
        <CardContent>
          <Typography variant="h5" component="div" noWrap={true} style={{ wordWrap: "break-word" }}>
            {props.vaga.cargo.toUpperCase()}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            13 de Março de 2027
          </Typography>
          <Compatibilidade vaga={[props.vaga.tag1, props.vaga.tag2, props.vaga.tag3]} nivel={props.vaga.nivel} /><br></br>
          <Typography variant="body2" color="text.secondary">
            <Stack direction="row" spacing={1}>
              <Chip label={props.vaga.tag1.toUpperCase()} />
              <Chip label={props.vaga.tag2.toUpperCase()} />
              <Chip label={props.vaga.tag3.toUpperCase()} />
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
          <Typography paragraph><br />
            <strong>Localização</strong>: {props.vaga.estado + " - " + props.vaga.cidade}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="Remover vaga" onClick={deletarVaga}>
            <DoneIcon />
          </IconButton>
          <IconButton aria-label="Editar vaga" onClick={handleShow}>
            <FavoriteIcon />
          </IconButton>
{/*           <IconButton aria-label="Visualizar candidatos" onClick={handleShowParticipants}>
            <PersonSearchIcon />
          </IconButton> */}
          <ExpandMore aria-label="Visualizar vaga" onClick={handleShowInfo}>
            <FormatListBulletedIcon />
          </ExpandMore>
        </CardActions>
      </Card>

      <Modal centered={true} show={showInfo} size={'md'} scrollable={true} onHide={handleCloseInfo}>
        <VisualizarVaga title='Visualizar' vaga={props.vaga} compat={comp}/>
      </Modal>
    </>
  );
}
