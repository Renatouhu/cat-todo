import Image from 'next/image'
import Logo from '../../../../public/images/header-logo-teste-black.png'
import styles from '../../../../styles/header.module.sass'

export const Header = (props) => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        {props.withimage === 'true' ? <Image src={Logo} alt='a draw of a cat' width={158} height={128} /> : ''}
        <div></div>
      </div>
      <h1>{props.title}</h1>
    </header>
  );
};
