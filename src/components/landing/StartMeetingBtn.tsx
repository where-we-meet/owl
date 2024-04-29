'use client';
import { Button } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import styles from './StartMeetingBtn.module.css';

export default function StartMeeting() {
  const router = useRouter();

  const handleStartMeeting = () => {
    router.push('/start');
  };

  return (
    <Button onPress={handleStartMeeting} variant="flat" size="lg" className={styles.button}>
      모임 시작하기
    </Button>
  );
}
