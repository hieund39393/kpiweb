import { Form, Input, Button, Checkbox, notification, Image } from 'antd';
import { useHistory } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

import { UserOutlined, LockOutlined } from '@ant-design/icons';

import '../assets/css/style.css';
import logo from '../../shared/assets/images/logo-login-mobile.png';
import ModalForgotPassword from '../components/modalForgotPassword';

import LocalStorageService from 'core/infrastructure/services/localStorageService';
import AccountService from '../services/accountService';
import { _ARGS, _FALSE } from 'constant';
import SessionService from 'core/infrastructure/services/sessionService';

const accountService = AccountService.instance();
const localStorageService = LocalStorageService.instance();

const DangNhap = () => {
  const [form] = Form.useForm();
  const history = useHistory();
  const inputRef = useRef<Input>(null);

  const [visibleForgot, setVisibleForgot] = useState(false);
  const [enterPass, setEnterPass] = useState(false)
  const [isRememberMe, setIsRememberMe] = useState(() => {
    return localStorageService.getRememberMe() === 'true' ? true : false;
  });


  const userInit = () => {
    if (localStorageService.getRememberMe() === 'true') {
      return SessionService.getUser();
    }
    return {
      userName: '',
      password: '',
    };
  };

  function enterPassword() {
    setEnterPass(true);
    setIsRememberMe(false)
  }

  const submitHandler = async (values) => {
    var md5 = require("md5");
    const data = {
      ...values,
      matKhau: localStorageService.getRememberMe() === 'true' && isRememberMe && !enterPass ? values.matKhau : md5(values.matKhau)
    };

    // Đăng nhập: call service
    const response = await accountService.login(data);

    if (response.statusCode === 200) {
      const args = {
        message: 'EVN KPI',
        description: 'Bạn đã đăng nhập thành công vào hệ thống',
        duration: _ARGS.duration,
      };
      notification.success(args);

      // Lưu dữ liệu vào Local storage
      localStorageService.setUser(response.data);
      localStorageService.setRememberMe(isRememberMe);
      if (isRememberMe)
        SessionService.setUser({ userName: data.tenDangNhap, password: data.matKhau });

      history.push('/dashboard');
    } else {
      const args = {
        message: 'Đăng nhập thất bại',
        description: response.message,
        duration: _ARGS.duration,
      };
      notification.error(args);
    }
  };

  const openForgotModal = async () => {
    setVisibleForgot(true);
  };

  const closeForgotModal = async () => {
    setVisibleForgot(false);
  };

  const handleChangePassword = async (value) => {
    const response = await accountService.forgot(value);
    if (response.statusCode === 200) {
      const args = {
        message: 'Gửi thông tin thành công.',
        description: 'Xin vui lòng kiểm tra Email để được biết thông tin đăng nhập.',
        duration: _ARGS.duration,
      };
      notification.success(args);
    } else {
      const args = {
        message: 'Không thể gửi thông tin.',
        description: response.message,
        duration: _ARGS.duration,
      };
      notification.error(args);
    }

    return response;
  };

  const changeSelectBox = async () => {
    setIsRememberMe(!isRememberMe);
  };

  useEffect(() => {
    inputRef.current!.focus();
  }, []);

  return (
    <div className="page-login">
      <div className="logo-mobile">
        <Image src={logo} alt="" preview={_FALSE} />
      </div>

      <div className="page-login--form">
        <h3 className="page-login--form--title">Đăng nhập</h3>
        <Form
          name="login"
          form={form}
          initialValues={{
            remember: true,
            tenDangNhap: userInit().userName,
            matKhau: userInit().password,
          }}
          onFinish={submitHandler}
        >
          <Form.Item
            name="tenDangNhap"
            rules={[{ required: true, message: 'Vui lòng nhập tài khoản!' }]}
          >
            <Input
              size="large"
              prefix={<UserOutlined />}
              placeholder="Tên đăng nhập"
              autoComplete={'new-username'}
              ref={inputRef}
            />
          </Form.Item>
          <Form.Item
            name="matKhau"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
          >
            <Input
              size="large"
              prefix={<LockOutlined />}
              type="password"
              placeholder="Mật khẩu"
              autoComplete={'new-password'}
              onChange={enterPassword}
            />
          </Form.Item>
          <div className="page-login--form--remember">
            {/* <Form.Item name="remember" valuePropName="checked" > */}
            <Checkbox checked={isRememberMe} onClick={changeSelectBox}>
              Nhớ mật khẩu
            </Checkbox>
            {/* </Form.Item> */}
            {/* <Form.Item className="page-login--form--remember--fogot-password"> */}
            <Button type="link" onClick={openForgotModal} id="forgot">
              Quên mật khẩu?
            </Button>
            {/* </Form.Item> */}
          </div>

          <Form.Item className="page-login--form--submit">
            <Button type="default" htmlType="submit">
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
        <ModalForgotPassword
          isModalVisible={visibleForgot}
          closeModal={closeForgotModal}
          handleChangePassword={handleChangePassword}
        />
      </div>
    </div>
  );
};
export default DangNhap;
