import * as React from 'react';
import { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link1 from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Link, useNavigate} from "react-router-dom";
import logo from "../assets/logo1.png"
import background from '../assets/bg.jpg'
import styled from "styled-components";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import 'react-toastify/dist/ReactToastify.min.css';
import { toast, ToastContainer } from 'react-toastify';

const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: '#8D40C9',
  },
  '& .MuiInput-underline:after': {
    color: '#8D40C9',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#8D40C9',
    },
    '&:hover fieldset': {
      borderColor: '#8D40C9',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#8D40C9',
    },
  },
});

const ColorButton = styled(Button)(({ theme }) => ({
  color: "white",
  backgroundColor: "#8D40C9",
  '&:hover': {
    backgroundColor: "#8D40C9",
  },
}));

export default function CadastroCandidato() {
  //let user = {location: ''};
  const [filtro, setFiltro] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    (async() => {
      fetch("http://localhost:8080/listarInfoGit", {
        method: "POST",
        headers: {"content-Type": "application/json"}
      }).then(function(response) { return response.json(); }).then(function(data) 
      {
        //user = {location: data.location};
        //console.log(user);

        setFiltro({location: data.location, login: data.login});
      });
  })();
  };
  
  return (
    <form onSubmit={handleSubmit}>
        <input type="text" name="urlgit"></input><br/><br/>
        <input type="text" name="u" value={filtro.location} ></input><br/><br/>
        <input type="text" name="ur" value={filtro.login}></input><br/><br/>
        <input type="text" name="url"></input><br/><br/>
        <input type="text" name="urlg"></input><br/><br/>
        <button type='submit'>Value</button>
    </form>
  );
}