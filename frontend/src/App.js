import React from 'react';

import {  BrowserRouter, Routes, Route } from "react-router-dom"; //para rotas do sistema
import NewLogin from "./LoginCadastro/NewLogin";
import NewCadastro from "./LoginCadastro/NewCadastro";
import Cards from "./Vagas/Cards";
import CardsCandidato from "./VagasCandidato/CardsCandidato";
import CardsCandidatoAplicado from "./VagasCandidatoAplicado/CardsCandidatoAplicado";
import store from './Store/index';
import { Provider } from 'react-redux';
import CadastroCandidato from './ComplementoCadastro/cadastroCandidato';

export default function App() {

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NewLogin />} />
          <Route path="/newcadastro" element={<NewCadastro />} />
          <Route path="/cards" element={<Cards />} />
          <Route path="/cadastrarCandidato" element={<CadastroCandidato />} />
          <Route path="/vagasCandidato" element={<CardsCandidato />} />
          <Route path="/vagasCandidatoAplicado" element={<CardsCandidatoAplicado />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}
