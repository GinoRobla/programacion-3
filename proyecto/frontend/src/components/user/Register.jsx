// Importamos los hooks de React y las utilidades de react-router-dom
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';



// Componente de registro de usuario
export default function Register() {
    // Definimos los estados para cada campo del formulario
    const [name, setName] = useState(''); // Nombre del usuario
    const [surname, setSurname] = useState(''); // Apellido del usuario
    const [email, setEmail] = useState(''); // Correo electrónico
    const [username, setUsername] = useState(''); // Nombre de usuario
    const [password, setPassword] = useState(''); // Contraseña
    const [initialBalance, setInitialBalance] = useState(''); // Balance inicial
    const [error, setError] = useState(''); // Mensaje de error
    const navigate = useNavigate(); // Hook para redireccionar


    // Función que maneja el envío del formulario de registro
    const handleSubmit = async (e) => {
        e.preventDefault(); // Evita que la página se recargue
        setError(''); // Limpiamos errores previos
        // Realizamos la petición al backend para registrar el usuario
        const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            // Enviamos los datos del formulario en formato JSON
            body: JSON.stringify({ name, surname, email, username, password, initialBalance: Number(initialBalance) })
        });
        const data = await res.json(); // Obtenemos la respuesta del backend
        if (res.ok) {
            // Si el registro fue exitoso, redirigimos al login
            navigate('/login');
        } else {
            // Si hubo un error, mostramos el mensaje correspondiente
            setError(data.error || 'Error al registrarse');
        }
    };

    // Render del formulario de registro
    return (
        <div className="auth-container">
            <h2>Registrarse</h2>
            {/* Formulario de registro */}
            <form onSubmit={handleSubmit}>
                {/* Campo para el nombre */}
                <div>
                    <label>Nombre:</label>
                    <input
                        value={name}
                        onChange={e => setName(e.target.value)} // Actualiza el estado al escribir
                        required
                    />
                </div>
                {/* Campo para el apellido */}
                <div>
                    <label>Apellido:</label>
                    <input
                        value={surname}
                        onChange={e => setSurname(e.target.value)}
                        required
                    />
                </div>
                {/* Campo para el correo electrónico */}
                <div>
                    <label>Correo electrónico:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                </div>
                {/* Campo para el nombre de usuario */}
                <div>
                    <label>Usuario:</label>
                    <input
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        required
                    />
                </div>
                {/* Campo para la contraseña */}
                <div>
                    <label>Contraseña:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                </div>
                {/* Campo para el balance inicial */}
                <div>
                    <label>Balance inicial:</label>
                    <input
                        type="number"
                        value={initialBalance}
                        onChange={e => setInitialBalance(e.target.value)}
                        min="0"
                        required
                    />
                </div>
                {/* Mensaje de error si existe */}
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit">Registrarse</button>
            </form>
            {/* Enlace para ir al login si ya tiene cuenta */}
            <p>
                ¿Ya tienes cuenta? <Link to="/login">Iniciar sesión</Link>
            </p>
        </div>
    );
}
