import { useState } from "react";
import styles from "../styles/Projeto.module.css";
import Image from "next/image";
import Link from 'next/link';


const Projeto = ({ id, titulo, descricao, link, data}) => {
  const [menuAberto, setMenuAberto] = useState(false);

  const toggleMenu = () => {
    setMenuAberto(!menuAberto);
  };
  return (
    <div className={styles.Projeto}>
      <p className={styles.id}>{id}</p>
      <p className={styles.Titulo}>{titulo}</p>
      <Image
        onClick={toggleMenu}
        src="/angle-down-solid.svg"
        alt="down arrow"
        width={30}
        height={30}
        priority
      />
      {menuAberto && (
        <div className={styles.Menu}>
          <h3>Descrição:</h3>
          <p>{descricao}</p>
          <div className={styles.info}>
            <p>Conclusão:{data}</p>
            <Link href={link}>Solução</Link>
          </div>
        </div>
      )}
    </div>
    
  );
};

export default Projeto;
