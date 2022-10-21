import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export function Feed () {
    const navigate = useNavigate();
    const { user, signInWithGoogle } = useAuth();

    let path = '/login';
    if (!user) {
        navigate(path);
    }

    return (
        <h1>Bem-vindo ao feed!</h1>
    )
}