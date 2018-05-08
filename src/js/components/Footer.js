import React, { Component } from "react";
import { Link } from "react-router-dom";
import { latinToPersian } from "../util/util";
import { MainUrl } from "../util/RequestHandler";
import "../../css/loading-fading.css";
import fidanImg from '../../img/Fidan-new-Small.png'
import videopthImg from '../../img/logo-Videopth.svg'
import { inject, observer } from "mobx-react";
import telegramImg from '../../img/Telegram.svg'
import facebookImg from '../../img/Facebook.svg'
import instagramImg from '../../img/Instagram.svg'
import twitterImg from '../../img/Twitter.svg'
import directDownloadAppImg from '../../img/direct-download-app.svg'

@inject("gaStore")
@observer
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

  SocialClicked(snl) {
    this.props.gaStore.addEvent("Social", snl, null)
  }

  TelegramSupport() {
    this.props.gaStore.addEvent("Support", "telegram", null)

  }

  render() {
    var part1 = <div className="footer-links">
      <strong className="footer-title footer-title-links">لینک‌ها</strong>
      <ul className="footer-title-ul">

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


    var downloadPart = <div class="footer-download">
      <strong className="footer-title">دانلود اپلیکیشن اندروید</strong>
      <div style={{
        width: '150px',
        marginTop: '10px', marginRight: 'calc(50% - 75px)', position: 'relative', cursor: 'pointer'
      }}>
        <a href="http://rabara.ir/vodio.apk" style={{ position: 'absolute', width: '100%', height: '100%', top: '0', right: '0' }}></a>
        <img src={directDownloadAppImg} />
      </div>
    </div>

    var part2 = <div className="footer-contact">
      <strong className="footer-title">تماس‌با‌ما</strong>
      <div className="footer-contact-content">
        <p>مجیدیه شمالی ، خیابان کمالی، بن بست سعید، پلاک ۴</p>
        <p>{latinToPersian("تلفن: ۰۲۱۲۸۴۲۵۹۷۲")}</p>
        <p style={{ marginBottom: "5px" }}>ایمیل: Info@vodio.com</p>
        <div style={{
          borderTop: '1px solid #dadada', marginTop: '20px',
          paddingTop: '20px'
        }}>
          <div class="footer-title">پشتیبانی در تلگرام</div>
          <a href="https://t.me/vodioir" style={{ fontFamily: "irsansbold", color: "#e61d89" }} onClick={this.TelegramSupport.bind(this)}>vodioir@</a>
        </div>
        <div style={{
          paddingTop: '20px',
          marginTop: '20px',
          borderTop: '1px solid #dadada'
        }}>
          <div class="footer-title">شبکه‌های مجازی</div>
          <div className="footer-contact-content-socail">
            <a href="https://t.me/vodiochannel" onClick={this.SocialClicked.bind(this, "telegram")} className="telegram">
              <img src={telegramImg} style={{
                width: '25px',
                marginTop: '12.5px'
              }} />
            </a>
            <a href="http://instagram.com/vodio.ir" onClick={this.SocialClicked.bind(this, "instagram")} className="instagram">
              <img src={instagramImg} style={{
                width: '25px',
                marginTop: '12.5px'
              }} />
            </a>
            <a href="http://twitter.com/vodio_ir" onClick={this.SocialClicked.bind(this, "twitter")} className="twitter">
              <img src={twitterImg} style={{
                width: '25px',
                marginTop: '12.5px'
              }} />
            </a>
            <a
              onClick={this.SocialClicked.bind(this, "facebook")}
              href="https://www.facebook.com/vodio.ir/"
              className="facebook"
            >
              <img src={facebookImg} style={{
                width: '25px',
                marginTop: '12.5px'
              }} />
            </a>
          </div>
        </div>
      </div>
    </div>

    var part3 = <div className="footer-url-finder-download">
      <strong className="footer-title" style={{ marginTop: '20px' }}>
        © تمام حقوق این سایت متعلق به ودیو می‌باشد.
  </strong>
      <div className="footer-url-finder-download-content">
        تمامي كالاها و خدمات اين سایت، حسب مورد، داراي مجوزهاي لازم از
    مراجع مربوطه مي‌باشند.
  </div>
    </div>

    var part4 = <div className="footer-news-letter">
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

    var part5 = <div className="footer-part4">
      <a href="http://www.fidanfilm.ir/">
        <img className="footer-fidan-logo" src={fidanImg} />
      </a>
      <a href="http://videopth.com/">
        <img className="footer-videopth-logo" src={videopthImg} />
      </a>
    </div>

    return (
      <footer id="footer">
        <a id="#top-float" className="float-top-header">
          <span className="icon-angle-up" />
        </a>
        <div className="footer-content">
          {part1}
          {downloadPart}
          {part2}
          <div className="footer-size-1350">
            <div className="footer-size-1350-news">
              {part3}
              {part4}
            </div>
            {part5}
          </div>
          <div className="footer-other-sizes-part1">
            {part4}
            {part5}
          </div>
          <div className="footer-other-sizes-part2">
            {part3}
          </div>
        </div>
      </footer>
    );
  }
}
