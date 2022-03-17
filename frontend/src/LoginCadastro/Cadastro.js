import React from 'react';

import Fade from '@mui/material/Fade';
import { Container, Wrapper } from "./styles/ContainerWrapper"; 
import { MainContainer } from "./styles/MainContainer"; 
import {Terms, Form, LogoWrapper, SidebarContainer} from "./styles/SideBar";
import Input from "./Input";
import logo from "../assets/logo.svg";
import {Link} from "react-router-dom";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


export default function Cadastro(){

    return (
        <Fade in={true} timeout={400}>
            <Container>
                <Wrapper>

                    {/* Cadastro Sidebar */}
                    <SidebarContainer>
                        <LogoWrapper>
                            <img src={logo} alt="" />
                            <h3>
                                Recrutai
                            </h3>
                        </LogoWrapper>
                        <Form>
                            <h3>Cadastre-se</h3>
                            <InputLabel id="demo-simple-select-label">Eu sou</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Tipo"
                            >
                                <MenuItem value={true} selected>Rucrutador</MenuItem>
                                <MenuItem value={false}>Candidato</MenuItem>
                            </Select>
                            <Input placeholder="Nome completo" />
                            <Input type="email" placeholder="Email" />
                            <select>           
                                <option value= 'recrutador'>Recutador</option>
                                <option value= 'candidato' selected>Candidato</option>
                            </select>
                            <Input type="password" id="password" placeholder="Senha" />
                            <Input type="password" id="confirmPassword" placeholder="Confirmar Senha" />
                            <button>Sign Up</button>
                        </Form>
                        <div>
                            <Terms>
                                Ao me cadastrar, Eu concordo com as Políticas de Privacidade <br /> e os Termos de Serviços
                            </Terms>
                            <h4>
                                Já possui uma conta? <Link to="/login"><span>Entre</span></Link>
                            </h4>
                        </div>
                    </SidebarContainer>
                    {/* Fim Cadastro Sidebar */}

                    {/* Cadastro Main Container */}
                    <MainContainer>
                        <h1>
                            Crie <br />
                            sua conta
                        </h1>
                    </MainContainer>
                    {/* Fim Cadastro Main Container */}

                </Wrapper>
            </Container>
        </Fade>
    )
}