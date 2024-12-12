class Pregunta {
    constructor(enunciado, opciones, correcta, feedback, categorias = []) {
        this.enunciado = enunciado; // Enunciado de la pregunta
        this.opciones = opciones; // Lista de opciones de respuesta
        this.correcta = correcta; // Índice o valor de la opción correcta
        this.feedback = feedback; // Comentario sobre la respuesta
        this.categorias = categorias; // Lista de categorías asociadas
    }

    // Método para verificar si una respuesta es correcta
    verificarRespuesta(respuesta) {
        return this.correcta === respuesta;
    }

    // Método para obtener el feedback de la respuesta
    obtenerFeedback() {
        return this.feedback;
    }

    // Método para mostrar las categorías como una cadena
    obtenerCategorias() {
        return this.categorias.join(', ');
    }

    // Método para barajar las opciones manteniendo la respuesta correcta
    shuffle() {
        const opcionesConIndices = this.opciones.map((opcion, index) => ({
            opcion,
            index,
        }));

        // Barajar el array usando Fisher-Yates Shuffle
        for (let i = opcionesConIndices.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [opcionesConIndices[i], opcionesConIndices[j]] = [opcionesConIndices[j], opcionesConIndices[i]];
        }

        // Actualizar opciones y el índice de la respuesta correcta
        this.opciones = opcionesConIndices.map(item => item.opcion);
        this.correcta = opcionesConIndices.findIndex(item => item.index === this.correcta);
    }
}
