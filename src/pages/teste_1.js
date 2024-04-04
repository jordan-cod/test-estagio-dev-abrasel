// pages/numeros_palindromos.js
import styles from "../styles/page.module.css";
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
      <h1>Números Palíndromos</h1>
      <div>
      <label>
        Início do Intervalo:
        <input type="number" value={inicioIntervalo} onChange={(event) => setInicioIntervalo(event.target.value)}/>
      </label>
      <label>
        Fim do Intervalo:
        <input type="number" value={fimIntervalo} onChange={(event) => setFimIntervalo(event.target.value)}/>
      </label>
      <button onClick={encontrarPalindromos}>Encontrar Palíndromos</button>
      <h2>Números Palíndromos encontrados:</h2>
      <ul>
              <li>{palindromosEncontrados.join(', ')}</li>
            </ul>
      </div>
    </main>
  );
};

export default NumerosPalindromos;
