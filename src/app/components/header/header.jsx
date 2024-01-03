import Image from 'next/image'
import Logo from '../../../../public/images/header-logo.png'
import styles from '../../../../styles/header.module.sass'

export const Header = (props) => {
  return (
    <header className={styles.header}>
      {props.withimage === 'true' ? <Image src={Logo} alt='a draw of a cat' width={100} height={100} /> : ''}
      <h1>{props.title}</h1>
    </header>
  );
};
