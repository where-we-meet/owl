import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Offline'
};

export default function Page() {
  return (
    <>
      <h1>오프라인 상태입니다.</h1>
      <h2>오프라인 상태에서 보여줄 페이지입니다.</h2>
    </>
  );
}
