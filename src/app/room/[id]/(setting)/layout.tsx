import React from 'react';
import Header from '@/components/layout/Header';

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ol>
        <li>
          <h3>Step 1</h3>
          <p>Some desc text</p>
        </li>
        <li>
          <h3>Step 2</h3>
          <p>Some desc text</p>
        </li>
        <li>
          <h3>Step 3</h3>
          <p>Some desc text</p>
        </li>
      </ol>
      <div>{children}</div>
    </>
  );
}
