import React from 'react';

import {  BrowserRouter, Routes, Route } from "react-router-dom"; //para rotas do sistema
import NewLogin from "./LoginCadastro/NewLogin";
import NewCadastro from "./LoginCadastro/NewCadastro";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/newlogin" element={<NewLogin />} />
        <Route path="/newcadastro" element={<NewCadastro />} />
      </Routes>
    </BrowserRouter>
  );
}
