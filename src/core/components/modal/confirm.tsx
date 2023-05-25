import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

function Confirm({
  title,
  icon,
  content,
  okText,
  cancelText,
  onOk = () => {},
  onCancel = () => {},
  className = '',
}) {
  if (!icon) icon = <ExclamationCircleOutlined />;

  Modal.confirm({
    title,
    icon,
    content,
    okText,
    cancelText,
    onOk,
    onCancel,
    className,
  });
}

export default Confirm;