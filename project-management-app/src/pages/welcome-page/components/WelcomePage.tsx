import React from 'react';
import Developers from './developers/Developers';
import Features from './features/Features';
import Welcome from './welcome/Welcome';

const WelcomePage = () => {
  return (
    <>
      <Welcome />
      <Features />
      <Developers />
    </>
  );
};

export default WelcomePage;
