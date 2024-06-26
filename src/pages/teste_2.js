'use client'
import { useState } from 'react';
import "../styles/globals.css";
import styles from '@/styles/Teste_2.module.css'

export default function Troco() {
  const [valorCompra, setValorCompra] = useState('');
  const [valorEntregue, setValorEntregue] = useState('');
  const [troco, setTroco] = useState(0);
  const [notas100, setNotas100] = useState(0);
  const [notas10, setNotas10] = useState(0);
  const [notas1, setNotas1] = useState(0);

  const calcularTroco = () => {
    const compra = parseFloat(valorCompra);
    const entregue = parseFloat(valorEntregue);

    if (entregue < compra) {
      alert('O valor entregue deve ser maior ou igual ao valor da compra.');
      return;
    }

    let valorTroco = entregue - compra;
    setTroco(valorTroco);

    let qtdNotas100 = Math.floor(valorTroco / 100);
    setNotas100(qtdNotas100);
    valorTroco %= 100;

    let qtdNotas10 = Math.floor(valorTroco / 10);
    setNotas10(qtdNotas10);
    valorTroco %= 10;

    let qtdNotas1 = Math.floor(valorTroco / 1);
    setNotas1(qtdNotas1);
  };

  return (
    <main className={styles.main}>
      <h1>Calculadora de Troco</h1>
      <div className={styles.container_Teste}>
        <div>
          <label>Valor da Compra:</label>
          <input type="number" step="0.01" value={valorCompra} onChange={(e) => setValorCompra(e.target.value)} />
        </div>
        <div>
          <label>Valor Entregue:</label>
          <input type="number" step="0.01" value={valorEntregue} onChange={(e) => setValorEntregue(e.target.value)} />
        </div>
        <button onClick={calcularTroco}>Calcular Troco</button>
        <div>
          <h2>Detalhes do Troco:</h2>
          <p>Valor do Troco: R$ {troco.toFixed(2)}</p>
          <p>Notas de R$ 100: {notas100}</p>
          <p>Notas de R$ 10: {notas10}</p>
          <p>Notas de R$ 1: {notas1}</p>
        </div>

      </div>
    </main>
  );
}
