import * as React from 'react';
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

function deleteVaga(id){
  (async() => {
    const resposta = await fetch("http://localhost:8080/excluirVaga/"+id, {
      method: "DELETE",
      headers: {"content-Type": "application/json", 'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6Miwibm9tZSI6InJlY3J1dGFkb3IiLCJpYXQiOjE2NDg2NzcyNzgsImV4cCI6MTE4NzA0NzY0MDE2MDB9.oo_v_YWaa-rLd3Ag7zqbE5sRWaxFq9Ru6u_uEl7SKgY'},
    });

    var respostaJson = await resposta.json(); 
  })();
}

export default (props) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (  
    <>
      <Badge color="warning" badgeContent="999+">
        <Card sx={{maxWidth:'22rem', minWidth:'22rem', minHeight:'14.5rem'}}>
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
            </Typography>
            <Typography>
              {props.vaga.descricao}
            </Typography>
          </CardContent>
          <br/><br/>
          <CardActions disableSpacing>
            <IconButton aria-label="Remover vaga">
              <DeleteIcon/>
            </IconButton>
            <IconButton aria-label="Editar vaga">
              <EditIcon />
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
                <strong>Salario</strong>: {props.vaga.salario}
              </Typography>
              <Typography paragraph>
                <strong>Tipo</strong>: {props.vaga.tipo}
              </Typography>
              <Typography paragraph>
              <strong>Localização</strong>: {props.vaga.estado + " - " + props.vaga.cidade }
              </Typography>
              <Typography paragraph>
              <strong>Vagas</strong>: {props.vaga.quantidade}
              </Typography>
            </CardContent>
          </Collapse>
        </Card>
      </Badge>
    </>
  );
}
