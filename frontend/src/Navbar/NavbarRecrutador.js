import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'react-toastify/dist/ReactToastify.min.css';
import { useDispatch, useSelector } from 'react-redux';
import logo from "../assets/logo2.png"

export default function ButtonAppBar(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    function deslogar(){
      sessionStorage.removeItem('tags');
      sessionStorage.removeItem('nivel');
      sessionStorage.removeItem('usuario');
      sessionStorage.clear();

      dispatch({type:'Deslogar'})

      navigate('/');
    }
   
  return (
    <Box sx={{ flexGrow: 1}}>
      <AppBar position="static" style={{backgroundColor:"#8D40C9"}}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <img src={logo} width='72vw' height='72vh' className='img' />
            Recruta+
          </Typography>
          <Button onClick={deslogar} color="inherit">Sair</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}