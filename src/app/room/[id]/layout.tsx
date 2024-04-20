'use client';

import { ReactNode, useEffect } from 'react';
import styles from './layout.module.css';

const RoomLayout = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    const targetURL = location.href;

    if (userAgent.match(/kakaotalk/i)) {
      location.href = 'kakaotalk://web/openExternal?url=' + encodeURIComponent(targetURL);
    } else if (userAgent.match(/line/i)) {
      if (targetURL.indexOf('?') !== -1) {
        location.href = targetURL + '&openExternalBrowser=1';
      } else {
        location.href = targetURL + '?openExternalBrowser=1';
      }
    } else if (
      userAgent.match(
        /inapp|naver|snapchat|wirtschaftswoche|thunderbird|instagram|everytimeapp|whatsApp|electron|wadiz|aliapp|zumapp|iphone(.*)whale|android(.*)whale|kakaostory|band|twitter|DaumApps|DaumDevice\/mobile|FB_IAB|FB4A|FBAN|FBIOS|FBSS|trill|SamsungBrowser\/[^1]/i
      )
    ) {
      if (userAgent.match(/iphone|ipad|ipod/i)) {
        var mobile = document.createElement('meta');
        mobile.name = 'viewport';
        mobile.content = 'width=device-width, initial-scale=1, shrink-to-fit=no, user-scalable=no, minimal-ui';
        document.getElementsByTagName('head')[0].appendChild(mobile);
      } else {
        location.href =
          'intent://' + targetURL.replace(/https?:\/\//i, '') + '#Intent;scheme=http;package=com.android.chrome;end';
      }
    }
  }, []);

  return <main className={styles.main}>{children}</main>;
};

export default RoomLayout;
