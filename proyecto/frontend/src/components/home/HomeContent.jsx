import React, { useEffect, useState } from "react";

export default function HomeContent() {
    const [balance, setBalance] = useState(0); // Inicializar balance en 0
    const [user, setUser] = useState(null); // Inicializar usuario como null

    // Cargar balance y usuario al cargar el componente
    useEffect(() => {
        async function fetchBalance() {
            const url = import.meta.env.VITE_API_URL; // Usar variable de entorno o URL por defecto
            const res = await fetch(url + "/transacciones/balance", { // Endpoint para obtener balance
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token") // Enviar token de autenticación
                }
            });
            const data = await res.json(); // Parsear la respuesta JSON
            setBalance(data.balance); // Actualizar el balance con el valor obtenido
        }
        fetchBalance(); // Llamar a la función para cargar balance
    }, []);

    // Cargar información del usuario al cargar el componente
    useEffect(() => {
        async function fetchUser() {
            const url = import.meta.env.VITE_API_URL; // Usar variable de entorno o URL por defecto
            const res = await fetch(url + "/auth/me", { // Endpoint para obtener información del usuario
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token") // Enviar token de autenticación
                }
            });
            const data = await res.json(); // Parsear la respuesta JSON
            setUser(data); // Actualizar el estado del usuario con la información obtenida
        }
        fetchUser(); // Llamar a la función para cargar información del usuario
    }, []);

    return (
        <div className="homecontent-container">
            <div className="balance-section">
                <div className="balance-value">Balance: ${balance}</div>
            </div>
            <h2 className="info-title">Mi información</h2>
            {user && (
                <div className="user-info">
                    <div><strong>Nombre:</strong> {user.name}</div>
                    <div><strong>Apellido:</strong> {user.surname}</div>
                    <div><strong>Username:</strong> {user.username}</div>
                    <div><strong>Correo Electrónico:</strong> {user.email}</div>
                    <div><strong>Usuario:</strong> {user.username}</div>
                </div>
            )}
        </div>
    );
}