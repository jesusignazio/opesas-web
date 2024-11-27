import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Estilos de Bootstrap
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // JS para interactividad
import PreguntasComponent from './components/PreguntasComponent';
import SearchableMenu from './components/SearchableMenu';

function App() {
    const [inicio, setInicio] = useState(true);
    const [casos, setCasos] = useState(false);
    const [elementPreguntas, showPreguntas] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [preguntas, setPreguntas] = useState([]); // Estado para las preguntas cargadas
    const [error, setError] = useState(null); // Estado para errores

    const cargarPreguntas = (archivo) => {
        fetch(`/Tests/${archivo}`)
            .then((response) => {
                if (!response.ok) throw new Error('Error al cargar el archivo.');
                return response.json();
            })
            .then((data) => setPreguntas(data))
            .catch((err) => setError(err.message));
    };

    const getBlockColor = (bloque) => {
        const colors = {
            1: 'purple',
            2: 'yellow',
            3: 'pink',
            4: 'skyblue',
            5: 'orange',
            6: 'red',
            7: 'blue',
            8: 'green',
            9: 'black',
        };
        return colors[bloque] || 'gray'; // Por defecto, gris si no se encuentra el bloque
    };

    const groupedMenuItems = {
        '1: Urgencias': [
            { title: '42: Respuestas a urgencias y emergencias en el SSPA', archivo: 'tema42.json', bloque: 1 },
            { title: '43: Cuidados en paciente crítico: soporte vital y traslados', archivo: 'tema43.json', bloque: 1 },
            { title: '44: Valoración y cuidados al paciente quirúrgico', archivo: 'tema44.json', bloque: 1 },
            { title: '45: Manejo de heridas y cuidados de la piel', archivo: 'tema45.json', bloque: 1 }
        ],
        '2: Epidemiología y salud pública': [
            { title: '12: Epidemiología, demografía, salud pública y planes de salud', archivo: 'tema12.json', bloque: 2 },
            { title: '31: Educación para la salud: planificación y técnicas', archivo: 'tema31.json', bloque: 2 },
            { title: '33: Epidemiología: prevención, infecciones, higiene y aislamiento', archivo: 'tema33.json', bloque: 2 },
            { title: '37: Promoción de actividad física y alimentación saludable', archivo: 'tema37.json', bloque: 2 },
            { title: '41: Prevención y atención a adicciones y tabaquismo', archivo: 'tema41.json', bloque: 2 },
            { title: '59: Examen de salud para mayores de 65 años', archivo: 'tema59.json', bloque: 2 },
            { title: '62: Comunidad: promoción de salud y participación comunitaria', archivo: 'tema62.json', bloque: 2 }
        ],
        '3: Materno-infantil': [
            { title: '47: Desarrollo de la conducta humana', archivo: 'tema47.json', bloque: 3 },
            { title: '48: Valoración y cuidados al recién nacido sano', archivo: 'tema48.json', bloque: 3 },
            { title: '49: Valoración y cuidados al recién nacido enfermo', archivo: 'tema49.json', bloque: 3 },
            { title: '50: Cuidados en la infancia', archivo: 'tema50.json', bloque: 3 },
            { title: '51: Cuidados en la adolescencia', archivo: 'tema51.json', bloque: 3 },
            { title: '52: Género y salud', archivo: 'tema52.json', bloque: 3 },
            { title: '53: Atención a violencia de género y en infancia', archivo: 'tema53.json', bloque: 3 },
            { title: '54: Valoración y cuidados de la mujer gestante', archivo: 'tema54.json', bloque: 3 },
            { title: '55: Atención sanitaria a la diversidad de género', archivo: 'tema55.json', bloque: 3 },
            { title: '56: Promoción de la salud sexual y planificación familiar', archivo: 'tema56.json', bloque: 3 }
        ],
        '4: Cuidados de enfermería': [
            { title: '38: Cuidados a personas con alteraciones nutricionales', archivo: 'tema38.json', bloque: 4 },
            { title: '39: Ansiedad, depresión y trastornos de conducta', archivo: 'tema39.json', bloque: 4 },
            { title: '40: Trastorno mental grave y atención familiar', archivo: 'tema40.json', bloque: 4 },
            { title: '57: Cuidados a personas con enfermedades infecciosas', archivo: 'tema57.json', bloque: 4 },
            { title: '58: Autonomía, fragilidad, dependencia y discapacidad', archivo: 'tema58.json', bloque: 4 },
            { title: '63: Atención a enfermedades crónicas: valoración y cuidados', archivo: 'tema63.json', bloque: 4 },
            { title: '64: Atención al dolor: tipos, escalas y estrategias', archivo: 'tema64.json', bloque: 4 },
            { title: '65: Prevención de caídas: evaluación y cribado', archivo: 'tema65.json', bloque: 4 },
            { title: '66: Atención enfermera en situaciones de dependencia', archivo: 'tema66.json', bloque: 4 },
            { title: '67: Cuidados a personas con problemas cardiovasculares', archivo: 'tema67.json', bloque: 4 },
            { title: '68: Cuidados a personas con problemas respiratorios', archivo: 'tema68.json', bloque: 4 },
            { title: '69: Cuidados a personas con problemas endocrinológicos', archivo: 'tema69.json', bloque: 4 },
            { title: '70: Cuidados en sistema músculo-esquelético', archivo: 'tema70.json', bloque: 4 },
            { title: '71: Cuidados en sistema renal y urológico', archivo: 'tema71.json', bloque: 4 },
            { title: '72: Accesos vasculares: inserción y prevención de complicaciones', archivo: 'tema72.json', bloque: 4 },
            { title: '73: Valoración y cuidados al paciente ostomizado', archivo: 'tema73.json', bloque: 4 },
            { title: '78: Cuidados paliativos: paciente terminal y familia', archivo: 'tema78.json', bloque: 4 },
            { title: '79: Duelo: tipos, fases y cuidados', archivo: 'tema79.json', bloque: 4 }
        ],
        // Bloque 5: Fundamentos y gestión de cuidados
        '5: Fundamentos y gestión de cuidados': [
            { title: '26: Gestión de cuidados en Andalucía: continuidad y personalización', archivo: 'tema26.json', bloque: 5 },
            { title: '27: Gestión de casos: alta complejidad y dependencia', archivo: 'tema27.json', bloque: 5 },
            { title: '28: Telecontinuidad y seguimiento telefónico en Salud Responde', archivo: 'tema28.json', bloque: 5 },
            { title: '29: Fundamentos de Enfermería: modelos y teorías', archivo: 'tema29.json', bloque: 5 },
            { title: '30: Proceso enfermero: valoración, taxonomías y continuidad', archivo: 'tema30.json', bloque: 5 },
            { title: '32: Habilidades comunicativas: escucha, motivación y valoración', archivo: 'tema32.json', bloque: 5 },
            { title: '60: Atención domiciliaria y hospitalización a domicilio', archivo: 'tema60.json', bloque: 5 },
            { title: '61: Atención familiar: valoración e intervención enfermera', archivo: 'tema61.json', bloque: 5 }
        ],

        // Bloque 6: Investigación
        '6: Investigación': [
            { title: '20: Investigación cuantitativa: variables, diseños y estadística', archivo: 'tema20.json', bloque: 6 },
            { title: '21: Investigación cualitativa: métodos, fases, análisis y calidad', archivo: 'tema21.json', bloque: 6 },
            { title: '22: Proyectos de investigación: ética, biobanco y publicación', archivo: 'tema22.json', bloque: 6 },
            { title: '23: Enfermería basada en evidencia: herramientas, guías, síntesis', archivo: 'tema23.json', bloque: 6 },
            { title: '25: Bioética: conflictos, secreto, consentimiento y derechos', archivo: 'tema25.json', bloque: 6 }
        ],

        // Bloque 7: Seguridad y farmacia
        '7: Seguridad y farmacia': [
            { title: '34: Medicamentos: clasificación, toxicidad y farmacovigilancia', archivo: 'tema34.json', bloque: 7 },
            { title: '35: Prescripción farmacéutica en Andalucía: protocolos y seguimiento', archivo: 'tema35.json', bloque: 7 },
            { title: '36: Seguridad clínica en administración de medicamentos', archivo: 'tema36.json', bloque: 7 },
            { title: '45: Manejo de heridas y cuidados de la piel', archivo: 'tema45.json', bloque: 7 },
            { title: '76: Seguridad del paciente: identificación y gestión de riesgos', archivo: 'tema76.json', bloque: 7 },
            { title: '77: Seguridad del paciente: cultura y buenas prácticas', archivo: 'tema77.json', bloque: 7 }
        ],

        // Bloque 8: Planificación y gestión
        '8: Planificación y gestión': [
            { title: '10: TIC en SAS: sistemas, puesto digital, ciberseguridad', archivo: 'tema10.json', bloque: 8 },
            { title: '13: Calidad SSPA: Plan, evaluación, comisiones, acreditación', archivo: 'tema13.json', bloque: 8 },
            { title: '14: Derechos, garantías, eutanasia y personas trans y LGTBI', archivo: 'tema14.json', bloque: 8 },
            { title: '15: Responsabilidad administrativa y del personal en el SAS', archivo: 'tema15.json', bloque: 8 },
            { title: '17: Gestión sanitaria: costes, equidad y eficiencia', archivo: 'tema17.json', bloque: 8 },
            { title: '18: Planificación sanitaria, problemas, indicadores y contratos programa', archivo: 'tema18.json', bloque: 8 },
            { title: '19: Sistemas de información en atención sanitaria y DIRAYA', archivo: 'tema19.json', bloque: 8 },
            { title: '24: Gestión por procesos asistenciales integrados (PAIs)', archivo: 'tema24.json', bloque: 8 },
            { title: '75: Plan de Humanización del Sistema Sanitario Público de Andalucía', archivo: 'tema75.json', bloque: 8 }
        ], '9: Legislación': [
            { title: '1: Constitución Española: valores, derechos, salud, Jefatura y Poderes', archivo: 'tema1.json', bloque: 9 },
            { title: '2: Estatuto Andalucía: derechos, salud, competencias y organización institucional', archivo: 'tema2.json', bloque: 9 },
            { title: '3: Organización sanitaria: sistema público, derechos, planes y estrategias', archivo: 'tema3.json', bloque: 9 },
            { title: '4: Estructura sanitaria: Atención Primaria, Especializada y áreas especiales', archivo: 'tema4.json', bloque: 9 },
            { title: '5: Protección de datos y transparencia: derechos, principios, acceso', archivo: 'tema5.json', bloque: 9 },
            { title: '6: Prevención riesgos laborales: derechos, organización, participación y consulta', archivo: 'tema6.json', bloque: 9 },
            { title: '7: Igualdad género y violencia: principios, políticas, formación y planes', archivo: 'tema7.json', bloque: 9 },
            { title: '8: Estatuto personal sanitario: derechos, deberes, movilidad, retribuciones, régimen', archivo: 'tema8.json', bloque: 9 },
            { title: '9: Autonomía del paciente: información, intimidad, derechos y documentación clínica', archivo: 'tema9.json', bloque: 9 },
            { title: '10: TIC en SAS: sistemas, puesto digital, ciberseguridad, código conducta', archivo: 'tema10.json', bloque: 9 },
        ],
    };


    const filteredItems = Object.entries(groupedMenuItems).reduce(
        (result, [bloqueTitle, items]) => {
            const filtered = items.filter(item =>
                item.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
    
            if (filtered.length > 0) {
                result[bloqueTitle] = filtered;
            }
    
            return result;
        },
        {}
    );
    
    return (
        <div style={{ display: 'flex', width: '100%', height: '100vh' }}>
            {/* Sidebar con buscador y menú */}
            <div
                style={{
                    backgroundColor: '#f8f9fa',
                    borderRight: '1px solid #ddd',
                    height: '100vh', // 100% del alto de la vista
                    padding: '1rem',
                    boxSizing: 'border-box', // Asegura que padding y borde no cambien el tamaño
                    overflowY: 'auto', // Permite desplazamiento solo vertical
                    overflowX: 'hidden', // Elimina el desplazamiento horizontal
                    position: 'relative', // Asegura que el sidebar no se desplace fuera de su contenedor
                }}
            >
                {/* Barra de búsqueda */}
                <form className="mb-3">
                    <input
                        className="form-control"
                        type="search"
                        placeholder="Buscar"
                        aria-label="Buscar"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)} // Actualizar el estado
                        style={{
                            width: '100%', // Asegura que el input ocupe todo el ancho disponible
                            boxSizing: 'border-box', // Asegura que padding no afecte el ancho del input
                        }}
                    />
                </form>
    
                <ul className="nav flex-column">
                    {/* Elemento estático "Inicio" */}
                    <li className="nav-item">
                        <a
                            className="nav-link"
                            href="#"
                            onClick={() => {
                                showPreguntas(false);
                                setInicio(true);
                                setCasos(false);
                            }}
                        >
                            <small>Inicio</small>
                        </a>
                    </li>
                </ul>
                <ul className="nav flex-column">
                    {/* Elemento estático "Casos prácticos" */}
                    <li className="nav-item">
                        <a
                            className="nav-link"
                            href="#"
                            onClick={() => {
                                showPreguntas(false)
                                setInicio(false);
                                setCasos(true);
                            }}
                        >
                            <small>Casos prácticos</small>
                        </a>
                    </li>
                </ul>
    
                {/* Resultados de búsqueda dinámicos */}
                {searchTerm && (
                    <div className="search-results mt-3">
                        <h6>Resultados de búsqueda:</h6>
                        {Object.entries(filteredItems).length > 0 ? (
                            Object.entries(filteredItems).map(([bloqueTitle, items]) => (
                                <div key={bloqueTitle} className="mb-3">
                                    <h6>{bloqueTitle}</h6>
                                    <ul className="list-group">
                                        {items.map((item, index) => (
                                            <li
                                                key={index}
                                                className="list-group-item"
                                                style={{
                                                    wordWrap: 'break-word', // Maneja contenido largo
                                                    overflow: 'hidden', // Evita que se desborde
                                                    whiteSpace: 'nowrap', // Evita que el texto se envuelva
                                                    textOverflow: 'ellipsis', // Agrega puntos suspensivos
                                                    maxWidth: '230px', // Asegura que el texto no se desborde
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                }}
                                            >
                                                <a
                                                    href="#"
                                                    onClick={() => {
                                                        showPreguntas(true);
                                                        console.log("onClick");
                                                        console.log(elementPreguntas);
                                                        setCasos(true);
                                                        setInicio(false);
                                                        cargarPreguntas(item.archivo);
                                                    }}
                                                    style={{
                                                        textDecoration: 'none',
                                                        color: 'inherit',
                                                        display: 'block', // Asegura que el enlace ocupe toda la línea
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis', // Puntos suspensivos en el texto
                                                        whiteSpace: 'nowrap', // Evita que el texto se envuelva
                                                        width: '100%', // Se asegura de que el texto ocupe todo el ancho
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
                )}
    
                {/* Bloques dinámicos agrupados */}
                <div className="accordion" id="accordionExample">
                    {Object.entries(groupedMenuItems).map(([bloqueTitle, items], bloqueIndex) => (
                        <div key={bloqueIndex} className="accordion-item">
                            <h2 className="accordion-header" id={`heading${bloqueIndex}`}>
                                <button
                                    className="accordion-button collapsed"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target={`#collapse${bloqueIndex}`}
                                    aria-expanded="false"
                                    aria-controls={`collapse${bloqueIndex}`}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '10px',
                                        fontSize: '0.875rem',
                                    }}
                                >
                                    {/* Círculo de color */}
                                    <span
                                        style={{
                                            width: '15px',
                                            height: '15px',
                                            minWidth: '15px',
                                            minHeight: '15px',
                                            borderRadius: '50%',
                                            backgroundColor: getBlockColor(bloqueIndex + 1),
                                            flexShrink: 0,
                                        }}
                                    ></span>
                                    {bloqueTitle}
                                </button>
                            </h2>
                            <div
                                id={`collapse${bloqueIndex}`}
                                className="accordion-collapse collapse"
                                aria-labelledby={`heading${bloqueIndex}`}
                                data-bs-parent="#accordionExample"
                            >
                                <div className="accordion-body">
                                    <ul className="nav flex-column">
                                        {items.map((item, index) => (
                                            <li
                                                className="nav-item"
                                                key={index}
                                                style={{
                                                    wordWrap: 'break-word',
                                                    overflow: 'hidden',
                                                    whiteSpace: 'nowrap',
                                                    textOverflow: 'ellipsis', // Puntos suspensivos
                                                    maxWidth: '280px', // Limita el ancho
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                }}
                                            >
                                                <a
                                                    className="nav-link"
                                                    href="#"
                                                    onClick={() => {
                                                        setInicio(false);
                                                        cargarPreguntas(item.archivo);
                                                    }}
                                                    style={{
                                                        textDecoration: 'none',
                                                        color: 'inherit',
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis', // Puntos suspensivos en el texto
                                                        whiteSpace: 'nowrap', // Evita que el texto se envuelva
                                                        width: '100%', // Ocupa todo el ancho
                                                    }}
                                                >
                                                    <small>{item.title}</small>
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
    
            {/* Contenido principal */}
            <div
                style={{
                    flexGrow: 1,
                    width: 'calc(100% - 250px)', // Asegura que el contenido principal ocupe el espacio restante
                    padding: '1rem',
                    boxSizing: 'border-box', // Asegura que el padding no afecte el tamaño del contenedor
                    height: '100vh', // 100% del alto de la vista
                    overflow: 'auto', // Permite desplazamiento si el contenido es largo
                }}
            >
                {elementPreguntas ? (
    <PreguntasComponent preguntas={preguntas} />
) : inicio ? (
    <div>
        <h1>Bienvenido</h1>
        <p>Este es el contenido estático de Inicio.</p>
    </div>
) : casos ? (
    <div>
        <h1>Casos</h1>
        <p>Este es el contenido estático de Casos.</p>
    </div>
) : null}

            </div>
        </div>
    );
    
}

export default App;
