import { useAuth } from '../hooks/useAuth';
import { useNavigate, Navigate } from 'react-router-dom';
import React from 'react';
import { useAuthEmail } from '../hooks/useAuthEmail';
import Cookies from "universal-cookie";

export function Header () {
    const navigate = useNavigate();
    const { user, signInWithGoogle } = useAuth();
    const token = useAuthEmail();
    const cookies = new Cookies();

    function navigateToLogin () {
        let path = '/login';
        navigate(path);
    }

    function navigateToRegistrar () {
        let path = '/registrar';
        navigate(path);
    }

    function navigateToFeed () {
        let path = '/feed';
        navigate(path);
    }

    function navigateToPerfil () {
        let path = '/perfil';
        navigate(path);
    }

    function logout () {
        cookies.remove("TOKEN")
        localStorage.removeItem("email")
        localStorage.removeItem("id")
        navigate('/');
    }

    function estaLogado () {
        if (user || token) {
           return (<>
                <button type="button" className="login btn btn-outline-light my-5" onClick={navigateToPerfil}>Minha página</button>
                <button type="button" className="login btn btn-outline-light my-5" onClick={navigateToFeed}>Feed</button>
                <button type="button" className="login btn btn-outline-light my-5" onClick={logout}>Logout</button>
            </>)
        }
        return (<>
            <button type="button" className="login btn btn-outline-light my-5" onClick={navigateToLogin}>Login</button>
            <button type="button" className="registrar btn btn-outline-light my-5" onClick={navigateToRegistrar}>Registrar</button>
        </>)
    }

    return (
        <header className="cabecalho container-fluid">
      <div className="p-3 text-fade" data-aos="fade-down" data-aos-duration="1500">
          <h1>HobbyShare</h1>
          {estaLogado()}
      </div>
    </header>
    )
}