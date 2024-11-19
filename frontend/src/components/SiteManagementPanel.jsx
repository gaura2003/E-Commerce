// frontend/components/SiteManagementPanel.js
import React, { useState } from 'react';
import SliderManagement from '../admin/SliderManagement';
import SocialLinksManagement from '../admin/SocialLinksManagement';
// import ContentManagement from './ContentManagement';

const SiteManagementPanel = () => {
  const [activeTab, setActiveTab] = useState('slider');

  return (
    <div className="p-6 bg-gray-100">
      <h2 className="text-2xl font-bold mb-6">Site Management Panel</h2>

      <div className="flex space-x-4 mb-6">
        <button
          className={`px-4 py-2 rounded-md ${
            activeTab === 'slider' ? 'bg-blue-600 text-white' : 'bg-gray-200'
          }`}
          onClick={() => setActiveTab('slider')}
        >
          Slider Management
        </button>
        <button
          className={`px-4 py-2 rounded-md ${
            activeTab === 'socialLinks' ? 'bg-blue-600 text-white' : 'bg-gray-200'
          }`}
          onClick={() => setActiveTab('socialLinks')}
        >
          Social Links Management
        </button>
        <button
          className={`px-4 py-2 rounded-md ${
            activeTab === 'content' ? 'bg-blue-600 text-white' : 'bg-gray-200'
          }`}
          onClick={() => setActiveTab('content')}
        >
          Content Management
        </button>
      </div>

      <div>
        {activeTab === 'slider' && <SliderManagement />}
        {activeTab === 'socialLinks' && <SocialLinksManagement />}
        {/* {activeTab === 'content' && <ContentManagement />} */}
      </div>
    </div>
  );
};

export default SiteManagementPanel;
