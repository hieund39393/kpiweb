import { memo, useEffect, useState } from 'react';
import { Button, Form, Modal, Tree } from 'antd';
import { _FALSE, _NUTCAPNHAT, _NUTDONGLAI, _TRUE } from 'constant';

const { TreeNode } = Tree

function ChiTieuModal({ rowCategory, chiTieuNguoiDung, isShow, closeModal, updateHandler }) {
  let checkChucNang: string[] = [];
  const [chucNang, setChucNang] = useState(checkChucNang);
  const [isChange, setIsChange] = useState(_FALSE)

  const [form] = Form.useForm();

  if (chiTieuNguoiDung && chiTieuNguoiDung.chiTieus !== null) {
    // eslint-disable-next-line
    chiTieuNguoiDung.chiTieus.map((items => {
      if (!items.isChecked) {
        if (items.children) {
          // eslint-disable-next-line
          items.children.map(item => {
            if (!item.isChecked) {
              if (item.children) {
                // eslint-disable-next-line
                item.children.map(chil => {
                  if (chil.isChecked) {
                    checkChucNang.push(chil.id.toString())
                  }
                })
              }
            } else {
              checkChucNang.push(item.id.toString())
              // eslint-disable-next-line
              item.children.map(chil => {
                if (chil.isChecked) {
                  checkChucNang.push(chil.id.toString())
                }
              })
            }
          })
        }
      }
      else {
        checkChucNang.push(items.id.toString())
      }
    })
    )
  }

  const renderTreeNodes = data =>
    data.map(item => {
      if (item.children) {
        // eslint-disable-next-line
        item.children.map(chil => {
          if (chil.children) {
            return (
              <TreeNode title={chil.tenDanhMuc} key={chil.id}>
                {renderTreeNodes(chil.children)}
              </TreeNode>
            )
          }
        })
        return (
          <TreeNode title={item.tenDanhMuc} key={item.id}>
            {renderTreeNodes(item.children)}
          </TreeNode>
        )
      }
      return <TreeNode key={item.id} title={item.tenDanhMuc} {...item} />
    })

  //check tree
  const onCheckTree = (checkedKeys: any, info: any) => {
    setIsChange(_TRUE)
    setChucNang(checkedKeys)
  };

  function submitHandler(values: any) {
    const newData = {
      ...values,
      nguoiDungID: rowCategory.id,
      chiTieuIDs: isChange ? chucNang.toString() : checkChucNang.toString()
    }

    updateHandler(newData);
    form.resetFields();
    closeModal();
  }

  useEffect(() => {
    if (rowCategory.ID) {
      const { ...fields } = rowCategory;
      form.setFieldsValue(fields)
    }
    // eslint-disable-next-line
  }, [rowCategory, form])

  return (
    <Modal
      title="Gán quyền chỉ tiêu cho người dùng"
      visible={isShow}
      onCancel={closeModal}
      className="paste-user"
      footer={[
        <Button key="back" onClick={closeModal} className="button-closed">
          {_NUTDONGLAI}
        </Button>,
        <Button key="submit" type="default" className="button-primary" htmlType="submit" form="form-role">
          {_NUTCAPNHAT}
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
        <Form.Item name="chiTieuIDs">
          <Tree
            checkable
            defaultExpandedKeys={checkChucNang}
            defaultSelectedKeys={checkChucNang}
            defaultCheckedKeys={checkChucNang}
            onCheck={onCheckTree}>
            {renderTreeNodes(chiTieuNguoiDung.chiTieus)}
          </Tree>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default memo(ChiTieuModal)