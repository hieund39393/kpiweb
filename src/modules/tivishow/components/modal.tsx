import { memo, useState, useEffect } from 'react';
import { _NUTCAPNHAT, _NUTDONGLAI } from 'constant';
import DonViService from 'modules/admin/department/services/DonViService';
import LocalStorageService from 'core/infrastructure/services/localStorageService';
import { DonVi } from 'modules/dashboard/dtos/responses/ChartResponse';
import moment from 'moment';
import locale from 'antd/es/date-picker/locale/vi_VN';
import { _DAYFORMATEN, _DAYFORMAT, _KHONGCODULIEUSELECT, _TRUESTRING, _TRUE, _FALSE } from 'constant';
import {
  Modal,
  Select,
  DatePicker,
  Button,
  Form
} from 'antd';
import { disabledDateCurrent } from 'core/utils/utility';

const donViService = DonViService.instance();
const localStorageService = LocalStorageService.instance();

const { Option } = Select;

function ModalSetting({ isShowModal, closeModal, defaultSetting, updateData }) {
  const user = localStorageService.getUser();
  const [form] = Form.useForm()


  const [dataDonVi, setDataDonVi] = useState<DonVi[]>([]);
  const [dataSetting, setDatSetting] = useState(defaultSetting);

  // Fetch đơn vị
  async function fetchDonVi() {
    let response = await donViService.list();
    if (response.data) setDataDonVi(response.data.donVis);
    else setDataDonVi([]);
  }

  const optionSetting = [4000, 5000, 12000, 13000, 14000, 15000, 16000, 17000, 18000];

  const changeDonViSetting = (value) => {
    let data = { ...dataSetting };
    data.donViID = value;
    data.loading = true;
    setDatSetting(data);
  }

  const changeDateSetting = (e, date) => {
    let data = { ...dataSetting };
    data.ngayBaoCao = moment(date, _DAYFORMAT).format("YYYY-MM-DD");
    data.loading = true;
    setDatSetting(data);
  }

  const changeSpeedSetting = (value) => {
    let data = { ...dataSetting };
    data.speed = value;
    data.loading = true;
    setDatSetting(data);
  }

  const onUpdateData = () => {
    updateData(dataSetting);
  }

  useEffect(() => {
    fetchDonVi();
    // eslint-disable-next-line
  }, []);

  return (
    <Modal
      title={"Cấu hình tivi show"}
      visible={isShowModal}
      onCancel={closeModal}
      getContainer=".tivishow-setting"
      className="modal-tivishow"
      footer={[
        <Button key="back" className="button-closed" onClick={closeModal}>
          {_NUTDONGLAI}
        </Button>,
        <Button key="submit" type="default" htmlType="submit" className="button-primary" form="form-get-tivishow">
          {_NUTCAPNHAT}
        </Button>,
      ]}
    >
      <Form
        name="form-get-tivishow"
        form={form}
        initialValues={{
          ngayBaoCao: moment(dataSetting.ngayBaoCao, _DAYFORMATEN),
          donViID: parseInt(dataSetting.donViID)
        }}
        layout="vertical"
        onFinish={onUpdateData}
      >
        <div className="group-filter-tivishow">
          <div className="donViID-tivishow">
            <Form.Item name="donViID" label="Đơn vị">
              <Select
                className="dashboard-selector-pc"
                onChange={changeDonViSetting}
                placeholder={"Chọn đơn vị"}
                showSearch
                optionFilterProp="children"
                disabled={(user.isTongCongTy === _TRUESTRING || user.isAdmin === _TRUESTRING) ? _FALSE : _TRUE}
                filterOption={(inputValue, option) =>
                  (option && option.children || []).join('').toLowerCase().includes(inputValue.toLowerCase())
                }
                //filterOption={(input, option) =>
                  //option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                //}
                notFoundContent={_KHONGCODULIEUSELECT}
              >
                {user.isTongCongTy || user.isAdmin ? (
                  dataDonVi && dataDonVi.length ? (
                    dataDonVi.map((item, index) => (
                      <Option key={index} value={item.id} title={item.tenDonVi}>
                        {item.tenDonVi}
                      </Option>
                    ))
                  ) : null
                ) : user.donViID && user.donViID !== '' ? (
                  <Option key={user.donViID} value={user.donViID} title={user.tenDonVi}>
                    {user.tenDonVi}
                  </Option>
                ) : null}
              </Select>
            </Form.Item>
          </div>

          <div className="ngayBaoCao-tivishow">
            <Form.Item name="ngayBaoCao" label="Ngày báo cáo" rules={[{ required: true, message: 'Ngày không được bỏ trống' }]}>
              <DatePicker
                onChange={changeDateSetting}
                placeholder="Chọn ngày"
                locale={locale}
                format={_DAYFORMAT}
                disabledDate={disabledDateCurrent}
              />
            </Form.Item>
          </div>
        </div>

        <div className="thoiGian-tivishow">
          <Form.Item label="Thời gian chạy slide">
            <Select
              defaultValue={dataSetting.speed}
              onChange={changeSpeedSetting}
            >
              {
                optionSetting.map((value, index) => {
                  return <Option key={`setting-time-${index}`} value={value}>{value / 1000} giây</Option>
                })
              }
            </Select>
          </Form.Item>
        </div>
      </Form>
    </Modal>
  )
}

export default memo(ModalSetting)