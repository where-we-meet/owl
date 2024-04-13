//파일 이름 중복 방지용 파일 이름 생성 로직
export const getFileName = () => {
  const today = new Date();

  const year = today.getFullYear(); // 년
  const month = ('0' + (today.getMonth() + 1)).slice(-2); // 월
  const date = ('0' + today.getDate()).slice(-2); // 일
  const hours = today.getHours(); // 시
  const minutes = today.getMinutes(); // 분
  const seconds = today.getSeconds(); // 초

  return `Owl_Photo_${year}-${month}-${date}-${hours}-${minutes}-${seconds}`;
};
