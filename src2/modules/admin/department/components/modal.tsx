import { memo, useEffect, useRef, useState } from 'react';
import { Button, Form, Input, Modal } from 'antd';
import Checkbox from 'antd/lib/checkbox/Checkbox';
import { _DONVIREQUIRED, _MADONVIREQUIRED, _NUTCAPNHAT, _NUTDONGLAI, _NUTTAOMOI } from 'constant';

function ModalAction({ rowKey, isShowModal, closeModal, createUpdateHandler }) {
  const [form] = Form.useForm();
  const [check, setCheck] = useState(rowKey.laTongCongTy)
  const inputRef = useRef<Input>(null);
  const onChange = e => {
    setCheck(e.target.checked)
  };

  function submitHandler(values: any) {
    const newData = {
      ...values,
      laTongCongty: check
    }

    if (rowKey && rowKey.id) {
      newData.id = rowKey.id;
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
    if (rowKey.id) {
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
      title={rowKey && rowKey.id ? "Sửa đơn vị" : "Tạo mới đơn vị"}
      visible={isShowModal}
      onCancel={closeModal}
      footer={[
        <Button key="back" className="button-closed" onClick={closeModal}>
          {_NUTDONGLAI}
        </Button>,
        <Button key="submit" type="default" htmlType="submit" className="button-primary" form="form-department" onClick={onClick}>
          {rowKey.id ? _NUTCAPNHAT : _NUTTAOMOI}
        </Button>,
      ]}
    >
      <Form
        form={form}
        name="form-department"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        initialValues={{ remember: true }}
        onFinish={submitHandler}
      >
        <Form.Item
          label="Mã đơn vị"
          name="maDonVi"
          rules={[{ required: true, message: _MADONVIREQUIRED }]}
        >
          <Input placeholder="Nhập mã đơn vị" ref={inputRef} />
        </Form.Item>
        <Form.Item label="Tên đơn vị" name="tenDonVi" rules={[{ required: true, message: _DONVIREQUIRED }]}>
          <Input placeholder="Nhập tên đơn vị" />
        </Form.Item>
        <Form.Item label="Tổng công ty" name="laTongCongTy">
          <Checkbox checked={check} onChange={onChange}>Tổng công ty</Checkbox>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default memo(ModalAction);