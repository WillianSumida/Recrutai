import React from 'react';

import {  BrowserRouter, Routes, Route } from "react-router-dom"; //para rotas do sistema
import NewLogin from "./LoginCadastro/NewLogin";
import NewCadastro from "./LoginCadastro/NewCadastro";
import Cards from "./Vagas/Cards";
import store from './Store/index';
import { Provider } from 'react-redux';

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/newlogin" element={<NewLogin />} />
          <Route path="/newcadastro" element={<NewCadastro />} />
          <Route path="/cards" element={<Cards />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}
