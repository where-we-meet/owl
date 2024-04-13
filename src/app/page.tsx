import styles from './page.module.css';
import { Button, Link } from '@nextui-org/react';

export default function Home() {
  return (
    <main className={styles.main}>
      <Button href="/start" as={Link} variant="flat" size="lg">
        모임 시작하기
      </Button>
    </main>
  );
}
