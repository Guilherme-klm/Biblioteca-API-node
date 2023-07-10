const aluguelLivroRepository = require('../../db/aluguelRepository');
const { BusinessError } = require("../../exception/businessError")
var moment = require('moment');

async function validar(aluguel) {
    let multa = await calcularMulta(aluguel)
    await aluguelLivroRepository.atualizarMulta(aluguel.alu_id, multa)

    if(multa > 0) {
        throw new BusinessError(`Nao é possivel devolver o livro pois ele tem multa de R$ ${multa},00`)
    }
}

async function calcularMulta(aluguel) {
    if(aluguel.alu_multapaga) {
        return 0
    }

    const multaPorDia = 2.0;
    let dataDevolucao = moment().format("DD/MM/YYYY");

    if (dataDevolucao == aluguel.alu_datadevolucaoprogramado) {
        return 0;
    }

    let diasComMulta = moment(dataDevolucao, "DD/MM/YYYY").diff(moment(aluguel.alu_datadevolucaoprogramado, "DD/MM/YYYY"), 'days');

    if (diasComMulta < 0) {
        return 0;
    }

    aluguel.alu_multa = diasComMulta * multaPorDia;
    
    return aluguel.alu_multa;
}


module.exports = {
    validar
}