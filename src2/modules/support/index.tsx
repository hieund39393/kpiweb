import { Layout } from 'antd';
import './style.css'

const { Content, Sider } = Layout;

export default function HoTro() {
  return (
    <Layout style={{ backgroundColor: '#ffffff' }}>
      <Sider></Sider>
      <Layout>
        <Content>
          <div className="page-support">
            {/* content */}
            <div className="page-support--content content-body">
              <h2 className="content-body--title manage-title">HỖ TRỢ</h2>
            </div>
            <div className="policy--title">
              <p>8088</p>
            </div>
            <div className="policy--content">
              <p>Tra cứu thông tin điện</p>
              <p>Tra cứu thông tin mật khẩu</p>
              <p>Tra cứu trạng thái cấp mới</p>
            </div>
            <div className="policy--title">
              <p>Zalo OA</p>
            </div>
            <div className="policy--content">
              <p>
                Để truy cập vào trang EVNHANOI trên Zalo và nhận các thông tin về điện hàng tháng
              </p>
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}