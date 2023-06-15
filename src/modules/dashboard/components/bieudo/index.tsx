import { useEffect, useState } from 'react';
import { Form, Col, Row, BackTop } from 'antd';
import { UpCircleOutlined } from '@ant-design/icons';

import 'moment/locale/vi';

import BoChiTieuKyThuat from '../../components/skills/index';
import BoChiTieuKinhDoanh from '../../components/business/index';
import BoChiTieuDauTuXayDung from '../../components/construct/index';
import BoChiTieuSuaChua from '../../components/repair/index';
import BoChiTieuQuanTri from '../../components/quantri/index';
import BoChiTieuTaiChinh from '../../components/taichinh/index';
import BoChiTieuAnToan from '../../components/antoan/index';
import BoChiTieuChuyenDoiSo from '../../components/chuyendoiso/index';
import BoChiTieuThanhTraKiemTra from '../../components/thanhtrakiemtra/index';
import BoChiTieuDichVuKhachHang from '../dichvukhachhang';
import BoChiTieuCongTacDauThau from '../congtacdauthau';
import BoChiTieuBaoCaoDieuHanh from '../../components/baocaodieuhanh/index';
import BoChiTieuTuDongHoa from '../../components/tudonghoa/index';

import { DonVi } from 'modules/dashboard/dtos/responses/ChartResponse';

import DonViService from 'modules/admin/department/services/DonViService';
import LocalStorageService from 'core/infrastructure/services/localStorageService';
import { _DAYFORMAT, _FALSE, _KHONGCODULIEUSELECT, _TRUE, _TRUESTRING } from 'constant';

import { getInYesterday } from 'core/utils/utility';
import { useLocation } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';


const donViService = DonViService.instance();
const localStorageService = LocalStorageService.instance();


const BieuDo = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const { chiTieuId, chiTieuChaId } = location.state || {};

  const user = localStorageService.getUser();

  const [form] = Form.useForm();
  const [dataDonVi, setDataDonVi] = useState<DonVi[]>([]);
  const [ngayBaoCao, setNgayBaoCao] = useState<string>(getInYesterday);
  const [donViId, setDonViId] = useState(user.donViID);
  const [fetchAt, setFetchAt] = useState(Date.now());

  // Fetch đơn vị
  async function fetchDonVi() {
    let response = await donViService.list();
    if (response.data) setDataDonVi(response.data.donVis);
    else setDataDonVi([]);
  }

  useEffect(() => {
    fetchDonVi();
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

  return (
    <div className="layout-page-content page-layout-content" id="dashboard">
      <>
        <Row gutter={24}>
          <Col span={12} style={{ color: 'blue', fontSize: 25 }}>
            <ArrowLeftOutlined onClick={goBack} />
          </Col>
        </Row>
      </>

      <BoChiTieuKyThuat
        donViID={donViId}
        boChiTieuID={1}
        ngayBaoCao={ngayBaoCao}
        fetchAt={fetchAt}
        setIsChange={setIsChange}
        isChange={isChange}
        chiTieuId={chiTieuId}
        chiTieuChaId={chiTieuChaId}
      />
      <BoChiTieuKinhDoanh
        donViID={donViId}
        boChiTieuID={2}
        ngayBaoCao={ngayBaoCao}
        fetchAt={fetchAt}
        setIsChange={setIsChange}
        isChange={isChange}
        chiTieuId={chiTieuId}
        chiTieuChaId={chiTieuChaId}
      />
      <BoChiTieuDauTuXayDung
        donViID={donViId}
        boChiTieuID={3}
        ngayBaoCao={ngayBaoCao}
        fetchAt={fetchAt}
        setIsChange={setIsChange}
        isChange={isChange}
        chiTieuId={chiTieuId}
        chiTieuChaId={chiTieuChaId}
      />
      <BoChiTieuSuaChua
        donViID={donViId}
        boChiTieuID={4}
        ngayBaoCao={ngayBaoCao}
        fetchAt={fetchAt}
        setIsChange={setIsChange}
        isChange={isChange}
        chiTieuId={chiTieuId}
        chiTieuChaId={chiTieuChaId}
      />

      <BoChiTieuQuanTri
        donViID={donViId}
        boChiTieuID={28}
        ngayBaoCao={ngayBaoCao}
        fetchAt={fetchAt}
        setIsChange={setIsChange}
        isChange={isChange}
        chiTieuId={chiTieuId}
        chiTieuChaId={chiTieuChaId}
      />

      <BoChiTieuTaiChinh
        donViID={donViId}
        boChiTieuID={30}
        ngayBaoCao={ngayBaoCao}
        fetchAt={fetchAt}
        setIsChange={setIsChange}
        isChange={isChange}
        chiTieuId={chiTieuId}
        chiTieuChaId={chiTieuChaId}
      />

      <BoChiTieuAnToan
        donViID={donViId}
        boChiTieuID={31}
        ngayBaoCao={ngayBaoCao}
        fetchAt={fetchAt}
        setIsChange={setIsChange}
        isChange={isChange}
        chiTieuId={chiTieuId}
        chiTieuChaId={chiTieuChaId}
      />

      <BoChiTieuChuyenDoiSo
        donViID={donViId}
        boChiTieuID={32}
        ngayBaoCao={ngayBaoCao}
        fetchAt={fetchAt}
        setIsChange={setIsChange}
        isChange={isChange}
        chiTieuId={chiTieuId}
        chiTieuChaId={chiTieuChaId}
      />

      <BoChiTieuThanhTraKiemTra
        donViID={donViId}
        boChiTieuID={47}
        ngayBaoCao={ngayBaoCao}
        fetchAt={fetchAt}
        setIsChange={setIsChange}
        isChange={isChange}
        chiTieuId={chiTieuId}
        chiTieuChaId={chiTieuChaId}
      />
      <BoChiTieuDichVuKhachHang
        donViID={donViId}
        boChiTieuID={50}
        ngayBaoCao={ngayBaoCao}
        fetchAt={fetchAt}
        setIsChange={setIsChange}
        isChange={isChange}
        chiTieuId={chiTieuId}
        chiTieuChaId={chiTieuChaId}
      />
      <BoChiTieuCongTacDauThau
        donViID={donViId}
        boChiTieuID={49}
        ngayBaoCao={ngayBaoCao}
        fetchAt={fetchAt}
        setIsChange={setIsChange}
        isChange={isChange}
        chiTieuId={chiTieuId}
        chiTieuChaId={chiTieuChaId}
      />
      <BoChiTieuBaoCaoDieuHanh
        donViID={donViId}
        boChiTieuID={35}
        ngayBaoCao={ngayBaoCao}
        fetchAt={fetchAt}
        setIsChange={setIsChange}
        isChange={isChange}
        chiTieuId={chiTieuId}
        chiTieuChaId={chiTieuChaId}
      />
      <BoChiTieuTuDongHoa
        donViID={donViId}
        boChiTieuID={37}
        ngayBaoCao={ngayBaoCao}
        fetchAt={fetchAt}
        setIsChange={setIsChange}
        isChange={isChange}
        chiTieuId={chiTieuId}
        chiTieuChaId={chiTieuChaId}
      />
      <BackTop>
        <UpCircleOutlined />
      </BackTop>
    </div>
  );
};

export default BieuDo;
