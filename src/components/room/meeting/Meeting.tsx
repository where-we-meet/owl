'use client';

import { type ReactElement, useState } from 'react';
import Calender from './calender/Calender';
import Place from './place/Place';

type TabList = { [key: string]: ReactElement };

const Meeting = ({ id }: { id: string }) => {
  const [currentTab, setCurrentTab] = useState('일정');

  const changeTab = (tabName: string) => {
    setCurrentTab(tabName);
  };

  const tabList: TabList = {
    일정: <Calender />,
    장소: <Place />
  };

  return (
    <section>
      <ul>
        <li onClick={() => setCurrentTab('일정')}>일정</li>
        <li onClick={() => setCurrentTab('장소')}>장소</li>
      </ul>
      <div>{tabList[currentTab]}</div>
    </section>
  );
};

export default Meeting;
