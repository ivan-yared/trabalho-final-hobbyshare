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
        <h1>Seja bem-vindo ao seu perfil!</h1>
    )
}