import React, { useState, useEffect } from 'react';
import '../../App.css'
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import Host from '../host'
const Signup = (props) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [imgData, setImg] = useState('')
    const [image, setImage] = useState('')
    // console.log(name, email, password, imgData)

    useEffect(() => {
        const formData = new FormData()
        formData.append('file', imgData)
        axios({
            method: 'post',
            url: `${Host()}upload`,
            data: formData,
            headers: {'Content-Type': 'multipart/form-data' }
        }).then((res) => {
            console.log(res)
            setImage(res.data.path)            
        }).catch((err) => {
            console.log(err)
        })
    }, [imgData])
    const signup = (e) => {
        e.preventDefault()
        console.log(name, email, password)               
        axios.post(`${Host()}/register`, {
            name: name,
            email: email,
            image: image,
            password: password
        }).then((res) => {
            console.log(res)
            window.localStorage.setItem('token', JSON.stringify(res.data.data.token))
            props.history.push('/')
        }).catch((err) => {
            console.log(err)
        })
    }
        
   return (
       <div className="row m-auto bg-img">           
       <div className="w-25 m-3 container-fluid">           
           <div id="register-page" class="row">
               <div class="col s12 z-depth-6 card-panel">
                   <form class="register-form">
                       <div class="row margin">
                           <div class="input-field col s12">
                               <i class="prefix fa fa-user"></i>
                               <input placeholder="Name" onChange={(event) => setName(event.target.value)} id="user_email" type="text" />
                               {/* <label for="user_email" class="center-align">Name</label> */}
                           </div>
                       </div>
                       <div class="row margin">
                           <div class="input-field col s12">
                               <i class="mdi-communication-email prefix"></i>
                               <input placeholder="Email" onChange={(event) => setEmail(event.target.value)} id="user_email" type="email" class="validate" />
                               {/* <label for="user_email" class="center-align">Email</label> */}
                           </div>
                       </div>
                       <div class="row margin">
                           <div class="input-field col s12">
                               <i class="mdi-action-lock-outline prefix"></i>
                               <input placeholder="Password" onChange={(event) => setPassword(event.target.value)} id="user_passw" type="password" class="validate" />
                               {/* <label for="user_passw">Password</label> */}
                           </div>
                       </div>
                       <div class="row margin">
                       <div class="input-field col s12">
                           <i className="prefix fa fa-upload" />                           
                       <input type="file" onChange={(event) => setImg(event.target.files[0])} />
                       </div>
                       </div>
                       <div class="row">
                           <div class="input-field col s12">
                               <button onClick={signup} class="btn waves-effect waves-light col s12">Register Now</button>
                           </div>
                           <div class="input-field col s12">
                               <p class="margin center medium-small sign-up">Already have an account? <Link to="/login">Login</Link></p>
                           </div>
                       </div>
                   </form>                   
               </div>
           </div>           
       </div>
       <img className="offset-2" src="https://static.wixstatic.com/media/375882_78b2e689a9234ac19c386f789346c3bd~mv2.png/v1/fill/w_600,h_578,al_c,q_80,usm_0.66_1.00_0.01/mobile_header.webp" />
       </div>
   );
}

export default Signup