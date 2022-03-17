import React from 'react';

import {  BrowserRouter, Routes, Route } from "react-router-dom"; //para rotas do sistema
import Login from "./LoginCadastro/Login";
import NewLogin from "./LoginCadastro/NewLogin";
import NewCadastro from "./LoginCadastro/NewCadastro";
import Cadastro from "./LoginCadastro/Cadastro"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/newlogin" element={<NewLogin />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/newcadastro" element={<NewCadastro />} />
      </Routes>
    </BrowserRouter>
  );
}
