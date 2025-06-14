import { useEffect, useState } from "react";
import axios from "axios";
import ListaTarjetas from "./ListaTarjetas";

const TraerPersonas = () => {
    const [personas, setPersonas] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3000/api/personas")
        .then(res => setPersonas(res.data))
        .catch(err => console.error("Error al traer personas:", err));
    }, []);

    return (
    <div>
        <h2 style={{ textAlign: "center" }}>Lista de Personas</h2>
        <ListaTarjetas personas={personas} />
    </div>
    );
};

export default TraerPersonas;