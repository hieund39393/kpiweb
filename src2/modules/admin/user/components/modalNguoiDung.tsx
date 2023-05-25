import { memo, useEffect, useState } from "react"

import { Input, Form, Modal, Checkbox, Button, Select } from "antd"
import { _DONVIREQUIRED, _EMAILREQUIRED, _ISEMAIL, _KHONGCODULIEUSELECT, _MATKHAUHOATHUONG, _MATKHAUREQUIRED, _NUTCAPNHAT, _NUTDONGLAI, _NUTTAOMOI, _TENDANGNHAPREQUIRED, _TENDAYDUREQUIRED, _TENQUYENREQUIRED } from "constant";
const { Option } = Select;

function NguoiDungModal({ dataDonVi, dataQuyen, rowKeyUser, isShowModalUser, closeModal, createUpdateHandler }) {
    const [form] = Form.useForm();
    const [isActive, setIsActive] = useState(rowKeyUser.hoatDong);
    async function submitHandler(values: any) {
        const newData = {
            ...values,
            hoatDong: isActive !== undefined ? isActive : true
        }
        if (rowKeyUser && rowKeyUser.id) {
            newData.id = rowKeyUser.id;
        }

        createUpdateHandler(newData);
        form.resetFields();
        closeModal();
    }

    //thay đổi trạng thái
    const changeTrangThai = (e: any) => {
        setIsActive(e.target.checked)
    };

    useEffect(() => {
        if (rowKeyUser.ID) {
            const { ...fields } = rowKeyUser;
            form.setFieldsValue(fields)
        }
        // eslint-disable-next-line
    }, [rowKeyUser, form])

    return (
        <Modal
            title={rowKeyUser && rowKeyUser.id ? "Sửa tài khoản" : "Tạo tài khoản"}
            visible={isShowModalUser}
            onCancel={closeModal}
            className="modal-user"
            footer={[
                <Button key="back" onClick={closeModal} className="button-closed">
                    {_NUTDONGLAI}
                </Button>,
                <Button key="submit" type="default" className="button-primary" htmlType="submit" form="form-users">
                    {rowKeyUser.id ? _NUTCAPNHAT : _NUTTAOMOI}
                </Button>,
            ]}
        >
            {
                rowKeyUser && rowKeyUser.id ?
                    <Form
                        form={form}
                        name="form-users"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        onFinish={submitHandler}
                        initialValues={{ ...rowKeyUser }}
                    >
                        <Form.Item
                            label="Đơn vị"
                            name="donViID"
                            rules={[{ required: true, message: _DONVIREQUIRED }]}
                        >
                            <Select
                                placeholder="Chọn đơn vị"
                                showSearch
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                notFoundContent={_KHONGCODULIEUSELECT}
                            >
                                {dataDonVi && dataDonVi.length
                                    ? dataDonVi.map((item, index) => (
                                        <Option key={index} value={item.id}>
                                            {item.tenDonVi}
                                        </Option>
                                    ))
                                    : null}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label="Tên đầy đủ"
                            name="hoTen"
                            rules={[{ required: true, message: _TENDAYDUREQUIRED }]}
                        >
                            <Input placeholder="Nhập tên đầy đủ" />
                        </Form.Item>
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                { required: true, message: _EMAILREQUIRED },
                                { type: 'email', message: _ISEMAIL }
                            ]}
                        >
                            <Input placeholder="Nhập email" />
                        </Form.Item>
                        <Form.Item
                            name="quyenHeThongID"
                            label="Tên quyền"
                            rules={[{ required: true, message: _TENQUYENREQUIRED }]}
                        >
                            <Select placeholder="Chọn quyền hệ thống" notFoundContent={_KHONGCODULIEUSELECT}>
                                {dataQuyen && dataQuyen.length
                                    ? dataQuyen.map((item, index) => (
                                        <Option key={index} value={item.id}>
                                            {item.tenQuyen}
                                        </Option>
                                    ))
                                    : null}
                            </Select>
                        </Form.Item>
                        <Form.Item name="hoatDong" label="hoạt động" className="isActive">
                            <Checkbox onChange={changeTrangThai} defaultChecked={rowKeyUser.hoatDong}>
                                Hoạt động
                            </Checkbox>
                        </Form.Item>
                    </Form>
                    :
                    <Form
                        form={form}
                        name="form-users"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        onFinish={submitHandler}
                    >
                        <Form.Item
                            label="Đơn vị"
                            name="donViID"
                            rules={[{ required: true, message: _DONVIREQUIRED }]}
                        >
                            <Select
                                placeholder="Chọn đơn vị"
                                showSearch
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                notFoundContent={_KHONGCODULIEUSELECT}
                            >
                                {dataDonVi && dataDonVi.length
                                    ? dataDonVi.map((item, index) => (
                                        <Option key={index} value={item.id}>
                                            {item.tenDonVi}
                                        </Option>
                                    ))
                                    : null}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label="Tên đăng nhập"
                            name="tenDangNhap"
                            rules={[
                                { required: true, message: _TENDANGNHAPREQUIRED },
                                { pattern: /^[a-z0-9]*$/, message: 'Tên đăng nhập bao gồm chữ cái thường và chữ số' }
                            ]}
                        >
                            <Input autoComplete={'new-username'} placeholder="Nhập tên đăng nhập" />
                        </Form.Item>
                        <Form.Item
                            label="Mật khẩu"
                            name="matKhau"
                            rules={[{ required: true, message: _MATKHAUREQUIRED },
                            {
                                //^(?=.*[a-z]{x,})(?=.*[A-Z]{y,})(?=.*[0-9]{z,})(?=.*[!@#\$%\^&\*]).{w,}$
                                pattern: /^(?=.*[a-z]{1,})(?=.*[A-Z]{1,}).{8,}$/,
                                message: _MATKHAUHOATHUONG
                            }]}
                            hasFeedback
                        >
                            <Input.Password autoComplete={'new-password'} placeholder="Nhập mật khẩu" />
                        </Form.Item>
                        <Form.Item
                            label="Tên đầy đủ"
                            name="hoTen"
                            rules={[{ required: true, message: _TENDAYDUREQUIRED }]}
                        >
                            <Input placeholder="Nhập tên đầy đủ" />
                        </Form.Item>
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                { required: true, message: _EMAILREQUIRED },
                                { type: 'email', message: _ISEMAIL }
                            ]}
                        >
                            <Input autoComplete={'new-email'} placeholder="Nhập email" />
                        </Form.Item>
                        <Form.Item
                            name="quyenHeThongID"
                            label="Tên quyền"
                            rules={[{ required: true, message: _TENQUYENREQUIRED }]}
                        >
                            <Select placeholder="Chọn quyền hệ thống" notFoundContent={_KHONGCODULIEUSELECT}>
                                {dataQuyen && dataQuyen.length
                                    ? dataQuyen.map((item, index) => (
                                        <Option key={index} value={item.id}>
                                            {item.tenQuyen}
                                        </Option>
                                    ))
                                    : null}
                            </Select>
                        </Form.Item>
                    </Form>
            }
        </Modal>
    )
}

export default memo(NguoiDungModal)