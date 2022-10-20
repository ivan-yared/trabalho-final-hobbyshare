import { useAuth } from '../hooks/useAuth';

export function Perfil () {
    const { user, signInWithGoogle } = useAuth();

    return (
        <h1>Seja bem-vindo ao seu perfil!</h1>
    )
}