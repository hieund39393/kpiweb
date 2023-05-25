import { memo, useRef, useMemo, useState, useEffect } from 'react';
import Slider from "react-slick";
import Slide from "./slide";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import {
  HomeOutlined,
  SettingOutlined,
  FullscreenOutlined,
  FullscreenExitOutlined,
  PlaySquareOutlined,
  PauseCircleOutlined,
  UpCircleOutlined
} from '@ant-design/icons';
import ChartService from 'modules/dashboard/services/ChartService';
import ListChartService from "modules/admin/charts/services/ListChartService"
import { _PAGEINDEX } from 'constant';
import { Settings } from '../settings'
import ModalSetting from './modal'
import "../assets/css/style.css"
import LocalStorageService from 'core/infrastructure/services/localStorageService';
import { Spin } from 'antd';

const localStorageService = LocalStorageService.instance();
const chartService = ChartService.instance();
const listChartService = ListChartService.instance();

const fetchDataChartLevel2 = async (
  chiTieuID,
  isTable,
  ngayBaoCao,
  donViID
) => {
  const paramsDas = {
    chiTieuID: chiTieuID,
    donViID: donViID,
    ngayBaoCao: ngayBaoCao,
    pageIndex: _PAGEINDEX,
    pageSize: 100
  };

  return chartService
    .listSliderShow(paramsDas)
    .then((res) => {
      if (res.statusCode === 200 && res.data.charts.length > 0) {
        return res.data;
      }
      return null;
    })
    .catch(() => { return null });
};

//fetch chỉ tiêu
async function fetchIndicators(defaultSetting, setGroupNames, setGroupName, setDatasChartLevel2, setIsLoading) {
  // eslint-disable-next-line
  let dataLevel2 = new Array();
  // eslint-disable-next-line
  let arrayNames = new Array();
  let category = await listChartService.listBoChiTieu({ pageIndex: _PAGEINDEX, pageSize: 1000 });
  if (category.data) {
    const boChiTieus = category.data.boChiTieus;
    for (const boChiTieu of boChiTieus) {
      let response = await chartService.getIndicatorsLevel({ boChiTieuID: boChiTieu.groupID, level: 2 });
      if (response.data) {
        let indicatorsLevel = response.data.chiTieus;
        for (const element of indicatorsLevel) {
          let data = await fetchDataChartLevel2(element.id, element.isTable, defaultSetting.ngayBaoCao, defaultSetting.donViID);
          if (data !== null) {
            data.isTable = element.isTable;
            data.groupName = boChiTieu.groupName;
            dataLevel2.push(data);
          }
        };
      }
    }
    // get group name of slide    

    let indexSlide = 0;
    // eslint-disable-next-line
    dataLevel2.map((element: { isTable, charts, groupName }) => {
      if (element.isTable) {
        arrayNames[indexSlide] = element.groupName;
        indexSlide++;
      } else {
        // eslint-disable-next-line
        element.charts.map((e) => {
          arrayNames[indexSlide] = element.groupName;
          indexSlide++;
        });
      }
    });

    setGroupNames(arrayNames);
    setGroupName(arrayNames[0]);
    setDatasChartLevel2(dataLevel2);
    setIsLoading(false)

  } else setDatasChartLevel2([]);
}

const width = window.innerWidth;
function getSizeSlide(isFull) {
  let offsetTop = 30; //110
  let headerHeight = isFull ? 0 : 80;
  let heightSlide = 618;
  //
  if (width > 4000) {
    offsetTop = 189;
    headerHeight = isFull ? 0 : 160;
    heightSlide = 1016;
  } else if (width > 2500) {
    heightSlide = 622;
  }
  //
  let heightTiviShow = window.innerHeight - offsetTop - headerHeight;
  return heightTiviShow / heightSlide;
}

const styleCss = `
  section.ant-layout.layout-content {
      padding: 0;
  }
  .ant-layout-header.header,
  .ant-layout-sider#side-bar,
  footer {
      display: none;
  }
  body {
    overflow-y: hidden;
  }
`;

function TiviShow() {

  const sliderRef = useRef<Slider>(null);
  const [autoPlay, setAutoPlay] = useState(true);
  const [datasChartLevel2, setDatasChartLevel2] = useState<Array<any>>([]);
  const [groupNames, setGroupNames] = useState<Array<any>>([]);
  const [groupName, setGroupName] = useState("");
  const [isShowModal, setIsShowModal] = useState(false);
  const user = localStorageService.getUser()
  const [isLoading, setIsLoading] = useState(true)
  const [defaultSetting, setDefaultSetting] = useState(
    {
      donViID: Settings.donViID !== null ? Settings.donViID : user.donViID,
      ngayBaoCao: Settings.ngayBaoCao,
      speed: Settings.speed
    }
  );
  const [numberSlide, setNumberSlide] = useState(getSizeSlide(false));
  const handleFullScreen = useFullScreenHandle();

  const setHeightFullScreen = () => {
    setNumberSlide(getSizeSlide(handleFullScreen.active));
  }

  const playSlider = () => {
    setAutoPlay(true);
    sliderRef.current.slickPlay();
  }

  const pauseSlider = () => {
    setAutoPlay(false);
    sliderRef.current.slickPause();
  }

  const gotoTopSlider = () => {
    sliderRef.current.slickGoTo(0);
  }

  const setting = {
    // lazyLoad: "progressive",
    draggable: true,
    arrows: false,
    infinite: true,
    slidesToShow: numberSlide,
    slidesToScroll: 1,
    autoplay: true, //don't useState this value,  only set true/false
    vertical: true,
    verticalSwiping: true,
    pauseOnHover: false,
    speed: defaultSetting.speed,
    autoplaySpeed: 0,
    cssEase: "linear",
    beforeChange: (oldIndex, newIndex) => {
      setGroupName(groupNames[newIndex]);
    }
  };

  const showModal = () => {
    setIsShowModal(true);
  };

  const closeModal = () => {
    setIsShowModal(false);
  };

  const updateData = (data) => {
    setIsLoading(data.loading)
    setDefaultSetting(data);
    closeModal();
  }

  //modal setting
  const modalSetting = useMemo(() => (
    isShowModal &&
    <ModalSetting
      isShowModal={isShowModal}
      closeModal={closeModal}
      defaultSetting={defaultSetting}
      updateData={updateData}
    />
    // eslint-disable-next-line
  ), [isShowModal])

  useEffect(() => {
    fetchIndicators(defaultSetting, setGroupNames, setGroupName, setDatasChartLevel2, setIsLoading);
    // eslint-disable-next-line
  }, [defaultSetting]);

  return (

    <div className="page-tivi-show">
      <Spin className="loading-tivishow" size="large" spinning={isLoading} tip="Đang tải dữ liệu! Vui lòng đợi...">
        <style>{styleCss}</style>
        <div className="content-header">
          <h2>Dashboard</h2>
        </div>

        <FullScreen
          handle={handleFullScreen}
          onChange={setHeightFullScreen}
        >
          <div className="content-body">
            <div className="title-header">
              <h2>{groupName}</h2>
            </div>
            <Slide
              data={datasChartLevel2}
              Slider={Slider}
              sliderRef={sliderRef}
              setting={setting}
            />
          </div>

          <div className="tivishow-setting">
            {modalSetting}
          </div>

          <a href="/dashboard" className={handleFullScreen.active ? "hidden" : ""}> <HomeOutlined /> </a>
          <SettingOutlined onClick={showModal} className={handleFullScreen.active ? "hidden" : ""} />
          {handleFullScreen.active ? <FullscreenExitOutlined onClick={handleFullScreen.exit} /> : <FullscreenOutlined onClick={handleFullScreen.enter} />}
          {autoPlay ? <PauseCircleOutlined onClick={pauseSlider} /> : <PlaySquareOutlined onClick={playSlider} />}
          {!autoPlay && <UpCircleOutlined onClick={gotoTopSlider} />}
        </FullScreen>
      </Spin>
    </div>

  );
}

export default memo(TiviShow);