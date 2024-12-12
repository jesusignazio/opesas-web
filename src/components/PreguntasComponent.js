import React, { useState, useEffect } from 'react';
import '../App.css';

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
        const preguntaSeleccionada = preguntas[indiceAleatorio];
        //preguntaSeleccionada.shuffle(); // Baraja las opciones antes de establecer la pregunta actual
        setPreguntaActual(preguntaSeleccionada); // Actualiza la pregunta actual
        setSeleccion(null); // Reinicia la selección
        setRevelada(false); // Oculta la respuesta y el feedback
    };
    

    const manejarSeleccion = (indice) => {
        setSeleccion(indice);
        setRevelada(true); // Revela el resultado y el feedback
    };

    return (
        <div className="preguntas-container">
            {preguntaActual && (
                <div className="card mb-3">
                    {tituloStripped && <h3 className="titulo-pregunta">{tituloStripped}</h3>}
                    <div className="card-body">
                        <h4 className="card-title">{preguntaActual.enunciado}</h4>
                        <div>
                            {preguntaActual.opciones.map((opcion, index) => {
                                let estiloOpcion = "opcion";
                                if (revelada) {
                                    if (index === preguntaActual.correcta) {
                                        estiloOpcion += " correcta";
                                    } else if (index === seleccion) {
                                        estiloOpcion += " incorrecta";
                                    }
                                }
                                return (
                                    <div
                                        key={index}
                                        className={estiloOpcion}
                                        onClick={() => manejarSeleccion(index)}
                                    >
                                        {opcion}
                                    </div>
                                );
                            })}
                        </div>
                        {revelada && (
                            <p className="feedback">
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
            >
                Siguiente
            </button>
        </div>
    );
}

export default PreguntasComponent;
