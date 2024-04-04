// CadastroVeiculo.js
import { useEffect, useState } from 'react';

export default function CadastroVeiculo() {
  const [modelo, setModelo] = useState('');
  const [anoFabricacao, setAnoFabricacao] = useState('');
  const [marca, setMarca] = useState('');
  const [tipoVeiculo, setTipoVeiculo] = useState('carro');
  const [quantidadePortas, setQuantidadePortas] = useState('');
  const [passageirosMoto, setPassageirosMoto] = useState('1');
  const [mensagem, setMensagem] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [veiculos, setVeiculos] = useState([])

  const salvarVeiculo = async () => {
    setEnviando(true);

    let data;

    try {
      if (tipoVeiculo === 'carro') {
        if (!modelo || !anoFabricacao || !marca || !quantidadePortas) {
          throw new Error('Por favor, preencha todos os campos.');
        }

        data = {
          modelo,
          anoFabricacao: parseInt(anoFabricacao),
          marca,
          tipoVeiculo,
          quantidadePortas: parseInt(quantidadePortas),
        };
      } else if (tipoVeiculo === 'moto') {
        if (!modelo || !anoFabricacao || !marca || !passageirosMoto) {
          throw new Error('Por favor, preencha todos os campos.');
        }

        data = {
          modelo,
          anoFabricacao: parseInt(anoFabricacao),
          marca,
          tipoVeiculo,
          rodas: 2,
          passageiros: parseInt(passageirosMoto),
        };
      }

      const response = await fetch('/api/veiculos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Erro ao cadastrar veículo');
      }
      carregarVeiculos()
      setMensagem('Veículo cadastrado com sucesso!');
      setModelo('');
      setAnoFabricacao('');
      setMarca('');
      setQuantidadePortas('');
      setPassageirosMoto('1');
    } catch (error) {
      console.error('Erro ao cadastrar veículo:', error);
      setMensagem(error.message);
    } finally {
      setEnviando(false);
    }
  };
  const carregarVeiculos = async () => {
    try {
      const response = await fetch('/api/veiculos', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Erro ao carregar veículos');
      }

      const data = await response.json();
      setVeiculos(data);
    } catch (error) {
      console.error('Erro ao carregar veículos:', error);
      setMensagem('Erro ao carregar veículos. Por favor, tente novamente.');
    }
  };
  const excluirVeiculo = async (index) => {
    try {
      const response = await fetch(`/api/veiculos?index=${index}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Erro ao excluir veículo');
      }
  
      const veiculosAtualizados = [...veiculos];
      veiculosAtualizados.splice(index, 1);
      setVeiculos(veiculosAtualizados);
      setMensagem('Veículo excluído com sucesso!');
    } catch (error) {
      console.error('Erro ao excluir veículo:', error);
      setMensagem('Erro ao excluir veículo. Por favor, tente novamente.');
    }
  };
  useEffect(() => {
    carregarVeiculos();
  }, []);

  return (
    <div>
      <h1>Cadastro de Veículo</h1>
      <label>
        Modelo:
        <input type="text" value={modelo} onChange={(e) => setModelo(e.target.value)} />
      </label>
      <br />
      <label>
        Ano de Fabricação:
        <input type="number" value={anoFabricacao} onChange={(e) => setAnoFabricacao(e.target.value)} />
      </label>
      <br />
      <label>
        Marca:
        <input type="text" value={marca} onChange={(e) => setMarca(e.target.value)} />
      </label>
      <br />
      <label>
        Tipo de Veículo:
        <select value={tipoVeiculo} onChange={(e) => setTipoVeiculo(e.target.value)}>
          <option value="carro">Carro</option>
          <option value="moto">Moto</option>
        </select>
      </label>
      <br />
      {tipoVeiculo === 'carro' && (
        <label>
          Quantidade de Portas (entre 2 e 4):
          <input type="number" value={quantidadePortas} onChange={(e) => setQuantidadePortas(e.target.value)} />
        </label>
      )}
      {tipoVeiculo === 'moto' && (
        <label>
          Passageiros (1 ou 2):
          <select value={passageirosMoto} onChange={(e) => setPassageirosMoto(e.target.value)}>
            <option value="1">1</option>
            <option value="2">2</option>
          </select>
        </label>
      )}
      <br />
      <button disabled={enviando} onClick={salvarVeiculo}>Salvar Veículo</button>
      {mensagem && <p>{mensagem}</p>}

      <div>
      <h2>Veículos Cadastrados</h2>
      <ul>
        {veiculos.map((veiculo, index) => (
          <li key={index}>
            {veiculo.modelo},{veiculo.anoFabricacao}
            <button onClick={() => excluirVeiculo(index)}>Excluir</button>
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
}
