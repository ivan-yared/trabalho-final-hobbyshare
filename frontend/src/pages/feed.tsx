import React from 'react';

import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { FormEvent, useState } from 'react';
import Cookies from "universal-cookie";
import { useCookies, CookiesProvider } from "react-cookie"
import { useAuthEmail } from '../hooks/useAuthEmail';

import '../styles/feed.css';
import axios from 'axios';


export function Feed () {
    const navigate = useNavigate();
    const [newPost, setNewPost] = useState('');
    const token = useAuthEmail();
    const [cookies, setCookie] = useCookies(['TOKEN']);

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [pathImage, setPathImage] = useState("");
    const [email, setEmail] = useState("");
    const [postagem, setPostagem] = useState(false);

    let path = '/login';
    if (!token) {
        navigate(path);
    }

    const handleCreatePost = (e: any) => {
        e.preventDefault();
        const configuration = {
            method: "post",
            url: "http://localhost:4000/api/postagens",
            data: {
                title,
                body,
                pathImage,
                email: localStorage.getItem("email"),
            },
        };
        axios(configuration)
        .then((result) => {
            console.log(cookies);
            console.log(configuration);
            setPostagem(true);
            // window.location.href = "/feed"
        })
        .catch((error) => {
            error = new Error();
        });
    };

    return (
        <div>
            <main className='container-main container-fluid'>
                <div className='container-feed container-fluid'>
                    <h1 className='mt-5'>Bem-vindo ao feed!</h1>
                    <form method="post" className="postform d-flex justify-content-center" onSubmit={handleCreatePost}>
                        <div className="m-5">
                            <input type="text" id="postTitle" className='m-3' placeholder='Titulo' onChange={(e) => setTitle(e.target.value)}/>
                            <textarea form="postform" onChange={(e) => setBody(e.target.value)} placeholder='Compartilhe algo novo' cols={100} rows={10}></textarea>
                        </div>
                        <div className="mb-5 align-self-end">
                        <p>Upload de foto</p>
                            <input 
                            type="file"
                            id="photo"
                            className='my-4' 
                            name="photo"
                            accept="image/*"
                            onChange={(e) => setPathImage(e.target.value)}></input>
                            <input type="submit" disabled={!token} value="Postar" onClick={(e)=>handleCreatePost(e)}></input>
                        </div>
                    </form>
                    <p>Inserir novos posts aqui</p>
                </div>
            </main>
        </div>
    )
}