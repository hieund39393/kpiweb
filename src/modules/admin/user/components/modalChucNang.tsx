import { memo, useEffect, useState } from "react";

import { Form, Modal, Button, Tree } from "antd";
import { _FALSE, _NUTCAPNHAT, _NUTDONGLAI, _TRUE } from "constant";

const { TreeNode } = Tree

function ModalChucNang({
    rowKeyRole,
    chucNangNguoiDung,
    isShowModalRole,
    closeModal,
    updateHandler,
}) {


    const [isChange, setIsChange] = useState(_FALSE)
    const [form] = Form.useForm();
    let checkChucNang: string[] = [];

    if (chucNangNguoiDung && chucNangNguoiDung.chucNangs !== null) {
        // eslint-disable-next-line
        chucNangNguoiDung.chucNangs.map((items => {
            if (!items.isChecked) {
                if (items.children) {
                    // eslint-disable-next-line
                    items.children.map(item => {
                        if (item.isChecked) {
                            checkChucNang.push(item.id.toString())
                        }
                    })
                }
            } else {
                checkChucNang.push(items.id.toString())
                // eslint-disable-next-line
                items.children.map(item => {
                    if (item.isChecked) {
                        checkChucNang.push(item.id.toString())
                    }
                })

            }
        })
        )
    }

    const [chucNang, setChucNang] = useState(checkChucNang)

    // eslint-disable-next-line
    const renderTreeNodes = data =>
        data.map(item => {
            if (item.children) {
                // eslint-disable-next-line
                item.children.map(chil => {
                    // eslint-disable-next-line
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

    //check tree data
    const onCheckTree = (checkedKeys: any, info: any) => {
        setIsChange(_TRUE)
        setChucNang(checkedKeys)
    };
    function handleFormSubmit(values: any) {
        const newData = {
            ...values,
            nguoiDungID: rowKeyRole.id.toString(),
            chucNangIDs: isChange ? chucNang.toString() : checkChucNang.toString()
        }

        updateHandler(newData);
        form.resetFields();
        closeModal();
    }



    useEffect(() => {
        if (rowKeyRole.id) {
            const { ...fields } = rowKeyRole;
            form.setFieldsValue(fields)
        }
        // eslint-disable-next-line
    }, [rowKeyRole, form])
    return (
        <Modal
            title="Gán quyền chức năng cho người dùng"
            visible={isShowModalRole}
            style={{ top: 50 }}
            className="paste-user"
            onCancel={closeModal}
            footer={[
                <Button key="back" className="button-closed" onClick={closeModal}>
                    {_NUTDONGLAI}
                </Button>,
                <Button key="submit" type="default" className="button-primary" htmlType="submit" form="form-paste">
                    {_NUTCAPNHAT}
                </Button>,
            ]}
        >
            <Form
                form={form}
                name="form-paste"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                initialValues={{ remember: true }}
                onFinish={handleFormSubmit}
            >
                <Form.Item label="Quyền" name="chucNangIDs">
                    <Tree
                        checkable
                        defaultExpandedKeys={checkChucNang}
                        defaultSelectedKeys={checkChucNang}
                        defaultCheckedKeys={checkChucNang}
                        onCheck={onCheckTree}>
                        {renderTreeNodes(chucNangNguoiDung.chucNangs)}
                    </Tree>
                </Form.Item>
            </Form>
        </Modal>
    )
}
export default memo(ModalChucNang)