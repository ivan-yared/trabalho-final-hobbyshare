import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export function Perfil () {
    const navigate = useNavigate();
    const { user, signInWithGoogle } = useAuth();

    let path = '/login';
    if (!user) {
        navigate(path);
    }

    return (
        <div className="user-info">
            <h1>Seja bem-vindo ao seu perfil!</h1>
            <img src={user?.avatar || ''}></img>
            <p>{user?.name}</p>
        </div>
    )
}