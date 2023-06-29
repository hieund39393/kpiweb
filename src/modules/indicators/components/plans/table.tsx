import React, { useContext, useEffect, useRef, useState, RefObject  } from 'react';
import {
  Link
} from "react-router-dom";
import { Button, Select, Row, Form, Radio, DatePicker, Col, Table, Input, Dropdown, notification, Switch } from 'antd';
import { InsertRowAboveOutlined } from '@ant-design/icons';
import { FormInstance } from 'antd/lib/form';

import moment from 'moment';
import 'moment/locale/vi';
import locale from 'antd/es/date-picker/locale/vi_VN';
import KpiService from '../../services/KpiService';
import LocalStorageService from 'core/infrastructure/services/localStorageService';

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
  _NOIDUNGCAPNHATKHTHANHCONG,
  _NOIDUNGLAYDULIEUKHTHANHCONG,
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
  _VUILONGCAPNHAPDAYDUTHONGTIN,
  _YEARFORMAT,
  _TYPEYEAR,
  _TYPEWEEK

} from 'constant';
import { ChiTieuProps, DonViProps, LoaiChiTieuProps } from 'modules/indicators/dtos/requests/KpiRequest';

import '../style.css'


type InputRef = RefObject<HTMLInputElement>;


const kpiService = KpiService.instance();
const localStorageService = LocalStorageService.instance()

const { Option } = Select;
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
  const [editing, setEditing] = useState(_FALSE);
  //const inputRef = useRef<typeof Input>(null);
  // const inputRef = useRef<HTMLInputElement>(null);
  const inputRef =  useRef<any>(null);
  // const checkBoxRef = useRef<false>();
  const form = useContext(EditableContext)!;

  useEffect(() => {
    if (editing && dataIndex === "giaTriKeHoach") {
      inputRef.current!.focus();
    }
  }, [editing, dataIndex]);

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
    if (editing) {
      if (dataIndex === "apDungThang") {
        if (children[1].props.className === 'false') {
          childNode = (
            <Form.Item
              name={dataIndex}
              valuePropName="checked"
            >
              <Switch checkedChildren="Áp dụng"
                unCheckedChildren="Không áp dụng"
                onChange={save}
              />
            </Form.Item>
          );
        }

      } else {
        childNode = (
          <Form.Item
            name={dataIndex}
            rules={[
              {
                required: _TRUE,
                message: `${title} không được bỏ trống.`,
              },
              {
                pattern: /^[0-9]+(?:\/[0-9]{1,})?$|^[0-9]+(?:\.[0-9]{1,3})?$/,
                message: `${title} nhập vào không hợp lệ`
              },
              {
                max: 15,
                message: `${title} tối đa 15 ký tự`
              }
            ]}
          >
            {/* {dataIndex == 'apDungThang' ? <Checkbox></Checkbox> : <Input ref={inputRef} onPressEnter={save} onBlur={save} type="number" />} */}
            <Input ref={inputRef} onPressEnter={save} onBlur={save} type="text" />
          </Form.Item>);
      }
    } else {
      childNode = (<div className="editable-cell-value-wrap" onClick={toggleEdit}>
        {children}
      </div>);
    };
  }

  return <td {...restProps}>{childNode}</td>;
};
function PlansTable() {
  const localStorage = localStorageService.getUser()

  const currentDate = moment()
  const convertDate = (currentDate.month() + 1) + '/' + currentDate.year()
  const [date, setDate] = useState(convertDate)

  const columns = [
    {
      title: 'Loại chỉ tiêu',
      dataIndex: 'loaiChiTieu',
      width: '25%',
      key: 'loaiChiTieu',
    },
    {
      title: 'Tên chỉ tiêu',
      dataIndex: 'tenChiTieu',
      width: '35%',
      key: 'tenChiTieu',
    },
    {
      title: 'Kế hoạch giao',
      dataIndex: 'giaTriKeHoach',
      width: '15%',
      key: 'giaTriKeHoach',
      editable: true,
      className: 'text-right',
    },
    {
      title: 'Áp dụng tháng',
      dataIndex: 'apDungThang',
      width: '15%',
      key: 'apDungThang',
      className: 'text-center',
      editable: true,
      render: (text, row) => {
        const chiTieuID = row.chiTieuID;
        if (text === null) return null
        else return (
          <Switch checkedChildren="Áp dụng"
            unCheckedChildren="Không áp dụng"
            disabled={checkBoolean(chiTieuID)}
            defaultChecked={text}
            className={checkBoolean(chiTieuID) ? 'true' : 'false'}
          />
        )
      }
    },
    {
      title: 'Đơn vị tính',
      dataIndex: 'donViDo',
      width: '10%',
      key: 'donViDo',
      className: 'text-left',
    },
  ];


  const [disabledUpdate, setDisabledUpdate] = useState(true)
  const [listLoaiChiTieu, setListLoaiChiTieu] = useState<LoaiChiTieuProps[]>([]);
  const [data, setData] = useState<ChiTieuProps[]>([])
  const [dataDonVi, setDataDonVi] = useState<DonViProps[]>([]);
  const [type, setType] = useState<"month" | "year"| "week">("month");
  const [format, setFormat] = useState(_MONTHFORMAT)
  const [display, setDisplay] = useState(_THANG);
  const [valueUpdate, setValueUpdate] = useState({ donViID: 0, loaiBaoCao: 0, thang: 0, nam: 0, loaiChiTieuID: 'null' })
  const [chiTieusDisabled, setChiTieusDisabled] = useState<number[]>([]);
  const [form] = Form.useForm();

  function checkBoolean(chiTieuId: number) {
    return chiTieusDisabled.includes(chiTieuId) ? true : false;
  }
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
        editable: true,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave: handleSave,
      }),
    };
  });

  //fetch đơn vị
  async function fetchDonVi() {
    const response = await kpiService.listDonVi();
    if (response.data) {
      setDataDonVi(response.data.donVis)
    } else setDataDonVi([])

  }

  //fetch chỉ tiêu
  const fetchLoaiChiTieu = async (donViID) => {
    const response = await kpiService.listLoaiChiTieu({ donViID: donViID, keHoach: _TRUE })
    if (response.data) {
      setListLoaiChiTieu(response.data.chiTieus)
    } else setListLoaiChiTieu([])
  };

  //change đơn vị
  async function donViHandler(value) {
    return await fetchLoaiChiTieu(value)
  }

  //lấy dữ kiệu theo đơn vị
  async function filterTable(values: any) {
    setData([])
    const newData = {
      ...values,
      donViID: values.donViID === undefined ? localStorage.donViID : values.donViID,
      loaiChiTieuID: values.loaiChiTieuID === undefined ? 'null' : values.loaiChiTieuID,
      thangNam: values.thangNam === undefined ? currentDate : values.thangNam,
      tuan : values.tuan
    }

    let loaiBaoCao: number

    if (type === _TYPEMONTH) {
      const getMonth = moment(values.thangNam).month();
      const getYear = moment(values.thangNam).year();
      newData.thang = getMonth + 1;
      newData.nam = getYear;
      loaiBaoCao = 2
    } else if(type === _TYPEYEAR)
    {
      const getYear = moment(values.thangNam).year();
      newData.thang = null;
      newData.nam = getYear;
      loaiBaoCao = 3
    }
    else{
      const getYear = moment(newData.thangNam).year();
      newData.thang = newData.tuan;
      newData.nam = getYear;
      loaiBaoCao = 4
    }
    const donVi = newData.donViID
    const thang = newData.thang
    const nam = newData.nam
    setValueUpdate({ donViID: donVi, loaiBaoCao: loaiBaoCao, thang: thang, nam: nam, loaiChiTieuID: newData.loaiChiTieuID })
    delete newData.thangNam

    const response = await fetchData(newData)
    if (response.statusCode === _STATUSCODE200) {
      _ARGS.message = _TIEUDELAYDULIEUTHANHCONG
      _ARGS.description = _NOIDUNGLAYDULIEUKHTHANHCONG
      notification.success(_ARGS)

      let chiTieuIdsDisabled: number[] = [];
      // eslint-disable-next-line
      response.data.giaTriKeHoachs.map(item => {
        if (item.apDungThang === true)
          chiTieuIdsDisabled.push(item.chiTieuID);
      })
      setDisabledUpdate(true)
      setData(response.data.giaTriKeHoachs);
      setChiTieusDisabled(chiTieuIdsDisabled);

    } else {
      _ARGS.message = _TIEUDELAYDULIEUTHATBAI
      _ARGS.description = response.message
      notification.error(_ARGS)
    }
  };

  async function fetchData(newData: any) {
    let loaiBaoCao = 2;
    if(type === _TYPEMONTH){
      loaiBaoCao = 2;
    }
    else if(type === _TYPEYEAR){
      loaiBaoCao = 3;
    }else if(type === _TYPEWEEK){
      loaiBaoCao = 4;
    }

    const datas = {
      ...newData,
      loaiBaoCao: loaiBaoCao
    }

    console.log("datas" + JSON.stringify(datas))
    const response = await kpiService.list({ data: datas, pageIndex: _PAGEINDEX, pageSize: _PAGESIZE });
    if (response.data) setData(response.data.giaTriKeHoachs);
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

  //change ngày
  const onChange = e => {
    setType(e.target.value);
    renderFormat(e.target.value)
  };

  //format ngày và kiểu hiển thị
  const renderFormat = (value: string) => {
    if (value === _TYPEMONTH) {
      setFormat(_MONTHFORMAT)
      setDisplay(_THANG);
    } else  if(value === _TYPEYEAR) {
      setFormat(_YEARFORMAT)
      setDisplay(_NAM);
    }
    else{
      setFormat(_TYPEWEEK)
      setDisplay(_TUAN);
    }
  }

  useEffect(() => {
    fetchDonVi()
    fetchLoaiChiTieu(localStorage.donViID);
    // eslint-disable-next-line
  }, [])


  const notify = (type, message, description) => {
    notification[type]({
      message: message,
      description: description
    });
  };

  //cập nhật giá trị đơn vị
  const updateHandler = () => {
    const updateData: any[] = []
    data.forEach((newData) => {
      updateData.push({
        'id': newData.id,
        'chiTieuID': newData.chiTieuID,
        "giaTriKeHoach": newData.giaTriKeHoach,
        "apDungThang": newData.apDungThang ? _TRUE : _FALSE
      });
    });
    let request = {}
    if (valueUpdate.thang === null) {
      request = {
        donViID: valueUpdate.donViID,
        loaiBaoCao: valueUpdate.loaiBaoCao,
        nam: valueUpdate.nam,
        "giaTriKeHoachs": updateData
      };
    } else {
      request = {
        donViID: valueUpdate.donViID,
        loaiBaoCao: valueUpdate.loaiBaoCao,
        thang: valueUpdate.thang,
        nam: valueUpdate.nam,
        "giaTriKeHoachs": updateData
      };
    }
    const response = async () => await kpiService.update(request);
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
          fetchData(requestList)
          setDisabledUpdate(true)
          notify(_THANHCONG, _TIEUDECAPNHATTHANHCONG, _NOIDUNGCAPNHATKHTHANHCONG);
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
                // filterOption={(input, option) =>
                //   option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                // }
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
              <Select
                placeholder="Chọn loại chỉ tiêu"
                showSearch
                optionFilterProp="children"
                // filterOption={(input, option) =>
                //   option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                // }
                defaultValue={'null'}
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
          <h2>Cập nhật giá trị kế hoạch</h2>
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
          <div className="note">
            <p>Chọn [Áp dụng tháng]: Giá trị kế hoạch năm sẽ được áp dụng cho tất cả các tháng trong năm</p>
          </div>
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

export default PlansTable;
