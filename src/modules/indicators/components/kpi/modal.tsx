import { memo, useEffect, useRef, useState } from 'react';
import { Button, Form, Input, Modal, Row, Col, Select, Checkbox, Tooltip } from 'antd';
import { _FALSE, _KHONGCODULIEUSELECT, _NUTCAPNHAT, _NUTDONGLAI, _NUTTAOMOI, _TRUE } from 'constant';

const { Option } = Select

function ModalAction({ rowKey, isShowModal, closeModal, createUpdateHandler, root, group }) {
  const [apDungThang, setApDungThang] = useState(rowKey.applyYearToMonth);
  const [giaTriKeHoach, setGiaTriKeHoach] = useState(rowKey.coGiaTriKeHoach)
  const [duLieuDonVi, setDuLieuDonVi] = useState(rowKey.coDuLieuMucDonVi);
  const [duLieuNgay, setDuLieuNgay] = useState(rowKey.coDuLieuNgay);
  const [duLieuBieuDo, setDuLieuBieuDo] = useState(rowKey.duLieuBieuDoDangBang);
  // const [isDisabled, setIsDisabled] = useState(_FALSE)
  // const [loai, setLoai] = useState(rowKey.loaiDongBo)

  const [form] = Form.useForm();
  //const inputRef = useRef<typeof Input>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  function submitHandler(values: any) {
    const newData = {
      ...values,
      reportedID: values.reportedID === '' || values.reportedID === null ? null : parseInt(values.reportedID),
      rootID: values.rootID === '' || values.rootID === null ? null : parseInt(values.rootID),
      groupID: values.groupID === '' || values.groupID === null ? null : parseInt(values.groupID),
      luyKeManual: values.luyKeManual === '' || values.luyKeManual === null ? null : parseInt(values.luyKeManual),
      phanLoaiCanhBao: values.phanLoaiCanhBao === '' || values.phanLoaiCanhBao === null ? null : parseInt(values.phanLoaiCanhBao),
      tyLeCanhBaoTang: values.tyLeCanhBaoTang === '' || values.tyLeCanhBaoTang === null ? null : parseInt(values.tyLeCanhBaoTang),
      tyLeCanhBaoGiam: values.tyLeCanhBaoGiam === '' || values.tyLeCanhBaoGiam === null ? null : parseInt(values.tyLeCanhBaoGiam),
      // soLuongBieuDoMoiHang: values.soLuongBieuDoMoiHang === '' || values.soLuongBieuDoMoiHang === null ? null : parseInt(values.soLuongBieuDoMoiHang),
      // chiTieuEVNID: values.chiTieuEVNID === '' || values.chiTieuEVNID === null ? null : parseInt(values.chiTieuEVNID),
      applyYearToMonth: apDungThang,
      coGiaTriKeHoach: giaTriKeHoach,
      coDuLieuMucDonVi: duLieuDonVi,
      coDuLieuNgay: duLieuNgay,
      duLieuBieuDoDangBang: duLieuBieuDo,
      // loaiDongBo: loai
    }

    if (rowKey && rowKey.id) {
      newData.id = rowKey.id;
    }
    delete newData.laTongCongTy
    createUpdateHandler(newData);
    form.resetFields();

    closeModal();
  }

  function checkApDungThang(e) {
    setApDungThang(e.target.checked)
  }

  function checkGiaTriKeHoach(e) {
    setGiaTriKeHoach(e.target.checked)
  }

  function checkDonvi(e) {
    setDuLieuDonVi(e.target.checked)
  }

  function checkNgay(e) {
    setDuLieuNgay(e.target.checked)
  }

  function checkBieuDo(e) {
    setDuLieuBieuDo(e.target.checked)
  }

  // function changeData(e) {
  //   setLoai(e.target.value)
  // }

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
    // if (rowKey.reportedID === null || rowKey.reportedID === 'null') {
    //   if ((rowKey.rootID !== null || rowKey.rootID !== 'null') && (rowKey.parentID !== null || rowKey.parentID !== 'null')) {
    //     setIsDisabled(_TRUE)
    //   }
    // }
    // eslint-disable-next-line
  }, [rowKey, form])

  //type phân loại cảnh báo
  const typePhanLoaiCanhBao = [
    {
      key: 0,
      name: 'Không cảnh báo'
    },
    {
      key: 1,
      name: 'Loại 1'
    },
    {
      key: 2,
      name: 'Loại 2'
    }
  ];

  //type parent
  const typeParent = [
    {
      key: 1,
      name: 'Công thức 1'
    },
    {
      key: 2,
      name: 'Công thức 2'
    },
    {
      key: 3,
      name: 'Công thức 3'
    },
    {
      key: 4,
      name: 'Công thức 4'
    }
  ];

  //type phân loại cảnh báo
  const typeLuyKe = [
    {
      key: 0,
      name: 'Tự động'
    },
    {
      key: 1,
      name: 'Nhập tay'
    }
  ];

  //check field b
  function renderLayout() {
    if (rowKey.id === undefined || rowKey.duLieuBieuDoDangBang === _FALSE) return _TRUE
    else return _FALSE
  }

  return (
    <Modal
      title={rowKey && rowKey.id ? "Sửa danh mục chỉ tiêu" : "Tạo mới danh mục chỉ tiêu"}
      visible={isShowModal}
      onCancel={closeModal}
      className="modal-category-indicators"
      footer={[
        <Button key="back" className="button-closed" onClick={closeModal}>
          {_NUTDONGLAI}
        </Button>,
        <Button key="submit" type="default" htmlType="submit" className="button-primary" form="form-category" onClick={onClick}>
          {rowKey.id ? _NUTCAPNHAT : _NUTTAOMOI}
        </Button>,
      ]}
    >
      <Form
        form={form}
        name="form-category"
        layout="vertical"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ ...rowKey }}
        onFinish={submitHandler}
      >
        <Row gutter={24}>
          <Col span={24} md={6}>
            <Form.Item
              name="reportedID"
              label={
                <Tooltip
                  placement="bottom"
                  title={
                    <div className="tooltip-modal">
                      <p>Dùng để xác định chỉ tiêu Lv2 hoặc Lv3</p>
                      <p>NULL: là chỉ tiêu Lv2 (Parent)</p>
                      <p>Có giá trị: là chỉ tiêu Lv3</p>
                    </div>
                  }
                >
                  Reported ID
                </Tooltip>
              }
              rules={[{ pattern: /^[0-9]\d*$/, message: 'Reported ID không được nhập số âm' }]}
            >
              <Input type="number" placeholder="Nhập reportedID" ref={this.inputRef} min={0} disabled={rowKey.id !== undefined ? _TRUE : _FALSE} />
            </Form.Item>
          </Col>
          <Col span={24} md={6}>
            <Form.Item
              name="rootID"
              label={<Tooltip
                placement="bottom"
                title={
                  <div className="tooltip-modal">
                    <p>Cùng RootID thì cùng Loại chỉ tiêu (Lv2)</p>
                  </div>
                }
              >
                Root ID
              </Tooltip>
              }
              rules={[{ pattern: /^[0-9]\d*$/, message: 'Root ID không được nhập số âm' }]}
            >
              <Input type="number" placeholder="Nhập rootID" min={0} disabled={rowKey.id !== undefined ? _TRUE : _FALSE} />
            </Form.Item>
          </Col>
          <Col span={24} md={6}>
            <Form.Item
              name="groupID"
              label={<Tooltip
                placement="bottom"
                title={
                  <div className="tooltip-modal">
                    <p>Cùng Group ID thì cùng Bộ chỉ tiêu (Lv1)</p>
                    <p>1: Kỹ thuật</p>
                    <p>2: Kinh doanh</p>
                    <p>3: Đầu tư xây dựng</p>
                    <p>4: Sửa chữa lớn</p>
                  </div>
                }
              >
                Group ID
              </Tooltip>
              }
              rules={[{ pattern: /^[0-9]\d*$/, message: 'Group ID không được nhập số âm' }]}
            >
              <Input type="number" placeholder="Nhập groupID" min={0} disabled={rowKey.id !== undefined ? _TRUE : _FALSE} />
            </Form.Item>
          </Col>
          <Col span={24} md={6}>
            <Form.Item
              name="parentID"
              label={<Tooltip
                placement="bottom"
                title={
                  <div className="tooltip-modal">
                    <p>Dùng để xác định công thức tính 'So sánh cùng kỳ năm trước' cho chỉ tiêu</p>
                    <p>1: Không tính</p>
                    <p>2: Năm nay - Năm trước</p>
                    <p>3: Năm nay * 100 / Năm trước</p>
                    <p>4: (Năm nay - Năm trước) * 100 / Năm trước</p>
                  </div>
                }
              >
                Formula ID
              </Tooltip>
              }
            >
              <Select placeholder="Chọn công thức"
                notFoundContent={_KHONGCODULIEUSELECT}>
                {
                  typeParent && typeParent.length > 0 ?
                    typeParent.map((item, index) => (
                      <Option value={item.key} key={index}>{item.name}</Option>
                    )) : null
                }

              </Select>
            </Form.Item>
          </Col>
          <Col span={24} md={6}>
            <Form.Item
              name="luyKeManual"
              label={<Tooltip
                placement="bottom"
                title={
                  <div className="tooltip-modal">
                    <p>Tự động: Giá trị lũy kế được TOOL tự động tính</p>
                    <p>Nhập tay: Giá trị lũy kế được nhập bằng tay từ màn hình Cập nhật giá trị thực hiện</p>
                  </div>
                }
              >
                Lũy kế Manual
              </Tooltip>
              }
            // rules={[{ pattern: /^[0-9]\d*$/, message: 'Lũy kế Manual không được nhập số âm' }]}
            >
              <Select placeholder="Chọn lũy kế manual"
                notFoundContent={_KHONGCODULIEUSELECT}>
                {
                  typeLuyKe && typeLuyKe.length > 0 ?
                    typeLuyKe.map((item, index) => (
                      <Option value={item.key} key={index}>{item.name}</Option>
                    )) : null
                }

              </Select>
              {/* <Input type="number" placeholder="Nhập Lũy kế Manual" min={0} /> */}
            </Form.Item>
          </Col>
          <Col span={24} md={6}>

            <Form.Item
              name="phanLoaiCanhBao"
              label={<Tooltip
                placement="bottom"
                title={
                  <div className="tooltip-modal">
                    <p>Chọn Loại 1 cho chỉ tiêu mà giá trị thực hiện/lũy kế tăng vượt [Tỷ lệ cảnh báo tăng] thì cảnh báo ĐỎ (Nguy hiểm). Ngược lại khi giảm vượt [Tỷ lệ cảnh báo giảm] thì cảnh báo xanh.</p>
                    <p>Chọn Loại 2 cho chỉ tiêu mà giá trị thực hiện/lũy kế tăng vượt [Tỷ lệ cảnh báo tăng] thì cảnh báo XANH (Tốt). Ngược lại khi giảm vượt [Tỷ lệ cảnh báo giảm] thì cảnh báo đỏ.</p>
                  </div>
                }
              >
                Phân loại cảnh báo
              </Tooltip>
              }
              rules={[
                { required: _TRUE, message: 'Phân loại cảnh báo không được bỏ trống' },
                { pattern: /^[0-9]\d*$/, message: 'Phân loại cảnh báo không được nhập số âm' }
              ]}
            >
              <Select placeholder="Chọn phân loại cảnh báo"
                notFoundContent={_KHONGCODULIEUSELECT}>
                {
                  typePhanLoaiCanhBao && typePhanLoaiCanhBao.length > 0 ?
                    typePhanLoaiCanhBao.map((item, index) => (
                      <Option value={item.key} key={index}>{item.name}</Option>
                    )) : null
                }

              </Select>
              {/* <Input type="number" placeholder="Nhập phân loại cảnh báo" min={0} /> */}
            </Form.Item>
          </Col>
          <Col span={24} md={6}>
            <Form.Item
              name="tyLeCanhBaoTang"
              label={<Tooltip
                placement="bottom"
                title={
                  <div className="tooltip-modal">
                    <p>Xác định giá trị cảnh báo khi tăng vượt mức</p>
                  </div>
                }
              >
                Tỷ lệ cảnh báo tăng
              </Tooltip>
              }
              rules={[
                { required: _TRUE, message: 'Tỷ lệ cảnh báo tăng không được bỏ trống' },
                { pattern: /^[0-9]\d*$/, message: 'Tỷ lệ cảnh báo tăng không được nhập số âm' }
              ]}
            >
              <Input type="number" placeholder="Nhập Tỷ lệ cảnh báo tăng" min={0} />
            </Form.Item>
          </Col>
          <Col span={24} md={6}>
            <Form.Item
              name="tyLeCanhBaoGiam"
              label={<Tooltip
                placement="bottom"
                title={
                  <div className="tooltip-modal">
                    <p>Xác định giá trị cảnh báo khi giảm vượt mức</p>
                  </div>
                }
              >
                Tỷ lệ cảnh báo giảm
              </Tooltip>
              }
              rules={[
                { required: _TRUE, message: 'Tỷ lệ cảnh báo giảm không được bỏ trống' },
                { pattern: /^[0-9]\d*$/, message: 'Tỷ lệ cảnh báo giảm không được nhập số âm' }
              ]}
            >
              <Input type="number" placeholder="Nhập Tỷ lệ cảnh báo giảm" min={0} />
            </Form.Item>
          </Col>
          <Col span={24} md={12}>
            <Form.Item
              name="tenChiTieu"
              label={<Tooltip
                placement="bottom"
                title={
                  <div className="tooltip-modal">
                    <p>Tên chỉ tiêu</p>
                  </div>
                }
              >
                Tên chỉ tiêu
              </Tooltip>
              }
              rules={[{ required: _TRUE, message: 'Tên chỉ tiêu được bỏ trống' }]}
            >
              <Input type="text" placeholder="Nhập tên chỉ tiêu" />
            </Form.Item>
          </Col>
          {/* <Col span={24} md={8}>
            <Form.Item
              name="moTa"
              label={<Tooltip
                placement="bottom"
                title={
                  <div className="tooltip-modal">
                    <p>Mô tả chỉ tiêu</p>
                  </div>
                }
              >
                Mô tả
              </Tooltip>
              }
            >
              <Input type="text" placeholder="Nhập mô tả" />
            </Form.Item>
          </Col> */}
          <Col span={24} md={12}>
            <Form.Item
              name="donViDo"
              label={<Tooltip
                placement="bottom"
                title={
                  <div className="tooltip-modal">
                    <p>Tên đơn vị tính/đo của chỉ tiêu</p>
                  </div>
                }
              >
                Đơn vị tính
              </Tooltip>
              }
            >
              <Input type="text" placeholder="Nhập đơn vị tính" />
            </Form.Item>
          </Col>
          {/* <Col span={24} md={8}>
            <Form.Item
              name="soLuongBieuDoMoiHang"
              label="Số lượng biểu đồ"
              rules={[{ pattern: /^[0-9]\d*$/, message: 'Số lượng biểu đồ không được nhập số âm' }]}
            >
              <Input type="number" placeholder="Nhập số lượng biểu đồ" min={0} />
            </Form.Item>
          </Col>
          <Col span={24} md={8}>
            <Form.Item
              name="chiTieuEVNID"
              label="Chỉ tiêu EVNID"
              rules={[{ pattern: /^[0-9]\d*$/, message: 'Chỉ tiêu EVN ID không được nhập số âm' }]}
            >
              <Input type="number" placeholder="Nhập chỉ tiêu EVNID" min={0} />
            </Form.Item>
          </Col> */}
          <Col span={12} md={renderLayout() === true ? 6 : 4}>
            <Form.Item
              name="applyYearToMonth"
              label='Áp dụng tháng'
              className="category-label-none"
            >
              <Tooltip
                placement="bottom"
                title={
                  <div className="tooltip-modal">
                    <p>Chọn Áp dụng tháng, cho phép người dùng thực hiện cập nhật tự động giá trị kế hoạch năm cho các tháng trong năm</p>
                  </div>
                }
              ><Checkbox defaultChecked={apDungThang} onChange={checkApDungThang}>Áp dụng tháng</Checkbox></Tooltip>
            </Form.Item>
          </Col>
          <Col span={12} md={renderLayout() === true ? 6 : 5}>
            <Form.Item
              name="coGiaTriKeHoach"
              label='Có giá trị kế hoạch'
              className="category-label-none"
            >
              <Tooltip
                placement="bottom"
                title={
                  <div className="tooltip-modal">
                    <p>Có giá trị kế hoạch</p>
                  </div>
                }
              ><Checkbox defaultChecked={giaTriKeHoach} onChange={checkGiaTriKeHoach}>Có giá trị kế hoạch</Checkbox></Tooltip>
            </Form.Item>
          </Col>
          <Col span={12} md={renderLayout() === true ? 6 : 5}>
            <Form.Item
              name="coDuLieuMucDonVi"
              label='Có dữ liệu mục đơn vị'
              className="category-label-none"
            >
              <Tooltip
                placement="bottom"
                title={
                  <div className="tooltip-modal">
                    <p>Có dữ liệu mục đơn vị</p>
                  </div>
                }
              ><Checkbox defaultChecked={duLieuDonVi} onChange={checkDonvi}>Có dữ liệu mức đơn vị</Checkbox></Tooltip>
            </Form.Item>
          </Col>
          <Col span={12} md={renderLayout() === true ? 6 : 5}>
            <Form.Item
              name="coDuLieuNgay"
              label='Có dữ liệu ngày'
              className="category-label-none"
            >
              <Tooltip
                placement="bottom"
                title={
                  <div className="tooltip-modal">
                    <p>Có dữ liệu ngày</p>
                  </div>
                }
              ><Checkbox defaultChecked={duLieuNgay} onChange={checkNgay}>Có dữ liệu theo ngày</Checkbox></Tooltip>
            </Form.Item>
          </Col>
          {
            renderLayout() === true ? null
              : <Col span={12} md={5}>
                <Form.Item
                  name="duLieuBieuDoDangBang"
                  label="Dữ liệu dạng table"
                  className="category-label-none"
                >
                  <Tooltip
                    placement="bottom"
                    title={
                      <div className="tooltip-modal">
                        <p>Hiện tại chỉ áp dụng riêng cho loại chỉ tiêu Tình hình vận hành đầy tải, quá tải lưới điện 110 kV và số TBA công cộng mất điện</p>
                      </div>
                    }
                  ><Checkbox defaultChecked={duLieuBieuDo} onChange={checkBieuDo} disabled={true}>Biểu đồ dạng table</Checkbox></Tooltip>
                </Form.Item>
              </Col>
          }
          {/* <Col span={24} className="dongBoDuLieu">
            <Form.Item
              name="loaiDongBo"
              label="Loại đồng bộ"
              className="choice-data"
            >
              <Radio.Group defaultValue={loai} onChange={changeData}>
                <Radio value={null}>Không đồng bộ</Radio>
                <Radio value={1}>Hằng ngày</Radio>
                <Radio value={2}>Hằng tháng</Radio>
                <Radio value={3}>Tức thời</Radio>
              </Radio.Group>
            </Form.Item>
          </Col> */}
        </Row>
      </Form>
    </Modal>
  )
}

export default memo(ModalAction);