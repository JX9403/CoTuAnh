import p1 from '../contact/p1.jpg';
import "./Contact.scss";
import { useNavigate } from 'react-router-dom';
import { IoMail } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
function Contact() {
    const navigate = useNavigate();
    return (
        <>
            <div className="body">
                <div className="body-d-1">
                    <img src={p1} alter="Liên hệ"></img>
                </div>

                <div className="body-d-2">
                    <div className="body-d-2-first">
                        <p>liên hệ</p>
                    </div>
                    <div className="body-d-2-second">
                        <div className="body-d-2-second-box1">
                            <div className="body-d-2-second-box1-icon">
                                <IoMail class="body-d-2-second-box1-icon-mail" />
                            </div>
                            <p>chamsockhachhang@minmax.vn</p>
                        </div>
                        <div className="body-d-2-second-box2">
                            <div className="body-d-2-second-box2-icon">
                                <FaPhoneAlt class="body-d-2-second-box2-icon-phone" />
                            </div>
                            <p>+84999999999</p>
                        </div>
                    </div>
                </div>

                <div className="body-d-3">
                    <div className="body-d-3-first">
                        <p>GÓP Ý CỦA BẠN</p>
                    </div>
                    <div className="body-d-3-second">
                        <div className="body-d-3-second-box1">
                            <input type="text" placeholder="Họ và tên"></input>
                        </div>
                        <div className="body-d-3-second-box2">
                            <input type="text" placeholder="Email"></input>
                        </div>
                        <div className="body-d-3-second-box3">
                            <input type="text" placeholder="Số điện thoại"></input>
                        </div>
                        <div className="body-d-3-second-box4">
                            {/* <input type="text" placeholder="Ý kiến của bạn"></input> */}
                            <textarea placeholder="Ý kiến của bạn"></textarea>
                        </div>
                        <div className="body-d-3-second-box5">

                            <button onClick={() => navigate("/")}>Gửi</button>




                        </div>
                    </div>
                    <div className="body-d-3-third">


                    </div>
                </div>



            </div>

        </>
    )
}

export default Contact;