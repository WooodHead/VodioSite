import React, { Component } from "react";
import { Link } from "react-router-dom";
import { latinToPersian } from "../util/util";

export default class Footer extends React.Component {
  constructor() {
    super();
    this.state = {
      email: ""
    };
  }

  componentDidMount() {
    $(function() {
      $(".float-top-header").click(function() {
        $("html, body").animate({ scrollTop: 0 }, 1000);
      });
    });
  }

  submitEmail() {
    if ($.trim(this.state.email) == "") {
      $.ajax({
        type: "GET",
        url: MainUrl + "/saveemail.ashx?email=" + this.state.email,
        success: function(data, textStatus, request) {

        }.bind(this),
        error: function(request, textStatus, errorThrown) {}.bind(this)
      });
    }else{
      
    }
  }

  render() {
    return (
      <footer id="footer">
        <a id="#top-float" className="float-top-header">
          <span className="icon-angle-up" />
        </a>
        <div className="footer-content">
          <div className="footer-links">
            <strong className="footer-title">لینک‌ها</strong>
            <ul>
              <li>
                <Link to={{ pathname: "/" }}>صفحه اصلی</Link>
              </li>
              <li>
                <Link to={{ pathname: "/vodio" }}>ودیو چیست؟</Link>
              </li>
              <li>
                <Link to={{ pathname: "/ContactUs" }}>تماس با ما</Link>
              </li>
              <li>
                <Link to={{ pathname: "/faq" }}>پرسش های متداول</Link>
              </li>
            </ul>
          </div>
          <div className="footer-contact">
            <strong className="footer-title">تماس‌با‌ما</strong>
            <div className="footer-contact-content">
              <p>مجیدیه شمالی ، خیابان کمالی، بن بست سعید، پلاک ۴</p>
              <p>{latinToPersian("تلفن: 02126141571")}</p>
              <p>ایمیل: Info@vodio.com</p>
              <div className="footer-contact-content-socail">
                <a href="https://t.me/vodiochannel" className="telegram">
                  <span className="icon-paper-plane-empty" />
                </a>
                <a href="http://instagram.com/vodio.ir" className="instagram">
                  <span className="icon-instagram-1" />
                </a>
                <a href="http://twitter.com/vodio_ir" className="twitter">
                  <span className="icon-twitter" />
                </a>
                <a
                  href="https://www.facebook.com/vodio.ir/"
                  className="facebook"
                >
                  <span className="icon-facebook" />
                </a>
              </div>
            </div>
          </div>
          <div className="footer-url-finder-download">
            <strong className="footer-title">
              © تمام حقوق این سایت متعلق به ودیو می‌باشد.
            </strong>
            <div className="footer-url-finder-download-content">
              تمامي كالاها و خدمات اين سایت، حسب مورد، داراي مجوزهاي لازم از
              مراجع مربوطه مي‌باشند.
            </div>
          </div>
          <div className="footer-news-letter">
            <strong className="footer-title">خبرنامه</strong>
            <div className="footer-news-letter-content">
              ما هر روزه برای شما آخرین فیلم و سریال های روز را در ایمیلتان
              ارسال میکنیم!
            </div>
            <form className="footer-news-letter-form">
              <div className="footer-news-letter-form-input-bg">
                <input
                  type="email"
                  className="text-input"
                  placeholder="ایمیل..."
                />
                <button
                  className="submit"
                  onClick={this.submitEmail.bind(this)}
                >
                  <span className="icon-paper-plane-empty" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </footer>
    );
  }
}
