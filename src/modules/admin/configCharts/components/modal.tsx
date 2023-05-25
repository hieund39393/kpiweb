import { memo, useEffect, useRef, useState } from 'react';
import { Button, Form, Input, Modal } from 'antd';
import { _NUTCAPNHAT, _NUTDONGLAI } from 'constant';
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/lib/css/styles.css";

function ModalAction({ rowKey, isShowModal, closeModal, updateHandler }) {
  const giaTri1 = rowKey.giaTri1 !== undefined ? rowKey.giaTri1 : ""
  const giaTri2 = rowKey.giaTri2 !== undefined ? rowKey.giaTri2 : ""
  const giaTri3 = rowKey.giaTri3 !== undefined ? rowKey.giaTri3 : ""
  const [background, setBackground] = useColor("hex", giaTri1);
  const [color1, setColor1] = useColor('hex', giaTri2);
  const [color2, setColor2] = useColor('hex', giaTri3);
  const [change1, setChange1] = useState(false)
  const [change2, setChange2] = useState(false)
  const [change3, setChange3] = useState(false)
  const inputRef = useRef<typeof Input>(null);
  const [form] = Form.useForm();

  function submitHandler(values: any) {

    const newData = {
      ...values,
    }
    let value1: string = '';
    let value2: string = '';
    let value3: string = '';

    if (values.giaTri1 === undefined) value1 = giaTri1
    else value1 = values.giaTri1

    if (values.giaTri2 === undefined) value2 = giaTri2
    else value2 = values.giaTri2

    if (values.giaTri3 === undefined) value3 = giaTri3
    else value3 = values.giaTri3

    if (change1) value1 = background.hex
    if (change2) value2 = color1.hex
    if (change3) value3 = color2.hex

    if (value1 !== '') {
      newData.giaTri = value1
      if (value2 !== '') {
        newData.giaTri = value1 + '_' + value2
        if (value3 !== '') {
          newData.giaTri = value1 + '_' + value2 + '_' + value3
        }
      }
    }

    delete newData.giaTri1
    delete newData.giaTri2
    delete newData.giaTri3
    if (rowKey && rowKey.id) {
      newData.id = rowKey.id;
    }

    updateHandler(newData);
    form.resetFields();

    closeModal();
  }

  function handleChangeComplete(color) {
    setBackground(color)
    setChange1(true)
  };

  function handleChangeComplete1(color) {
    setColor1(color)
    setChange2(true)
  };

  function handleChangeComplete2(color) {
    setColor2(color)
    setChange3(true)
  };

  let maxValue: number = 31;
  if (rowKey.tenCauHinh === 'theothang') {
    maxValue = 12
  } else if (rowKey.tenCauHinh === 'theongay') {
    maxValue = 31
  } else {
    maxValue = 15
  }


  const renderValue1 = () => {
    if (parseInt(giaTri1) > 0) {
      return (
        <Form.Item
          name="giaTri1"
          label="Giá trị"
          rules={[{ required: true, message: 'Giá trị không được để trống' }]}
        >
          <Input
            placeholder="Giá trị"
            defaultValue={giaTri1}
            min={1}
            max={maxValue}
            type='number'
          />
        </Form.Item>
      )
    } else if (giaTri1.indexOf('#') === -1) {
      return (
        <Form.Item
          name="giaTri1"
          label="Kiểu biểu đồ"
        >
          <Input placeholder="Nhập kiểu biểu đồ" defaultValue={giaTri1} readOnly />
        </Form.Item>
      )
    } else {
      return (
        <Form.Item label="Màu sắc" name="giaTri1">
          <ColorPicker width={340} height={150} color={background} onChange={handleChangeComplete} hideHSV />
        </Form.Item>
      )
    }
  }

  const renderValue2 = () => {
    if (giaTri2 !== '') {
      if (parseInt(giaTri2) > 0) {
        return (
          <Form.Item
            name="giaTri2"
            label="Giá trị"
            rules={[{ required: true, message: 'Giá trị không được để trống' }]}
          >
            <Input
              placeholder="Giá trị"
              defaultValue={giaTri2}
              min={1}
              max={31}
              type='number'
            />
          </Form.Item>
        )
      } else if (giaTri2.indexOf('#') === -1) {
        return (
          <Form.Item
            name="giaTri2"
            label="Kiểu biểu đồ"
          >
            <Input placeholder="Kiểu biểu đồ" defaultValue={giaTri2} />
          </Form.Item>
        )
      } else {
        return (
          <Form.Item label="Nhập màu sắc" name="giaTri2">
            <ColorPicker width={340} height={150} color={color1} onChange={handleChangeComplete1} hideHSV />
          </Form.Item>
        )
      }
    } else return <></>
  }

  const renderValue3 = () => {
    if (giaTri3 !== '') {
      if (giaTri3.indexOf('#') === -1) {
        return (
          // <Form.Item
          //   name="giaTri3"
          //   label="Kiểu biểu đồ"
          // >
          //   <Input placeholder="Nhập kiểu biểu đồ" defaultValue={giaTriBieuDo.value3} readOnly />
          // </Form.Item>
          <></>
        )
      } else {
        return (
          <Form.Item label="Màu sắc" name="giaTri3">
            <ColorPicker width={340} height={150} color={color2} onChange={handleChangeComplete2} hideHSV />
          </Form.Item>
        )
      }
    } else return <></>

  }
  //useEffect(() => {
    //if (rowKey.id) {
      //const { ...fields } = rowKey;
      //form.setFieldsValue(fields)
    //}

    //if (isShowModal) {
      //inputRef.current!.focus();
    //}
    // eslint-disable-next-line
  //}, [rowKey, form])

  return (
    <Modal
      title="Sửa cấu hình biểu đồ"
      visible={isShowModal}
      onCancel={closeModal}
      className="modal-setting-chart"
      footer={[
        <Button key="back" className="button-closed" onClick={closeModal}>
          {_NUTDONGLAI}
        </Button>,
        <Button key="submit" type="default" htmlType="submit" className="button-primary" form="form-config-chart">
          {_NUTCAPNHAT}
        </Button>,
      ]}
    >
      <Form
        form={form}
        name="form-config-chart"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        initialValues={{ remember: true }}
        onFinish={submitHandler}
      >
        <Form.Item label="Tên cấu hình" name="moTa" >
          <Input placeholder="Nhập cấu hình"
            //ref={inputRef}
          />
        </Form.Item>
        {renderValue1()}
        {renderValue2()}
        {renderValue3()}
      </Form>
    </Modal>
  )
}

export default memo(ModalAction);