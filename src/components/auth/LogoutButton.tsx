const Logout = () => {
  return (
    <form action="/auth/signout" method="post" title="잘가올...">
      <button type="submit">로그아웃</button>
    </form>
  );
};

export default Logout;
