import { memo, useEffect, useMemo, useState } from "react";
import { notification, Tooltip, Button, Table, ConfigProvider, Tag } from "antd";
import {
  _ARGS,
  _KHONGCODULIEU,
  _NOIDUNGSUATHANHCONG,
  _STATUSCODE200,
  _TIEUDESUATHANHCONG,
  _TIEUDESUATHATBAI
} from "constant";

import { FormOutlined } from "@ant-design/icons";
import viVN from 'antd/lib/locale/vi_VN';
import { ConfigChartProps } from "../dtos/responses/ConfigChartResponse";
import ConfigChartService from "../services/ConfigChartService";
import ModalConfig from "modules/admin/configCharts/components/modal";

const configChartService = ConfigChartService.instance();

function CauHinhBieuDo() {
  const [data, setData] = useState<ConfigChartProps[]>([])
  // Modal
  const [isShowModal, setIsShowModal] = useState(false);
  const [rowKey, setRowKey] = useState({});

  let value1: string = '';
  let value2: string = '';
  let value3: string = '';

  //fetch cấu hình
  async function fetchConfig() {
    let response = await configChartService.list()
    if (response.data) {
      const arr = [
        {
          id: 0,
          type: 0,
          code: 0,
          moTa: '',
          tenCauHinh: '',
          giaTri1: '',
          giaTri2: '',
          giaTri3: '',
        }
      ]
      const res = response.data.cauHinhBieuDos
      // eslint-disable-next-line
      res.map(item => {
        const convert = item.giaTri.split('_')
        value1 = convert[0]

        if (convert[1] !== "undefined") {
          value2 = convert[1]
        }
        if (convert[2] !== "undefined") {
          value3 = convert[2]
        }
        arr.push({
          id: item.id,
          type: item.type,
          code: item.code,
          moTa: item.moTa,
          tenCauHinh: item.tenCauHinh,
          giaTri1: value1,
          giaTri2: value2,
          giaTri3: value3
        })
      })
      delete arr[0]
      setData(arr)
    }
    else setData([])
  }
  //
  const columns = [
    {
      title: "Tên cấu hình",
      dataIndex: "moTa",
      key: "moTa",
      width: '35%',
      sorter: data && data.length > 0 ? (a, b) => { return a.moTa.length - b.moTa.length } : false,
    },
    {
      title: "Giá trị 1",
      dataIndex: "giaTri1",
      key: "giaTri1",
      width: '15%',
      className: 'text-center',
      render: (text: string) => text.indexOf('#') > -1 ? <Tag color={text}>{text}</Tag> : text
    },
    {
      title: "Giá trị 2",
      dataIndex: "giaTri2",
      key: "giaTri2",
      width: '15%',
      className: 'text-center',
      render: (giaTri2: string) => giaTri2 !== undefined ? giaTri2.indexOf('#') > -1 ? <Tag color={giaTri2}>{giaTri2}</Tag> : giaTri2 : ''
    },
    {
      title: "Giá trị 3",
      dataIndex: "giaTri3",
      key: "giaTri3",
      width: '15%',
      className: 'text-center',
      render: (giaTri3: string) => giaTri3 !== undefined ? giaTri3.indexOf('#') > -1 ? <Tag color={giaTri3}>{giaTri3}</Tag> : giaTri3 : ''
    },
    {
      title: "Tác vụ",
      key: "action",
      width: '20%',
      render: row => (
        <Tooltip title="Sửa dữ liệu">
          <Button type="default" className="action-table" icon={<FormOutlined />} onClick={() => showModal(row)} ></Button>
        </Tooltip>
      )
    }
  ]



  //set hiển thị modal
  const showModal = (row: any) => {
    if (row.id) {
      setRowKey(row)
    } else {
      setRowKey({})
    }
    setIsShowModal(true);
  };

  //đóng modal
  const closeModal = () => {
    setIsShowModal(false);
  };

  async function updateHandler(values: any) {
    const newData = {
      ...values
    }

    let response = await configChartService.update(newData)
    if (response.statusCode === _STATUSCODE200) {
      _ARGS.message = _TIEUDESUATHANHCONG
      _ARGS.description = _NOIDUNGSUATHANHCONG
      notification.success(_ARGS)
    } else {
      _ARGS.message = _TIEUDESUATHATBAI
      _ARGS.description = response.message
      notification.error(_ARGS)
    }

    fetchConfig()
  }

  //hiển thị modal
  const modal = useMemo(() => (
    isShowModal &&
    <ModalConfig
      rowKey={rowKey}
      // giaTriBieuDo={giaTriBieuDo}
      isShowModal={isShowModal}
      closeModal={closeModal}
      updateHandler={updateHandler}
    />
    // eslint-disable-next-line
  ), [isShowModal])

  // eslint-disable-next-line
  useEffect(() => {
    fetchConfig()
    // eslint-disable-next-line
  }, [])
  return (
    <div className="page-admin page-layout-content">
      <div className="page-admin--header">
        <div className="page-admin--header--title">
          <h2 >Cấu hình biểu đồ</h2>
        </div>
      </div>
      <div className="page-admin--body">
        <ConfigProvider locale={viVN}>
          <Table
            dataSource={data}
            columns={columns}
            pagination={{ defaultPageSize: 20, showSizeChanger: true }}
            locale={_KHONGCODULIEU}
            className="page--table"
          />
        </ConfigProvider>
      </div>

      {modal}
    </div>
  )
}

export default memo(CauHinhBieuDo)