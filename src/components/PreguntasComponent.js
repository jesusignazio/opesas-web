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
{tituloStripped && <h3 style={{ marginBottom: '20px', color: '#00aaff' }}>{tituloStripped}</h3>}
                    <div className="card-body">
                        <h4 className="card-title" style={{ marginBottom: '20px' }}>
                            {preguntaActual.enunciado}
                        </h4>
                        <form>
    {preguntaActual.opciones.map((opcion, index) => {
        const estiloContenedor = {
            display: 'flex',
            alignItems: 'center', // Alinea verticalmente
            gap: '10px', // Espacio entre el radio button y el texto
            marginBottom: '10px',
        };

        const estiloLabel = {
            margin: 0, // Elimina márgenes
            lineHeight: '1.5', // Asegura una altura de línea adecuada
            wordBreak: 'break-word', // Permite dividir texto largo
        };

        return (
            <div key={index} style={estiloContenedor}>
                <input
                    className="form-check-input"
                    type="radio"
                    name="opciones"
                    id={`opcion-${index}`}
                    checked={seleccion === index}
                    onChange={() => manejarSeleccion(index)}
                    disabled={revelada}
                />
                <label
                    htmlFor={`opcion-${index}`}
                    style={estiloLabel}
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
