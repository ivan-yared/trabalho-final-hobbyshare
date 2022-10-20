import { useAuth } from '../hooks/useAuth';

export function Registrar () {
    const { user, signInWithGoogle } = useAuth();

    return (
        <div>
            <main>
                <form>
                    <label htmlFor="nome">Nome completo</label>
                    <input type="text" id="nome" className="input-padrao"></input>

                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" className="input-padrao" required placeholder="seuemail@dominio.com"></input>
                    
                    <label htmlFor="senha">Senha</label>
                    <input type="password" id="senha" className="input-padrao"></input>

                    <input type="submit" value="Registrar" className="registrar"></input>
                </form>
            </main>
        </div>
    )
}