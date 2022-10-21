import { auth, firebase } from '../services/firebase'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export function Login () {
    const navigate = useNavigate();
    const { user, signInWithGoogle } = useAuth();

    let path = '/feed';
    if (user) {
        navigate(path);
    }

    async function authLoginGoogle () {
        if (!user) {
            await signInWithGoogle();
        }

        let path = '/feed';
        navigate(path);
    }

    return (
        <div>
            <main>
                <form>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" className="input-padrao" required placeholder="seuemail@dominio.com"></input>
                    
                    <label htmlFor="senha">Senha</label>
                    <input type="password" id="senha" className="input-padrao"></input>

                    <input type="submit" value="Entrar" className="enviar"></input>

                    <button onClick={authLoginGoogle}>Entrar com Conta Google</button>
                </form>
            </main>
        </div>
    )
}