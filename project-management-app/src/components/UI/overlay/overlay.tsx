import React from 'react';
import loadingOverlay from './../../../assets/overlay/loading-overlay.gif';
const Overlay = () => {
  return (
    <div className="overlay">
      <div className="overlay__pictyre">
        <img src={loadingOverlay} alt="loading..." />
      </div>
    </div>
  );
};

export default Overlay;
