import { memo } from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const antIcon = <LoadingOutlined className="icon-loading" spin />;

function Loading({ visible }) {
  return <Spin indicator={antIcon} spinning={visible} className={`loading${visible ? ' loading--visible' : ''}`} />;
}

export default memo(Loading);
