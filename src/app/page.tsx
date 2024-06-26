import StartMeeting from '@/components/landing/StartMeetingBtn';
import { Article } from '@/components/landing/Article';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import styles from './page.module.css';

export default function Home() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <section className={styles.head}>
          <div className={styles.copy_container}>
            <h1 className={styles.head_copy}>
              "그래서 우리,
              <br />
              언제 어디서 만나는 거야?"
            </h1>
            <span>
              <p className={styles.middle_copy}>
                "우리 만나는 거 맞아?", "그럼 다음에 만나자" 등<br />
                약속을 정하기 위해 고민을 거듭했던 경험 있지 않나요?
              </p>
              <p className={styles.middle_copy}>바쁜 일상 속, 우리들의 소중한 시간과 만남을 위해</p>
              <p className={styles.middle_copy}>
                <span className={styles.highlight}>
                  약속 시간과 장소를 고민하는 시간을 줄여줄 수 있는 <br /> 약속 확정 서비스,
                </span>{' '}
                owl-link입니다.
              </p>
            </span>
            <StartMeeting />
          </div>
        </section>
        <section className={styles.section}>
          <Article
            width={300}
            height={118}
            image_url="images/landing_first.webp"
            subtitle={`빠르게\n모임 생성하기`}
            contents={`OWL-LiNK를 통해 모임 일정을 잡기 위한 방 개설을 손쉽게 해보세요.\n[모임 시작하기]를 누르고, 모임 일정 [시작일]과 [종료일]을 설정하면 완료!\n터치 몇 번으로 모임 방을 만들 수 있어요.`}
          />
          <Article
            width={300}
            height={167}
            image_url="images/landing_second.webp"
            subtitle={`신속한 일정과\n위치 전달 UI`}
            contents={`시시각각 변하는 개인의 일정과 장소를 일일이\n조사, 보고하느라 번거롭지는 않으신가요?\nOWL-LiNK는 합리적이고 직관적인 실시간 UI를 통해\n누구에게나 편한 정보 교환 커뮤니케이션을 제공합니다.`}
          />
          <Article
            width={300}
            height={328}
            image_url="images/landing_third.webp"
            subtitle={`최적의 모임 장소 제공 및\n한 눈에 보는 모임 일정`}
            contents={`OWL-LiNK는 모임에 참가한 유저들의 출발 위치에 기반하여\n최적의 모임 장소를 선정합니다.\n또한, 모임 확정 이후에는 모임 방에서 일정을 한 눈에 확인할 수 있어요.`}
          />
          <Article
            width={300}
            height={218}
            image_url="images/landing_fourth.webp"
            subtitle={`주변 인프라 조회 및\n실시간 채팅`}
            contents={`확정된 모임 방에서 주변 인프라를 조회하며 실시간으로 채팅 할 수 있어요.\nOWL-LiNK로 가볼만한 장소들을 쉽게 알아볼 수 있어요.`}
          />
        </section>
      </main>
      <Footer />
    </>
  );
}
