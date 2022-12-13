import React from 'react';

import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { FormEvent, useState, useEffect } from 'react';
import Cookies from "universal-cookie";
import { useCookies, CookiesProvider } from "react-cookie"
import { useAuthEmail } from '../hooks/useAuthEmail';

import '../styles/feed.css';
import axios from 'axios';
import { Postagem } from '../models/post';
import { Usuario } from '../models/usuario';

import ProfilePicture from '../assets/profile-picture.png'

export function Feed () {
    const navigate = useNavigate();
    const [newPost, setNewPost] = useState('');
    const token = useAuthEmail();
    const [cookies, setCookie] = useCookies(['TOKEN']);

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [pathImage, setPathImage] = useState<File | null>(null);
    const [email, setEmail] = useState("");
    const [postagem, setPostagem] = useState(false);

    const [posts, getPosts] = useState<Postagem[]>([]);
    const [users, getUsers] = useState<Usuario[]>([]);

    let [nome, getNome] = useState('')


    let path = '/login';
    if (!token) {
        navigate(path);
    }

    function handleGetUser(id: any) {
        let usuario!: string

        const configuration = {
            url: `http://localhost:4000/api/users/${id}`,
            method: 'GET',
            port: 4000,
        };
        axios(configuration)
        .then((result) => {
            const nome = result.data.data.name;
            getNome(nome);
        })
        .catch((error) => {
            error = new Error();
        })
        return( <>{nome}</> )
    }

    function handleGetUsersList() {
        const userList: any = []

        const configuration = {
            url: `http://localhost:4000/api/users/`,
            method: 'GET',
            port: 4000,
        };
        axios(configuration)
        .then((result) => {
            getUsers(result.data.data)
            for (let user in users) {
                userList.push({id: users[user].id, nome: users[user].name});
            }
        })
        .catch((error) => {
            error = new Error();
        });

        return userList
        
    }

   

    useEffect(() => {
        function handleGetPost() {
            const configuration = {
                url: "http://localhost:4000/api/postagens",
                method: 'GET',
                port: '4000'
            };
            axios(configuration)
            .then((result) => {
                const allPostagens = result.data.result;
                console.log(result.data.result);
                getPosts(allPostagens);
            })
            .catch((error) => {
                error = new Error();
            });
        };

        handleGetPost()
    },[])

    const handleCreatePost = (e: any) => {
        const formData = new FormData()
        const emailUsuario = localStorage.getItem("email") || ""
        formData.append("title", title)
        formData.append("body", body)
        if(pathImage) {
            formData.append("pathImage", pathImage)
        }
        formData.append("email", emailUsuario)
        e.preventDefault();
        const configuration = {
            method: "post",
            url: "http://localhost:4000/api/postagens",
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
        };
        axios(configuration)
        .then((result) => {
            console.log(result.data)
            setPostagem(true);
            window.location.href = "/feed"
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
                            id="pathImage"
                            className='my-4' 
                            name="pathImage"
                            accept="image/*"
                            onChange={(e) => e.target.files && setPathImage(e.target.files[0])}></input>
                            <input type="submit" disabled={!token} value="Postar" onClick={(e)=>handleCreatePost(e)}></input>
                        </div>
                    </form>
                    <div className='container-post container-fluid'>
                        <>
                            {posts.map((post, index) => <div key={index} className="key">
                            <div className='userInfo'>{post.photo ? <img src={`http://localhost:4000/api/avatar/${post.photo}`} /> : <img className="img-fluid my-3" src={ProfilePicture}/>}
                            <p className='postName'>{post.name}</p></div>
                            <p>{post.title}</p>
                            <p>{post.body}</p>
                            <p>{post.created.toString()}</p>
                            <img id="postagemPhoto" src={`http://localhost:4000/api/postagens/${post.pathImage}`}/>
                            </div>)}
                        </>
                    </div>
                </div>
            </main>
        </div>
    )
}