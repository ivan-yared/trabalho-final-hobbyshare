import { useAuth } from '../hooks/useAuth';

export function Header () {
    const { user, signInWithGoogle } = useAuth();

    function estaLogado () {
        if (user) {
           return (<>
                <button type="button" className="login btn btn-outline-light my-5">Minha página</button>
                <button type="button" className="login btn btn-outline-light my-5">Feed</button>
                <button type="button" className="login btn btn-outline-light my-5">Logout</button>
            </>)
        }
        return (<>
            <button type="button" className="login btn btn-outline-light my-5">Login</button>
            <button type="button" className="registrar btn btn-outline-light my-5">Registrar</button>
        </>)
    }

    return (
        <header className="cabecalho container-fluid">
      <div className="p-3 text-fade" data-aos="fade-up" data-aos-duration="1500">
          <h1>HobbyShare</h1>
          {estaLogado()}
      </div>
    </header>
    )
}