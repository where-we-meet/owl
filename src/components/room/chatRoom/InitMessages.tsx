'use client';
import { IMessage, useMessage } from '@/store/messageStore';
import { useEffect, useRef } from 'react';

export const InitMessages = ({ messages }: { messages: IMessage[] }) => {
  const initState = useRef(false);

  useEffect(() => {
    if (!initState.current) {
      useMessage.setState({ messages });
    }
    initState.current = true;
  }, []);

  return <></>;
};
