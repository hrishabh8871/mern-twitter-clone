import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import Host from './host'

const AddPost = (props) => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [imgData, setImg] = useState('')
    const [image, setImage] = useState()
    const token = JSON.parse(window.localStorage.getItem('token'))

    useEffect(() => {
        const formData = new FormData()
        formData.append('file', imgData)                        
        axios({
            method: 'post',
            url: `${Host()}/upload`,
            data: formData
            
        }).then((res) => {
            console.log(res)
            setImage(res.data.path)            
        }).catch((err) => {
            console.log(err)
        })
    }, [imgData, image])

    const addBlog = (e) => {
        console.log(image)
        e.preventDefault()
        const formData = new FormData()
        formData.append('picture', imgData)
        formData.set('title', title)
        formData.set('content', content)
        axios.defaults.headers.common["authentication"] = 'Bearer' + ' ' + token;        
        axios({
            method: 'post',
            url: `${Host()}/createPost`,
            data: {
                title: title,
                content: content,
                image: image
            },
            
        }).then((res) => {
            console.log(res)
            props.history.push('/')            
        }).catch((err) => {
            console.log(err)
        })
    }
    return (
        <>
        <div className="row mr-auto">
        <div className="w-50 m-5">
                <div class="card">
                    <div class="card-body">
                        <div class="panel-heading">
                            Add Your Post
                            </div>
                        <div class="panel-body">
                            <input onChange={(event) => setTitle(event.target.value)} class="form-control" placeholder="Title" rows="3" />
                            <br />
                                <div class="input-field col s12">
                                    <i className="prefix fa fa-upload" />
                                    <input type="file" onChange={(event) => setImg(event.target.files[0])} />
                                </div>
                            <br />
                            <textarea onChange={(event) => setContent(event.target.value)} class="form-control" placeholder="Write Your Content..." rows="3"></textarea>
                            <br />
                            <button onClick={addBlog}  type="button" class="btn btn-info pull-right">Post</button>                  
                        </div>
                    </div>
                </div>
            </div>            
            
            <img className="w-25" src="https://flockler.com/thumbs/sites/251/flockler-case-turracher_s900x0_q85_noupscale.jpg" />
            
        </div>
        </>
    )
}

export default AddPost;