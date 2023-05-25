import { memo, useEffect } from 'react';
import { Button, Form, Input, Modal } from 'antd';

function ModalAction({ rowKey, isShowModal, closeModal, createUpdateHandler }) {
  const [form] = Form.useForm();

  function submitHandler(values: any) {
    const newData = {
      ...values,
      thuTuHienThi: parseInt(values.thuTuHienThi)
    }

    if (rowKey && rowKey.id) {
      newData.id = rowKey.id;
    }
    createUpdateHandler(newData);
    form.resetFields();

    closeModal();
  }

  useEffect(() => {
    if (rowKey.id) {
      const { ...fields } = rowKey;
      form.setFieldsValue(fields)
    }
    // eslint-disable-next-line
  }, [rowKey, form])

  return (
    <Modal
      title={rowKey && rowKey.id ? "Sửa Câu hỏi bí mật" : "Tạo mới Câu hỏi bí mật"}
      visible={isShowModal}
      okText="Cập nhật"
      cancelText="Đóng lại"
      onCancel={closeModal}
      footer={[
        <Button key="back" className="button-closed" onClick={closeModal}>
          Đóng lại
        </Button>,
        <Button key="submit" type="default" htmlType="submit" className="button-primary" form="form-question">
          {rowKey.id ? 'Cập nhật' : 'Tạo mới'}
        </Button>,
      ]}
    >
      <Form
        form={form}
        name="form-question"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        initialValues={{ remember: true }}
        onFinish={submitHandler}
      >
        <Form.Item
          label="Tên câu hỏi"
          name="cauHoi"
          rules={[{ required: true, message: "Tên câu hỏi không được bỏ trống!" }]}
        >
          <Input placeholder="Nhập tên câu hỏi" />
        </Form.Item>
        <Form.Item label="Thứ tự hiển thị" name="thuTuHienThi">
          <Input placeholder="Nhập tên đơn vị" type="number" />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default memo(ModalAction);