export type MemberInfo = {
  name: string;
  githubURL: string;
  review_title: string;
  review: string;
  review_end: string;
};

export const DEVELOPERS_INFO: MemberInfo[] = [
  {
    name: '양희철',
    githubURL: 'https://github.com/heechul94',
    review_title: '희철님 제목',
    review: '희철님 후기',
    review_end: '희철님 한마디'
  },
  {
    name: '이참',
    githubURL: 'https://github.com/ketchup0211',
    review_title: '참님 제목',
    review: '참님 후기',
    review_end: '참님 한마디'
  },
  {
    name: '나의찬',
    githubURL: 'https://github.com/lauichan',
    review_title: '의찬님 제목',
    review: '의찬님 후기',
    review_end: '의찬님 한마디'
  },
  {
    name: '오소향',
    githubURL: 'https://github.com/SohyangO',
    review_title: '소향님 제목',
    review: '소향님 후기',
    review_end: '소향님 한마디'
  },
  {
    name: '박강토',
    githubURL: 'https://github.com/gidalim',
    review_title: '경험은 무엇보다도 소중한 지식의 한 페이지입니다.',
    review:
      '이번 프로젝트를 거치면서 부족했던 많은 점을 해결하고 문제를 다루고 대처하는 능력을 기를 수 있었습니다. 문제는 늘 발생하지만, 항상 외부에 의존하던 모습에서 스스로 처리할 수 있는 능동적인 개발자가 될 수 있는 초석이 되었습니다. 이제 우리는 스스로가 첫 발을 내딛을 일만 남았습니다.',
    review_end: '우리의 지금은 우리의 명함에 값지게 새겨졌습니다. -박강토'
  }
];
