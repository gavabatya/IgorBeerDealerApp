import React from 'react';

import logo from '../../assets/logo.svg';
import './logo.css';

export const Logo = () => {
  return (
    <div className="logoAnim">
      <img src={logo} className="appLogo" alt="logo" />
    </div>
  );
};
