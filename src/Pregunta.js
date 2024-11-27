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
}