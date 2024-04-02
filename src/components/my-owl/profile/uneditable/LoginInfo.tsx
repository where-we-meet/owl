const LoginInfo = ({ authSNS }: { authSNS: Array<string> }) => {
  //  로그인 로직 완료되면 테스트 필요
  return (
    <div>
      {authSNS.map((SNS, index) => (
        <img key={index} src={`/images/${SNS}.svg`} alt={SNS} width={34} height={31} />
      ))}
      <p>로그인 정보</p>
    </div>
  );
};

export default LoginInfo;
