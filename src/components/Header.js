import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/Header.module.css';

const Header = () => {
    return (
        <header className={styles.header}>
            <nav>
                <ul className={styles.navbar}>
                    <li>
                        <Image
                            src="/logo.svg"
                            className={styles.logo}
                            alt="Abrasel Logo"
                            width={180}
                            height={37}
                            priority
                        />
                    </li>
                    <li>
                        <Link href="/">
                            Inicio
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
