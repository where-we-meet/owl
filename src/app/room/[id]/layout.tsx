'use client';

import { ReactNode, useEffect } from 'react';
import styles from './layout.module.css';

const RoomLayout = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    const useragt = navigator.userAgent.toLowerCase();
    const target_url = location.href;

    if (useragt.match(/kakaotalk/i)) {
      //카카오톡 외부브라우저로 호출
      window.location.href = 'kakaotalk://web/openExternal?url=' + encodeURIComponent(target_url);
    } else if (useragt.match(/line/i)) {
      if (target_url.indexOf('?') !== -1) {
        window.location.href = target_url + '&openExternalBrowser=1';
      } else {
        window.location.href = target_url + '?openExternalBrowser=1';
      }
    }
    if (useragt.match(/iphone|ipad|ipod/i)) {
      // 아이폰은 강제로 사파리를 실행할 수 없다 ㅠㅠ
      // 모바일 대응 뷰포트 강제 설정
      const mobile = document.createElement('meta');
      mobile.name = 'viewport';
      mobile.content = 'width=device-width, initial-scale=1, shrink-to-fit=no, user-scalable=no, minimal-ui';
      document.getElementsByTagName('head')[0].appendChild(mobile);
    } else {
      // 안드로이드는 Chrome이 설치되어있음으로 강제로 스킴 실행한다.
      window.location.href =
        'intent://' + target_url.replace(/https?:\/\//i, '') + '#Intent;scheme=http;package=com.android.chrome;end';
    }
  }, []);

  return <main className={styles.main}>{children}</main>;
};

export default RoomLayout;
