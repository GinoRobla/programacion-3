import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Transactions from "./Transactions";
import AddTransaction from "./AddTransaction";
import HomeContent from "./HomeContent";

export default function Inicio() {
    const [section, setSection] = useState("homeContent"); // Estado para manejar la sección actual

    let content; // Determinar el contenido a mostrar según la sección actual
    if (section === "transactions") content = <Transactions />;
    else if (section === "homeContent") content = <HomeContent />;
    else if (section === "add") content = <AddTransaction />;

    return (
        <div>
            <Sidebar onSectionChange={setSection} currentSection={section} />
            <main>{content}</main>
        </div>
    );
}