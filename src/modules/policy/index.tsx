import { Layout } from 'antd';
import { Collapse } from 'antd';
import { useState } from 'react';
import './style.css'

const { Panel } = Collapse;
const { Content, Sider } = Layout;

export default function ChinhSach() {
  const [key, setKey] = useState('1')
  function callback(key: any) {
    setKey(key);
  }
  return (
    <Layout style={{backgroundColor: '#ffffff'}}>
      <Sider></Sider>
      <Layout>
        <Content>
          <div className="page-policy">
            {/* content */}
            <div className="page-policy--content content-body">
              <h2 className="content-body--title manage-title">CHÍNH SÁCH</h2>
              <Collapse defaultActiveKey={[key]} onChange={callback} bordered={false}>
                <Panel header="Chính sách bảo mật thông tin" key="1">
                  <div className="policy--title">
                    <p>1. Mục đích và phạm vi thu thập thông tin</p>
                  </div>
                  <div className="policy--content">
                    <div className="policy--content-title">
                      <p>evnhanoi.vn, evnhanoi.com.vn và App mobile EVNHANOI không bán, chia sẻ hay trao đổi thông tin cá nhân của khách hàng thu thập trên trang web cho một bên thứ ba nào khác. Thông tin cá nhân thu thập được sẽ chỉ được sử dụng trong nội bộ công ty. Khi bạn liên hệ đăng ký dịch vụ, thông tin cá nhân mà evnhanoi.vn, evnhanoi.com.vn và App mobile EVNHANOI thu thập bao gồm:</p>
                    </div>
                    <div className="policy--content-body">
                      <p>- Họ và tên:</p>
                      <p>- Mã khách hàng:</p>
                      <p>- Địa chỉ:</p>
                      <p>- Điện thoại:</p>
                      <p>- Email</p>
                      <p>- Ngoài thông tin cá nhân là các thông tin về dịch vụ</p>
                    </div>
                  </div>
                  <div className="policy--title">
                    <p>2. Phạm vi sử dụng thông tin</p>
                  </div>
                  <div className="policy--content">
                    <div className="policy--content-title">
                      <p>Thông tin cá nhân thu thập được sẽ chỉ được evnhanoi.vn, evnhanoi.com.vn và App mobile EVNHANOI sử dụng trong nội bộ công ty và cho một hoặc tất cả các mục đích sau đây:</p>
                    </div>
                    <div className="policy--content-body">
                      <p>- Hỗ trợ khách hàng</p>
                      <p>- Cung cấp thông tin liên quan đến dịch vụ</p>
                      <p>- Xử lý đơn đặt hàng và cung cấp dịch vụ và thông tin qua trang web của chúng tôi theo yêu cầu của bạn</p>
                      <p>- Chúng tôi có thể sẽ gửi thông tin sản phẩm, dịch vụ mới, thông tin về các sự kiện sắp tới hoặc thông tin tuyển dụng nếu quý khách đăng kí nhận email thông báo.</p>
                      <p>- Ngoài ra, chúng tôi sẽ sử dụng thông tin bạn cung cấp để hỗ trợ quản lý tài khoản khách hàng; xác nhận và thực hiện các giao dịch tài chính liên quan đến các khoản thanh toán trực tuyến của bạn</p>
                    </div>
                  </div>
                  <div className="policy--title">
                    <p>3. Thời gian lưu trữ thông tin</p>
                  </div>
                  <div className="policy--content">
                    <div className="policy--content-body">
                      <p>- Đối với thông tin cá nhân, evnhanoi.vn, evnhanoi.com.vn và App mobile EVNHANOI chỉ xóa đi dữ liệu này nếu khách hàng có yêu cầu, khách hàng yêu cầu gửi mail về evnhanoi@evnhanoi.vn</p>
                    </div>
                  </div>
                  <div className="policy--title">
                    <p>4. Những người hoặc tổ chức có thể được tiếp cận với thông tin cá nhân</p>
                  </div>
                  <div className="policy--content">
                    <div className="policy--content-title">
                      <p>Đối tượng được tiếp cận với thông tin cá nhân của khách hàng thuộc một trong những trường hợp sau:</p>
                    </div>
                    <div className="policy--content-body">
                      <p>- TỔNG CÔNG TY ĐIỆN LỰC THÀNH PHỐ HÀ NỘI</p>
                      <p>- Các đối tác có ký hợp động thực hiện 1 phần dịch vụ do TỔNG CÔNG TY ĐIỆN LỰC THÀNH PHỐ HÀ NỘI. Các đối tác này sẽ nhận được những thông tin theo thỏa thuận hợp đồng (có thể 1 phần hoặc toàn bộ thông tin tuy theo điều khoản hợp đồng) để tiến hành hỗ trợ người dùng sử dụng dịch vụ do Công ty cung cấp.</p>
                    </div>
                  </div>
                  <div className="policy--title">
                    <p>5. Địa chỉ của đơn vị thu thập và quản lý thông tin cá nhân</p>
                  </div>
                  <div className="policy--content">
                    <div className="policy--content-title">
                      <p>TỔNG CÔNG TY ĐIỆN LỰC THÀNH PHỐ HÀ NỘI</p>
                    </div>
                    <div className="policy--content-body">
                      <p>- Địa chỉ: Số 69 phố Đinh Tiên Hoàng - Phường Lý Thái Tổ - Quận Hoàn Kiếm - Hà Nội</p>
                      <p>- Điện thoại: 1900 1288</p>
                      <p>- Website: evnhanoi.vn, evnhanoi.com.vn và App mobile EVNHANOI</p>
                      <p>- Email: evnhanoi@evnhanoi.vn</p>
                    </div>
                  </div>
                  <div className="policy--title">
                    <p>6. Phương tiện và công cụ để người dùng tiếp cận và chỉnh sửa dữ liệu cá nhân của mình</p>
                  </div>
                  <div className="policy--content">
                    <div className="policy--content-title">
                      <p>evnhanoi.vn, evnhanoi.com.vn không thu thập thông tin khách hàng qua trang web, thông tin cá nhân khách hàng được thực hiện thu thập qua email liên hệ đặt mua sản phẩm, dịch vụ gửi về hộp mail của chúng tôi: evnhanoi@evnhanoi.vn hoặc số điện thoại liên hệ tiếp nhận và giải đáp thông tin về dịch vụ gọi về 1900 1288 Bạn có thể liên hệ địa chỉ email cùng số điện thoại trên để yêu cầu chỉnh sửa dữ liệu cá nhân của mình.</p>
                    </div>
                  </div>
                  <div className="policy--title">
                    <p>7. Cơ chế tiếp nhận và giải quyết khiếu nại của người tiêu dùng liên quan đến việc thông tin cá nhân bị sử dụng sai mục đích hoặc phạm vi đã thông báo</p>
                  </div>
                  <div className="policy--content">
                    <div className="policy--content-title">
                      <p>Tại evnhanoi.vn, evnhanoi.com.vn và App mobile EVNHANOI, việc bảo vệ thông tin cá nhân của bạn là rất quan trọng, bạn được đảm bảo rằng thông tin cung cấp cho chúng tôi sẽ được bảo mật, chúng tôi cam kết không chia sẻ, bán hoặc cho thuê thông tin cá nhân của bạn cho bất kỳ người nào khác. Chúng tôi cam kết chỉ sử dụng các thông tin của bạn vào các trường hợp sau:</p>
                    </div>
                    <div className="policy--content-body">
                      <p>- Nâng cao chất lượng dịch vụ dành cho khách hàng</p>
                      <p>- Giải đáp và tư vấn các dịch vụ về điện.</p>
                      <p>- Khi cơ quan pháp luật có yêu cầu.</p>
                      <p>- Email: evnhanoi@evnhanoi.vn</p>
                      <p>evnhanoi.vn, evnhanoi.com.vn và App mobile EVNHANOI hiểu rằng quyền lợi của bạn trong việc bảo vệ thông tin cá nhân cũng chính là trách nhiệm của chúng tôi nên trong bất kỳ trường hợp có thắc mắc, góp ý nào liên quan đến chính sách bảo mật của evnhanoi.vn, evnhanoi.com.vn và App mobile EVNHANOI, và liên quan đến việc thông tin cá nhân bị sử dụng sai mục đích hoặc phạm vi đã thông báo vui lòng liên hệ qua số hotline 1900 1288 hoặc email: evnhanoi@evnhanoi.vn</p>
                    </div>
                  </div>
                </Panel>
                <Panel header="Chính sách thanh toán" key="2">
                  <div className="policy--content">
                    <div className="policy--content-title">
                      <p>Có 2 hình thức thanh toán, khách hàng có thể lựa chọn hình thức thuận tiện và phù hợp với mình nhất:</p>
                    </div>
                    <div className="policy--content-body">
                      <p>- Cách 1: Thanh toán tiền mặt trực tiếp địa chỉ của chúng tôi.</p>
                      <p>- Cách 2: Chuyển khoản trước. Quý khách chuyển khoản trước, sau đó chúng tôi tiến hành giao hàng theo thỏa thuận hoặc hợp đồng với Quý khách.</p>
                    </div>
                  </div>
                </Panel>
                <Panel header="Chính sách xử lý khiếu nại" key="3">
                  <div className="policy--content">
                    <div className="policy--content-body">
                      <p>- Tiếp nhận mọi khiếu nại của khách hàng liên quan đến việc sử dụng dịch vụ của công ty.</p>
                      <p>- Thời gian giải quyết khiếu nại theo quy định của Nhà Nước.</p>
                    </div>
                  </div>
                </Panel>

              </Collapse>
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}