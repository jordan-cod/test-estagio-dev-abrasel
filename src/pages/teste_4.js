import React, { useState } from 'react';

export default function CepSearch() {
  const [ceps, setCeps] = useState(['', '', '', '', '']);
  const [cepData, setCepData] = useState([]);

  const handleInputChange = (index, value) => {
    const newCeps = [...ceps];
    newCeps[index] = value;
    setCeps(newCeps);
  };

  const fetchData = async () => {
    try {
      const newData = [];
      for (let i = 0; i < ceps.length; i++) {
        const response = await fetch(`https://viacep.com.br/ws/${ceps[i]}/json/`);
        if (!response.ok) {
          throw new Error('Erro ao buscar o CEP');
        }
        const data = await response.json();
        newData.push(data);
      }
      setCepData(newData);
    } catch (error) {
      console.error('Erro ao buscar CEPs:', error);
    }
  };

  const handleSearch = () => {
    fetchData();
  };

  return (
    <div>
      <h1>Consulta de CEPs</h1>
      <div>
        {ceps.map((cep, index) => (
          <input
            key={index}
            type="text"
            value={cep}
            onChange={(e) => handleInputChange(index, e.target.value)}
            placeholder="Digite o CEP"
          />
        ))}
      </div>
      <button onClick={handleSearch}>Buscar</button>
      <div>
        {cepData.map((data, index) => (
          <div key={index}>
            <h2>CEP: {data.cep}</h2>
            <p>Logradouro: {data.logradouro}</p>
            <p>Bairro: {data.bairro}</p>
            <p>Cidade: {data.localidade}</p>
            <p>Estado: {data.uf}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
