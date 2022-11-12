import React from 'react';
import Developer from '../developer/Developer';
import './developers.scss';

const Developers = () => {
  return (
    <article className="developers">
      <div className="developers__container">
        <h2 className="developers__title">Our team</h2>
        <div className="developers__list">
          <Developer name="Artiom Savchuk" title="Mentor" foto="Artiom" description="Code review" />
          <Developer
            name="Alena Staskevich"
            title="Web-developer"
            foto="Lena"
            description="Developed..."
          />
          <Developer
            name="Dmitry Ostapchuk"
            title="Web-developer"
            foto="Dima"
            description="Developed..."
          />
          <Developer
            name="Olga Andrievich"
            title="Web-developer, Teamlead"
            foto="Olya"
            description="Developed..."
          />
        </div>
      </div>
    </article>
  );
};

export default Developers;
