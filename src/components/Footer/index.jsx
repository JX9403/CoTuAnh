import { useNavigate } from "react-router-dom";
import "./footer.scss";
function Footer() {
  const navigate = useNavigate();
  return (
    <>
      <footer className="footer">
        <div className="footer__wrap">
          <div className="footer__left">
            <div className="footer__name">MinMax</div>
            <div className="footer__desc">Sự lựa chọn hoàn hảo của bạn</div>
            <div className="footer__sign">
              Đăng ký tài khoản ngay :
              <span className="footer__btn">
                <button className="btn-1" onClick={() => navigate('/register')}>Đăng ký</button>
              </span>
            </div>
          </div>
          <div className="footer__right">
            <div className="footer__link">
              <div className="footer__link-title">LINK</div>
              <div>Trang chủ</div>
              <div>Sản phẩm</div>
              <div>Khuyến mãi</div>
              <div>Liên hệ</div>
            </div>
            <div className="footer__contact">
            <div className="footer__contact-title">LIÊN HỆ</div>
              <div>
                <i className="fa-solid fa-envelope"></i>Email :
                chamsockhachhang@minmax.vn
              </div>
              <div>
                <i className="fa-solid fa-phone"></i>Số điện thoại: +8499999999
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
export default Footer;
