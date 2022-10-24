import { auth, firebase } from '../services/firebase'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

import '../styles/login.css';

export function Login () {
    const navigate = useNavigate();
    const { user, signInWithGoogle } = useAuth();

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
                <div className='container-fluid'>
                    <form className="card mx-auto mt-5 text-fade" data-aos="fade-up" data-aos-duration="1500" style={{ width: "50rem" }}>
                        <div className="card-body">
                            <label htmlFor="email">Email</label>
                            <div className="mb-5">
                                <input type="email" id="email" className="input-padrao" required placeholder="seuemail@dominio.com"></input>
                            </div>
                            
                            <label htmlFor="senha">Senha</label>
                            <div className="mb-5">
                                <input type="password" id="senha" className="input-padrao" placeholder='senha'></input>
                            </div>

                            <div className="mb-4">
                                <input type="submit" value="Entrar" className="enviar"></input>
                            </div>

                            <div className="mb-3">
                                <button onClick={authLoginGoogle}>Entrar com Conta Google</button>
                            </div>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    )
}