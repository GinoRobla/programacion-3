import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
    // Estados para los campos del formulario y el mensaje de error
    const [username, setUsername] = useState(''); // Nombre de usuario
    const [password, setPassword] = useState(''); // Contraseña
    const [error, setError] = useState(''); // Mensaje de error
    const navigate = useNavigate(); // Hook para redirigir al usuario tras login

    // Función que maneja el envío del formulario de login
    const handleSubmit = async (e) => {
        e.preventDefault(); // Evita el comportamiento por defecto del form
        setError(''); // Limpia errores previos
        try {
            // Realiza la petición al backend para loguear
            const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            const data = await res.json(); // Respuesta del backend
            if (res.ok && data.token) {
                // Si login exitoso, guarda el token y redirige
                localStorage.setItem('token', data.token);
                navigate('/inicio');
            } else {
                // Si hay error de usuario/contraseña, muestra mensaje
                setError(data.error || 'Usuario o contraseña incorrectos');
            }
        } catch(err) {
            // Si hay error de red/conexión
            setError('Error de conexión con el servidor');
        }
    };

    return (
        <div className="auth-container">
            <h2>Iniciar sesión</h2>
            {/* Formulario de login */}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Usuario:</label>
                    <input
                        name="username"
                        value={username}
                        onChange={e => setUsername(e.target.value)} // Actualiza el estado
                        required
                    />
                </div>
                <div>
                    <label>Contraseña:</label>
                    <input
                        name="password"
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)} // Actualiza el estado
                        required
                    />
                </div>
                {/* Mensaje de error si existe */}
                {error && <p className='mensajeError'>{error}</p>}
                <button type="submit">Iniciar sesión</button>
            </form>
            {/* Enlace para ir al registro */}
            <p>
                ¿No tienes cuenta? <Link to="/register">Registrarse</Link>
            </p>
        </div>
    );
}
