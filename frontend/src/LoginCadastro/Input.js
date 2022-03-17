import React from "react";
import styled, { Container, StyledInput, Status } from "./styles/Input";

export default function Input({type, placeholder}) {
    return (
        <Container>
            <StyledInput
                placeholder={placeholder && placeholder}
                type={type ? type : "text"}
                required
                autocomplete="off"
            />
            <Status />
        </Container>
    )
}