const LoginInfo = ({ authSNS }: { authSNS: Array<string> }) => {
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
