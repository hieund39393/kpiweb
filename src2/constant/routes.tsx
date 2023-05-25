import {
    BrowserRouter as Router,
    Route, Redirect
} from 'react-router-dom';

import MainLayout from '../modules/shared/layout/components/index'
import DangNhap from '../modules/account/components/index';
import ChinhSach from '../modules/policy/index';
import HoTro from '../modules/support/index';
import TiviShow from '../modules/tivishow/components/index';

const createRoutes = (props) => (
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
                    return props.isAuthed ? <Redirect to={pathname} /> : <Redirect to="/dang-nhap" />;

                return props.isAuthed ? <Redirect to='/dashboard' /> : <Redirect to="/dang-nhap" />;
            }}
        />
    </Router>
)

export default createRoutes