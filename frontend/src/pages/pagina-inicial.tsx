import React from 'react';

import { useNavigate, Navigate } from 'react-router-dom';
import '../styles/pagina-inicial.css';
import { useAuthEmail } from '../hooks/useAuthEmail';

export function Home() {
    const navigate = useNavigate();
    const token = useAuthEmail();

    let path = '/feed';
    if (token) {
        navigate(path);
    }

    function navigateToLogin () {
        let path = '/login';
        navigate(path);
    }

    function navigateToRegistrar () {
        let path = '/registrar';
        navigate(path);
    }

    return (
        <div>
            <main>
                <div className="botoes container-fluid">
                    <div className="text-fade py-5" data-aos="fade-left" data-aos-duration="1500">
                        <h1 className="mx-3 h1">A arte do compartilhamento.</h1>
                        <h5 className="mx-3 h5"> Junte-se agora mesmo a uma comunidade de entusiastas de diversos tipos!</h5>
                        <button type="button" className="mx-3 login btn btn-outline-light" onClick={navigateToLogin}>Login</button>
                        <button type="button" className="mx-3 registrar btn btn-outline-light" onClick={navigateToRegistrar}>Registrar</button>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Home;