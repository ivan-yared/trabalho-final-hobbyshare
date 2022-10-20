import { useAuth } from '../hooks/useAuth';

export function Feed () {
    const { user, signInWithGoogle } = useAuth();

    return (
        <h1>Bem-vindo ao feed!</h1>
    )
}