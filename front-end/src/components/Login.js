import React, { useState } from 'react';

import Main from "./Main";
import SideBar from "./SideBar";
import { Container, Wrapper } from "./styledComponents/App";
import { useSelector } from "react-redux";
import Fade from '@mui/material/Fade';

export default function Login(){
    return (
        <Fade in={true} timeout={700}>
        <Container>
          <Wrapper>
          <Main />
          <SideBar />
          </Wrapper>
        </Container>
      </Fade>
    )
}