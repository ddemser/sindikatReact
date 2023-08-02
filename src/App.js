import React, { useState } from "react";
import './App.css';
import { Login } from "./Login";
import { Kartice } from "./Kartice";
import { Register } from "./Register";
import {BrowserRouter,Routes,Route} from "react-router-dom";



function App() {

  

  return (
    <div className="App">
    <BrowserRouter>
    <Routes>
    <Route exact path="/" element={<Login/>}/>
    <Route exact path="/kartice" element={<Kartice/>}/>
    <Route exact path="/register" element={<Register/>}/>
    </Routes>
    </BrowserRouter>
    </div>
);
}

export default App;
