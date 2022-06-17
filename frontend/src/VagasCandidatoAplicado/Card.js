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
import { toast, ToastContainer } from 'react-toastify';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';

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
  if (props.nivel.toUpperCase() === nivel.toUpperCase() ) {
      percent+=1
      sameNivel = "O nivel está compativel"
    }else{
      sameNivel="Nivel nao compativel"
    }
  
  comp= Math.round((percent/(props.vaga.length+1))*100) 
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

function statusVaga(status){
  if (status) return <FavoriteOutlinedIcon id="icon" color="error"></FavoriteOutlinedIcon>
  else return <FavoriteOutlinedIcon id="icon" color="disableed"></FavoriteOutlinedIcon>
}


export default (props) => {
  const listaVagas = useSelector(state => state.vagaRecrutador);
  const dispatch = useDispatch();

  const [showInfo, setShowInfo] = useState(false);
  const handleCloseInfo = () => setShowInfo(false);
  const handleShowInfo = () => setShowInfo(true);

  const [showParticipants, setShowParticipants] = useState(false);
  const handleCloseParticipants = () => setShowParticipants(false);
  const handleShowParticipants = () => setShowParticipants(true);

  var time = new Date(props.vaga.created_at);
  var outraData = time;
  outraData.setHours(time.getHours() - 3);
  return (
    <>
      <ToastContainer></ToastContainer>
      <Card sx={{ minWidth: 275, borderRadius: 3, border: 1 }} style={{ borderColor: '#8D40C9' }}>
        <CardContent>
          <Typography variant="h5" component="div" noWrap={true} style={{ wordWrap: "break-word" }}>
            {props.vaga.cargo.toUpperCase()}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {outraData.toISOString().slice(0,10).replace(/-/g,"-")}
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
            <strong>Localização</strong>: {props.vaga.cidade + " - " + props.vaga.estado}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="Status vaga">
            {statusVaga(props.vaga.devolutiva)}
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
