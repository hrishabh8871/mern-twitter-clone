import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import Host from '../host'

const Login = (props) => {    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    const login = (e) => {
        e.preventDefault()
        axios.post(`${Host()}/login` , {
            email : email,
            password : password
        }).then((res) => {
            console.log(res)
            window.localStorage.setItem('token', JSON.stringify (res.data.data.token))
            props.history.push('/')
        }).catch((err) => {
            console.log(err)
        })
    }
   return (
       <div className="row m-auto bg-img">
       <div className="w-25 m-5 container-fluid">       
           <div id="user-login" class="row">
               <div class="col s12 z-depth-6 card-panel">
                   <form class="login-form">
                       <div class="row margin">
                           <div class="input-field col s12">
                               <i class="mdi-social-person-outline prefix"></i>
                               <input placeholder="Email" onChange={(event) => setEmail(event.target.value)} class="validate" id="user_email" type="email" />
                               {/* <label for="email" data-error="wrong" data-success="right" class="center-align">Email</label> */}
                           </div>
                       </div>
                       <div class="row margin">
                           <div class="input-field col s12">
                               <i class="mdi-action-lock-outline prefix"></i>
                               <input placeholder="Password" onChange={(event) => setPassword(event.target.value)} id="user_pass" type="password" />
                               {/* <label for="password">Password</label> */}
                           </div>
                       </div>
                       <div class="row">
                           <div class="input-field col s12 m12 l12  login-text">
                               <input type="checkbox" id="remember-me" />
                               <label for="remember-me">Remember me</label>
                           </div>
                       </div>
                       <div class="row">
                           <div class="input-field col s12">
                               <button onClick={login} class="btn waves-effect waves-light col s12">Login</button>
                           </div>
                       </div>
                       <div class="row">
                           <div class="input-field col s6 m6 l6">
                               <p class="margin medium-small"><Link to="/signup">Register Now!</Link></p>
                           </div>
                       </div>
                   </form>
               </div>
           </div>
       </div>
       <img src="https://www.aliventures.com/wp-content/uploads/2018/10/old-home-page.jpg" />
      </div> 
   );
}

export default Login