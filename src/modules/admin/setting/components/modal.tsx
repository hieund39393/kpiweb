import { memo, useEffect, useRef } from 'react';
import { Button, Form, Input, Modal } from 'antd';
import { _NUTCAPNHAT, _NUTDONGLAI, _NUTTAOMOI } from 'constant';

function ModalCauHinh({ rowKey, isShowModal, closeModal, createUpdateHandler }) {
    const [form] = Form.useForm();
    //const inputRef = useRef<typeof Input>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    function submitHandler(values: any) {
        const newData = {
            ...values
        }

        if (rowKey && rowKey.cauHinhID) {
            newData.cauHinhID = rowKey.cauHinhID;
        }
        delete newData.laTongCongTy
        createUpdateHandler(newData);
        form.resetFields();

        closeModal();
    }

    function onClick() {
        inputRef.current!.focus();
    }

    useEffect(() => {
        if (rowKey.cauHinhID) {
            const { ...fields } = rowKey;
            form.setFieldsValue(fields)
        }
        if (isShowModal) {
            inputRef.current!.focus();
        }
        // eslint-disable-next-line
    }, [rowKey, form])
    return (
        <Modal
            title={rowKey && rowKey.cauHinhID ? "Sửa cấu hình chung" : "Tạo mới cấu hình chung"}
            visible={isShowModal}
            onCancel={closeModal}
            footer={[
                <Button key="back" className="button-closed" onClick={closeModal}>
                    {_NUTDONGLAI}
                </Button>,
                <Button key="submit" type="default" htmlType="submit" className="button-primary" form="form-config" onClick={onClick}>
                    {rowKey.cauHinhID ? _NUTCAPNHAT : _NUTTAOMOI}
                </Button>,
            ]}
        >
            <Form
                form={form}
                name="form-config"
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
                initialValues={{ remember: true }}
                onFinish={submitHandler}
            >
                <Form.Item
                    label="Tên cấu hình"
                    name="tenCauHinh"
                    rules={[{ required: true, message: 'Tên cấu hình không được để trống' }]}
                >
                    <Input placeholder="Tên cấu hình. Ví dụ: mobile_version" ref={this.inputRef} />
                </Form.Item>
                <Form.Item label="Giá trị" name="giaTri" rules={[{ required: true, message: 'Giá trị không được để trống' }]}>
                    <Input placeholder="Giá trị" />
                </Form.Item>
                <Form.Item label="Mô tả" name="mota">
                    <Input placeholder="Mô tả" />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default memo(ModalCauHinh)