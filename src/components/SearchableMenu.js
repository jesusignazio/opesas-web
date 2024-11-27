import React, { useState } from 'react';

const SearchableMenu = ({ groupedMenuItems, setInicio }) => {
    const [searchTerm, setSearchTerm] = useState('');

    // Filtrar elementos del menú según el término de búsqueda
    const filteredItems = Object.entries(groupedMenuItems).reduce(
        (result, [bloqueTitle, items]) => {
            const filteredItems = items.filter(item =>
                item.title.toLowerCase().includes(searchTerm.toLowerCase())
            );

            if (filteredItems.length > 0) {
                result[bloqueTitle] = filteredItems; // Solo añade grupos con resultados
            }

            return result;
        },
        {}
    );

    return (
        <div>
            {/* Barra de búsqueda */}
            <form className="mb-3">
                <input
                    className="form-control"
                    type="search"
                    placeholder="Buscar"
                    aria-label="Buscar"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)} // Actualizar el estado
                />
            </form>

            {/* Resultados de la búsqueda */}
            <div className="search-results">
                {Object.entries(filteredItems).length > 0 ? (
                    Object.entries(filteredItems).map(([bloqueTitle, items]) => (
                        <div key={bloqueTitle} className="mb-3">
                            <h6>{bloqueTitle}</h6>
                            <ul className="list-group">
                                {items.map((item, index) => (
                                    <li key={index} className="list-group-item">
                                        <a
                                            href="#"
                                            onClick={() => {
                                                setInicio(false);
                                                console.log(`Cargando: ${item.archivo}`);
                                            }}
                                        >
                                            {item.title}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))
                ) : (
                    <p className="text-muted">No se encontraron resultados.</p>
                )}
            </div>
        </div>
    );
};

export default SearchableMenu;
