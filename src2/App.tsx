import './App.css';
import './modules/shared/assets/css/style.css';
import 'antd/dist/antd.css';

import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import MainLayout from './modules/shared/layout/components/index'
import DangNhap from './modules/account/components/index';
import ChinhSach from './modules/policy/index';
import HoTro from './modules/support/index';
import TiviShow from './modules/tivishow/components/index';

import LocalStorageService from './core/infrastructure/services/localStorageService';

function App() {
  const localStorageService = LocalStorageService.instance();
  const isAuthed = localStorageService.getToken();

  return (
    <Router>
      <Route path="/dang-nhap" component={DangNhap} />
      <Route path='/dashboard' component={MainLayout} exact />
      <Route path="/chinh-sach" component={ChinhSach} />
      <Route path="/ho-tro" component={HoTro} />
      <Route path="/tivi-show" component={TiviShow} />

      <Route path="/"
        render={() => {
          const pathname = window.location.pathname;
          if (pathname === "/chinh-sach" || pathname === "/ho-tro")
            return <Redirect to={pathname} />

          if (pathname === "/tivi-show")
            return isAuthed ? <Redirect to={pathname} /> : <Redirect to="/dang-nhap" />;

          return isAuthed ? <Redirect to='/dashboard' /> : <Redirect to="/dang-nhap" />;
        }}
      />
    </Router>
  );
}

export default App;
