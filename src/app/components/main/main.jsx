import styles from "../../../../styles/main.module.sass";
import { ListsTodo } from "../listTodo/ListsTodo";

export const Main = () => {
  return (
    <>
      <main className={styles.main}>
        <section className={styles.lists}>
          <ListsTodo></ListsTodo>
        </section>
      </main>
    </>
  );
};
