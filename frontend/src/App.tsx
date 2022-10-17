import Home from "./pages/pagina-inicial";
import { Login } from "./pages/login";
import { Registrar } from "./pages/registrar";

import { createContext } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom'

export const TestContext = createContext('');

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registrar" element={<Registrar />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
