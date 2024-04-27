import React from 'react';
import axios from 'axios';

import { useAuthEmail } from '../hooks/useAuthEmail';
import { useNavigate } from 'react-router-dom';
import { FormEvent, useState, useEffect } from 'react';
import { Postagem } from '../models/post';
import { Usuario } from '../models/usuario';



export function Perfil () {
    const navigate = useNavigate();
    const token = useAuthEmail();

    const [posts, getPosts] = useState<Postagem[]>([]);
    const [nome, getNome] = useState('')

    let path = '/login';
    if (!token) {
        navigate(path);
    }

    function handleGetUser(id: any) {
        let usuario!: string

        const configuration = {
            url: `http://localhost:80/api/users/${id}`,
            method: 'GET',
            port: 80,
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

    useEffect(() => {
        function handleGetPost() {
            const id = localStorage.getItem("id")
            const configuration = {
                url: `http://localhost:80/api/postagens/${id}`,
                method: 'GET',
                port: '80'
            };
            axios(configuration)
            .then((result) => {
                const allPostagens = result.data.result;
                getPosts(allPostagens);
            })
            .catch((error) => {
                error = new Error();
            });
        };

        handleGetPost()
    },[])

    return (
        <div className="user-info">
            <h1>Seja bem-vindo ao seu perfil!</h1>
                <>
                    {posts.map((post, index) => <div key={index}>
                    <p>{post.title}</p>
                    <p>{post.body}</p>
                    </div>)}
                </>
        </div>
    )
}