import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { FormEvent, useState } from 'react';
import { database } from '../services/firebase';

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
            <h1>Bem-vindo ao feed!</h1>
            <form method="post" className="postform" onSubmit={handleCreatePost}>
                <textarea form="postform" onChange={event => setNewPost(event.target.value)} value={newPost} placeholder='Compartilhe algo novo' cols={100} rows={10}></textarea>
                <input type="submit" disabled={!user} value="Postar"></input>
            </form>
            <p>Inserir novos posts aqui</p>
        </div>
    )
}