'use client'
import Projeto from "@/components/Projeto";
import styles from '@/styles/page.module.css'
import { useEffect, useState } from 'react';

export default function Home() {
  const [mensagem, setMensagem] = useState('');
  const [projetos, setProjetos] = useState([])

  const carregarProjetos = async () => {
    try {
      const response = await fetch('/api/projetos', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Erro ao carregar projetos');
      }

      const data = await response.json();
      setProjetos(data);
    } catch (error) {
      console.error('Erro ao carregar projetos:', error);
      setMensagem('Erro ao carregar projetos. Por favor, tente novamente.');
    }
  };
  useEffect(() => {
    carregarProjetos();
  }, []);

  return (
    <div className={styles.main}>
      {projetos.map((projeto) => (
        <Projeto key={projeto.id} id={projeto.id} titulo={projeto.titulo} descricao={projeto.descricao} link={projeto.link} data={projeto.data}/>
      ))}
    </div>
  );
}
