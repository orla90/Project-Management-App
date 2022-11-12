import React from 'react';
import Feature from '../feature/Feature';
import './features.scss';

const Features = () => {
  return (
    <article className="features">
      <div className="features__container">
        <h2 className="features__title">
          Handling your projects in the most efficient way is our mojo
        </h2>
        <div className="features__list">
          <Feature title="Interface" description="Simple and user-friendly interface" />
          <Feature
            title="Reconfiguration"
            description="Personal fully editable list of projects, task stages and tasks"
          />
          <Feature title="Search" description="Convenient search among the list of your projects" />
        </div>
      </div>
    </article>
  );
};

export default Features;
