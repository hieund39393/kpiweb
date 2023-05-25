import { memo, useEffect, useState } from "react"
import { Modal, Button, Space } from "antd"
import '../assets/css/modal.css';
import ChartService from "../services/ChartService";
import { DataChiTietGiaiQuyet } from "../dtos/responses/ChartResponse";

const chartService = ChartService.instance()

function ChiTietGiaiQuyet({ isShowModal, closeModal, donViID, ngayBaoCao, chiTieuID, convertMin, convertMax, convertYear }) {
  const [dataGiaiQuyet, setDataGiaiQuyet] = useState<DataChiTietGiaiQuyet[]>([])
  const [countSlider, setCountSlider] = useState(convertMax)

  //fetch data
  async function fetchData(thang) {
    const response = await chartService.listGiaiQuyetAsync({
      donViID: donViID,
      ngayBaoCao: ngayBaoCao,
      thang: thang,
      chiTieuID: chiTieuID
    })
    if (response.data) setDataGiaiQuyet(response.data.chiTiets)
    else setDataGiaiQuyet([])
  }

  useEffect(() => {
    fetchData(convertMax)
    // eslint-disable-next-line
  }, [])

  //prev tháng
  const prevMonth = async () => {
    let count = countSlider;
    setCountSlider(count - 1)
    await fetchData(count - 1)
  }

  //next tháng
  const nextMonth = async () => {
    let count = countSlider;
    setCountSlider(count + 1)
    await fetchData(count + 1)
  }

  return (
    <Modal
      title='Thời gian TB cấp điện'
      visible={isShowModal}
      onCancel={closeModal}
      className="modal-giaiQuyet"
      footer={
        [
          <Button key="back" className="button-closed" onClick={closeModal}>
            Đóng lại
          </Button>
        ]
      }
    >
      <div className="modal-giaiQuyet--filter">
        <Space direction="horizontal" >
          <Button type="link" className="dis-chart prev-charts" disabled={parseInt(countSlider) === parseInt(convertMin) ? true : false} onClick={prevMonth}></Button>
          <h3>Tháng {countSlider}</h3>
          <Button type="link" className="dis-chart next-charts" disabled={parseInt(countSlider) === parseInt(convertMax) ? true : false} onClick={nextMonth}></Button>
        </Space>

      </div>

      {/*list data*/}
      <div className="modal-giaiQuyet--table">
        <ul>
          <li>Thời gian TB cấp điện (ngày)</li>
          <li>Tháng {countSlider}</li>
          <li>Lũy kế</li>
        </ul>
        {
          dataGiaiQuyet && dataGiaiQuyet.length > 0 ?
            dataGiaiQuyet.map((item, index) => (
              <ul key={index}>
                <li >{item.tenChiTieu}</li>
                <li>{item.giaTriThucHien}</li>
                <li>{item.luyKe}</li>
              </ul>
            )) : null
        }

      </div>
    </Modal>
  )
}

export default memo(ChiTietGiaiQuyet)