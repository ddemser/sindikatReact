import React, {  useState,useEffect } from 'react';
import logo from './slider2.jpg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate} from "react-router-dom"







export const Login = (props) => {
  const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [clan, setClan] = useState({
        id: "",
        ime: "",
        prezime: "",
        datum: null,
        adresa: "",
        oib: "",
        email: "",
        mobitel: "",
        ustanovaRada: "",
        sifra: "",
        kartica: "",
        aktivacija: ""
      });
    

 

    const handleSubmit = (e) => {
        e.preventDefault();
   
    }


    useEffect(() => {
      

     if(clan.ime){
      console.log("tu") 
      console.log(clan.email)
      console.log(clan.ime)

      if(clan.sifra != pass){
        toast("Pogrešna lozinka,pokušajte ponovo!")
      }else if(clan.aktivacija == "N"){
        toast("Korisnički račun je u statusu aktivacije")
      }else{
        navigate("/kartice",{state:{Iime:clan.ime +" "+clan.prezime,Ikartica:clan.kartica}})
      }


     }


      }, [clan])


       function sendLoginRequest() {
        if (!email) {
          toast("Nije upisana e-mail adresa")
        }else if(!pass){
          toast("Nije upisan password")
        }else{
          fetch('https://sind-zajedno.times.hr/clanovi/'+email) 
          .then(function(response) {  
              if (!response.ok) { 
                  throw Error(response.statusText);
              }
              return response;
          }).then(function(response) {
              console.log('200 - ok');
                  response.json().then(function(data) {   
                    console.log(data)
                     setClan(data);
                  });
          }).catch(function(error) {  
            toast("Molim vas napravite registraciju , ne postoji račun sa ovom E-mail adresom!")
          });
       
          try {
            
            } catch (error) {
              console.error(error);       
            }
        }
      
    
    }

  
    

    function posaljiMailZaOporavak() {
      if (!email) {
        toast("Nije upisana e-mail adresa za oporavak lozinke")
    }else{
      fetch('https://sind-zajedno.times.hr/lozinka/'+email) 
      .then(function(response) {  
          if (!response.ok) { 
              throw Error(response.statusText);
          }
          return response;
      }).then(function(response) {
          console.log('200 - ok');
          response.text().then(function (text) {   
            toast(text)
              });
      }).catch(function(error) {  
          console.log('404 Not Found : '+ error); 
      });
    }
     
    }
      


    return (
        <div className="auth-form-container">
            <form className="login-form" onSubmit={handleSubmit}>
            <img src={logo} className="App-logo" alt="logo" width="300" height="200" />
                <label htmlFor="email">E-mail</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="youremail@gmail.com" id="email" name="email" />
                <label htmlFor="password">Lozinka</label>
                <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
                <div >
                <button type="submit" class="btn" style={{width: "150px"}}  onClick={() => sendLoginRequest()}>Prijava</button>        
                <button type="submit" class="btn" style={{width: "150px"} } onClick={()=>navigate("/register")}>Registracija</button>
              
                 <ToastContainer />
    
                </div>
            </form>
            <button className="link-btn" onClick={() => posaljiMailZaOporavak()}>Zaboravili ste lozinku?</button>
        </div>
    )
}