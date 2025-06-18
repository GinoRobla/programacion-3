import { useEffect, useState } from "react";
import axios from "axios";
import ListaTarjetas from "./ListaTarjetas";

const TraerPersonas = () => {
    const [personas, setPersonas] = useState([]);

    useEffect(() => {
        const fetchPersonas = async () => {
            try {
                const res = await axios.get("http://localhost:3000/api/personas");
                setPersonas(res.data);
            } catch (err) {
                console.error("Error al traer personas:", err);
            }
        };
        fetchPersonas();
    }, []);

    return (
        <div>
            <ListaTarjetas personas={personas} />
        </div>
    );
};

export default TraerPersonas;