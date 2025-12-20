import React from 'react';

export default function PageBackground({ opacity = 1 }) {
  return (
    <>
      <div className="bg-fixed" style={{ opacity }}></div>
      <div className="grid-overlay"></div>
    </>
  );
}