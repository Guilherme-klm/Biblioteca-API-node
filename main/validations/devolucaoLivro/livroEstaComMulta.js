const { BusinessError } = require("../../exception/businessError")
var moment = require('moment');

function validar(aluguel) {
    let multa = calcularMulta(aluguel)

    if(multa > 0) {
        throw new BusinessError(`Nao é possivel devolver o livro pois ele tem multa de R$ ${multa},00`)
    }
}

function calcularMulta(aluguel) {
    if(aluguel.multaPaga) {
        return 0
    }

    const multaPorDia = 2.0;
    // let dataDevolucao = moment("17-06-2023","DD/MM/YYYY");
    let dataDevolucao = moment().format("DD/MM/YYYY");

    if (dataDevolucao == aluguel.dataDevolucaoProgramado) {
        return 0;
    }

    let diasComMulta = moment(dataDevolucao, "DD/MM/YYYY").diff(moment(aluguel.dataDevolucaoProgramado, "DD/MM/YYYY"), 'days');
    
    if (diasComMulta < 0) {
        return 0;
    } 

    aluguel.multa = diasComMulta * multaPorDia;

    return aluguel.multa;
}


module.exports = {
    validar
}