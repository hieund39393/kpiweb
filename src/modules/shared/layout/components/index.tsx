import LocalStorageService from 'core/infrastructure/services/localStorageService';
// import Container from '../../../../core/components/container'
import FooterSection from 'modules/shared/footer/components';
import Header from '../../header/components';
import SideBar from 'modules/shared/menu/components';
import { Layout } from 'antd';
import React, { ReactNode, useState, useEffect } from 'react';
import { isTablet } from 'react-device-detect';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
const { Sider, Content } = Layout;
interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const localStorageService = LocalStorageService.instance();
  const [collapsed, setCollapsed] = useState(false);
  const [fixContent, setFixContent] = useState('opened-menu');
  function findDevice() {
    if (isTablet) {
      if (window.innerWidth <= 991) {
        setCollapsed(false);
      } else if (window.innerWidth > 991 && window.innerWidth <= 1024) {
        setCollapsed(true);
      } else setCollapsed(false);
    } else if (window.innerWidth >= 1025 && window.innerWidth <= 1366) {
      setFixContent('closed-menu');
      setCollapsed(true);
    } else setCollapsed(false);
  }

  useEffect(() => {
    findDevice();
  }, []);

  return (
    <Layout className="layout">
      <Header
        token={localStorageService.getToken()}
        profile={{ name: localStorageService.getDisplayName(), avatar: '' }}
      />
      <Layout className="layout-content opened-menu">
        <SideBar />
        <Content className="layout-content-container">{children}</Content>
      </Layout>
      <FooterSection />
    </Layout>
  );
};

export default MainLayout;
