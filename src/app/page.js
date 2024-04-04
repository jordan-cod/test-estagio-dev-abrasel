// Home.js
import Projeto from "@/components/Projeto";
import { useClient } from 'next/client';

const projetos = [
  {
    id: "1",
    titulo: "Números palíndromos",
    link: "/teste_1"
  },
  {
    id: "2",
    titulo: "Número de notas para troco",
    link: "/teste_2"
  },
  {
    id: "3",
    titulo: "Controle de veículos",
    link: "/teste_3"
  },
  {
    id: "4",
    titulo: "Dados CEP",
    link: "/teste_4"
  },
];

export default function Home() {
  useClient()
  return (
    <div>
      {projetos.map((projeto) => (
        <Projeto key={projeto.id} id={projeto.id} titulo={projeto.titulo} />
      ))}
    </div>
  );
}
