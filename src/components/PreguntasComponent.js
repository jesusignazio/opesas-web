import React, { useState, useEffect } from 'react';

function PreguntasComponent({ preguntas, titulo }) {
    const tituloStripped = titulo.replace('•', '');
    const [preguntaActual, setPreguntaActual] = useState(null);
    const [seleccion, setSeleccion] = useState(null); // Índice de la opción seleccionada
    const [revelada, setRevelada] = useState(false); // Si la respuesta y feedback están revelados

    useEffect(() => {
        if (preguntas.length > 0) {
            mostrarPreguntaAleatoria();
        }
    }, [preguntas]);

    const mostrarPreguntaAleatoria = () => {
        const indiceAleatorio = Math.floor(Math.random() * preguntas.length);
        setPreguntaActual(preguntas[indiceAleatorio]);
        setSeleccion(null); // Reinicia la selección
        setRevelada(false); // Oculta la respuesta y el feedback
    };

    const manejarSeleccion = (indice) => {
        setSeleccion(indice);
        setRevelada(true); // Revela el resultado y el feedback
    };

    return (
        <div style={{ margin: '20px', padding: '15px' }}>
            {preguntaActual && (
                <div className="card mb-3" style={{ marginBottom: '30px', padding: '15px' }}>
                    {tituloStripped && (
                        <h3 style={{ marginBottom: '20px', color: '#00aaff' }}>{tituloStripped}</h3>
                    )}
                    <div className="card-body">
                        <h4 className="card-title" style={{ marginBottom: '20px' }}>
                            {preguntaActual.enunciado}
                        </h4>
                        <div>
                            {preguntaActual.opciones.map((opcion, index) => {
                                let estiloOpcion = {
                                    padding: '10px',
                                    marginBottom: '10px',
                                    borderRadius: '5px',
                                    border: '1px solid #ddd',
                                    backgroundColor: 'transparent',
                                    transition: 'background-color 0.3s ease',
                                    cursor: 'pointer',
                                };

                                if (revelada) {
                                    if (index === preguntaActual.correcta) {
                                        estiloOpcion.backgroundColor = '#d4edda'; // Verde claro para correcta
                                        estiloOpcion.border = '1px solid #28a745'; // Verde borde
                                    } else if (index === seleccion) {
                                        estiloOpcion.backgroundColor = '#f8d7da'; // Rojo claro para incorrecta
                                        estiloOpcion.border = '1px solid #dc3545'; // Rojo borde
                                    }
                                }

                                return (
                                    <div
                                        key={index}
                                        style={estiloOpcion}
                                        onClick={() => manejarSeleccion(index)}
                                    >
                                        {opcion}
                                    </div>
                                );
                            })}
                        </div>
                        {revelada && (
                            <p
                                className="mt-3"
                                style={{
                                    marginTop: '20px',
                                    padding: '10px',
                                    backgroundColor: '#f1f1f1',
                                    borderRadius: '5px',
                                    border: '1px solid #ccc',
                                    boxSizing: 'border-box',
                                    width: '100%',
                                }}
                            >
                                <strong>Feedback:</strong> {preguntaActual.feedback}
                            </p>
                        )}
                    </div>
                </div>
            )}
            <button
                className="btn btn-primary"
                onClick={mostrarPreguntaAleatoria}
                disabled={!revelada} // Solo permite avanzar después de responder
                style={{ marginTop: '20px' }}
            >
                Siguiente
            </button>
        </div>
    );
}

export default PreguntasComponent;
