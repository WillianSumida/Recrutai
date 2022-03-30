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
import Grid from '@mui/material/Grid';

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
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (  
    <>
    <Grid item xs={12} sm={6} md={4}>
      <Badge color="warning" badgeContent="999+">
        <Card>
          <CardHeader
            action={<IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>}
            title={props.vaga.cargo.toUpperCase()}
            subheader={props.vaga.tag1.toLowerCase() + " " + props.vaga.tag2.toLowerCase() + " " + props.vaga.tag3.toLowerCase()} />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
            {props.vaga.descricao}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="Remover vaga">
              <DeleteIcon />
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
                Salario: {props.vaga.salario}
              </Typography>
              <Typography paragraph>
                Tipo: {props.vaga.tipo}
              </Typography>
              <Typography paragraph>
                Localização: {props.vaga.estado + " - " + props.vaga.cidade }
              </Typography>
              <Typography paragraph>
                Tipo: {props.vaga.tipo}
              </Typography>
            </CardContent>
          </Collapse>
        </Card>
      </Badge>
    </Grid>
    </>
  );
}
