'use client';
import { MouseEvent, useState } from 'react';
import { Meeting } from '../my-owl/meeting/Meeting';
import { GiHamburgerMenu } from 'react-icons/gi';

export const MeetingButton = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  const onChangeSidebarStatus = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowSidebar(!showSidebar);
  };

  return (
    <div>
      <button className="border-transparent" onClick={(e) => onChangeSidebarStatus(e)}>
        <GiHamburgerMenu />
      </button>
      {showSidebar ? <Meeting /> : null}
    </div>
  );
};
