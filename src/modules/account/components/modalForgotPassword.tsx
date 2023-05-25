import React, { memo } from "react";
import { Button, Modal, Form, Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import '../assets/css/style.css';

function ForgotPasswordModal({ isModalVisible, closeModal, handleChangePassword }) {
    const [form] = Form.useForm();
    const [visible, setVisible] = React.useState(false);
    const [emailDetail, setEmail] = React.useState("");

    function submitHandler() {
        if (emailDetail.trim() === '') return;
        handleChangePassword(emailDetail)
            .then((response) => {
                if (response.statusCode === 200) setVisible(true);
            });
    }

    const closeHandler = () => {
        setVisible(false);
        setEmail('')
        form.resetFields();
        closeModal();
    }

    const handlerChangeEmail = async (e) => {
        setEmail(e.target.value)
    }

    return (
        <Modal title="Quên mật khẩu"
            visible={isModalVisible}
            onOk={submitHandler}
            onCancel={closeHandler}
            footer={[
                <div className="forgot-footer--content">
                    <Button key="back" onClick={closeHandler} className="forgot-footer--button-l button-closed">
                        Đóng lại
                    </Button>
                    <Button key="submit" className="forgot-footer--button-r button-primary" type="default"
                        onClick={submitHandler} htmlType="submit" form="form-password">
                        {visible ? "Gửi lại" : "Tiếp theo"}
                    </Button>
                </div>,
            ]}>
            {visible ?
                <div className="forgot">
                    <div className="forgot--banner"></div>
                    <div className="forgot--content">
                        <h3>Mật khẩu mới sẽ được <br /> gửi vào Email đã đăng ký</h3>
                        <span>Hãy kiểm tra email và đăng nhập lại bằng mật khẩu mới</span>
                    </div>
                </div>
                :
                <div className="forgot">
                    <div className="forgot--content">
                        <h3>Nhập tài khoản của bạn </h3>
                    </div>
                    <div className="forgot--content">
                        <Form
                            name="form-password"
                            form={form}
                        >
                            <Form.Item
                                name="tenDangNhap"
                                rules={[{ required: true, message: 'Vui lòng nhập tài khoản!' }]}
                            >
                                <Input prefix={<UserOutlined />}
                                    value={emailDetail} onChange={handlerChangeEmail}
                                    placeholder="Tài khoản" />
                            </Form.Item>
                        </Form>
                    </div>
                    <div className="forgot--content" style={{ paddingBottom: 100 }}>
                        <span>Mật khẩu mới sẽ được gửi vào email tài khoản của bạn đã liên kết </span>
                    </div>
                </div>
            }
        </Modal>
    )
}

export default memo(ForgotPasswordModal)