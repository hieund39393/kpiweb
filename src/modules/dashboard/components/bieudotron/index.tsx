import { useEffect, useState } from 'react';
import { Form, Col, Row, BackTop } from 'antd';
import { UpCircleOutlined } from '@ant-design/icons';

import 'moment/locale/vi';

import { DonVi } from 'modules/dashboard/dtos/responses/ChartResponse';

import DonViService from 'modules/admin/department/services/DonViService';
import ChartService from 'modules/dashboard/services/ChartService';
import LocalStorageService from 'core/infrastructure/services/localStorageService';
import { _DAYFORMAT, _FALSE, _KHONGCODULIEUSELECT, _TRUE, _TRUESTRING } from 'constant';

import { getInYesterday } from 'core/utils/utility';
import { useLocation } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { Pie } from '@ant-design/plots';

const chartService = ChartService.instance();
const localStorageService = LocalStorageService.instance();

interface DataType {
  tenBoChiTieu: string;
  tenChiTieuCha: string;
  values: any;
}

const BieuDoTron = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const { chiTieuId, chiTieuChaId, ngayBaoCao, tansuat } = location.state || {};

  const [form] = Form.useForm();
  const [duLieuAPI, setDuLieuAPI] = useState<DataType>();

  // Fetch đơn vị
  async function fetchData() {
    let response = await chartService.bieuDoTronAsync({ chiTieuChaId, ngayBaoCao, tansuat });
    if (response) setDuLieuAPI(response);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [width]);

  const [isChange, setIsChange] = useState(false);

  const goBack = () => {
    navigate(-1);
  };

  let data = [];
  if (duLieuAPI !== undefined) {
    data = duLieuAPI.values;
  }

  const config: any = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 0.9,
    label: {
      type: 'inner',
      offset: '-30%',
      content: ({ percent }) => `${(percent * 100).toFixed(2)}%`, // Display percentage without rounding
      style: {
        fontSize: 14,
        textAlign: 'center',
      },
    },
    interactions: [
      {
        type: 'element-active',
      },
    ],
  };

  return (
    <div className="layout-page-content page-layout-content" id="dashboard">
      <>
        <Row gutter={24}>
          <Col span={12} style={{ color: 'blue', fontSize: 25 }}>
            <ArrowLeftOutlined onClick={goBack} />
          </Col>
        </Row>
      </>
      <div className="bct-data__title2">
        <h2 style={{ color: 'white !important' }}>Bộ chỉ tiêu {duLieuAPI?.tenBoChiTieu}</h2>
      </div>
      <div className="page-setOfIndicators--content content-body" key={1}>
        <div className="content-title title-lv2">
          <h2 style={{ textAlign: 'center' }}>{duLieuAPI?.tenChiTieuCha}</h2>
        </div>
      </div>
      <div style={{ width: 1200, height: 600 }}>
        <Pie {...config} />
      </div>

      <BackTop>
        <UpCircleOutlined />
      </BackTop>
    </div>
  );
};

export default BieuDoTron;
