'use client';
import { IMessage } from '@/store/messageStore';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownSection, DropdownItem, Button } from '@nextui-org/react';
import { IoIosMore } from 'react-icons/io';
import styles from './Message.module.css';

export const Message = ({ message }: { message: IMessage }) => {
  return (
    <div className={styles.chatbox_body} key={message.id}>
      <figure className={styles.profiles}>
        <div>
          <img
            src={`${message.users?.profile_url}`}
            alt={message.users?.name!}
            width={40}
            height={40}
            style={{ width: 40, height: 40 }}
          />
        </div>
        <div className={styles.content}>
          <div className={styles.chat_info}>
            <div className={styles.user_info}>
              <h3 className={styles.name}>{message.users?.name}</h3>
              <h3 className={styles.date_time}>{new Date(message.created_at).toDateString()}</h3>
            </div>
            <MessageMenu />
          </div>
          <p className={styles.chat_log}>{message.text}</p>
        </div>
      </figure>
    </div>
  );
};

export const MessageMenu = () => {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="bordered">
          <IoIosMore />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem key="edit">수정</DropdownItem>
        <DropdownItem key="delete" className="text-danger" color="danger">
          삭제
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
