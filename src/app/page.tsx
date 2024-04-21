import StartMeeting from '@/components/rending/StartMeetingBtn';
import { Article } from '@/components/rending/Article';
import Header from '@/components/header/Header';
import Footer from '@/components/Footer';
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
                약속 시간과 장소를 고민하는 시간을 줄여줄 수 있는 <br /> 약속 확정 서비스, owl-link입니다.
              </p>
            </span>
            <StartMeeting />
          </div>
        </section>
        <section className={styles.section}>
          <Article
            image_url="images/manage_schedule2.png"
            subtitle="빠르게 모임 생성하기"
            contents={`OWL-LiNK를 통해 모임 일정을 잡기 위한 방 개설을 손쉽게 해보세요. [모임 시작하기]를 누르고, 모임 일정 [시작일]과 [종료일]을 설정하면 완료! 터치 몇 번으로 모임 방을 만들 수 있어요.`}
          />
          <Article
            image_url="images/manage_schedule2.png"
            subtitle="신속한 일정과 위치 전달 UI"
            contents={`시시각각 변하는 개인의 일정과 장소를 일일이 조사, 보고하느라 번거롭지는 않으신가요? OWL-LiNK는 합리적이고 직관적인 실시간 UI를 통해, 누구에게나 편한 정보 교환 커뮤니케이션을 제공합니다.`}
          />
          <Article
            image_url="images/manage_schedule2.png"
            subtitle="최적의 모임 장소 제공 & 주변 인프라 조회"
            contents={`OWL-LiNK는 모임에 참가한 유저들의 출발 위치에 기반하여 최적의 모임 장소를 선정합니다. 또한, 주변 인프라 정보를 제공해주어 가볼만한 장소들을 쉽게 알아볼 수 있어요.`}
          />
        </section>
      </main>
      <Footer />
    </>
  );
}
