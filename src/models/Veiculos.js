
class Veiculo {
  constructor(modelo, anoFabricacao, marca) {
    this.modelo = modelo;
    this.anoFabricacao = anoFabricacao;
    this.marca = marca;
  }

  toJSON() {
    return {
      modelo: this.modelo,
      anoFabricacao: this.anoFabricacao,
      marca: this.marca,
    };
  }
}

class Carro extends Veiculo {
  constructor(modelo, anoFabricacao, marca, quantidadePortas) {
    super(modelo, anoFabricacao, marca);
    if (quantidadePortas < 2 || quantidadePortas > 4) {
      throw new Error("Quantidade de portas inválida para um carro. Deve ser entre 2 e 4.");
    }
    this.quantidadePortas = quantidadePortas;
  }

  toJSON() {
    const veiculoJSON = super.toJSON();
    return {
      ...veiculoJSON,
      quantidadePortas: this.quantidadePortas,
    };
  }
}

class Moto extends Veiculo {
  constructor(modelo, anoFabricacao, marca, passageiros) {
    super(modelo, anoFabricacao, marca);
    this.rodas = 2;
    this.passageiros = passageiros;
  }

  toJSON() {
    const veiculoJSON = super.toJSON();
    return {
      ...veiculoJSON,
      rodas: this.rodas,
      passageiros: this.passageiros,
    };
  }
}

module.exports = {
  Veiculo,
  Carro,
  Moto,
};
