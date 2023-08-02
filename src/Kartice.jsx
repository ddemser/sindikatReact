import React, { useState } from "react";
import {useLocation} from 'react-router-dom';
import logo from './zajednofront.png';
import back from './zajednoback.png';
import './App.css';
import {useNavigate} from "react-router-dom"
export const Kartice = (props) => {
 
    const navigate = useNavigate();
    const location = useLocation();


    const handleSubmit = (e) => {
        e.preventDefault();
       
    }

    return (
        <div className="auth-form-container">
        <form className="register-form" onSubmit={handleSubmit}>
        <div class="container">
        <img src={logo} className="App-logo" width="100%" height="200" />
        <div class="top-left">{location.state.Ikartica}</div>
        <div class="centered">{location.state.Iime}</div>
        </div>
        <p> 
        &nbsp;
         </p>
        <div class="container">
        <img src={back} className="App-logo" width="100%" height="200" />
        </div>
        <h2>Adresa: Palmotićeva 50, 10000 Zagreb</h2>
        <h2>sindikat@sindikat-zajedno.hr</h2>
        <a href="https://www.sindikat-zajedno.hr/pogodnosti-za-clanove/">Korisničke pogodnosti.</a> 
       
        <div class="wrapper">
        
        <button type="submit" class="btn" style={{width: "150px"} } onClick={() => navigate('/')}>Natrag</button>   
       
        </div>   
        </form>
        
    </div>
    )
}