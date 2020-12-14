import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

const Navigation = () => {
    return (
        <nav class="navbar navbar-expand-lg navbar-light bg-dark">
            <Link class="navbar-brand text-light" to="/">Blogging</Link>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item">
                        <Link class="nav-link text-light" to="/">Home <span class="sr-only">(current)</span></Link>
                    </li>
                    <li class="nav-item">
                        <Link class="nav-link text-light" to="/addPost">Create Blog <span class="sr-only">(current)</span></Link>
                    </li>                     
                    
                   
                </ul>                
            </div>
        </nav>
    )
}

export default Navigation