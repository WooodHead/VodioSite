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
import locationImg from '../../img/Location.svg'
import telephoneImg from '../../img/Tel.svg'
import emailImg from '../../img/Email.svg'

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
    var links = <div className="footer-links">
      <ul className="footer-title-ul">
        <li >
          <Link style={{ fontFamily: 'irsansbold', fontSize: '14px' }} to={{ pathname: "/vodio" }}>درباره ما</Link>
        </li>
        <li >
          <Link style={{ fontFamily: 'irsansbold', fontSize: '14px' }} to={{ pathname: "/rules" }}>قوانین سایت</Link>
        </li>
        <li >
          <Link style={{ fontFamily: 'irsansbold', fontSize: '14px' }} to={{ pathname: "/faq" }}>پرسش های متداول</Link>
        </li>
        <li >
          <Link style={{ fontFamily: 'irsansbold', fontSize: '14px' }} to={{ pathname: "/complaint" }}>ثبت شکایت</Link>
        </li>
        <li >
          <a style={{ fontFamily: 'irsansbold', fontSize: '14px' }} href="https://t.me/vodioir" onClick={this.TelegramSupport.bind(this)}>پشتیبانی در تلگرام</a>
        </li>
      </ul>
    </div>

    var downloadPart = <div class="footer-download top-border">
      <strong className="footer-title" style={{ marginTop: '9px' }}>دانلود اپلیکیشن اندروید</strong>
      <div style={{
        width: '160px',
        marginTop: '10px', marginRight: 'calc(50% - 80px)', position: 'relative', cursor: 'pointer'
      }}>
        <a href="http://rabara.ir/vodio.apk" style={{ position: 'absolute', width: '100%', height: '100%', top: '0', right: '0' }}></a>
        <img src={directDownloadAppImg} />
      </div>
    </div>

    var contacts = <div className="footer-contact">
      <strong class="footer-title tablet-show">تماس با ما</strong>
      <div className="footer-contact-content">
        <div class="footer-contact-location"><img src={locationImg} style={{ float: 'right', marginLeft: '5px', width: '10px', marginTop: '7px' }} />{latinToPersian('ولیعصر - بالاتر از زرتشت - کوچه پزشک پور - پلاک 25')}</div>
        <div class="footer-contact-tel"><img src={telephoneImg} style={{ float: 'right', marginLeft: '5px', width: '10px', marginTop: '7px' }} />{latinToPersian("تلفن: 02188807480")}</div>
        <div class="footer-contact-email"><img src={emailImg} style={{ float: 'right', marginLeft: '5px', width: '10px', marginTop: '7px' }} />ایمیل: Info@vodio.com</div>
        <div class="top-border">
          <strong class="footer-title tablet-show">شبکه‌های اجتماعی</strong>
          <div className="footer-contact-content-socail">
            <a href="https://t.me/vodiochannel" onClick={this.SocialClicked.bind(this, "telegram")} className="telegram">
              <img src={telegramImg} style={{
                width: '25px',
                marginTop: '7.5px',
                marginRight: '7.5px'
              }} />
            </a>
            <a href="http://instagram.com/vodio.ir" onClick={this.SocialClicked.bind(this, "instagram")} className="instagram">
              <img src={instagramImg} style={{
                width: '25px',
                marginTop: '7.5px',
                marginRight: '7.5px'
              }} />
            </a>
            <a href="http://twitter.com/vodio_ir" onClick={this.SocialClicked.bind(this, "twitter")} className="twitter">
              <img src={twitterImg} style={{
                width: '25px',
                marginTop: '7.5px',
                marginRight: '7.5px'
              }} />
            </a>
            <a
              onClick={this.SocialClicked.bind(this, "facebook")}
              href="https://www.facebook.com/vodio.ir/"
              className="facebook"
            >
              <img src={facebookImg} style={{
                width: '25px',
                marginTop: '7.5px',
                marginRight: '7.5px'
              }} />
            </a>
          </div>
        </div>
      </div>
    </div>

    var ownership = <div className="footer-url-finder-download">
      <strong className="footer-title" >
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

    var part5 = <div className="footer-part4 top-border">
      <a href="http://www.fidanfilm.ir/" rel="nofollow">
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
          <div class="footer-part1">
            {links}
            {contacts}
          </div>
          <div class="footer-part2">
            {downloadPart}
            {part5}
          </div>
        </div>
        {ownership}
      </footer>
    );
  }
}
