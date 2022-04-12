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
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Badge from '@mui/material/Badge';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import {Row, Col} from 'react-bootstrap';
import FormAdicionarVaga from './FormAdicionarVaga';
import { Modal, Button} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

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

  const [expanded, setExpanded] = React.useState(false);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  function deletarVaga(){
    (async() => {
      const resposta = await fetch("http://localhost:8080/excluirVaga/"+props.vaga.id, {
        method: "DELETE",
        headers: {"content-Type": "application/json", 'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6Miwibm9tZSI6InJlY3J1dGFkb3IiLCJpYXQiOjE2NDg2NzcyNzgsImV4cCI6MTE4NzA0NzY0MDE2MDB9.oo_v_YWaa-rLd3Ag7zqbE5sRWaxFq9Ru6u_uEl7SKgY'},
      });
      console.log('entre no delete');
      var respostaJson = await resposta.json(); 
    })();
  };

  return (  
    <>
      <Badge color="warning" large badgeContent={props.vaga.quantidade}>
        <Card sx={{maxWidth:'21rem', minWidth:'21rem', minHeight:'14.5rem'}}>
          <CardHeader
            action={<IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>}
            title={props.vaga.cargo.toUpperCase()}
            subheader= 'Março, 03, 2022'/>
              
          <CardContent>
            <Typography variant="body2" color="text.secondary">
            <Stack direction="row" spacing={1}>
              <Chip label={props.vaga.tag1.toUpperCase()} clickable={true} />
              <Chip label={props.vaga.tag2.toUpperCase()} clickable={true} />
              <Chip label={props.vaga.tag3.toUpperCase()} clickable={true} />
            </Stack>
            </Typography><br></br>

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
                <strong>Nível</strong>: 'Pleno'
                </Typography>
              </Col>
            </Row>

              <Typography paragraph><br/>
                <strong>Localização</strong>: {props.vaga.estado + " - " + props.vaga.cidade }
              </Typography>
            </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="Remover vaga">
              <DeleteIcon onClick={deletarVaga}/>
            </IconButton>
            <IconButton aria-label="Editar vaga">
              <EditIcon onClick={handleShow}/>
            </IconButton>
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph>
                {props.vaga.descricao}
              </Typography>
            </CardContent>
          </Collapse>
        </Card>
      </Badge>

      <Modal centered={true} show={show} size={'xl'} scrollable={true} onHide={handleClose}>
        <FormAdicionarVaga title='Alterar Vaga' vaga={props.vaga}/>
      </Modal>
    </>
  );
}
