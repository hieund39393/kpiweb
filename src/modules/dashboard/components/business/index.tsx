import { _STATUSCODE200 } from 'constant';
import { BoChiTieu } from 'modules/dashboard/dtos/responses/ChartResponse';
import ChartService from 'modules/dashboard/services/ChartService';
import { useEffect, useState } from 'react';
import Charts from '../charts';

const chartService = ChartService.instance();

function BoChiTieuKinhDoanh(props) {
  const {
    donViID,
    boChiTieuID,
    ngayBaoCao,
    fetchAt,
    setIsChange,
    isChange,
    chiTieuId,
    chiTieuChaId,
  } = props;
  const [indicatorsLevel, setIndicatorsLevel] = useState<BoChiTieu[]>([]);

  const fetchIndicators = () => {
    chartService
      .getIndicatorsLevel({ boChiTieuID: boChiTieuID, level: 1 })
      .then((response) => {
        if (response.data && response.statusCode === _STATUSCODE200)
          setIndicatorsLevel(response.data.chiTieus);
      })
      .catch(() => {});
  };

  useEffect(() => {
    fetchIndicators();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log('charts', indicatorsLevel);
  return (
    <div
      // style={{ display: 'none' }} // tạm thời comment
      id="boChiTieuKinhDoanh"
    >
      <div className="bct-data__title">
        <h3>Bộ chỉ tiêu kinh doanh</h3>
      </div>
      <Charts
        donViID={donViID}
        boChiTieuID={boChiTieuID}
        ngayBaoCao={ngayBaoCao}
        fetchAt={fetchAt}
        indicatorsLevel={indicatorsLevel}
        boChiTieuDisplayID="Bộ chỉ tiêu kinh doanh"
        setIsChange={setIsChange}
        isChange={isChange}
        chiTieuId={chiTieuId}
        chiTieuChaId={chiTieuChaId}
      />
    </div>
  );
}

export default BoChiTieuKinhDoanh;
