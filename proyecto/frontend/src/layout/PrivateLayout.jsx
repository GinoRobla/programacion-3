import { Outlet, Navigate } from 'react-router-dom';
import Sidebar from '../components/home/Sidebar';

export default function PrivateLayout() {
    const token = localStorage.getItem('token'); // Obtener el token de autenticación del localStorage
    if (!token) return <Navigate to="/login" />; // Si no hay token, redirigir al usuario a la página de inicio de sesión
    return (
        <div>
            <Sidebar /> {/* Renderiza la barra lateral de navegación */}
            <main>
                <Outlet /> {/* Renderiza los componentes hijos dentro de este layout */}
            </main>
        </div>
    );
}
