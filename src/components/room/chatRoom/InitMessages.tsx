'use client';
import { IMessage, useMessageStore } from '@/store/messageStore';
import { useEffect, useRef } from 'react';

export const InitMessages = ({ messages }: { messages: IMessage[] }) => {
  const initState = useRef(false);

  useEffect(() => {
    if (!initState.current) {
      useMessageStore.setState({ messages });
    }
    initState.current = true;
  }, []);

  return <></>;
};
