import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  Link
} from "react-router-dom";
import { Button, Select, Row, Form, Radio, DatePicker, Col, Table, Input, Dropdown, notification } from 'antd';
import { InsertRowAboveOutlined } from '@ant-design/icons';
import { FormInstance } from 'antd/lib/form';

import moment from 'moment';
import 'moment/locale/vi';
import locale from 'antd/es/date-picker/locale/vi_VN';

import KpiService from '../../services/KpiService';
import {
  _ARGS,
  _FALSE,
  _KHONGCODULIEU,
  _KHONGCODULIEUSELECT,
  _LOI,
  _MONTHFORMAT,
  _NAM,
  _TUAN,
  _NGAYREQUIRED,
  _NOIDUNGCAPNHATTHTHANHCONG,
  _NOIDUNGLAYDULIEUCTTHANHCONG,
  _PAGEINDEX,
  _PAGESIZE,
  _STATUSCODE200,
  _THANG,
  _THANHCONG,
  _TIEUDECAPNHATTHANHCONG,
  _TIEUDECAPNHATTHATBAI,
  _TIEUDELAYDULIEUTHANHCONG,
  _TIEUDELAYDULIEUTHATBAI,
  _TRUE,
  _TRUESTRING,
  _TYPEMONTH,
  _TYPEWEEK,
  _TYPEYEAR,
  _VUILONGCAPNHAPDAYDUTHONGTIN,
  _YEARFORMAT
} from 'constant';

import { ChiTieuProps, ThucHienProps, DonViProps } from 'modules/indicators/dtos/requests/KpiRequest';
import LocalStorageService from 'core/infrastructure/services/localStorageService';
import { titleCase } from 'core/utils/utility';
import { _TINHHINHVANHANH } from 'constant/chart';

type OptionType = {
  value: string;
  children: string;
};

const kpiService = KpiService.instance();
const localStorageService = LocalStorageService.instance()
const { Option } = Select
const EditableContext = React.createContext<FormInstance<any> | null>(null);


const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  //const inputRef = useRef<typeof Input>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const form = useContext(EditableContext)!;


  useEffect(() => {
    if (editing) {
      inputRef.current!.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();

      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[
          {
            required: _TRUE,
            message: `${title} không được bỏ trống.`,
          },
          {
            pattern: titleCase(record.loaiChiTieu).indexOf(_TINHHINHVANHANH) > -1 ? /^[-]?[0-9]+(?:\/[0-9]{1,})?$|^[-]?[0-9]+(?:\.[0-9]{1,3})?$/ : /^[-]?[0-9]+(?:\.[0-9]{1,3})?$/,
            message: `${title} nhập vào không hợp lệ`
          },
          {
            max: 15,
            message: `${title} tối đa 15 ký tự`
          }
        ]}
      >
        {/* {dataIndex == 'apDungThang' ? <Checkbox></Checkbox> : <Input ref={inputRef} onPressEnter={save} onBlur={save} type="number" />} */}
        {/*<Input ref={this.inputRef}  onPressEnter={save} onBlur={save} type="text" />*/}

      </Form.Item>
    ) : (
      <div className="editable-cell-value-wrap" style={{ paddingRight: 24 }} onClick={toggleEdit}>
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

function PerformTable() {
  const localStorage = localStorageService.getUser()
  const currentDate = moment()
  const convertDate = (currentDate.month() + 1) + '/' + currentDate.year()
  const [date, setDate] = useState(convertDate)
  const [disabledUpdate, setDisabledUpdate] = useState(true)
  const columns = [
    {
      title: 'Loại chỉ tiêu',
      dataIndex: 'loaiChiTieu',
      width: '23%',
      key: 'loaiChiTieu',
    },
    {
      title: 'Tên chỉ tiêu',
      dataIndex: 'tenChiTieu',
      width: '28%',
      key: 'tenChiTieu',
    },
    {
      title: 'Kế hoạch giao',
      dataIndex: 'giaTriKeHoach',
      width: '12.5%',
      key: 'giaTriKeHoach',
      className: 'text-right',
    },
    {
      title: 'Giá trị thực hiện',
      dataIndex: 'giaTriThucHien',
      width: '12%',
      key: 'giaTriThucHien',
      editable: _TRUE,
      className: 'text-right',
    },
    {
      title: 'Lũy kế thực hiện',
      dataIndex: 'luyKeThucHien',
      width: '13%',
      key: 'luyKeThucHien',
      editable: _TRUE,
      className: 'text-right',
    },
    {
      title: 'Đơn vị tính',
      dataIndex: 'donViDo',
      width: '11.5%',
      key: 'donViDo',
      className: 'text-left',
    },
  ];

  const [data, setData] = useState<ThucHienProps[]>([]);
  const [listLoaiChiTieu, setListLoaiChiTieu] = useState<ChiTieuProps[]>([]);
  const [dataDonVi, setDataDonVi] = useState<DonViProps[]>([]);
  const [type, setType] = useState<"month" | "year"| "week">("month");
  const [format, setFormat] = useState(_MONTHFORMAT)
  const [display, setDisplay] = useState(_THANG);
  const [valueUpdate, setValueUpdate] = useState({ donViID: 0, loaiBaoCao: 0, thang: 0, nam: 0, loaiChiTieuID: 'null' })

  const [form] = Form.useForm();
  //lưu giá trị thực hiện
  const handleSave = (row) => {
    const newData = [...data];
    const index = newData.findIndex((item) => row.chiTieuID === item.chiTieuID);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setData(newData);
    setDisabledUpdate(false)
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  const columnsNew = columns.map(col => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave: handleSave,
      }),
    };
  });

  //fetch đơn vị
  async function fetchDonVi() {
    const response = await kpiService.listDonVi();
    if (response.data) setDataDonVi(response.data.donVis)
    else setDataDonVi([])
  }

  //fetch loại chỉ tiêu
  const fetchLoaiChiTieu = async (donViID) => {
    const response = await kpiService.listLoaiChiTieu({ donViID: donViID, keHoach: _FALSE })
    if (response.data) setListLoaiChiTieu(response.data.chiTieus)
    else setListLoaiChiTieu([])
  };

  //change đơn vị
  async function donViHandler(value) {
    return await fetchLoaiChiTieu(value)
  }

  //lấy dữ liệu giá trị thực hiện
  async function filterTable(values: any) {
    setData([])
    const newData = {
      ...values,
      donViID: values.donViID === undefined ? parseInt(localStorage.donViID) : parseInt(values.donViID),
      loaiChiTieuID: values.loaiChiTieuID === undefined ? 'null' : values.loaiChiTieuID,
      thangNam: values.thangNam === undefined ? currentDate : values.thangNam,
      tuan : values.tuan
    }

    let loaiBaoCao: number
    if (type === _TYPEMONTH) {
      const getMonth = moment(newData.thangNam).month();
      const getYear = moment(newData.thangNam).year();
      newData.thang = getMonth + 1;
      newData.nam = getYear;
      loaiBaoCao = 2
    } else if(type === _TYPEYEAR){
      const getYear = moment(newData.thangNam).year();
      newData.thang = null;
      newData.nam = getYear;
      loaiBaoCao = 3
    } else{
      const getYear = moment(newData.thangNam).year();
      newData.thang = newData.tuan;
      newData.nam = getYear;
      loaiBaoCao = 4
    }
    setValueUpdate({ donViID: newData.donViID, loaiBaoCao: loaiBaoCao, thang: newData.thang, nam: newData.nam, loaiChiTieuID: newData.loaiChiTieuID })
    delete newData.thangNam

    const response = await fetchData(newData)

    if (response.statusCode === _STATUSCODE200) {
      _ARGS.message = _TIEUDELAYDULIEUTHANHCONG
      _ARGS.description = _NOIDUNGLAYDULIEUCTTHANHCONG
      notification.success(_ARGS)
      setData(response.data.giaTriThucHiens);
      setDisabledUpdate(true)
    } else {
      _ARGS.message = _TIEUDELAYDULIEUTHATBAI
      _ARGS.description = response.message
      notification.error(_ARGS)
    }
  };

  async function fetchData(data: any) {
    let loaiBaoCao = 2;
    if(type === _TYPEMONTH){
      loaiBaoCao = 2;
    }
    else if(type === _TYPEYEAR){
      loaiBaoCao=  3;
    }else if(type === _TYPEWEEK){
      loaiBaoCao = 4;
    }
    const datas = {
      ...data,
      loaiBaoCao: loaiBaoCao
     
    }
    const response = await kpiService.listThucHien({ data: datas, pageIndex: _PAGEINDEX, pageSize: _PAGESIZE });
    if (response.data) setData(response.data.giaTriThucHiens);
    else setData([]);
    return response
  }

  const onReset = () => {
    form.resetFields();
    setType(_TYPEMONTH);
    setFormat(_MONTHFORMAT)
    setDate(convertDate)
    setDisabledUpdate(true)
    setData([])
  };

  useEffect(() => {
    fetchDonVi()
    fetchLoaiChiTieu(localStorage.donViID);
    // eslint-disable-next-line
  }, [])

  const notify = (type: string, message: string, description: string) => {
    notification[type]({
      message: message,
      description: description
    });
  };

  const updateHandler = () => {
    const updateData: any[] = [];
    data.forEach((newData) => {
      updateData.push({
        'id': newData.id,
        'chiTieuID': newData.chiTieuID,
        "giaTriThucHien": newData.giaTriThucHien,
        "luyKeThucHien": newData.luyKeThucHien
      });
    });

    let request = {}

    if (type === _TYPEYEAR) {
      request = {
        donViID: valueUpdate.donViID,
        loaiBaoCao: valueUpdate.loaiBaoCao,
        nam: valueUpdate.nam,
        "giaTriThucHiens": updateData
      };
    } else if(type === _TYPEMONTH){
      request = {
        donViID: valueUpdate.donViID,
        loaiBaoCao: valueUpdate.loaiBaoCao,
        thang: valueUpdate.thang,
        nam: valueUpdate.nam,
        "giaTriThucHiens": updateData
      };
    }else{
      request = {
        donViID: valueUpdate.donViID,
        loaiBaoCao: 4,
        thang: valueUpdate.thang,
        nam: valueUpdate.nam,
        "giaTriThucHiens": updateData
      };
    }



    const response = async () => await kpiService.updateThucHien(request);
    const requestList = {
      donViID: valueUpdate.donViID,
      loaiChiTieuID: valueUpdate.loaiChiTieuID,
      loaiBaoCao: valueUpdate.loaiBaoCao,
      thang: valueUpdate.thang,
      nam: valueUpdate.nam,
    }
    response()
      .then((data) => {
        if (data.statusCode === _STATUSCODE200) {
          notify(_THANHCONG, _TIEUDECAPNHATTHANHCONG, _NOIDUNGCAPNHATTHTHANHCONG);
          fetchData(requestList)
          setDisabledUpdate(true)
        } else if (data.statusCode === 500) {
          notify(_LOI, _TIEUDECAPNHATTHATBAI, _VUILONGCAPNHAPDAYDUTHONGTIN);
          setDisabledUpdate(false)
        } else {
          notify(_LOI, _TIEUDECAPNHATTHATBAI, data.message);
          setDisabledUpdate(false)
        }
      })
      .catch((error) => {
        notify(_LOI, _TIEUDECAPNHATTHATBAI, error);
      });
  }

  //change ngày
  const onChange = e => {
    setType(e.target.value);
    renderFormat(e.target.value)
  };

  //format ngày và kiểu hiển thị
  const renderFormat = (value) => {
    if (value === _TYPEMONTH) {
      setFormat(_MONTHFORMAT)
      setDisplay(_THANG);
    } else if(value === _TYPEYEAR) {
      setFormat(_YEARFORMAT)
      setDisplay(_NAM);
    }
    else{
      setFormat(_TYPEWEEK)
      setDisplay(_TUAN);
    }
  }


  const renderFilter = () => (
    <>
      <Form
        name="filter-indicators"
        form={form}
        className="filter-indicators"
        layout='vertical'
        onFinish={filterTable}
        initialValues={{
          thangNam: moment(date, _MONTHFORMAT),
        }}
      >
        <Row gutter={16} className="box-filter form-filter-indicators">
          <Col span={20} sm={9} className='form-filter-indicators--group'>
            <Form.Item
              name="donViID"
              label="Đơn vị"
            >
              <Select
                placeholder="Chọn đơn vị"
                showSearch
                optionFilterProp="children"
                disabled={localStorage.isAdmin === _TRUESTRING ? _FALSE : _TRUE}
                //filterOption={(input, option) =>
                 // option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                //}
                defaultValue={localStorage.isAdmin ? localStorage.tenDonVi : localStorage.donViID}
                value={localStorage.donViID?.toString()}
                notFoundContent={_KHONGCODULIEUSELECT}
                onChange={donViHandler}
              >
                {
                  localStorage.isAdmin === _TRUESTRING
                    ?
                    dataDonVi && dataDonVi.length
                      ? dataDonVi.map((item, index) => (
                        <Option key={index} value={item.id}>
                          {item.tenDonVi}
                        </Option>
                      ))
                      : null
                    :
                    localStorage.donViID && localStorage.donViID !== '' ?
                      <Option key={localStorage.donViID} value={localStorage.donViID} >
                        {localStorage.tenDonVi}
                      </Option>
                      : null
                }
              </Select>
            </Form.Item>
          </Col>
          <Col span={12} sm={13} className='form-filter-indicators--type'>
            <Form.Item
              className="type-indicators-update"
              name="loaiChiTieuID"
              label="Loại chỉ tiêu"
            // rules={[{ required: _TRUE, message: _LOAICHITIEUREQUIRED }]}
            >
              <Select<OptionType>
                placeholder="Chọn loại chỉ tiêu"
                showSearch
                optionFilterProp="children"
                filterOption={(inputValue, option) =>
                  (option && option.children || []).join('').toLowerCase().includes(inputValue.toLowerCase())
                }
                // filterOption={(input, option) =>
                //   option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                // }
                // defaultValue={'null'}
                notFoundContent={_KHONGCODULIEUSELECT}
              >
                <Option value="null">Tất cả</Option>
                {listLoaiChiTieu && listLoaiChiTieu.length
                  ? listLoaiChiTieu.map((chiTieu, index) => (
                    <Option key={index} value={chiTieu.id}>
                      {chiTieu.tenChiTieu}
                    </Option>
                  ))
                  : null}
              </Select>
            </Form.Item>
          </Col>
          {console.log("listLoaiChiTieu", listLoaiChiTieu)}
          <Col span={12} sm={15} md={10} className="form-filter-indicators--date">
            <div>
              <Radio.Group onChange={onChange} value={type}>
                <Radio value="week">Tuần</Radio>
                <Radio value="month">Tháng</Radio>
                <Radio value="year">Năm</Radio>
              </Radio.Group>
              {(format === 'week') ?
                <Form.Item
                 name="tuan">
                   <Select>
                    {(Array.from(Array(54).keys()).slice(1)).map((number) => (
                    <Option key={number} value={number}>
                      {number}
                    </Option>
                    ))}
                </Select>
                </Form.Item>
               : 
                <Form.Item
                  name="thangNam"
                  rules={[{ required: _TRUE, message: _NGAYREQUIRED }]}
                >
                  <DatePicker picker={type} placeholder={'Chọn ' + display} locale={locale} format={format} defaultValue={moment(date, format)} />
                </Form.Item>
              }

            </div>
          </Col>
          <Col span={12} md={3} className="button-filter-indicators form-filter-indicators--reset">
            <Button htmlType="button" className="button-closed button-rest-report" onClick={onReset} >
              Bỏ lọc
            </Button>
          </Col>
          <Col span={12} md={3} className="button-filter-indicators form-filter-indicators--submit">
            <Button type="primary" htmlType="submit" className="button-primary button-submit-report fl-r">
              Lấy dữ liệu
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  )

  return (
    <div className="page-indicators page-layout-content" id="page-indicators">
      <div className="page-indicators--header">
        <div className="page-indicators--header--title">
          <h2>Cập nhật giá trị thực hiện</h2>
        </div>
        <div className="filter-mobile">
          <Dropdown overlay={renderFilter()} >
            <Link to={'/'} className="ant-dropdown-link" onClick={(e: { preventDefault: () => any; }) => e.preventDefault()}>
              <InsertRowAboveOutlined />
            </Link>
          </Dropdown>
        </div>
      </div>
      <div className="page-indicators--filter">
        <div className="filter-pc">
          {renderFilter()}
        </div>
      </div>
      <div className="page-indicators--body">
        <div className="page-indicators--body--title">
          <div className="button-update-indicators">
            <Button type="default" className="button-closed indicators--button-update" disabled={disabledUpdate} onClick={() => updateHandler()}>
              Cập nhật
            </Button>
          </div>
        </div>
        <div className="page-indicators--body--table">
          <Table
            components={components}
            rowClassName={() => 'editable-row'}
            bordered
            dataSource={data}
            columns={columnsNew}
            locale={_KHONGCODULIEU}
            pagination={_FALSE}
            className={data.length === 0 ? "page--table height-500" : 'page--table'}
          />
        </div>
      </div>
    </div>
  )
}

export default PerformTable;