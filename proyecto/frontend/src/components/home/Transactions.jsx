import React, { useEffect, useState } from "react";

export default function Transactions() {
    const [transactions, setTransactions] = useState([]); // Inicializar transacciones como un array vacío
    const [filtroFecha, setFiltroFecha] = useState(""); // Inicializar filtro de fecha como cadena vacía
    const [filtroCategoria, setFiltroCategoria] = useState(""); // Inicializar filtro de categoría como cadena vacía
    const [categorias, setCategorias] = useState([]); // Inicializar categorías como un array vacío

    // Traer categorías desde el backend al cargar el componente
    useEffect(() => {
        async function fetchCategorias() {
            let url = import.meta.env.VITE_API_URL;
            const res = await fetch(url + "/transacciones/categorizar", { // Endpoint para obtener categorías
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token") // Enviar token de autenticación
                }
            });
            const data = await res.json(); // Parsear la respuesta JSON
            setCategorias(data); // Actualizar el estado de categorías con los datos obtenidos
        }
        fetchCategorias(); // Llamar a la función para cargar categorías
    }, []);

    // Traer transacciones filtradas desde el backend
    useEffect(() => {
        async function fetchTransacciones() {
            let url = import.meta.env.VITE_API_URL + "/transacciones?"; // Usar variable de entorno para la URL base
            if (filtroFecha) url += `desde=${filtroFecha}&hasta=${filtroFecha}&`; // Agregar filtro de fecha si se ha seleccionado
            if (filtroCategoria) url += `categoria=${encodeURIComponent(filtroCategoria)}&`; // Agregar filtro de categoría si se ha seleccionado
            const res = await fetch(url, { // Hacer la solicitud al backend
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token") // Enviar token de autenticación
                }
            });
            const data = await res.json(); // Parsear la respuesta JSON
            setTransactions(data); // Actualizar el estado de transacciones con los datos obtenidos
        }
        fetchTransacciones(); // Llamar a la función para cargar transacciones
    }, [filtroFecha, filtroCategoria]); // Volver a cargar transacciones cuando cambien los filtros

    return (
        <div className="container">
            <h2>Historial de Transacciones</h2>
            <div className="filters">
                <label>
                    Fecha:
                    <input
                        type="date"
                        value={filtroFecha}
                        onChange={e => setFiltroFecha(e.target.value)}
                    />
                </label>
                <label>
                    Categoría:
                    <select
                        value={filtroCategoria}
                        onChange={e => setFiltroCategoria(e.target.value)}
                    >
                        <option value="">Todas</option>
                        {categorias.map((cat, i) => (
                            <option key={i} value={cat.categoria}>{cat.categoria}</option>
                        ))}
                    </select>
                </label>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Fecha</th>
                        <th>Tipo</th>
                        <th>Categoría</th>
                        <th>Descripción</th>
                        <th>Monto</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((t, i) => (
                        <tr key={i}>
                            <td>{new Date(t.fecha).toLocaleDateString()}</td>
                            <td>{t.tipo}</td>
                            <td>{t.categoria}</td>
                            <td>{t.descripcion}</td>
                            <td>${t.monto}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}