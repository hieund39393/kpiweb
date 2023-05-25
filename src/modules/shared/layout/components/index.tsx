import LocalStorageService from 'core/infrastructure/services/localStorageService';
// import Container from '../../../../core/components/container'
import FooterSection from 'modules/shared/footer/components';
import Header from '../../header/components';
import SideBar from 'modules/shared/menu/components';
import { Layout } from 'antd';
import NhomKeHoach from 'modules/dashboard/components/nhomKeHoach';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

const MainLayout = (props) => {
  const localStorageService = LocalStorageService.instance();

  return (
    <Layout className="layout">
      <Header
        token={localStorageService.getToken()}
        profile={{ name: localStorageService.getDisplayName(), avatar: '' }}
      />
      {/* <Layout className="layout-content"> */}
      <SideBar />

      {/* <NhomKeHoach /> */}

      <FooterSection />
    </Layout>

  );
}

export default MainLayout;
