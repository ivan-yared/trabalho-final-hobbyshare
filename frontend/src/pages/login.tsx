import { auth, firebase } from '../services/firebase'

export function Login () {
    function authLoginGoogle () {
        const provider = new firebase.auth.GoogleAuthProvider
        auth.signInWithPopup(provider).then(result => {
            console.log(result);
        })
    }

    function authLoginEmail () {
        const provider = new firebase.auth.EmailAuthProvider
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