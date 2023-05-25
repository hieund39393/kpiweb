import LocalStorageService from 'core/infrastructure/services/localStorageService';
// import Container from '../../../../core/components/container'
import FooterSection from 'modules/shared/footer/components';
import Header from '../../header/components';
import SideBar from 'modules/shared/menu/components';
import { Layout } from 'antd';

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
      {/* </Layout> */}
      <FooterSection />
    </Layout>

  );
}

export default MainLayout;
