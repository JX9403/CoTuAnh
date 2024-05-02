import Img02 from "./img/image 7.png";
import Img03 from "./img/image 8.png";
import Img04 from "./img/image 9.png";
import "./about.scss";
import banner1 from "./img/e3381c20ec9f466391095e6a3c93393b.jpg";
import { useNavigate } from "react-router-dom";
const AboutPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="aboutPage">
        <div className="aboutPage__banner">
          <div className="aboutPage__banner-img">
            <img src={banner1} alt="banner1" />
          </div>
          <div className="aboutPage__banner-wrap">
            <div  className="aboutPage__banner-content">
            <div className="aboutPage__banner-title">
              Tháng tươi xanh
              <br />
              Hot deal ngọt lành
            </div>
            <div className="aboutPage__banner-desc">
              Phủ xanh giỏ hàng cùng MinMax!
            </div>
            <div className="aboutPage__banner-btn">
              <button className="btn-1" onClick={() => navigate("/home")}>
                Mua ngay
              </button>
            </div>
            </div>
          </div>
        </div>
        {/* aboutPage Gioi thieu */}
        <div className="aboutPage__about">
          <div className="aboutPage__about-wrap">
            <div className="aboutPage__about-title">Giới thiệu về MinMax</div>
            <div className="aboutPage__about-content">
              <div className="aboutPage__about-img">
                {/* eslint-disable-next-line */}
                <img src={Img02} />
              </div>
              <div className="aboutPage__about-text">
                MinMax là một hệ thống siêu thị bán lẻ của Việt Nam được thành
                lập vào tháng 5 năm 2000. Trải qua quá trình phát triển không
                ngừng nghỉ, MinMax hiện là doanh nghiệp có nhiều siêu thị nhất
                Việt Nam, với hơn 250 siêu thị và đại siêu thị.
              </div>
            </div>
          </div>
        </div>
        {/* End aboutPage Gioi thieu */}

        {/* aboutPage desc */}
        <div className="aboutPage__desc">
          <div className="aboutPage__desc-wrap">
            <div className="aboutPage__desc-title">
              Hình thức bán hàng của chúng tôi
            </div>
            <div className="aboutPage__desc-content">
              <div className="aboutPage__desc-left">
                {/* eslint-disable-next-line */}
                <img src={Img03} />
              </div>
              <div className="aboutPage__desc-right">
                <div className="aboutPage__desc-right-img">
                  {/* eslint-disable-next-line */}
                  <img src={Img04} />
                </div>

                <div className="aboutPage__desc-right-text">
                  <div className="text">
                    <span>01.</span>
                    <div>
                      Bạn có thể đến cửa hàng trực tiếp của chúng tôi để chọn
                      mua những sản phẩm bạn cần
                    </div>
                  </div>
                  <div className="text-mid">hoặc</div>
                  <div className="text">
                    <span>02.</span>
                    <div>
                      Bạn có thể mua hàng online trên website này một cách vô
                      cùng dễ dàng, tiện lợi và nhanh chóng.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End aboutPage Desc */}
      </div>
    </>
  );
};

export default AboutPage;
