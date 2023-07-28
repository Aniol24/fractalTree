
class Recta{

    constructor(point1, point2) {
        this.point1 = point1;
        this.point2 = point2;
    }
    rotar(angleDegrees) {
        // Convertir el ángulo de grados a radianes
        const angleRadians = this.degreesToRadians(angleDegrees);

        // Calcular las coordenadas del punto 2 después de la rotación
        const x2Rotated = Math.cos(angleRadians) * (this.point2.x - this.point1.x) - Math.sin(angleRadians) * (this.point2.y - this.point1.y) + this.point1.x;
        const y2Rotated = Math.sin(angleRadians) * (this.point2.x - this.point1.x) + Math.cos(angleRadians) * (this.point2.y - this.point1.y) + this.point1.y;

        // Crear un nuevo objeto Point para el punto 2 rotado
        const point2Rotated = new Point(x2Rotated, y2Rotated);

        // Devolver una nueva instancia de la clase Recta con los puntos rotados
        return new Recta(this.point1, point2Rotated);
    }
    dibuixar() {

        ctx.beginPath();
        ctx.moveTo(this.point1.x, this.point1.y);
        ctx.lineTo(this.point2.x, this.point2.y);
        ctx.stroke();

    }
    degreesToRadians(degrees) {
        return degrees * (Math.PI / 180);
    }
    getUnitari() {
        // Obtener el vector dirección de la recta
        const vectorDireccion = new Point(this.point2.x - this.point1.x, this.point2.y - this.point1.y);

        // Calcular la magnitud del vector dirección
        const magnitud = Math.sqrt(vectorDireccion.x ** 2 + vectorDireccion.y ** 2);

        // Crear el vector unitario dividiendo cada componente por su magnitud
        const vectorUnitario = new Point(vectorDireccion.x / magnitud, vectorDireccion.y / magnitud);

        // Calcular las coordenadas del punto final para el vector unitario
        const puntoFinalUnitario = new Point(this.point2.x + vectorUnitario.x, this.point2.y + vectorUnitario.y);

        // Devolver una nueva instancia de la clase Recta que representa el vector unitario
        return new Recta(this.point2, puntoFinalUnitario);
    }

    alargar(magnitud) {

        const vectorDireccion = new Point(this.point2.x - this.point1.x, this.point2.y - this.point1.y);

        const magnitudOriginal = Math.sqrt(vectorDireccion.x ** 2 + vectorDireccion.y ** 2);

        const vectorUnitario = new Point(vectorDireccion.x / magnitudOriginal, vectorDireccion.y / magnitudOriginal);

        const vectorAlargado = new Point(vectorUnitario.x * magnitud, vectorUnitario.y * magnitud);
        const puntoFinalAlargado = new Point(this.point1.x + vectorAlargado.x, this.point1.y + vectorAlargado.y);

        return new Recta(this.point1, puntoFinalAlargado);
    }

    getLlarg(){

        return Math.sqrt((this.point2.x - this.point1.x) ** 2 + (this.point2.y - this.point1.y) ** 2 )
    }

}