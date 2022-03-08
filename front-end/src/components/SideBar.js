import React from "react";
import styled from "styled-components";
import {Terms, Form, LogoWrapper, Container} from "./styledComponents/SideBar.js";
import Input from "./Input.js";
import logo from "../assets/logo.svg";

import { useSelector,useDispatch } from "react-redux";
import {Link} from "react-router-dom";

export default function SideBar() {

    //true login
    //false cadastro

    const tipo_tela = useSelector(state => state.tipo_tela);
    const dispatch = useDispatch();

    function mudarTela(){
        dispatch({
            type: "MUDAR_TELA"
        })

        console.log(tipo_tela)

    }

    return (
        <Container>
            <LogoWrapper>
                <img src={logo} alt="" />
                <h3>
                    Eli <span>Codes</span>
                </h3>
            </LogoWrapper>
            <Form>
                <h3>Sign Up</h3>
                <Input placeholder="Full Name" />
                <Input type="email" placeholder="Email" />
                <Input type="email" placeholder="Email" />
                <Input type="password" placeholder="Password" />
                <Input type="password" placeholder="Confrim Password" />
                <button>Sign Up</button>
            </Form>
            <div>
                <Terms>
                    By signing up, I agree to the Privacy Policy <br /> and Terms of
                    Service
                </Terms>
                <h4>
                    Already have an account? <Link to="/cadastro"><span>Sign In</span></Link>
                </h4>
            </div>
        </Container>
    )
}