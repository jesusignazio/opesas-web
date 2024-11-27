import React, { useState, useEffect } from 'react';

function PreguntasComponent({ preguntas }) {
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
                    <div className="card-body">
                        <h4 className="card-title" style={{ marginBottom: '20px' }}>
                            {preguntaActual.enunciado}
                        </h4>
                        <form>
                            {preguntaActual.opciones.map((opcion, index) => {
                                let estiloOpcion = {
                                    padding: '10px',
                                    marginBottom: '10px',
                                    borderRadius: '5px',
                                    border: '1px solid #ddd', // Mantiene un borde consistente
                                    backgroundColor: 'transparent', // Fondo neutral por defecto
                                    transition: 'background-color 0.3s ease', // Animación suave
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
                                    >
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="opciones"
                                            id={`opcion-${index}`}
                                            checked={seleccion === index} // Vinculación con el estado
                                            onChange={() => manejarSeleccion(index)}
                                            disabled={revelada} // Desactiva después de responder
                                        />
                                        <label
                                            className="form-check-label"
                                            htmlFor={`opcion-${index}`}
                                            style={{ marginLeft: '10px' }} // Separación entre el radio y el texto
                                        >
                                            {opcion}
                                        </label>
                                    </div>
                                );
                            })}
                        </form>
                        {revelada && (
                            <p
                                className="mt-3"
                                style={{
                                    marginTop: '20px',
                                    padding: '10px', // Agregar padding para mantener el tamaño consistente
                                    backgroundColor: '#f1f1f1', // Color de fondo neutral para feedback
                                    borderRadius: '5px', // Bordes redondeados
                                    border: '1px solid #ccc', // Borde de feedback consistente
                                    boxSizing: 'border-box', // Asegura que padding no afecte el ancho
                                    width: '100%', // Mantiene el ancho consistente
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
