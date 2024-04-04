// Projeto.js
import styles from "../styles/Projeto.module.css";
import Image from "next/image";
import { useState } from "react";

const Projeto = ({ id, titulo }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDetails = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.Projeto}>
      <div className={styles.header} onClick={toggleDetails}>
        <p>{id}</p>
        <p>{titulo}</p>
        <Image
          src="/angle-down-solid.svg"
          alt="down arrow"
          width={30}
          height={30}
          priority
          className={isOpen ? styles.rotate : ""}
        />
      </div>
      {isOpen && (
        <div className={styles.details}>
          <p>Detalhes do projeto {id}</p>
          {/* Aqui você pode adicionar mais conteúdo detalhado, se necessário */}
        </div>
      )}
    </div>
  );
};

export default Projeto;
