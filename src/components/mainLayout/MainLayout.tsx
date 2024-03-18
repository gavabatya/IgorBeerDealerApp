import { PropsWithChildren, FC } from 'react';
import { Header } from '../header/Header.tsx';
import './mainContainer.css';

export const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Header />
      <div className="mainContainer">{children}</div>
    </>
  );
};
