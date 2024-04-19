import Home from "./pages/pagina-inicial";
import { Login } from "./pages/login";
import { Registrar } from "./pages/registrar";
import { Perfil } from "./pages/perfil";
import { Feed } from "./pages/feed";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Header } from "./components/header";
import { Footer } from "./components/footer";
import React from 'react';
import ProtectedRoutes from "./components/ProtectedRoutes"
import ProtectedRoute from "./components/ProtectedRoutes";

function App() {
  return (
    <BrowserRouter>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registrar" element={<Registrar />} />
        <Route path="/perfil" element={<ProtectedRoute><Perfil /></ProtectedRoute>} />
        <Route path="/feed" element={<ProtectedRoute><Feed /></ProtectedRoute>} />
      </Routes>
      <Footer></Footer>
    </BrowserRouter>
  );
}

export default App;
