import React, { useState } from 'react';
import "../styles/globals.css";
import styles from '@/styles/Teste_4.module.css';

export default function CepSearch() {
  const [ceps, setCeps] = useState(['', '', '', '', '']);
  const [cepData, setCepData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (index, value) => {
    const newCeps = [...ceps];
    newCeps[index] = value;
    setCeps(newCeps);
  };

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const newData = [];
      for (let i = 0; i < ceps.length; i++) {
        if (!ceps[i]) {
          throw new Error('Por favor, preencha todos os campos de CEP.');
        }
        const response = await fetch(`https://viacep.com.br/ws/${ceps[i]}/json/`);
        if (!response.ok) {
          throw new Error('Erro ao buscar o CEP');
        }
        const data = await response.json();
        newData.push(data);
      }
      setCepData(newData);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    fetchData();
  };

  return (
    <main className={styles.main}>
      <h1>Consulta de CEPs</h1>
      <div className={styles['input-container']}>
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
      <div className={styles['button-container']}>
        <button onClick={handleSearch} disabled={loading}>Buscar</button>
        {loading && <p className={styles.loading}>Carregando...</p>}
        {error && <p className={styles.error}>{error}</p>}
      </div>
      <div className={styles['cep-data']}>
        {cepData.map((data, index) => (
          <div key={index}>
            <h2>CEP: {data.cep}</h2>
            <p>Logradouro: {data.logradouro}</p>
            <p>Complemento: {data.complemento}</p>
            <p>Bairro: {data.bairro}</p>
            <p>Cidade: {data.localidade}</p>
            <p>Estado: {data.uf}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
