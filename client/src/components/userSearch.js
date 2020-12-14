import React, { useState, useEffect } from 'react';
import { Link, Route } from 'react-router-dom';
import axios from 'axios';
import Navigation from './navigation';
import Host from './host'

const UserSearch = () => {
    const [searchUserData, setSearchUserData] = useState([]);
    const queryData = window.localStorage.getItem('query')
    const token = JSON.parse(window.localStorage.getItem('token'))
    const [toggleState, setToggleState] = useState(false);
    const [followData, setFollowData] = useState([]);

    useEffect(() => {        
        axios.defaults.headers.common["authentication"] = 'Bearer' + ' ' + token;
        
        axios.post(`${Host()}/userSearch`, {
            queryData: queryData,
            pageNo: 1
        }).then((res) => {
            console.log(res)
            setSearchUserData(res.data.data)

        }).catch((err) => {
            console.log(err)
        })
    }, [])

    useEffect(() => {
        axios.defaults.headers.common["authentication"] = 'Bearer' + ' ' + token;
        axios.get(`${Host()}/user`, {})
        .then((res) => {
          console.log(res)
          setFollowData(res.data.data.follow)          
        }).catch((error) => {
          console.log(error)
        })
      }, [])

    // useEffect(() => {
    //     axios.defaults.headers.common["Authorization"] = 'Bearer' + ' ' + token.token;
    //     axios.post('http://hrishabh.com:5000/follow_exited')
    //         .then((res) => {
    //             console.log(res)
    //             setFollowData(res.data)
    //             setToggleState(false)

    //         }).catch((err) => {
    //             console.log(err)
    //         })
    // }, [])



    const follower = (see) => {
        console.log("see ------>", see)        
        axios.defaults.headers.common["authentication"] = 'Bearer' + ' ' + token;
        axios.post(`${Host()}/follow`, {
            followUserId : see
        }).then((res) => {
            console.log(res)
            window.location.reload()
        }).catch((err) => {
            console.log(err)
        })        
    }

    const unFollower = (see) => {
        console.log("see ------>", see)        
        axios.defaults.headers.common["authentication"] = 'Bearer' + ' ' + token;
        axios.post(`${Host()}/unFollow`, {
            followUserId : see
        }).then((res) => {
            console.log(res)
            window.location.reload()
        }).catch((err) => {
            console.log(err)
        })        
    }

    const followed = (_id) => {
        for(let followItem of followData) {
            if(followItem.followUserId === _id) {
                return true
            }            
        }
        if(followData.length === 0) {
            return false
        }
        return false
    }

    console.log(followData)

    return (
        <div>
            <Navigation />
            <div class="col-sm-6">
                {
                    searchUserData != '' ? searchUserData.map(({ name, email, image, _id }) => {
                        return (
                            <div class="card card-body">
                                <div class="card-heading">
                                    <div class="media">
                                        <img style={{ "height" : 200 }} alt="" class="media-object img-rounded w-25" src={`${Host()}/${image.substring(6)}`} />

                                        <div class="media-body ml-2">
                                            <h4 class="media-heading">{name}</h4>
                                            <p>{email}</p>
                                        </div>                                        
                                        {
                                            followed(_id) === false ? <button value={_id} onClick={(event) => follower(event.target.value)} className="btn">Follow</button> : <button value={_id} onClick={(event) => unFollower(event.target.value)} className="btn">Unfollow</button>
                                        }
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
        </div>
    )
}

export default UserSearch;