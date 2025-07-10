import React, { useState, useEffect } from "react";

export default function AddTransaction() {
    const [tipo, setTipo] = useState("ingreso"); // Por defecto es ingreso
    const [monto, setMonto] = useState(""); // Monto como string para manejar el input
    const [categoria, setCategoria] = useState(""); // Categoría como string para manejar el input
    const [descripcion, setDescripcion] = useState(""); // Descripción como string para manejar el input
    const [mensaje, setMensaje] = useState(""); // Mensaje para mostrar al usuario
    const [categorias, setCategorias] = useState([]); // Array para las categorías

    // Cargar las categorías al cargar el componente
    useEffect(() => {
        async function fetchCategorias() {
            let url = import.meta.env.VITE_API_URL; // Usar variable de entorno para la URL base
            const res = await fetch(url +"/transacciones/categorizar", { // Endpoint para obtener categorías
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token") // Enviar token de autenticación
                }
            });
            const data = await res.json(); // Parsear la respuesta JSON
            setCategorias(data.map(c => c.categoria)); // Extraer solo el nombre de la categoría
        }
        fetchCategorias(); // Llamar a la función para cargar categorías
    }, []);

    async function handleSubmit(e) {
        // prevenir el comportamiento por defecto del formulario
        e.preventDefault();
        let url = import.meta.env.VITE_API_URL; // Usar variable de entorno para la URL base
        const res = await fetch(url + "/transacciones", { // Endpoint para agregar transacción
            method: "POST", // Método POST para enviar datos
            headers: { 
                "Content-Type": "application/json", // Tipo de contenido JSON
                Authorization: "Bearer " + localStorage.getItem("token") // Enviar token de autenticación
            },
            body: JSON.stringify({ // Datos de la transacción
                tipo,
                monto: Number(monto),
                categoria,
                descripcion
            })
        });
        if (res.ok) { // Si la respuesta es OK, la transacción se agregó correctamente
            setMensaje("Transacción agregada correctamente");
            setMonto("");
            setCategoria("");
            setDescripcion("");
        } else {
            setMensaje("Error al agregar transacción"); // Si hubo un error, mostrar mensaje de error
        }
    }

    return (
        <div className="add-transaction-outer">
            <h2 className="add-transaction-title">Agregar Transacción</h2>
            <form onSubmit={handleSubmit} className="add-transaction-form"> 
                <div>
                    <label>Tipo:</label>
                    <select value={tipo} onChange={e => setTipo(e.target.value)}> 
                        <option value="ingreso">Ingreso</option>
                        <option value="gasto">Gasto</option>
                    </select>
                </div>
                <div>
                    <label>Monto:</label>
                    <input
                        type="number"
                        value={monto}
                        onChange={e => setMonto(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Categoría:</label>
                    <input
                        list="categorias"
                        value={categoria}
                        onChange={e => setCategoria(e.target.value)}
                        required
                        placeholder="Escribí o elegí una categoría"
                    />
                    <datalist id="categorias">
                        {categorias.map((cat, i) => (
                            <option key={i} value={cat} />
                        ))}
                    </datalist>
                </div>
                <div>
                    <label>Descripción:</label>
                    <input
                        value={descripcion}
                        onChange={e => setDescripcion(e.target.value)}
                    />
                </div>
                {mensaje && <p className="add-transaction-message">{mensaje}</p>}
            </form>
            <button
                className="add-transaction-btn"
                type="submit"
                onClick={e => {
                    // Para que el botón funcione igual que el submit del form
                    e.preventDefault();
                    handleSubmit(e);
                }}
            >
                Agregar
            </button>
        </div>
    );
}
