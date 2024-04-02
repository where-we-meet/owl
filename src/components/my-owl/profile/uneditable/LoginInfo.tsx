import Image from 'next/image';

const LoginInfo = ({ authSNS }: { authSNS: Array<string> }) => {
  //  로그인 로직 완료되면 테스트 필요
  return (
    <div>
      {/* {authSNS.map((SNS) => (
        <Image src={`/images/${SNS}.svg`} alt={SNS} width={24} height={21} />
      ))} */}
      <Image src={`/images/google.svg`} alt="google" width={24} height={21} />
      <p>로그인 정보</p>
    </div>
  );
};

export default LoginInfo;
