// pages/api/veiculos.js
import { Carro, Moto } from '../../models/Veiculos';
import fs from 'fs';
import path from 'path';

const veiculosFilePath = path.join(process.cwd(), 'src/data/veiculos.json');

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { modelo, anoFabricacao, marca, tipoVeiculo, quantidadePortas, rodas, passageiros } = req.body;

    try {
      let veiculo;

      if (tipoVeiculo === 'carro') {
        veiculo = new Carro(modelo, anoFabricacao, marca, quantidadePortas);
      } else if (tipoVeiculo === 'moto') {
        veiculo = new Moto(modelo, anoFabricacao, marca, rodas, passageiros); // Passando rodas e passageiros diretamente para a moto
      } else {
        throw new Error('Tipo de veículo inválido.');
      }

      const data = fs.readFileSync(veiculosFilePath, 'utf8');
      const veiculos = JSON.parse(data);
      veiculos.push(veiculo);

      fs.writeFileSync(veiculosFilePath, JSON.stringify(veiculos, null, 2));

      res.status(201).json(veiculo.toJSON());
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  if (req.method === 'GET') {
    try {
      const data = fs.readFileSync(veiculosFilePath, 'utf8');
      const veiculos = JSON.parse(data);
      res.status(200).json(veiculos);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao obter veículos.' });
    }
  }
  if (req.method === 'DELETE') {
    try {
      const index = parseInt(req.query.index);
      if (isNaN(index)) {
        throw new Error('Índice inválido');
      }

      const data = fs.readFileSync(veiculosFilePath, 'utf8');
      const veiculos = JSON.parse(data);

      if (index < 0 || index >= veiculos.length) {
        throw new Error('Índice fora dos limites');
      }

      veiculos.splice(index, 1);
      fs.writeFileSync(veiculosFilePath, JSON.stringify(veiculos, null, 2));

      res.status(200).json({ message: 'Veículo excluído com sucesso' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
    res.status(405).end(`Método ${req.method} não permitido`);
  }
}
