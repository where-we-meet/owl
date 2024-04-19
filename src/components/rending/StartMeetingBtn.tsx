'use client';
import styles from './StartMeetingBtn.module.css';
import { Button } from '@nextui-org/react';
import throttle from 'lodash-es/throttle';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

export default function StartMeeting() {
  const router = useRouter();
  const handleStartMeeting = useCallback(
    throttle(() => {
      router.push('/start');
    }, 10000),
    []
  );

  return (
    <Button onPress={handleStartMeeting} variant="flat" size="lg" className={styles.button}>
      모임 시작하기
    </Button>
  );
}
