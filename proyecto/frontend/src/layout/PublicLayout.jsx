import { Outlet } from 'react-router-dom';

export default function PublicLayout() {
    return (
        <div>
            <Outlet /> {/* Renderiza los componentes hijos dentro de este layout */}
        </div>
    );
}
