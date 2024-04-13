import styles from './page.module.css';
import { Button, Link } from '@nextui-org/react';

export default function Home() {
  return (
    <main className={styles.main}>
      <header>
        <h1>
          "그래서 우리, <br />
          언제 어디서 만나는거야?"
        </h1>
        <p>
          '우리 만나는 거 맞아?', '그럼 다음에 만나자' 등<br />
          약속을 정하기 위해 고민을 거듭했던 경험 있지 않나요?
        </p>
        <p>바쁜 일상 속, 우리들의 소중한 시간과 만남을 위해</p>
        <p>
          약속 시간과 장소를 고민하는 시간을 줄여줄 수 있는 <br /> 약속 확정 서비스, owl-link입니다
        </p>
      </header>
      <section>
        <h3>이런 경우에 쓰면 좋아요!</h3>
        <div>
          <span>
            <p>icon</p>
            <p>
              모임 일정 관리가
              <br />
              필요할 때
            </p>
          </span>
          <span>
            <p>icon</p>
            <p>
              약속을 빠르게
              <br />
              정하고 싶을 때
            </p>
          </span>
          <span>
            <p>icon</p>
            <p>
              최적의 만남 장소를
              <br />
              찾고 싶을 때
            </p>
          </span>
          <span>
            <p>icon</p>
            <p>
              모임 일정을
              <br />한 눈에 보고 싶을 때
            </p>
          </span>
        </div>
      </section>
      <footer>
        <p>@github project</p>
        <p>about us</p>
      </footer>
      <Button href="/start" as={Link} variant="flat" size="lg">
        모임 시작하기
      </Button>
    </main>
  );
}
