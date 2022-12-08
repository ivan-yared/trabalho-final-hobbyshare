import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

import axios from "axios";
import Cookies from "universal-cookie/es6/Cookies";


import '../styles/login.css';

export function Login () {
    const navigate = useNavigate();
    const { user, signInWithGoogle } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [id, setId] = useState("");
    const [login, setLogin] = useState(false);

    const cookies = new Cookies();

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

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const configuration = {
            method: "post",
            url: "http://localhost:4000/api/users/login",
            data: {
                email,
                password,
                id,
            }
        };
        axios(configuration)
            .then((result) => {
                setLogin(true);
                localStorage.setItem("email", configuration.data.email);
                localStorage.setItem("id", result.data.id.toString());
                cookies.set("TOKEN", result.data.token, {
                    path: "/",
                  });
                window.location.href = "/feed"
            })
            .catch((error) => {
                error = new Error();
            });
        
      }

    return (
        <div>
            <main>
                <div className='container-fluid'>
                    <form className="card mx-auto mt-5 text-fade" data-aos="fade-up" data-aos-duration="1500" style={{ width: "50rem" }}>
                        <div className="card-body">
                            <label htmlFor="email">Email</label>
                            <div className="mb-5">
                                <input type="email" id="email" className="input-padrao" required placeholder="seuemail@dominio.com" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                            </div>
                            
                            <label htmlFor="senha">Senha</label>
                            <div className="mb-5">
                                <input type="password" id="senha" className="input-padrao" placeholder='senha' value={password} onChange={(e) => setPassword(e.target.value)}></input>
                            </div>

                            <div className="mb-4">
                                <input type="submit" value="Entrar" className="enviar" onClick={(e)=>handleSubmit(e)}></input>
                            </div>

                            {login ? (
                                <p className='text-success'>Logado com sucesso</p>
                            ) : (
                                <p className="text-danger">Login em andamento</p>
                            )}
                        </div>
                    </form>
                </div>
            </main>
        </div>
    )
}