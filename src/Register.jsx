import React, { useState } from "react";
import {useNavigate} from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Register = (props) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [name, setName] = useState('');
    const [prezime, setPrezime] = useState('');
    const [datRod, setDatRod] = useState('');
    const [adresa, setAdresa] = useState('');
    const [oib, setOib] = useState('');
    const [mobitel, setMobitel] = useState('');
    const [ustanovaRada, setUstanovaRada] = useState('');
    const [repeatPass, setRepeatPass] = useState('');

    const validateEmail = (email) => {
        return email.match(
          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
      };



    const handleSubmit = (e) => {
        e.preventDefault();
       
    }

    function isOibValid(input) {
        const oib = input.toString();
    
        if (oib.match(/\d{11}/) === null) {
            return false;
        }
    
        let calculated = 10;
    
        for (const digit of oib.substring(0, 10)) {
            calculated += parseInt(digit);
    
            calculated %= 10;
    
            if (calculated === 0) {
                calculated = 10;
            }
    
            calculated *= 2;
    
            calculated %= 11;
        }
    
        const check = 11 - calculated;
        
        if (check === 10) {
            check = 0;
        }
    
        return check === parseInt(oib[10]);
    }


    function registerClan() {
        

        if (!name) {
            toast("Upišite ime")
        }else if (!prezime) {
            toast("Upišite prezime")
        }else if (!datRod) {
            toast("Upišite datum rođenja")
        }else if (!adresa) {
            toast("Upišite adresu")
        }else if (!oib) {
            toast("Upišite Oib")
        }else if (!email) {
            toast("Upišite E-mail")
        }else if (!mobitel) {
            toast("Upišite mobitel")
        }else if (!ustanovaRada){
            toast("Upišite ustanovu rada")
        }else if (!pass){
            toast("Upišite šifru")
        }else if (!repeatPass){
            toast("Upišite šifru")
        }else{
            
            if(mobitel.charAt(0)!='0'  ){
                toast("Broj mobitela nije u ispravnom formatu")
            }else if(mobitel.charAt(1)!='9'){
                toast("Broj mobitela nije u ispravnom formatu")
            }else if(mobitel.length<9 || mobitel.length>10  ){
                toast("Broj mobitela nije u ispravnom formatu")
            } else if(pass != repeatPass){
                toast("Upisane lozinke nisu iste")
                
            }else if(!isOibValid(oib)){
                toast("OIB nije u ispravnom formatu")
            }else if(!validateEmail(email)){
                toast("E-mail nije u ispravnom formatu")
            }else{
                const myArray = datRod.split("-");
                const datumRodenja = myArray[0]+"-"+myArray[1]+"-"+myArray[2];
           

                fetch("https://sind-zajedno.times.hr/registerclanovi", {
                    method: 'POST',
                    body: JSON.stringify({
                        ime: name,
                        prezime: prezime,
                        datum: datumRodenja,
                        adresa: adresa,
                        oib: oib,
                        email: email,
                        mobitel: mobitel,
                        ustanovaRada: ustanovaRada,
                        sifra: pass,
                        aktivacija: 'N',
                        kartica: '1234'
                    }),
                    headers: {
                        "Content-Type": "application/json;charset=UTF-8"
                    }
                })
                .then(function(response) {  
                    if (!response.ok) { 
                        throw Error(response.statusText);
                    }
                    return response;
                    
                }).then(response => response.text())
                .then((response) => {
                    toast(response)
                })
                .catch(err => console.log(err))
                
            }
            
            
            
           

        }
        
    }

    return (
        <div className="auth-form-container">
        <form className="register-form" onSubmit={handleSubmit}>
            <label htmlFor="name">Ime</label>
            <input value={name} name="name" onChange={(e) => setName(e.target.value)} id="name"  />
            <label htmlFor="prezime">Prezime</label>
            <input value={prezime} name="prezime" onChange={(e) => setPrezime(e.target.value)} id="prezime" />
            <label htmlFor="datRod">Datum rođenja</label>
            <input value={datRod} name="datRod" onChange={(e) => setDatRod(e.target.value)} id="datRod" type="date" />
            <label htmlFor="adresa">Adresa</label>
            <input value={adresa} onChange={(e) => setAdresa(e.target.value)}  id="adresa"  />
            <label htmlFor="oib">Oib</label>
            <input value={oib} onChange={(e) => setOib(e.target.value)} name="oib"  type="number"
            pattern="[0-9]*" />
            <label htmlFor="email">E-mail</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)}type="email"  id="email" name="email" />
            <label htmlFor="name">Mobitel</label>
            <input value={mobitel} name="mobitel" onChange={(e) => setMobitel(e.target.value)} id="mobitel"   type="number"
            pattern="[0-9]*" />
            <label htmlFor="name">Ustanova rada</label>
            <input value={ustanovaRada} name="ustanovaRada" onChange={(e) => setUstanovaRada(e.target.value)} id="ustanovaRada" />
            <label htmlFor="password">Lozinka</label>
            <input value={pass} onChange={(e) => setPass(e.target.value)} type="password"  id="password" name="password" />
            <label htmlFor="password">Ponovite Lozinku</label>
            <input value={repeatPass} onChange={(e) => setRepeatPass(e.target.value)} type="password"  id="password" name="password" />
           
           
           
          
           
            
            <button type="submit"   onClick={() => registerClan()}>Registracija</button>
            <ToastContainer />
        </form>
        <button className="link-btn" onClick={() => navigate('/')}>Već imate korisnički račun? Prijavite se ovdje.</button>
    </div>
    )
}