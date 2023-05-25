import { memo, useEffect, useRef } from "react"
import { Form, Input, Button, Modal, notification } from 'antd';

import '../assets/css/style.css';
import accountService from "../services/accountService";
import { _ARGS } from "constant";

function ChangePasswordModal({ isModalVisible, closeModal, handleChangePassword }) {
    const [form] = Form.useForm();
    const inputRef = useRef<Input>(null);

    const handleSubmit = async (values: any) => {
        var md5 = require("md5");
        const newData = {
            ...values,
            matKhauHienTai: md5(values.matKhauHienTai),
            matKhauMoi: md5(values.matKhauMoi),
            xacNhanMatKhau: md5(values.xacNhanMatKhau),
        };

        // Change password service
        const response = await accountService.changePassword(newData);
        closeModal();
        form.resetFields();

        if (response.statusCode === 200) {
            const args = {
                message: 'Đổi mật khẩu thành công',
                description: response.error,
                duration: _ARGS.duration,
            };
            notification.success(args);
        } else {
            const args = {
                message: 'Mật khẩu hiện tại không đúng',
                description: response.error,
                duration: _ARGS.duration,
            };
            notification.error(args);
        }
    }

    function onClick() {
        inputRef.current!.focus();
    }

    function close() {
        form.resetFields();
        closeModal()
    }

    useEffect(() => {
        if (isModalVisible) {
            inputRef.current!.focus();
        }
    }, [isModalVisible])

    return (
        <Modal title="Thay đổi mật khẩu"
            visible={isModalVisible}
            onOk={handleChangePassword}
            onCancel={close}
            footer={[
                <Button key="back" onClick={close}>
                    Đóng lại
                </Button>,
                <Button key="submit" type="default" className="button-primary" htmlType="submit" form="form-password" onClick={onClick}>
                    Cập nhật
                </Button>,
            ]}>
            <Form
                form={form}
                // layout='vertical'
                name="form-password"
                onFinish={handleSubmit}
            >
                <Form.Item
                    label="Mật khẩu hiện tại"
                    name="matKhauHienTai"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập mật khẩu hiện tại',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('matKhauMoi') !== value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Mật khẩu mới trùng với mật khẩu hiện tại'));
                            },
                        }),
                    ]}
                >
                    <Input type='password' ref={inputRef} autoFocus={true} />
                </Form.Item>

                <Form.Item
                    label="Mật khẩu mới"
                    name="matKhauMoi"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập mật khẩu mới',
                        },
                        {
                            pattern: /^(?=.*[a-z]{1,})(?=.*[A-Z]{1,}).{8,}$/,
                            message: `Mật khẩu bao gồm chữ hoa và chữ thường và ít nhất 8 ký tự`
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('matKhauHienTai') !== value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Mật khẩu mới trùng với mật khẩu hiện tại'));
                            },
                        }),
                    ]}
                >
                    <Input type='password' defaultValue='' />
                </Form.Item>
                <Form.Item
                    name="xacNhanMatKhau"
                    label="Xác nhận mật khẩu mới"
                    dependencies={['matKhauMoi']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập lại mật khẩu mới!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('matKhauMoi') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Mật khẩu không khớp'));
                            },
                        }),
                    ]}
                >
                    <Input type='password' defaultValue='' />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default memo(ChangePasswordModal)