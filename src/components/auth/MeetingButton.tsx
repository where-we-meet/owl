'use client';
import { MouseEvent, useState } from 'react';
import { Meeting } from '../my-owl/meeting/Meeting';
import { GiHamburgerMenu } from 'react-icons/gi';

export const MeetingButton = () => {
  const [showSideBar, setShowSideBar] = useState(false);

  const onChangeSideBarStatus = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowSideBar(!showSideBar);
  };

  return (
    <div>
      <button className='border-transparent' onClick={(e) => onChangeSideBarStatus(e)}>
        <GiHamburgerMenu />
      </button>
      {showSideBar ? <Meeting /> : <></>}
    </div>
  );
};
