

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

ctx.translate(centerX, centerY);

ctx.scale(1, -1);

const angle = 360/11;
const ratio = 0.75
const puntoInicial = new Point(0, -100);
const puntoFinal = new Point(0, 0);
const rectaOriginal = new Recta(puntoInicial, puntoFinal);

rectaOriginal.dibuixar();

recusiveProva(rectaOriginal, 0);

function recusiveProva(recta, i){

    if(i > 8){
        return;
    }

    const novaRectaEsq = recta.getUnitari().rotar(angle).alargar(recta.getLlarg()*ratio);
    novaRectaEsq.dibuixar();

    const novaRectaDreta = recta.getUnitari().rotar(-angle).alargar(recta.getLlarg()*ratio);
    novaRectaDreta.dibuixar();

    i++;
    recusiveProva(novaRectaEsq, i);
    recusiveProva(novaRectaDreta, i);

}






