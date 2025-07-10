import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
// Importo los componentes de las distintas páginas y layouts
import Login from '../components/user/Login.jsx';
import Register from '../components/user/Register.jsx';
import PublicLayout from '../layout/PublicLayout.jsx';
import PrivateLayout from '../layout/PrivateLayout.jsx';
import HomeContent from '../components/home/HomeContent.jsx';
import Transactions from '../components/home/Transactions.jsx';
import AddTransaction from '../components/home/AddTransaction.jsx';

// Componente principal de rutas de la app
export const Routing = () => {
  return (
    // BrowserRouter permite usar rutas en la app
    <BrowserRouter>
      {/* Routes contiene todas las rutas de la aplicación */}
      <Routes>
        {/* Rutas públicas (login y registro) */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Login />} /> {/* Página principal: Login */}
          <Route path="login" element={<Login />} /> {/* Ruta /login: Login */}
          <Route path="register" element={<Register />} /> {/* Ruta /register: Registro */}
        </Route>
        {/* Rutas privadas (requieren estar logueado) */}
        <Route path="/inicio" element={<PrivateLayout />}>
          <Route index element={<HomeContent />} /> {/* Página de inicio privada */}
          <Route path="historial" element={<Transactions />} /> {/* Historial de transacciones */}
          <Route path="agregar" element={<AddTransaction />} /> {/* Formulario para agregar transacción */}
        </Route>
        {/* Ruta para cualquier otra URL (error 404) */}
        <Route path="*" element={
          <>
            <h1>Error 404</h1>
            <Link to="/">Volver al inicio</Link>
          </>
        } />
      </Routes>
    </BrowserRouter>
  );
};
