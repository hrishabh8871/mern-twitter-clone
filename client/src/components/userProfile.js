import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';
import Navigation from './navigation';
import { Link, Redirect } from 'react-router-dom';
import Host from './host'

const UserProfile = () => {
    const token = JSON.parse(window.localStorage.getItem('token'))
    const [userBlog, setUserBlog] = useState([])
    const [userData, setUserData] = useState([])
    useEffect(() => {
        axios.defaults.headers.common["authentication"] = 'Bearer' + ' ' + token;
        axios.get(`${Host()}/userPost`)
            .then((res) => {
                console.log(res)
                setUserBlog(res.data.data)
            }).catch((err) => {
                console.log(err)
            })
    }, [])

    useEffect(() => {
        axios.defaults.headers.common["authentication"] = 'Bearer' + ' ' + token;
        axios.get(`${Host()}/user`)
            .then((res) => {
                console.log(res)
                setUserData(res.data.data.user)
            }).catch((err) => {
                console.log(err)
            })
    }, [])
    // console.log(userData)
    return (
        <>

            <Navigation />
            {/* <div className="offset-4">
                <div class="navbar navbar-expand-lg navbar-light">
                    <div class="form-group has-feedback">
                        <input type="text" class="form-control-nav" id="search" aria-describedby="search1" />
                    </div>

                    <button class="btn btn-primary ml-5" type="submit" aria-label="Left Align">
                        <span class="glyphicon glyphicon-pencil" aria-hidden="true"> </span> Tweet
                    </button>
                </div>
            </div> */}





            <div class="container-fluid">
                <div class="row">
                    <div class="col-sm-3">
                        <div class="card">
                            <div class="card-body">
                                {
                                    console.log(userData)
                                }
                                {
                                    Object.keys(userData).length > 0 && userData.image ? <Link to="changeProfile"><img class="img-fluid w-50" alt="" src={`${Host()}/${userData.image.substring(6)}`} /></Link>
                                        : <Link to='/changeProfile'><img className="nav-profile-img rounded-circle img-fluid" src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png' /></Link>
                                }
                                {/* <button className="btn">Update Profile</button> */}
                                <div class="row">
                                    <div class="col-xs-3">
                                        <small>TWEETS</small>
                                        <a href="#">{' ' + userBlog.length}</a>
                                    </div>
                                    <div class="col-xs-4 ml-2">
                                        <small>FOLLOWING</small>
                                        <a href="#">251</a>
                                    </div>
                                    <div class="col-xs-5 ml-2">
                                        <small>FOLLOWERS</small>
                                        <a href="#">153</a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="card">
                            <div class="card-heading">
                                <h3 class="card-title">
                                    Trends
						<small><a href="#">ciao</a></small>
                                </h3>
                            </div>

                            <div class="card-body">
                                <ul class="list-unstyled">
                                    <li><a href="#">#Cras justo odio</a></li>
                                    <li><a href="#">#Dapibus ac facilisis in</a></li>
                                    <li><a href="#">#Morbi leo risus</a></li>
                                    <li><a href="#">#Porta ac consectetur ac</a></li>
                                    <li><a href="#">#Vestibulum at eros</a></li>
                                    <li><a href="#">#Vestibulum at eros</a></li>
                                    <li><a href="#">#Vestibulum at eros</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        {
                            userBlog != '' ? userBlog.map(({ title, content, image }) => {
                                return (
                                    <div class="card card-body">
                                        <div class="card-heading">
                                            <div class="media">
                                                <img alt="" class="media-object img-rounded w-25" src={`${Host()}/${image.substring(6)}`} />

                                                <div class="media-body ml-2">
                                                    <h4 class="media-heading">{title}</h4>
                                                    <p>{content}</p>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                )
                            }) : <center><h4 className="card-heading">No Post Available</h4></center>
                        }

                        <br />
                        <br />
                        <br />



                    </div>

                    <div class="col-sm-3">
                        <div class="card card-body">

                            <div class="media-body">

                                <div class="media">
                                    <div class="media-left">
                                        <img src="http://placehold.it/32x32" alt="" class="media-object rounded-circle" />
                                    </div>
                                    <div class="media-body">
                                        <h5 class="media-heading">Nome e cognome</h5>
                                        <a href="#" class="btn btn-default btn-xs">
                                            +
								<span class="glyphicon glyphicon-user"></span>
                                            Follow
							</a>
                                    </div>
                                </div>
                            </div>
                            <div class="card-footer">
                                <a href="www.google.it">
                                    <span class="glyphicon glyphicon-user"></span>
                                    Find people you know
					</a>
                            </div>
                        </div>
                        <div class="card card-body">
                            <ul class="list-inline">
                                <li>© 2019 Blooging</li>
                                <li><a href="#">About</a></li>
                                <li><a href="#">Help</a></li>
                                <li><a href="#">Terms</a></li>
                                <li><a href="#">Privacy</a></li>
                                <li><a href="#">Cookies</a></li>
                                <li><a href="#">Ads info</a></li>
                                <li><a href="#">Brand</a></li>
                                <li><a href="#">Blog</a></li>
                                <li><a href="#">Status</a></li>
                                <li><a href="#">Apps</a></li>
                                <li><a href="#">Jobs</a></li>
                                <li><a href="#">Advertise</a></li>
                                <li><a href="#">Businesses</a></li>
                                <li><a href="#">Media</a></li>
                                <li><a href="#">Developers</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserProfile;