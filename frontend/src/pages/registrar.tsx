import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

import '../styles/registrar.css';

export function Registrar () {
    const navigate = useNavigate();
    const { user, signInWithGoogle } = useAuth();

    let path = '/feed';
    if (user) {
        navigate(path);
    }

    return (
        <div>
            <main>
                <div className="container-fluid">
                    <form className="card mx-auto mt-5 text-fade" data-aos="fade-up" data-aos-duration="1500" style={{ width: "50rem" }}>
                        <div className="card-body">
                            <label htmlFor="nome">Nome completo</label>
                            <div className="mb-5">
                                <input type="text" id="nome" placeholder='Nome' className="input-padrao"></input>
                            </div>

                            <label htmlFor="email">Email</label>
                            <div className="mb-5">
                                <input type="email" id="email" className="input-padrao" required placeholder="seuemail@dominio.com"></input>
                            </div>
                            
                            
                            <label htmlFor="senha">Senha</label>
                            <div className="mb-5">
                                <input type="password" id="senha" placeholder='Senha' className="input-padrao"></input>
                            </div>
                            

                            <input type="submit" value="Registrar" className="registrar"></input>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    )
}