import React from 'react';
import Tab from './Tab';

function Tabs({ tabList, activeTab, changeActiveTab }) {
  return (
    <div className="tabs">
      <ul>
        {tabList.map((tab) => (
          <Tab
            tab={tab}
            key={tab.name}
            activeTab={activeTab}
            changeActiveTab={changeActiveTab}
          />
        ))}
      </ul>
    </div>
  );
}

export default Tabs;
