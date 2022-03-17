import React from 'react';

import Fade from '@mui/material/Fade';
import { Container, Wrapper } from "./styles/ContainerWrapper"; 
import { MainContainer } from "./styles/MainContainer"; 
import {Terms, Form, LogoWrapper, SidebarContainer} from "./styles/SideBar";
import Input from "./Input";
import logo from "../assets/logo.svg";
import {Link} from "react-router-dom";
import TextField from '@mui/material/TextField'


export default function Login(){
    return (
        <Fade in={true} timeout={400}>
            <Container>
                <Wrapper>
                    {/* Login Main Container */}
                    <MainContainer>
                        <h1>
                            Entre em <br />
                            sua conta
                        </h1>
                    </MainContainer>
                    {/* Fim Login Main Container */}

                    {/* Login Sidebar */}
                    <SidebarContainer>
                        <LogoWrapper>
                            <img src={logo} alt="" />
                            <h3>
                                Recrutai
                            </h3>
                        </LogoWrapper>
                        <Form>
                            <h3>Acesse sua conta</h3>
                            {/* <Input type="email" placeholder="Email" />
                            <Input type="password" placeholder="Password" /> */}
         <TextField
          required
          id="outlined-required"
          label="Required"
          defaultValue="Hello World"
        />
        <TextField
          required
          id="outlined-required"
          label="Required"
          defaultValue="Hello World"
        />
                            <button>Entrar</button>
                        </Form>
                        <div>
                            <h4>
                                Nao possui uma conta? <Link to="/cadastro"><span>Cadastre-se</span></Link>
                            </h4>
                        </div>
                    </SidebarContainer>
                    {/* Fim Login Sidebar */}

                </Wrapper>
            </Container>
        </Fade>
    )
}