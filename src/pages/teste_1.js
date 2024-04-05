'use client'
import "../styles/globals.css";
import styles from "../styles/Teste_1.module.css";
import { useState } from 'react';

const NumerosPalindromos = () => {
  const [inicioIntervalo, setInicioIntervalo] = useState('');
  const [fimIntervalo, setFimIntervalo] = useState('');
  const [palindromosEncontrados, setPalindromosEncontrados] = useState([]);

  const encontrarPalindromos = () => {
    const inicio = parseInt(inicioIntervalo);
    const fim = parseInt(fimIntervalo);
    const palindromos = [];

    for (let num = inicio; num <= fim; num++) {
      const numStr = num.toString();
      if (numStr === numStr.split('').reverse().join('')) {
        palindromos.push(num);
      }
    }

    setPalindromosEncontrados(palindromos);
  };

  return (
    <main className={styles.main}>
      <div className={styles.container_Teste}>
        <h1>Números Palíndromos</h1>
        <div className={styles.form}>
          <div>
            <div>
              <label>
                Início do Intervalo:
              </label>
              <input type="number" value={inicioIntervalo} onChange={(event) => setInicioIntervalo(event.target.value)} />
            </div>
            <div>
              <label>
                Fim do Intervalo:
              </label>
              <input type="number" value={fimIntervalo} onChange={(event) => setFimIntervalo(event.target.value)} />
            </div>

            <button onClick={encontrarPalindromos}>Encontrar Palíndromos</button>
          </div>
          <h2>Números Palíndromos encontrados:</h2>
          <ul>
            <li>{palindromosEncontrados.join(', ')}</li>
          </ul>
        </div>
      </div>
    </main>
  );
};

export default NumerosPalindromos;
