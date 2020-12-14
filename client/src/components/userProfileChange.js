import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import Host from './host'

const UserProfileChange = (props) => {
    const [imgData, setImg] = useState('')
    const [image, setImage] = useState('')
    const token = JSON.parse(window.localStorage.getItem('token'))

    useEffect(() => {
        const formData = new FormData()
        formData.append('file', imgData)              
        axios({
            method: 'post',
            url: `${Host()}/upload`,
            data: formData,
            headers: { 'Content-Type': 'multipart/form-data' }
        }).then((res) => {
            console.log(res)
            setImage(res.data.path)
        }).catch((err) => {
            console.log(err)
        })
    }, [imgData, image])
    const userProfileChange = (e) => {
        e.preventDefault()        
        axios.defaults.headers.common["authentication"] = 'Bearer' + ' ' + token;
        axios.post(`${Host()}/profileUpdate`, {
            image: image
        }).then((res) => {
            console.log(res)
            props.history.push('/userProfile')
        }).catch((err) => {
            console.log(err)
        })
    }
    return (
        <div className="m-5">
            <div class="input-field col s12">
                <i className="prefix fa fa-upload" />
                <input type="file" onChange={(event) => setImg(event.target.files[0])} />
            </div>
            <button onClick={userProfileChange} className="btn m-5">Changed</button>
        </div>
    )
}

export default UserProfileChange