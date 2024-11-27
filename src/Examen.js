class Examen {
    constructor(preguntas = []) {
        this.preguntas = preguntas; // Lista de preguntas del examen
        this.respuestasUsuario = Array(preguntas.length).fill(null); // Respuestas del usuario, inicialmente vacías
    }

    agregarPregunta(pregunta) {
        this.preguntas.push(pregunta);
        this.respuestasUsuario.push(null); // Añade un espacio para la nueva respuesta
    }

    obtenerPreguntas() {
        return this.preguntas;
    }

    obtenerNumeroDePreguntas() {
        return this.preguntas.length;
    }

    eliminarPregunta(indice) {
        if (indice >= 0 && indice < this.preguntas.length) {
            this.preguntas.splice(indice, 1);
            this.respuestasUsuario.splice(indice, 1); // También elimina la respuesta asociada
        } else {
            throw new Error('Índice fuera de rango');
        }
    }

    responderPregunta(indice, respuesta) {
        if (indice >= 0 && indice < this.respuestasUsuario.length) {
            this.respuestasUsuario[indice] = respuesta; // Guarda la respuesta del usuario
        } else {
            throw new Error('Índice fuera de rango');
        }
    }

    puntuacion() {
        const totalPreguntas = this.preguntas.length;
        if (totalPreguntas === 0) return 0;

        let aciertos = 0;
        this.preguntas.forEach((pregunta, index) => {
            if (pregunta.verificarRespuesta(this.respuestasUsuario[index])) {
                aciertos++;
            }
        });

        return (aciertos / totalPreguntas) * 100; // Porcentaje de aciertos
    }
}
