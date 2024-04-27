import React from 'react';
import axios from "axios";

import { useNavigate } from 'react-router-dom';

import '../styles/registrar.css';
import { useState } from 'react';
import { useAuthEmail } from '../hooks/useAuthEmail';

export function Registrar () {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [photo, setPhoto] = useState("");
    const [registrar, setRegistrar] = useState(false);

    const token = useAuthEmail();

    let path = '/feed';
    if (token) {
        navigate(path);
    }

    function navigateToLogin () {
        let path = '/login';
        navigate(path);
    }

    const handleSubmit = (e: any) => {
        e.preventDefault()
        const configuration = {
            method: "post",
            url: "http://localhost:80/api/users/",
            port: 80,
            data: {
                name,
                email,
                password,
                photo,
            },
        };
        axios(configuration)
            .then((result) => {
                setRegistrar(true);
                navigateToLogin();
            })
            .catch((error) => {
                error = new Error();
            });

    }

    return (
        <div>
            <main>
                <div className="container-fluid">
                    <form className="card mx-auto mt-5 text-fade" data-aos="fade-up" data-aos-duration="1500" style={{ width: "50rem" }}>
                        <div className="card-body">
                            <label htmlFor="nome">Nome completo</label>
                            <div className="mb-5">
                                <input type="text" id="nome" required placeholder='Nome' value={name} onChange={(e) => setName(e.target.value)} className="input-padrao"></input>
                            </div>

                            <label htmlFor="email">Email</label>
                            <div className="mb-5">
                                <input type="email" id="email" className="input-padrao" required placeholder="seuemail@dominio.com" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                            </div>
                            
                            
                            <label htmlFor="senha">Senha</label>
                            <div className="mb-5">
                                <input type="password" id="senha" required placeholder='Senha' className="input-padrao" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                            </div>

                            <label htmlFor="photo">Foto de perfil</label>
                            <div className="mb-5">
                                <input 
                                type="file"
                                id="photo" 
                                name="photo"
                                accept="image/*"
                                onChange={(e) => setPhoto(e.target.value)}></input>
                            </div>
                            

                            <input type="submit" value="Registrar" className="registrar" onClick={(e)=>handleSubmit(e)}></input>

                            {registrar ? (
                                <p className='text-success'>Conta registrada com sucesso</p>
                            ) : (
                                <p className="text-danger">Cadastro em andamento</p>
                            )}
                        </div>
                    </form>
                </div>
            </main>
        </div>
    )
}