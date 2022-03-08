import React, { useState } from 'react';

import './App.css';
import { useSelector } from "react-redux";
import {  BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./components/Login";
import Cadastro from "./components/Cadastro";


export default function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
    </Routes>
  </BrowserRouter>
  )
}

