import Home from "./pages/pagina-inicial";
import { Login } from "./pages/login";
import { Registrar } from "./pages/registrar";
import { Perfil } from "./pages/perfil";
import { Feed } from "./pages/feed";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthContextProvider } from "./contexts/AuthContext"

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registrar" element={<Registrar />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/feed" element={<Feed />} />
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
