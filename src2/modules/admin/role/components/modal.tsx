import { memo, useEffect, useRef, useState } from "react";

import { Button, Form, Input, Modal, Tree } from 'antd';
import { _NUTCAPNHAT, _NUTDONGLAI, _NUTTAOMOI, _TENQUYENREQUIRED } from "constant";

const { TreeNode } = Tree

function ModalQuyenTaiKhoan({ rowKey, dataChucNang, isShowModal, closeModal, createUpdateHandler }) {
  const inputRef = useRef<Input>(null);
  const [form] = Form.useForm();
  //check chức năng của quyền 
  let checkChucNang: string[] = [];
  if (rowKey.chucNangs) {
    // eslint-disable-next-line
    rowKey.chucNangs.map((item => {
      checkChucNang.push(item.chucNangId.toString())
    })
    )
  }
  const [chucNang, setChucNang] = useState(checkChucNang)

  //check tree data
  const onCheckTree = (checkedKeys: any) => {
    setChucNang(checkedKeys)
  };

  function submitHandler(values: any) {
    const newData = {
      ...values,
      chucNangIDs: chucNang.toString()
    }

    if (rowKey && rowKey.id) {
      newData.id = rowKey.id;
    }

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

  const renderTreeNodes = data =>
    data.map(item => {
      if (item.children) {
        // eslint-disable-next-line
        item.children.map(chil => {
          if (chil.children) {
            return (
              <TreeNode title={chil.tenChucNang} key={chil.id}>
                {renderTreeNodes(chil.children)}
              </TreeNode>
            )
          }
        })
        return (
          <TreeNode title={item.tenChucNang} key={item.id}>
            {renderTreeNodes(item.children)}
          </TreeNode>
        )
      }
      return <TreeNode key={item.id} title={item.tenChucNang} {...item} />
    })



  return (
    <Modal
      title={rowKey && rowKey.id ? "Sửa quyền hệ thống" : "Tạo mới quyền hệ thống"}
      className="modal-role"
      visible={isShowModal}
      onCancel={closeModal}
      footer={[
        <Button key="back" onClick={closeModal} className="button-closed">
          {_NUTDONGLAI}
        </Button>,
        <Button key="submit" type="default" className="button-primary" htmlType="submit" form="form-role" onClick={onClick}>
          {rowKey.id ? _NUTCAPNHAT : _NUTTAOMOI}
        </Button>,
      ]}
    >
      <Form
        form={form}
        name="form-role"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={submitHandler}
      >
        <Form.Item
          label="Tên quyền"
          name="tenQuyen"
          rules={[{ required: true, message: _TENQUYENREQUIRED }]}
        >
          <Input placeholder="Nhập tên quyền" ref={inputRef} />
        </Form.Item>
        <Form.Item label="Mô tả" name="ghiChu">
          <Input placeholder="Nhập mô tả quyền" />
        </Form.Item>
        <Form.Item label="Quyền chức năng" name="chucNangIDs">
          <Tree
            checkable
            defaultExpandedKeys={checkChucNang}
            defaultSelectedKeys={checkChucNang}
            defaultCheckedKeys={checkChucNang}
            onCheck={onCheckTree}>
            {renderTreeNodes(dataChucNang)}
          </Tree>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default memo(ModalQuyenTaiKhoan)