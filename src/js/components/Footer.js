import React, { Component } from "react";
import { Link } from "react-router-dom";
import { latinToPersian } from "../util/util";
import { MainUrl } from "../util/RequestHandler";
import "../../css/loading-fading.css";

export default class Footer extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      errorInfo: "",
      successInfo: ""
    };
  }

  componentDidMount() {
    $(function () {
      $(".float-top-header").click(function () {
        $("html, body").animate({ scrollTop: 0 }, 1000);
      });
    });
  }
  isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
  }
  submitEmail() {
    if ($.trim(this.state.email) != "") {
      if (this.isEmail(this.state.email)) {
        $("#loding").show();
        $.ajax({
          type: "GET",
          url: MainUrl + "/saveemail.ashx?email=" + this.state.email,
          success: function (data, textStatus, request) {
            this.setState({ errorInfo: "", successInfo: "ایمیل شما ثبت شد" });
            $("#loding").hide();
          }.bind(this),
          error: function (request, textStatus, errorThrown) {
            $("#loding").hide();
            this.setState({ errorInfo: "لطفا دوباره تلاش کنید", successInfo: "" });
           }.bind(this)
        });
      } else {
        this.setState({ errorInfo: "ایمیل وارد شده اشتباه است", successInfo: "" });
        $("#email-input").css("border-bottom", "solid 1px red")
      }
    } else {
      $("#email-input").css("border-bottom", "solid 1px red")
      this.setState({ errorInfo: "لطفا ایمیل خود را وارد کنید", successInfo: "" });
    }
  }

  emailChanged(e) {
    $("#email-input").css("border-bottom", "solid 2px #e6e6e6")
    this.setState({ email: e.target.value, errorInfo: "", successInfo: "" });

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
                <Link to={{ pathname: "/vodio" }}>درباره ما</Link>
              </li>
              <li>
                <Link to={{ pathname: "/rules" }}>قوانین سایت</Link>
              </li>
              <li>
                <Link to={{ pathname: "/faq" }}>پرسش های متداول</Link>
              </li>
              <li>
                <Link to={{ pathname: "/complaint" }}>ثبت شکایت</Link>
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
            <div className="footer-news-letter-form">
              <div className="footer-news-letter-form-input-bg">
                <input
                  id="email-input"
                  type="email"
                  className="text-input"
                  placeholder="ایمیل..."
                  onChange={this.emailChanged.bind(this)}
                />
                <div>
                  <div id="loding" style={{
                    display: "none",
                    position: 'absolute',
                    left: '0px',
                    zIndex: '2',
                    width: '50px',
                    height: '50px'
                  }}>
                    <div class="spinner" style={{
                      width: '50px',
                      height: '50px'
                    }}>
                    </div>
                  </div>
                  <button
                    className="submit"
                    onClick={this.submitEmail.bind(this)}
                  >
                    <span className="icon-paper-plane-empty" />
                  </button>

                </div>
              </div>
            </div>
            <div style={{ color: 'red', fontSize: '13px', position: 'absolute' }}>
              {this.state.errorInfo}
            </div>
            <div style={{ color: 'green', fontSize: '13px', position: 'absolute' }}>
              {this.state.successInfo}
            </div>
          </div>

        </div>
      </footer>
    );
  }
}
