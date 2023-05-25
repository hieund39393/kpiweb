import { memo, useEffect, useMemo, useRef } from 'react';
import { Button, Form, Input, Modal } from 'antd';
import { _DAILY, _MONTHLY, _NUTCAPNHAT, _NUTDONGLAI } from '../../../../constant';

function ModalCauHinh({ getField, rowKey, isShowModal, closeModal, updateHandler }) {
  const [form] = Form.useForm();
  const inputRef = useRef<Input>(null);

  function submitHandler(values: any) {
    const newData = {
      ...values,
      gio: values.gio === '' || values.gio === null || values.gio === undefined ? null : parseInt(values.gio),
      ngay: values.ngay === '' || values.ngay === null || values.ngay === undefined ? null : parseInt(values.ngay),
      phut: values.phut === '' || values.phut === null || values.phut === undefined ? null : parseInt(values.phut)
    }
    if (rowKey && rowKey.id) {
      newData.id = rowKey.id;
    }

    updateHandler(newData);
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

  const render = useMemo(() => {
    if (getField.tenCauHinh.indexOf(_DAILY) > -1) {
      return (
        <Form
          form={form}
          name="form-config"
          labelCol={{ span: 10 }}
          wrapperCol={{ span: 14 }}
          initialValues={{ ...rowKey }}
          onFinish={submitHandler}
        >
          <Form.Item
            label="Giờ"
            name="gio"
            rules={[{ pattern: /^[0-9]\d*$/, message: 'Không được nhập số âm' }]}
          >
            <Input type="number" placeholder="Nhập giờ " ref={inputRef} />
          </Form.Item>
          <Form.Item
            label="Phút "
            name="phut"
            rules={[{ pattern: /^[0-9]\d*$/, message: 'Không được nhập số âm' }]}
          >
            <Input type="number" placeholder="Nhập phút" />
          </Form.Item>
          <Form.Item
            label="Mô tả"
            name="moTa"
          >
            <Input disabled={true} />
          </Form.Item>
        </Form>
      )
    } else if (getField.tenCauHinh.indexOf(_MONTHLY) > -1) {
      return (
        <Form
          form={form}
          name="form-config"
          labelCol={{ span: 10 }}
          wrapperCol={{ span: 14 }}
          initialValues={{ ...rowKey }}
          onFinish={submitHandler}
        >
          <Form.Item
            label="Ngày"
            name="ngay"
            rules={[{ pattern: /^[0-9]\d*$/, message: 'Không được nhập số âm' }]}
          >
            <Input type="number" placeholder="Nhập ngày " ref={inputRef} />
          </Form.Item>
          <Form.Item
            label="Giờ"
            name="gio"
            rules={[{ pattern: /^[0-9]\d*$/, message: 'Không được nhập số âm' }]}
          >
            <Input type="number" placeholder="Nhập giờ" />
          </Form.Item>
          <Form.Item
            label="Phút"
            name="phut"
            rules={[{ pattern: /^[0-9]\d*$/, message: 'Không được nhập số âm' }]}
          >
            <Input type="number" placeholder="Nhập phút" />
          </Form.Item>
          <Form.Item
            label="Mô tả"
            name="moTa"
          >
            <Input disabled={true} />
          </Form.Item>
        </Form>
      )
    } else return (
      <Form
        form={form}
        name="form-config"
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 14 }}
        initialValues={{ ...rowKey }}
        onFinish={submitHandler}
      >
        <Form.Item
          label="Phút"
          name="phut"
          rules={[{ pattern: /^[0-9]\d*$/, message: 'Không được nhập số âm' }]}
        >
          <Input type="number" placeholder="Nhập phút" ref={inputRef} />
        </Form.Item>
        <Form.Item
          label="Mô tả"
          name="moTa"
        >
          <Input disabled={true} />
        </Form.Item>
      </Form>
    )
    // eslint-disable-next-line
  }, [form, getField.tenCauHinh, rowKey])

  return (
    <Modal
      title='Sửa cấu hình đồng bộ'
      visible={isShowModal}
      onCancel={closeModal}
      footer={[
        <Button key="back" className="button-closed" onClick={closeModal}>
          {_NUTDONGLAI}
        </Button>,
        <Button key="submit" type="default" htmlType="submit" className="button-primary" form="form-config" onClick={onClick}>
          {_NUTCAPNHAT}
        </Button>,
      ]}
    >
      {render}
    </Modal>
  )
}

export default memo(ModalCauHinh)