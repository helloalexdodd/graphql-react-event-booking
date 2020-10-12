import React from 'react';

const Tab = ({ tab, activeTab, changeActiveTab }) => {
  const { name } = tab;
  return (
    <li
      className={name === activeTab ? 'is-active' : null}
      onClick={() => changeActiveTab(name)}
    >
      <button class="button is-link is-light has-background-white">
        {/* <span className="icon is-small"><i className="fa fa-image"></i></span> */}
        <span>{name}</span>
      </button>
    </li>
  );
};

export default Tab;
