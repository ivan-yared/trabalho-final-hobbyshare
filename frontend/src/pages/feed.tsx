import React from 'react';

import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { FormEvent, useState } from 'react';
import { database } from '../services/firebase';

import '../styles/feed.css';

export function Feed () {
    const navigate = useNavigate();
    const { user, signInWithGoogle } = useAuth();
    const [newPost, setNewPost] = useState('');

    let path = '/login';
    if (!user) {
        navigate(path);
    }

    async function handleCreatePost(event: FormEvent) {
        event.preventDefault();

        if (newPost.trim() === ''){
            return;
        }
        if (!user) {
            throw new Error ('Você deve estar logado para efetuar esta ação.');
        }
        const post = {
            content: newPost,
            author: {
                name: user.name,
                avatar: user.avatar,
            },
        };
        await database.ref(``).push() // Dentro do parentesis: coleção onde será salvo o post no Firestore

        setNewPost('');
    };



    return (
        <div>
            <main className='container-main container-fluid'>
                <div className='container-feed container-fluid'>
                    <h1 className='mt-5'>Bem-vindo ao feed!</h1>
                    <form method="post" className="postform d-flex justify-content-center" onSubmit={handleCreatePost}>
                        <div className="m-5">
                            <textarea form="postform" onChange={event => setNewPost(event.target.value)} value={newPost} placeholder='Compartilhe algo novo' cols={100} rows={10}></textarea>
                        </div>
                        <div className="mb-5 align-self-end">
                            <input type="submit" disabled={!user} value="Postar"></input>
                        </div>
                    </form>
                    <p>Inserir novos posts aqui</p>
                </div>
            </main>
        </div>
    )
}