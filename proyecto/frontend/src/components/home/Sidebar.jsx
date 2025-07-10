import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
    return (
        <div className="sidebar">
            <h3>Control de gastos</h3>
            <ul>
                <li>
                    <Link to="/inicio">Inicio</Link>
                </li>
                <li>
                    <Link to="/inicio/historial">Historial</Link>
                </li>
                <li>
                    <Link to="/inicio/agregar">Agregar</Link>
                </li>
                <div className="logout">
                    <li>
                        <Link to="/login" onClick={() => localStorage.removeItem("token")}> 
                            Cerrar sesión
                        </Link>
                    </li>
                </div>
            </ul>
        </div>
    );
}
